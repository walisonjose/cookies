import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import api from '../services/api';

import MapView, { AnimatedRegion, Callout } from 'react-native-maps'

export default class Map extends Component {

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

  


componentWillMount(){
  this.localizaMotoraSiga();
}


 

  localizaMotoraSiga = async () => {
    const response = await api.post('/admin/drivers/self')
      .then(function (response) {
        console.log(response.data);
        // this.setState({ docs: response.data.status });
      });
    //const  docs  = response.data;
    //console.log(response.data);




    //this.setState({ docs: docs });

  };


  render() {
    return (
 
      <View style={styles.container}>
  
        <Text>Teste!!</Text>

      </View> 





    );
  }
}

const styles = StyleSheet.create({
  
  container: {
  
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

  },

  map: {

    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

  },

});