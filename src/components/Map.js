import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { geolocated } from 'react-geolocated';
import { GeoLocation } from 'react-geolocation';

class Map extends Component {
  render() {

    const MapWithAMarker = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          defaultZoom={16}
          defaultCenter={{ lat: this.props.coords.latitude, lng: this.props.coords.longitude }}
          ref={props.onMapLoad}
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
          {this.props.stops
            ? this.props.stops.map(stop => {
                const stopIcon = 'https://s3.us-east-2.amazonaws.com/garethbk-portfolio/bus-stop-icon.png';
                return <Marker position={{ lat: stop.stopLat, lng: stop.stopLon }} icon={stopIcon} />;
              })
            : console.log('no stops')}
        </GoogleMap>
      ))
    );
    {
    }

    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
      <div>
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCXdLMabpElbXEYvWy9yZSj9VRf0dpFMmo&v=3.exp&libraries=geometry,drawing,places"
          // onMapIdle={ ()=> { console.log('map is ready') } }
          onMapIdle={(googleMap) => {
            console.log(googleMap.getBounds())
        }}
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={<div id="map-container" style={{ height: '80vh', width: 'auto', overflow: 'hidden' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    ) : (
      <div>Getting the location data&hellip; </div>
    );
  }
}
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(Map);
