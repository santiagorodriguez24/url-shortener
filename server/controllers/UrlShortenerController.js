const dns = require('dns');
const shortid = require("shortid"); // Library to generate short and unique ids.
var path = require('path');
const { io } = require('../app');
const UrlShortener = require('../models/UrlShortenerModel');

exports.getUrl = async (req, res) => {
    const urlCode = req.params.code;

    // Find a database document and increments access count by one.
    const item = await UrlShortener.findOneAndUpdate(
        { urlCode: urlCode },
        {
            $inc: {
                hitCount: 1
            }
        },
        {
            new: true
        }
    );

    // Each access trigger an update of top five list at client.
    UrlShortener.find({})
        .limit(5)
        .sort({ hitCount: -1 })
        .exec((error, topFive) => {
            if (error) {
                io.emit('topFive',
                    {
                        ok: false,
                        error: 'Something has not gone as it should.'
                    }
                );
                return;
            }

            io.emit('topFive',
                {
                    ok: true,
                    data: topFive
                }
            );
        }
        );


    if (item) {
        return res.redirect(item.originalUrl);
    } else {
        return res.redirect('/not-found');
    }
};

exports.shortenUrl = async (req, res) => {
    const { originalUrl } = req.body;

    // If the original url is valid, the generated url will be valid.
    let validUrl;
    try {
        validUrl = new URL(originalUrl);
        const validProtocols = ['http:', 'https:']; // Web Pages
        let isValid = validProtocols.includes(validUrl.protocol);
        if (!isValid) {
            throw new Error("Invalid Protocol");
        }
    } catch (err) {
        return res.status(400).json({
            ok: false,
            error: "Unable to shorten that link. It is not a valid URL."
        });
    }

    dns.lookup(validUrl.hostname, async (err) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                error: 'Address not found.'
            });
        };

        try {
            const item = await UrlShortener.findOne({ originalUrl: originalUrl });

            if (item) {
                // If the original URL exists in the database, the stored code is returned.
                res.status(200).json({
                    ok: true,
                    data: item
                });
            } else {
                // a unique code is generated and saved in the database with the original url.
                const urlCode = shortid.generate();

                const item = new UrlShortener({
                    originalUrl,
                    urlCode
                });

                await item.save();
                res.status(200).json({
                    ok: true,
                    data: item
                });
            }
        } catch (err) {
            res.status(500).json({
                ok: false,
                error: "Something on the server didn't work right."
            });
        }

    });
};