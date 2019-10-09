import React from "react";
import MapViewDirections from "react-native-maps-directions";

const Directions = ({ destination, origin, onReady }) => (
  <MapViewDirections
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey="AIzaSyDB-VSgoMuroyQHGlPnIV3FfI3vP1iAkWE"
    strokeWidth={3}
    strokeColor="#222"
  />
);

export default Directions;
