import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { geolocated } from 'react-geolocated';
import { LoadingContainer } from './Styles';
import { GeoLocation } from 'react-geolocation';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';

class Map extends Component {
  constructor() {
    super();

    this.state = {
      centerLat: '',
      centerLng: ''
    };
    this.stopClickEvent = this.stopClickEvent.bind(this);
  }

  stopClickEvent(stopId, lat, lng) {
    this.props.handleStopClick(stopId);

    this.setState({
      centerLat: lat,
      centerLng: lng
    });
  }

  render() {
    const MapWithAMarker = withScriptjs(
      withGoogleMap(props => {
        <GoogleMap
          options={{ minZoom: 15 }}
          defaultZoom={19}
          defaultCenter={{ lat: this.props.coords.latitude, lng: this.props.coords.longitude }}
          center={{
            lat: this.state.centerLat ? this.state.centerLat : this.props.coords.latitude,
            lng: this.state.centerLng ? this.state.centerLng : this.props.coords.longitude
          }}
          ref={ref => {
            this.map = ref;
          }}
          onIdle={props.onMapIdle}
        >
          <Marker position={{ lat: this.props.coords.latitude, lng: this.props.coords.longitude }} />
          {this.props.vehicles
            ? this.props.vehicles.map(vehicle => {
                const icon = 'https://s3.us-east-2.amazonaws.com/garethbk-portfolio/bus-icon.png';
                const iconRed = 'https://s3.us-east-2.amazonaws.com/garethbk-portfolio/bus-icon-red.png';
                if (vehicle.location !== null && vehicle.tripStatus !== null) {
                  if (vehicle.tripStatus.scheduleDeviation > 0) {
                    return (
                      <Marker position={{ lat: vehicle.location.lat, lng: vehicle.location.lon }} icon={iconRed} />
                    );
                  }
                  return <Marker position={{ lat: vehicle.location.lat, lng: vehicle.location.lon }} icon={icon} />;
                }
              })
            : console.log('no vehicles')}
          <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
            {this.props.stops
              ? this.props.stops.map(stop => {
                  const stopIcon = 'https://s3.us-east-2.amazonaws.com/garethbk-portfolio/bus-stop-icon.png';
                  return (
                    <Marker
                      key={stop.stopId}
                      position={{ lat: stop.stopLat, lng: stop.stopLon }}
                      icon={stopIcon}
                      onClick={() => this.stopClickEvent(stop.stopId, stop.stopLat, stop.stopLon)}
                    />
                  );
                })
              : console.log('no stops')}
          </MarkerClusterer>
        </GoogleMap>;
      })
    );
    {
    }

    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <LoadingContainer>
        <h1>Geolocation is taking its time...</h1>
        <div className="lds-css ng-scope" style={{ width: '200px', height: '200px' }}>
          <div className="lds-spinner" style={{ width: '100%', height: '100%' }}>
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      </LoadingContainer>
    ) : this.props.coords ? (
      <div>
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCXdLMabpElbXEYvWy9yZSj9VRf0dpFMmo&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div id="map-container" style={{ height: '80vh', width: 'auto', overflow: 'hidden' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    ) : (
      <LoadingContainer>
        <h1>
          <em>Bussd</em>
        </h1>
        <div className="lds-css ng-scope" style={{ width: '200px', height: '200px' }}>
          <div className="lds-spinner" style={{ width: '100%', height: '100%' }}>
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      </LoadingContainer>
    );
  }
}
export default geolocated({
  positionOptions: {
    enableHighAccuracy: true
  },
  userDecisionTimeout: 5000
})(Map);
