import React from 'react';

export default class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: new Date()
    };
    this.tick = this.tick.bind(this)
  }


  componentDidMount() {
    this.intervalID = setInterval(this.tick, 1000)
  }

  tick() {
    this.setState({time: new Date()})
  }

  componentWillMount(){
    
  }
  

  render() {
    return(
      <h1>CLOCKIN AROUND</h1>
    );
  }
};