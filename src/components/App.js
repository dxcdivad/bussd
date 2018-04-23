import React, { Component } from 'react';
import axios from 'axios';
import http from '../../node_modules/axios/lib/adapters/http';

import '../App.css';

// import '../App.css';
import Map from './Map.js';
import Styles from './Styles.js';
import { H1, H2, AppHeader, AppBody, MapContainer, BodyContainer } from './Styles.js';
class App extends Component {
  constructor() {
    super();

    this.state = {
      response: {},
      vehicles: []
    };

    this.getVehicleData = this.getVehicleData.bind(this);
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

    axios
      .all([
        axios.get('/api/routes/', config),
        //axios.get('/api/stop-times/', config),
        axios.get('/api/stops/', config)
        //axios.get('/api/trips/', config)
      ])
      .then(
        axios.spread((routesRes, stopsRes) => {
          console.log(routesRes, stopsRes);
          const responseBody = {
            routes: routesRes.data,
            stops: stopsRes.data
          };
          this.setState({
            response: responseBody
          });
        })
      );
  };

  getVehicleData() {
    const config = { adapter: http, headers: { 'Access-Control-Allow-Origin': '*' } };
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const remoteUrl =
      'https://realtime.sdmts.com/api/api/where/vehicles-for-agency/MTS.json?key=ac6279cf-c99b-4e09-8434-5ab4c019479c';

    axios.get(proxyUrl + remoteUrl, config).then(res => {
      const parsedRes = res.data.data.list;
      console.log(parsedRes);
      //parsedRes = JSON.parse(parsedRes);
      this.setState({ vehicles: parsedRes });
    });
  }

  render() {
    return (
      <div className="App">
        <AppHeader>
          <H2>
            <h1 className="App-title">Bussd</h1>
          </H2>
        </AppHeader>

        <AppBody>
          <BodyContainer>
            <MapContainer>
              <Map vehicles={this.state.vehicles} />
              <button onClick={this.getVehicleData}>Get Vehicle Data</button>
            </MapContainer>
          </BodyContainer>
        </AppBody>
      </div>
    );
  }
}

export default App;
