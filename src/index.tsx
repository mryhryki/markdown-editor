import * as React from 'react'
import { render } from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { Editor } from './pages/editor'
import { History } from './pages/history'

const GlobalStyle = createGlobalStyle`
  body * {
    box-sizing: border-box;
  }
`

const Main = (
  <>
    <GlobalStyle />
    <Router>
      <Switch>
        <Route exact path="/editor">
          <Editor />
        </Route>
        <Route exact path="/history">
          <History />
        </Route>
        <Redirect to="/editor" path="*" />
      </Switch>
    </Router>
  </>
)

render(Main, document.getElementById('app'))
