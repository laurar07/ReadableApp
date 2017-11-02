import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import Invalid from './Invalid'

class InvalidRouteView extends Component {
    render() {
        return (
            <div>
                <Header />
                <Invalid />
                <Footer />
            </div>
        )
    }
}

export default InvalidRouteView