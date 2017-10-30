import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div className="list-posts-title">
                <Link to={`/`}>
                    <h1>Readable</h1>
                </Link>
            </div>
        )
    }
}

export default Header