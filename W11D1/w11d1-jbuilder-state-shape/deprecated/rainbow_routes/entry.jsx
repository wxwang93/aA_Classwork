import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, withRouter } from 'react-router';

import Red from './components/red.jsx';
import Orange from './components/orange.jsx';
import Yellow from './components/yellow.jsx';
import Green from './components/green.jsx';
import Blue from './components/blue.jsx';
import Indigo from './components/indigo.jsx';
import Violet from './components/violet.jsx';
import Black from './components/black.jsx';


class Rainbow extends React.Component {
  constructor() {
    super();
    this.addRed = this.addRed.bind(this);
    this.addGreen = this.addGreen.bind(this);
    this.addBlue = this.addBlue.bind(this);
    this.addViolet = this.addViolet.bind(this);
  }

  render() {
    return(
      <div>
        <h1>Rainbow Router!</h1>

        <h4 onClick={this.addRed}>Red</h4>
        <h4 onClick={this.addGreen}>Green</h4>
        <h4 onClick={this.addBlue}>Blue</h4>
        <h4 onClick={this.addViolet}>Violet</h4>
        <div id="rainbow">
          {this.props.children}
        </div>
      </div>
    );
  }

  addRed() {
    // old way of refering to history
    this.props.history.push('/red');
  }

  addGreen() {
    // one option to refer to history anywhere because hashHistory is singleton
    hashHistory.push('green');
  }

  addBlue() {
    // latest, greatest way in combination with `withRouter` to refer to history
    this.props.router.replace('/blue.jpg');
  }

  addViolet() {
    // using the now documented React Context combined with `contextTypes`
    this.context.router.push('/violet');
  }
};

Rainbow.contextTypes = {
  router: React.PropTypes.object
};

Rainbow = withRouter(Rainbow);

const routes = (
  <Route path="/" component={Rainbow}>
    <Route path="(app-academy-)red" component={Red}>
      <Route path="orange" component={Orange}/>
      <Route path="yellow/:code" component={Yellow}/>
    </Route>
    <Route path="green" component={Green}/>
    <Route path="blue*.*" component={Blue}>
      <Route path="indigo" component={Indigo}/>
    </Route>
    <Route path="violet" component={Violet}/>
    <Route path="/**/black" component={Black}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>,
    document.getElementById('main')
  );
});
