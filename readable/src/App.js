import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import DefaultView from './components/DefaultView'
import PostView from './components/PostView'
import './App.css'

class App extends Component {
    render() {
      return (
        <BrowserRouter>
            <div className="app">
                <Switch>
                    <Route path='/' exact component={DefaultView}/>
                    <Route path='/category/:category' component={DefaultView}/>
                    <Route path='/post/category/:category' component={PostView}/>
                </Switch>
            </div>
        </BrowserRouter>
      )
    }
}

export default App;