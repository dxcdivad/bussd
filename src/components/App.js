import React, { Component } from 'react';
import axios from 'axios';
import http from '../../node_modules/axios/lib/adapters/http';
import '../App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      response: 'default'
    };
  }

  componentDidMount() {
    this.callApi();
  }

  callApi = async () => {
    const config = {
      adapter: http,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };

    axios.all([axios.get('/api/vehicles/', config), axios.get('/api/stops/', config)]).then(
      axios.spread((vehiclesRes, stopsRes) => {
        const responseBody = {
          vehicles: vehiclesRes.data,
          stops: stopsRes.data
        };
        this.setState({
          response: responseBody
        });
      })
    );
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bussd</h1>
        </header>
        <p className="App-intro">This is bussd.</p>
        <p />
      </div>
    );
  }
}

export default App;
