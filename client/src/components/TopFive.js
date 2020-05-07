import React from 'react';
import { isEmpty } from 'lodash';
import { Row, Col, Alert } from 'reactstrap';
import { FaLinkedin } from "react-icons/fa";

const TopFive = ({ topFive, topFiveError, showTopFiveError }) => {

    return (
        <div className='top-five-container'>
            <Row className='top-five-title'>
                <Col xs={12}>
                    <h2>{'Top 5'}</h2>
                </Col>
            </Row>
            <div className='top-five-list'>
                {
                    isEmpty(topFive) ?
                        topFiveError ?
                            <Alert color="light" className='top-five-alert' isOpen={showTopFiveError} >
                                <h5 className="alert-heading">{topFiveError}</h5>
                                <hr />
                                <p className="mb-0">
                                    {'Unable to show Top Five at the moment.'}
                                </p>
                            </Alert>
                            :
                            <Alert color="light" className='top-five-alert' isOpen={isEmpty(topFive)}>
                                <h5 className="alert-heading">{'No Links shortened yet.'}</h5>
                            </Alert>
                        :
                        topFive.map((item, index) => {
                            const { urlCode, hitCount } = item;

                            return (
                                <Row
                                    key={`top-five-${index}`}
                                    className='top-five-item'
                                >
                                    <Col xs={12} className='col-item'>
                                        <a className="link" target="_blank" rel="noopener noreferrer" href={`shorturl/${urlCode}`}>
                                            {`${window.location.origin}/shorturl/${urlCode}`}
                                        </a>
                                        <span>{hitCount}</span>
                                    </Col>
                                </Row>
                            )
                        }
                        )
                }
            </div>
            <Row className='footer-row'>
                <Col className='sign-col'>
                    {'Made with'} &nbsp;
                <img
                        src={process.env.PUBLIC_URL + '/images/heart-emoji.png'}
                        alt="Heart-emoji"
                        className='heart-emoji'
                    />
                &nbsp; {'by SR'}
                </Col>
                <Col className='linkedin-col'>
                    <a target="_blank" rel="noopener noreferrer" href='https://www.linkedin.com/in/santiago-rodriguez-b51aa2119/'>
                        <FaLinkedin
                            className="linkedin-logo"
                            size={28}
                        />
                    </a>
                </Col>
            </Row>
        </div>
    );
};

export default TopFive;