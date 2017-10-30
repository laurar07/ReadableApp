import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom';
import panda from '../images/panda.jpg'

class InvalidRouteView extends Component {
    render() {
        return (
            <div>
                <Header />
                <h2>Oops! We couldn't find the page you requested. Please click to return to <Link to={`/`}>Home.</Link></h2>
                <Link to={'/'}>
                    <img src={panda} alt="Home"/>
                </Link>
                <Footer />
            </div>
        )
    }
}

export default InvalidRouteView