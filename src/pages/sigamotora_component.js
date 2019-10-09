import React,  { Component } from "react";

import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";


console.disableYellowBox = true;

export default class sigaMotora extends Component{

  

  static navigationOptions = {
    title: "Dados Motorista",
    headerStyle: {
      backgroundColor: '#3CB371',
      
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      alignItems: "center",
    },
   };


   constructor(props) {
    super(props);
   state = {

    //userData: [],
    //productInfo: {},
    docs: [],
    teste: "teste",
    //page: 1,
    }
  }


componentDidMount(){
   // this.loadProducts();
  // this.loadDataUserSiga();
  //this.getMotorasSiga();
}

render(){
  return(

<View
        style={{
          flexDirection: 'row',
          height: 160,
          padding: 20,
          backgroundColor: "#FFF",
          borderWidth: 3,
          borderColor: "#DDD",
          borderRadius: 5,
          marginBottom: 20
        }}>
        <View style={{ flex: 0.3}} >

    


        <Image
          style={{width: 75, height: 75}}
        
          source={{uri: this.props.navigation.state.params.user.image }}/> 
        </View>

        <View style={{ flex: 0.9}} >
<Text style={styles.productTitle}>{this.props.navigation.state.params.user.name}</Text>

        <Text style={styles.productTitle}>{this.props.navigation.state.params.user.management_unity}</Text>
        </View>
       
        
      </View>

    );
      }
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
      },
      inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
      },
      inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
      },
      inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
      },
      logoSiga: {
        width: 200,
        height: 200,
        marginLeft: 15,
        justifyContent: 'center'
      },
      buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
      },
      loginButton: {
        backgroundColor: "#3CB371",
      },
      loginText: {
        color: 'white',
      }
    });



























