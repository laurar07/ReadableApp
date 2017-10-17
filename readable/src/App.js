import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import DefaultView from './components/DefaultView'
import PostView from './components/PostView'
import PostDetailView from './components/PostDetailView'
import './App.css'

class App extends Component {
    render() {
      return (
        <BrowserRouter>
            <div className="app">
                <Switch>
                    <Route path='/post/category/:category' component={PostView}/>
                    <Route path='/post/:id' component={PostView}/>
                    <Route path='/' exact component={DefaultView}/>
                    <Route path='/category/:category' component={DefaultView}/>
                    <Route path='/category' component={DefaultView}/>
                    <Route path='/detail/:id' component={PostDetailView}/>
                </Switch>
            </div>
        </BrowserRouter>
      )
    }
}

export default App;