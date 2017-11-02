import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import panda from '../images/panda.jpg'

class Invalid extends Component {
    render() {
        return (
            <div>
                <h2>Oops! We couldn't find the page you requested. Please click to return to <Link to={`/`}>Home.</Link></h2>
                <Link to={'/'}>
                    <img src={panda} alt="Home"/>
                </Link>
            </div>
        )
    }
}

export default Invalid