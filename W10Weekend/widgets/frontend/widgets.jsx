import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './clock';

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  ReactDOM.render(<Root/>, document.getElementById('main'));
});

function Root() {
  return(
    <div>
      HEYO
      <Clock />
    </div>
  )
}