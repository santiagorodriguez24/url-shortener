import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import {
    Card, Row, Col,
    InputGroup, InputGroupAddon, Input, Button,
    Alert
} from 'reactstrap';
import { shrinkUrl } from '../apiServices/ApiUrlShortener';
import socketIOClient from "socket.io-client";
import { FaGreaterThanEqual } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import TopFive from '../components/TopFive';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            originalUrl: '',
            last3UrlCodes: [],
            error: '',
            showError: false,
            topFiveError: '',
            showTopFiveError: false,
            topFive: []
        }

        this.showCopyButton = false;
        navigator.permissions.query({ name: "clipboard-write" }).then(result => {
            if (result.state == "granted" || result.state == "prompt") {
                console.log('copy is enable');
                this.showCopyButton = true;
            }
        });
    }

    componentDidMount() {
        console.log('__dirname:  ', process.env.NODE_ENV);

        const socket = socketIOClient('http://localhost:3001');

        socket.on('topFive', response => {

            if (response.ok) {
                this.setState({
                    topFive: response.data,
                    topFiveError: '',
                    showTopFiveError: false
                });
            }
            else {
                this.setState({
                    topFive: [],
                    topFiveError: response.error,
                    showTopFiveError: true
                });
            }
        });
    }

    onChangeInput = e => {
        this.setState({
            originalUrl: e.target.value
        });
    }

    onShrink = () => {
        const { originalUrl } = this.state;

        if (originalUrl) {
            shrinkUrl({
                originalUrl: originalUrl
            })
                .then(result => {
                    const urlCode = result.data.urlCode;
                    const { last3UrlCodes } = this.state;

                    let alreadyExist = last3UrlCodes.find(code => code === urlCode);

                    if (!alreadyExist) {
                        last3UrlCodes.unshift(urlCode);
                    }

                    if (last3UrlCodes.length > 3) {
                        last3UrlCodes.splice(-1, 1);
                    }

                    this.setState({
                        last3UrlCodes,
                        originalUrl: '',
                        error: '',
                        showError: false
                    });

                }).catch(error => {

                    this.setState({
                        error,
                        showError: true
                    });

                });
        } else {
            this.setState({
                error: 'You must enter a URL.',
                showError: true
            });
        }

    }

    onCopyToClipboard = (shortUrl) => {
        navigator.clipboard.writeText(shortUrl).then(function () {
            console.log('Copied');
        }, function () {
            console.log('Copy Error');
        });
    }

    onDismissUrlCode = index => {
        const { last3UrlCodes } = this.state;

        last3UrlCodes.splice(index, 1);

        this.setState({
            last3UrlCodes
        });
    }

    onDismissError = () => {
        this.setState({
            error: '',
            showError: false
        });
    }

    render() {
        const { originalUrl, last3UrlCodes, error, showError, topFive, topFiveError, showTopFiveError } = this.state;

        return (
            <main className="page">
                <Card className='card-container'>
                    <div className="image-background" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/images/background.jpg'})` }}>
                        <Row>
                            <Col md="3" sm="12" className='col-logo'>
                                <div className="logo" >
                                    <FiLink size={"35%"} />
                                </div>

                            </Col>
                            <Col md="6" sm="12" className='col-title-input'>
                                <h1 className='title'>Shrink your link!</h1>
                                <h6 className='subtitle'>A long URL is always a problem. It's hard to remember and share.</h6>
                                <InputGroup>
                                    <Input
                                        placeholder='Paste the link to shrink it'
                                        onChange={e => this.onChangeInput(e)}
                                        value={originalUrl}
                                    />
                                    <InputGroupAddon addonType="prepend">

                                        <Button
                                            color="" // override default value = secondary 
                                            className='shrink-button'
                                            onClick={() => this.onShrink()}
                                        >
                                            <FaGreaterThanEqual />&nbsp;&nbsp;
                      {'SHRINK'}
                                        </Button>
                                    </InputGroupAddon>
                                </InputGroup>
                                {
                                    isEmpty(last3UrlCodes) ?
                                        null
                                        :
                                        last3UrlCodes.map((urlCode, index) =>
                                            <Alert
                                                key={`url-code-${index}`}
                                                color="secondary"
                                                className='result-alert'
                                                isOpen={true}
                                                toggle={() => this.onDismissUrlCode(index)}
                                            >
                                                <a className="alert-link" target="_blank" rel="noopener noreferrer" href={`shorturl/${urlCode}`}>
                                                    {`${window.location.origin}/shorturl/${urlCode}`}
                                                </a>
                                                <Button
                                                    onClick={() => this.onCopyToClipboard(`${window.location.origin}/shorturl/${urlCode}`)}
                                                >
                                                    {'Copy'}
                                                </Button>
                                            </Alert>
                                        )
                                }

                                <Alert color="danger" className='result-alert' isOpen={showError} toggle={() => this.onDismissError()}>
                                    {error}
                                </Alert>
                            </Col>
                            <Col md={3} sm={12} className='col-logo'>
                            </Col>
                        </Row>
                    </div>

                    <TopFive
                        topFive={topFive}
                        topFiveError={topFiveError}
                        showTopFiveError={showTopFiveError}
                    />

                </Card>
            </main>
        );
    }

}

export default Home;