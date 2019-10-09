import React, { Component, Fragment } from 'react';
import {
  StyleSheet,         // CSS-like styles
  Text,               // Renders text
  TouchableOpacity,   // Pressable container
  View,
  Picker                // Container component
} from 'react-native';
import MapView from 'react-native-maps';
// Import data
//import { characters } from 'http://holandaempresarial.com/js/data.js';
//import { characters } from './data';
//import { categorias } from './cathttp://holandaempresarial.com/js/data.js';
import Callout from './Callout';
import api from '../../services/api';
import Geocoder from "react-native-geocoding";
import Geolocation from 'react-native-geolocation-service';

const GOOGLE_MAPS_APIKEY = 'AIzaSyDB-VSgoMuroyQHGlPnIV3FfI3vP1iAkWE';

import MapViewDirections from 'react-native-maps-directions';

import { getPixelSize } from "./utils";

//import Search from "../Search";
import Directions from "./Directions";
import Details from "./Details";

import markerImage from "./assets/marker.png";
import backImage from "./assets/back.png";

import {
  Back,
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall
} from "./Map/styles";

Geocoder.init("AIzaSyDB-VSgoMuroyQHGlPnIV3FfI3vP1iAkWE");



export default class CalloutMap extends Component {

  static navigationOptions = {
    title: "Rolêzim by Budmol",
    headerStyle: {
      backgroundColor: '#3CB371',
      
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      alignItems: "center",
    },

  }; 



    state = {
      // Show good or all characters flag
      showGoodOnly: "all",
      markers:   [],
      dados: [],
      region:  {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0491,
        longitudeDelta: 0.0375,
      },
      destination: { latitude: -16.716133, longitude: -49.261010 },
      duration: null,
      location: null

    }
  

   //Pega a localização do usuário!!

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

  }

//método que seta o destino
setdestination= (valor) =>{
  
  console.log(valor[0]);
  //this.setState({
  //  destination: {
   //   latitude: valor[0],
   //   longitude: valor[1],
     
   // }
  //});
  

}


   verificaButton = (valor) =>{
     var pontos = this.state.dados;
     var v2 = valor;
     var makers = [];
  //console.log(valor);
  this.setState({showGoodOnly: valor});
  //console.log("Valor definido=>"+this.state.showGoodOnly);
  //valor = null;
  //console.log("Valor definido=>"+this.state.showGoodOnly);
   //characters.forEach(this.imprimir);
   console.log("Pontos=> "+pontos.length);

if(valor === "all"){
  console.log("Todos os pontos!!");
  this.setState({markers: this.state.dados});
}else{


   pontos.forEach(element => {
    
    //console.log("Valor definido=> "+element.cat);
    if(element.cat == valor){
      console.log("Elemento => "+element.cat);
    makers.push(element);
    }
   });
  console.log("Nova demanda!! ");
   makers.forEach(element => {
    //console.log("Valor definido=> "+valor);
    console.log("Maker Valor definido=> "+element.cat);
    
   });


  this.setState({markers: makers});
  console.log("Valor definido=> "+this.state.markers.length);
  //this.state.markers.forEach(element => {
    //console.log("Valor definido=> "+valor);
   // console.log("Final=> "+element.name);
    
  // });
   
}
      
    }

    imprimir = (item, indice) => {
      console.log("Valor =>"+this.state.showGoodOnly);
      if(characters[indice].cat === "red"){
        console.log("Valor definido=> "+characters[indice].name);
        
      }
  }

  getMarker = async () => {

   
      const response = await api.get("http://holandaempresarial.com/js/data.json")
        .then(response => this.carregaMarkers(response)) 
        .catch(error => console.log(error));
     
    }


    carregaMarkers = (response) =>{
      console.log(response.data);
      
      
      console.log(response.data.markers);

      this.setState({ dados: response.data.markers, markers: response.data.markers });
    
     // this.state.markers.forEach(this.imprimir);
    }
 


  componentWillMount(){
    // this.loadProducts();
   // this.loadDataUserSiga();
   this.getMarker();
   
 }
    


   

    render() {

      const { region, destination, duration, location } = this.state;
      return (
        <View style={styles.container}>
          {/* Map*/}
          <MapView
            style={styles.map}
            // Position on Manhattan, New York
            region={region}
          showsUserLocation
          loadingEnabled
          >
            
            <MapViewDirections
            origin={this.state.origin}
            destination={this.state.destination}
            apikey={GOOGLE_MAPS_APIKEY}
              />


            {/* Loop through characters and add pins on the map */ }
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
                onCalloutPress={() =>  this.setdestination(character.coordinate)}
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


            
          </MapView>


         

          {/* Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              // Toggle this.state.showGoodOnly
              onPress={() => this.verificaButton('blue')
              }
            >
              <Text>Azuis </Text>
            </TouchableOpacity>

           


          </View> 
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              // Toggle this.state.showGoodOnly
              onPress={() => this.verificaButton('red')}
            >
              <Text>Vermelhos </Text>
            </TouchableOpacity>

          </View> 

          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              // Toggle this.state.showGoodOnly
              onPress={() => this.verificaButton('green')}
            >
              <Text>Verde</Text>
            </TouchableOpacity>

          </View> 

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              // Toggle this.state.showGoodOnly
              onPress={() => this.verificaButton('all')}
            >
              <Text>Todos </Text>
            </TouchableOpacity>

          </View>

        </View>
      );
    }
  }


  const styles = StyleSheet.create({
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