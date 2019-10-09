import React, { Component } from 'react';
import {
  StyleSheet,         // CSS-like styles
  Text,               // Renders text
  TouchableOpacity,   // Pressable container
  View                // Container component
} from 'react-native';
import MapView from 'react-native-maps';
// Import data
import { characters } from './data_apa';
import Callout from '../test_map/Callout';


export default class CalloutMap extends Component {

  static navigationOptions = {
    title: "Mapa Motoristas",
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
      showGoodOnly: false,
    
    }
  

    

    render() {
      return (
        <View style={styles.container}>
          {/* Map*/}
          <MapView
            style={styles.map}
            // Position on Manhattan, New York
            initialRegion={{
              latitude: -16.8190311,
      longitude: -49.2575535,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
            }}
          >
            {/* Loop through characters and add pins on the map */}
            {characters.map((character, index) =>
              // If showGoodOnly is true, but the character is bad - do not show it
              this.state.showGoodOnly && !character.good || <MapView.Marker
                coordinate={{
                  latitude: character.coordinate[0],
                  longitude: character.coordinate[1],
                }}
                // Callout offset
              calloutOffset={{ x: -8, y: 28 }}
                // Greed color for good characters and red for others
                pinColor={character.good ? '#009688' : '#f44336'}
                key={index}
                onCalloutPress={() => { this.props.navigation.navigate("sigaMotora", { user: character } );}}
              >
                  {/* Callout */}
              <MapView.Callout tooltip style={styles.callout} >
              <TouchableOpacity   >
                <Callout
                  name={character.name}
                  image={character.image}
                 
                />
                </TouchableOpacity>
              </MapView.Callout>
            </MapView.Marker>
            )}
          </MapView>
          {/* Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              // Toggle this.state.showGoodOnly
              onPress={() => this.setState({
                showGoodOnly: !this.state.showGoodOnly
              })}
            >
              <Text>{this.state.showGoodOnly ? 'Todos' : 'Disponíveis'}</Text>
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
      alignItems: 'center',               // Center button horizontally
    },
    callout: {
        width: 140,
      },
    map: {
        
      ...StyleSheet.absoluteFillObject,
    },
    buttonContainer: {
      marginVertical: 20,
    },
    button: {
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.7)',
      borderRadius: 20,
      padding: 12,
      width: 160,
    },
  });