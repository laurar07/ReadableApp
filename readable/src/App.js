import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import DefaultView from './components/DefaultView'
import PostView from './components/PostView'
import PostDetailView from './components/PostDetailView'
import InvalidRouteView from './components/InvalidRouteView'
import './App.css'

class App extends Component {
    render() {
      return (
        <BrowserRouter>
            <div className="app">
                <Switch>
                    <Route path='/' exact component={DefaultView}/>
                    <Route path='/post/:id' exact component={PostView}/>
                    <Route path='/post' exact component={PostView}/>
                    <Route path='/:category/:id' exact component={PostDetailView}/>
                    <Route path='/:category' exact component={DefaultView}/>
                    <Route component={InvalidRouteView}/>
                </Switch>
            </div>
        </BrowserRouter>
      )
    }
}

export default App;