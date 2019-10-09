import React, { Component, Fragment } from "react";
import { View, Image, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import Callout from './Callout';

//Carrega uma popup com os apps de mobilidade
import { Popup } from 'react-native-map-link';


import api from '../../../../../services/api';

const GOOGLE_MAPS_APIKEY = 'AIzaSyDB-VSgoMuroyQHGlPnIV3FfI3vP1iAkWE';

import Geolocation from 'react-native-geolocation-service';

import { getPixelSize } from "../../utils";

import Search from "../Search";
import Directions from "../Directions";
import Details from "../Details";

import markerImage from "../../assets/marker.png";
import backImage from "../../assets/back.png"; 

import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons'; 
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5'; IconMaterialIcons
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  Back,
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall
} from "./styles";

import BottomNavigation, {
  FullTab
} from 'react-native-material-bottom-navigation';

Geocoder.init("AIzaSyDB-VSgoMuroyQHGlPnIV3FfI3vP1iAkWE");

console.disableYellowBox = true;

export default class Map extends Component {




  state = {
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0491,
      longitudeDelta: 0.0375,
    },
    destination: { latitude: 0, longitude: 0 },
    duration: null,
    location: null,
    //testes com marcadores
    showGoodOnly: "all",
    markers: [],
    dados: [],
  };





  //Método que solicta a corrida no Siga

  create_run = async () => {



    origin_lat = this.state.region.latitude;
    origin_lng = this.state.region.longitude;
    origin_address = this.state.region.title;
    run_type = 'run';
    request_reason_id = 2;

    destination_lat = this.state.destination.latitude;
    destination_lng = this.state.destination.longitude;
    destination_address = this.state.destination.title;

    const response = await api.post("/runs/user_create?run[origin_lat]=" + origin_lat + "&run[origin_lng]=" + origin_lng + "&run[origin_address]=" + origin_address +
      "&run[run_type]=" + run_type + "&run[request_reason_id]=" + request_reason_id + "&run[destination_lat]=" + destination_lat + "&run[destination_lng]=" + destination_lng + "&run[destination_address]=" + destination_address)
      .then(response => console.log("Response: " + response.data))
      .catch(error => console.log("Deu ruim!!" + error.data));


  }


  async componentDidMount() {
    this.getMarker();

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






  }

  handleLocationSelected = (data, { geometry }) => {
    const {
      location: { lat: latitude, lng: longitude }
    } = geometry;
    //zerando os pontos;
  var pontos = [];
    this.setState({
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text
      },
      markers: pontos
    });

    console.log(this.state.region);

    // console.log(this.state.destination);
    // this.create_run();
  };

  handleBack = () => {
    this.setState({ destination: null , markers: this.state.dados });

  };




  ///Testes marcadores


  getMarker = async () => {


    const response = await api.get("http://holandaempresarial.com/js/data.json")
      .then(response => this.carregaMarkers(response))
      .catch(error => console.log(error));

  }


  carregaMarkers = (response) => {
    console.log(response.data);


    console.log(response.data.markers);

    this.setState({ dados: response.data.markers, markers: response.data.markers });

    // this.state.markers.forEach(this.imprimir);
  }


//Método que carrega os marcadores a partir da API. 
  componentWillMount() {
    // this.loadProducts();
    // this.loadDataUserSiga();
    this.getMarker();

  }


  //método que seta o destino
setdestination= (ponto,  index) =>{

  //var ponto_busca = this.state.markers[index];
  var ponto_busca = [];
  ponto_busca[0] = ponto;
  
  
  //console.log("Ponto escolhido=> "+ponto_busca[0].coordinate[0]);


  this.setState({
    destination: {
      latitude: ponto.coordinate[0],
      longitude: ponto.coordinate[1],
      title: ponto.name
    },
    markers: ponto_busca
  });
  

}



renderIcon = icon => ({ isActive }) => (
  <Icon size={24} color="white" name={icon} />
)

renderTab = ({ tab, isActive }) => (
  <FullTab
    isActive={isActive}
    key={tab.key}
    label={tab.label}
    renderIcon={this.renderIcon(tab.icon)}
  />
)

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

 {/*  teste marcadores */}
 {this.state.markers.map((character, index) =>
                // If showGoodOnly is true, but the character is bad - do not show it

                <MapView.Marker
                  coordinate={{
                    latitude: character.coordinate[0],
                    longitude: character.coordinate[1],
                  }}
                  // Callout offset
                  calloutOffset={{ x: -8, y: 28 }}
                  // Greed color for good characters and red for others
                  pinColor={character.good}
                  key={index}
                  onCalloutPress={() => this.setdestination(character, index)}
                >

                  {/* Callout */}
                  <MapView.Callout tooltip style={styles.callout}>

                    <Callout
                      name={character.name}
                      image={character.image}
                    />

                  </MapView.Callout>
                </MapView.Marker>




              )}

            {/* Fim teste marcadores */}


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
            <Details destination={this.state.destination} />
          </Fragment>
        ) : (
            <Search onLocationSelected={this.handleLocationSelected} />
          )}

<ActionButton buttonColor="rgba(231,76,60,1)" >
          <ActionButton.Item buttonColor='#9b59b6'  title="Baladas&Shows" onPress={() => console.log("notes tapped!")}>
            <Icon name="md-musical-notes" style={styles.actionButtonIcon}  />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Gastronomia" onPress={() => {}}>
            <Icon name="ios-restaurant" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="Cultura&Lazer" onPress={() => {}}>
            <IconFontAwesome5 name="theater-masks" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="Promoções" onPress={() => {}}>
            <IconFontAwesome name="money" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="Parques" onPress={() => {}}>
            <IconMaterialIcons name="nature-people" style={styles.actionButtonIcon} /> 
          </ActionButton.Item>
          

        </ActionButton>




      </View>
    );
  }
}



const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  container: {
    flex: 1,                            // Take up the whole screen
    justifyContent: 'flex-end',         // Arrange button at the bottom
    alignItems: 'flex-start',               // Center button horizontally
  },
  callout: {
      width: 140,
    },
  map: {
      
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    marginVertical: 10, 
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
    padding: 12,
    width: 100,
  },
});
