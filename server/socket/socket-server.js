const { io } = require('../app');
const mongoose = require("mongoose");
const UrlShortener = mongoose.model("UrlShortener");

io.on('connection', (client) => {

    console.log('User has logged in.')

    UrlShortener.find({})
        .limit(5)
        .sort({ hitCount: -1 })
        .exec((error, topFive) => {
            if (error) {
                client.emit('topFive',
                    {
                        ok: false,
                        error: 'Something has not gone as it should.'
                    }
                );
                return;
            }

            client.emit('topFive',
                {
                    ok: true,
                    data: topFive
                }
            );
        }
        );

    client.on('disconnect', () => {
        console.log('User has been disconnected.');
    });

}
);