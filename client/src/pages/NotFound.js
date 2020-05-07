import React, { Component } from 'react';

class NotFound extends Component {
    render() {
        return (
            <div className="notfound-container">

                <div className="notfound-row">
                    <h1>404 - This is not the web page you are looking for.</h1>
                </div>

                <div className="notfound-row scissors">
                    <img
                        src={process.env.PUBLIC_URL + '/images/url.png'}
                        alt="url-icon"
                        width="244"
                        sizes="(max-width: 479px) 79vw, 244px"
                    />
                </div>

                <div className="notfound-row">
                    <a class="btn btn-secondary" href="/">Home Page</a>
                </div>

            </div>
        );
    }
}

export default NotFound;