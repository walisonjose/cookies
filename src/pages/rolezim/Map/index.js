import React, { Component, Fragment } from "react";
import { View, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geocoder from "react-native-geocoding";

import api from '../../../../../services/api';

const GOOGLE_MAPS_APIKEY = 'AIzaSyDB-VSgoMuroyQHGlPnIV3FfI3vP1iAkWE'; 

import Geolocation from 'react-native-geolocation-service';

import { getPixelSize } from "../../utils";

import Search from "../Search";
import Directions from "../Directions";
import Details from "../Details";

import markerImage from "../../assets/marker.png";
import backImage from "../../assets/back.png";

import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  Back,
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall
} from "./styles";

Geocoder.init("AIzaSyDB-VSgoMuroyQHGlPnIV3FfI3vP1iAkWE");

console.disableYellowBox = true;

export default class Map extends Component {

  



  state = {
    region:  {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0491,
      longitudeDelta: 0.0375,
    },
    destination: { latitude: 0, longitude: 0 },
    duration: null,
    location: null
  };

 



//Método que solicta a corrida no Siga

create_run = async () =>{
  
  

  origin_lat = this.state.region.latitude;
      origin_lng = this.state.region.longitude;
      origin_address = this.state.region.title;
      run_type = 'run' ;
      request_reason_id = 2;
      
      destination_lat = this.state.destination.latitude;
      destination_lng = this.state.destination.longitude;
      destination_address = this.state.destination.title;

      const response = await api.post("/runs/user_create?run[origin_lat]=" + origin_lat + "&run[origin_lng]="+origin_lng+"&run[origin_address]="+origin_address+
      "&run[run_type]="+run_type+"&run[request_reason_id]="+request_reason_id+"&run[destination_lat]="+destination_lat+"&run[destination_lng]="+destination_lng+"&run[destination_address]="+destination_address)
        .then(response => console.log("Response: "+response.data))
        .catch(error => console.log("Deu ruim!!"+error.data));
      

} 


  async componentDidMount() {

    Geolocation.getCurrentPosition(
      (position) => {
          let newOrigin = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              title: position.coords.title,
              latitudeDelta: 0.0491,
              longitudeDelta: 0.0375
          };
         
  


          Geocoder.from(newOrigin.latitude, newOrigin.longitude)
          .then(json => {
              var addressComponent = json.results[0].address_components[0];
              console.log(addressComponent["long_name"]);
              
             newOrigin.title = addressComponent["long_name"];
          })
          .catch(error => console.warn(error));

          console.log('new origin');
          console.log(newOrigin);
  
          this.setState({
              region: newOrigin, 
              destination: null
          });
      },
      (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 }
  );


   /* navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        const response = await Geocoder.from({ latitude, longitude });
        const address = response.results[0].formatted_address;
        const location = address.substring(0, address.indexOf(","));

        this.setState({
          location,
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134
          }
        });
      }, //sucesso
      () => {}, //erro
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000
      }
    ); */



  }

  handleLocationSelected = (data, { geometry }) => {
    const {
      location: { lat: latitude, lng: longitude }
    } = geometry;

    this.setState({
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text
      }
    });

    console.log(this.state.region);

   // console.log(this.state.destination);
   // this.create_run();
  };

  handleBack = () => {
    this.setState({ destination: null });
  };

  render() {
    const { region, destination, duration, location } = this.state;
  
    return (
      <View style={{ flex: 1 }}>
        

        <MapView
          style={{ flex: 1 }}
          region={region}
          showsUserLocation
          loadingEnabled
          ref={el => (this.mapView = el)}
        >
          {destination && (




            <Fragment>
              <Directions
                origin={region}
                destination={destination}
                onReady={result => {
                  this.setState({ duration: Math.floor(result.duration) });

                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: getPixelSize(50),
                      left: getPixelSize(50),
                      top: getPixelSize(50),
                      bottom: getPixelSize(350)
                    }
                  });
                }}
              />
              <Marker
                coordinate={destination}
                anchor={{ x: 0, y: 0 }}
                image={markerImage}
              >
                <LocationBox>
                  <LocationText>{destination.title}</LocationText>
                </LocationBox>
              </Marker>

              <Marker coordinate={region} anchor={{ x: 0, y: 0 }}>
                <LocationBox>
                  <LocationTimeBox>
                    <LocationTimeText>{duration}</LocationTimeText>
                    <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                  </LocationTimeBox>
                  <LocationText>{location}</LocationText>
                </LocationBox>
              </Marker>
            </Fragment>
          )}
        </MapView>

        {destination ? (
          <Fragment>
            <Back onPress={this.handleBack}>
              <Image source={backImage} />
            </Back>
            <Details />
          </Fragment>
        ) : (
          <Search onLocationSelected={this.handleLocationSelected} />

          

        )}





      </View>
    );
  }
}
