import React, { Component } from 'react'
import ReactDOM from 'react-dom/client';

export default class App extends Component {
  render() {
    return (
      <div>App</div>
    )
  }
}

const app = ReactDOM.createRoot(document.getElementById('root'));
app.render(<App/>);

