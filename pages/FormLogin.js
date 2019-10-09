import React, { Component } from 'react';
import { View, Text, TextInput, Button, TouchableHighlight, ImageBackground, ActivityIndicator,  StyleSheet, Image, Alert } from 'react-native';
//import { Actions } from 'react-native-router-flux';
//import { connect } from 'react-redux';
//import { modificaEmail, modificaSenha, autenticarUsuario } from '../actions/AutenticacaoActions';
import api from '../services/api';
import RCTNetworking from 'RCTNetworking';

import CookieManager from 'react-native-cookies';

class formLogin extends Component {


    constructor(props) {
        super(props);
        state = {
          email   : '',
          password: '',
        }
      }
    


    static navigationOptions = {
        title: "Siga Manager",
        alignItems: "center",
        
       };
    
    _autenticarUsuario() {
        const { email, senha } = this.props;

        this.props.autenticarUsuario({ email, senha });
    }


    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed "+viewId);
      }

      

    renderBtnAcessar() {

        if(this.props.loading_login) {
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
          'Algo deu errado!',
          [
           // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
           // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'Entendi', onPress: () => console.log('OK Pressed')},
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
              {text: 'Entendi', onPress: () => 
               this.limpaCookie(response)},

            ],
            { cancelable: false }
          )
          }

          logarUser = async () => {
              
    const url1 = "/drivers/sign_in.json?driver[login]=motoralgk11@aparecida.go.gov.br";
    const url2="&driver[password]=javajade";

 
            const response = await api.post(url1+url2)
             .then(response => this.showAlertSucess(response))
             .catch(error => this.showAlertErro(error));
 
             };

             limpaCookie= (response) => {
              //console.log("SEM CLEAR!");
              console.log(response.responseHeaders);
              console.log('RCTNetworking:', RCTNetworking.clearCookies);
              //console.log("DEPOIS DO CLEAR!");
              console.log(response);
             }

    
    render() {
        return (
         

            <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Senha"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.logarUser()}>
          <Text style={styles.loginText}>Acessar</Text>
        </TouchableHighlight>

        
      </View>
        );
    }
}

export default formLogin;

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
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
      width:30,
      height:30,
      marginLeft:15,
      justifyContent: 'center'
    },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
    },
    loginButton: {
      backgroundColor: "#3CB371",
    },
    loginText: {
      color: 'white',
    }
  });