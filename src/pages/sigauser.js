import React, { Component } from 'react';
import { View, StatusBar, Text, TextInput, Button, TouchableHighlight, ImageBackground, ActivityIndicator, StyleSheet, Image, Alert } from 'react-native';
//import { Actions } from 'react-native-router-flux';
//import { connect } from 'react-redux';
//import { modificaEmail, modificaSenha, autenticarUsuario } from '../actions/AutenticacaoActions';
import api from '../services/api';
import { Actions } from 'react-native-router-flux';


import CookieManager from 'react-native-cookies';

class sigaUser extends Component {


  constructor(props) {
    super(props);
    state = {
      email: 'email',
      password: 'password',
    }
  }

  
  

 
  static navigationOptions = {
    title: "Meu Perfil",
    headerStyle: {
      backgroundColor: '#3CB371',
      
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      alignItems: "center",
    },

  }; 

  






  getCookies = (response) => {
    console.log(response);
    //this.clearCookies();
   // console.log('Cookie Siga =>', response._Siga_session); // => 'user_session=abcdefg; path=/;'
    this.props.navigation.navigate("Main");

  }

  getAllCookies = (response) => {
    CookieManager.getAll()
      .then((res) => {
        console.log(response);
        console.log('CookieManager.getAll =>', response.request.responseHeaders._Siga_session);
      });
  }

  clearCookies = () => {

    CookieManager.clearAll()
      .then((res) => {
        console.log('CookieManager.clearAll =>', res);
      });
  }
  renderBtnAcessar() {

    if (this.props.loading_login) {
      return (
        <ActivityIndicator size="large" />
      )
    }
    return (
      <Button title="Acessar" color='#115E54' onPress={() => this._autenticarUsuario()} />
    )
  }



  showAlertErro = (error) => {

    

    Alert.alert(
      'Ops!',
      'Algo deu errado! Verifique os seus dados!',
      [
        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        { text: 'Entendi', onPress: () => console.log(error) },
      ],
      { cancelable: false }
    )
  }




  showAlertSucess = (response) => {

   
    Alert.alert(
      'Tudo certo!',
      'Registro realizado!!',
      [
        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {
          text: 'Entendi', onPress: () =>
            this.getCookies(response)
            
        },

      ],
      { cancelable: false }
    )
  }

  logarUser = async () => {

   

    if (this.state.email) {
      const url1 = "/users/sign_in.json?user[login]=";
      const url2 = "&user[password]=";


      const response = await api.post(url1 + this.state.email + url2 + this.state.password)
        .then(response => this.showAlertSucess(response))
        .catch(error => this.showAlertErro(error));
    } else {


      console.log("Deu ruim!!");
      this.showAlertErro("");


    }

  };



  render() {
    return (


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
        
          source={{uri: this.props.navigation.state.params.user.profile_picture }}/> 
        </View>

        <View style={{ flex: 0.9}} >
<Text style={styles.productTitle}>{this.props.navigation.state.params.user.name}</Text>

        <Text style={styles.productTitle}>{this.props.navigation.state.params.user.management_unity}</Text>
        </View>
       
        
      </View>

    );
  }
}

export default sigaUser;

/*
const mapStateToProps = state => (
    {
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroLogin: state.AutenticacaoReducer.erroLogin,
        loading_login: state.AutenticacaoReducer.loading_login
    }
)

export default connect(mapStateToProps, { modificaEmail, modificaSenha, autenticarUsuario })(formLogin); */

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