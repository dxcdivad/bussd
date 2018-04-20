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
      response: 'default',
      vehicles: ''
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

  getVehicleData() {
    const config = { adapter: http, headers: { 'Access-Control-Allow-Origin': '*' } };
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const remoteUrl =
      'https://realtime.sdmts.com/api/api/gtfs_realtime/vehicle-positions-for-agency/MTS.pbtext?key=ac6279cf-c99b-4e09-8434-5ab4c019479c';

    axios.get(proxyUrl + remoteUrl, config).then(res => {
      const parsedRes = JSON.stringify(res.data);
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
              <Map />
            </MapContainer>
            <button onClick={this.getVehicleData}>Get Vehicle Data</button>
          </BodyContainer>
        </AppBody>
      </div>
    );
  }
}

export default App;
