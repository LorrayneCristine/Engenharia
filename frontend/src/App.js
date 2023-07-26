import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
      fetch("http://localhost:9000/testAPI")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
      this.callAPI();
  }
  render(){
    return(
      <div className='App'>
        <header className='App-Header'>
          <img src={logo} className='App-logo' alt='logo'></img>
          <h1 className='App-title'>Welcome to React</h1>
        </header>
        <p className='App-intro'>{this.state.apiResponse}</p>
      </div>
    )
  }

}

export default App;
