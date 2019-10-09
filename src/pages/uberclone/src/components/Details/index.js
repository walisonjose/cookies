import React, { Component } from "react";
import {
  StyleSheet,         // CSS-like styles
  Text,               // Renders text
  TouchableOpacity,   // Pressable container
  View,
  Button,
  Picker                // Container component
} from 'react-native';

import {
  Container,
  TypeTitle,
  TypeDescription,
  TypeImage,
  RequestButton,
  RequestButtonText
} from "./styles";

//Carrega uma popup com os apps de mobilidade
import { Popup, showLocation } from 'react-native-map-link';

import uberx from "../../assets/uberx.png";

/*const options = {
  latitude: 38.8976763,
  longitude: -77.0387185,
  title: 'The White House',
  dialogTitle: 'Byla Uber!',
  dialogMessage: 'Por favor, escolha um app para prosseguir!',
  cancelText: 'Cancele aqui?'
} */



export default class Details extends Component {

  constructor (props) {
    super(props)
 //console.log("Aqui!! "+this.props.destination);
    this.state = {
      
      isVisible: false,
     
    }


  }


  
  render() {


    const options= {
      latitude: this.props.destination.latitude,
      longitude: this.props.destination.longitude,
      title: this.props.destination.title,
      dialogTitle: 'Partiu!?',
      dialogMessage: 'Então escolha um app para prosseguir!',
      cancelText: 'Cancele aqui!',
    }

/*
<View style={styles.container}>
      <Popup
        isVisible={this.state.isVisible}
        onCancelPressed={() => this.setState({ isVisible: false })}
        onAppPressed={() => this.setState({ isVisible: false })}
        onBackButtonPressed={() => this.setState({ isVisible: false })}
        options={options}
      />

     
      <Button onPress={() => { this.setState({ isVisible: true }) }} title='Solicitar Corrida!'/>
    </View>
*/



/* <TypeTitle>Popular</TypeTitle>
        <TypeDescription>Clique abaixo para iniciar !</TypeDescription>

        <TypeImage source={uberx} />
        <TypeTitle>Byla!!!</TypeTitle>
       // <TypeDescription>R$6,00</TypeDescription>

        <RequestButton onPress={() => { this.setState({ isVisible: true })}}>
         <RequestButtonText>Partiu!?</RequestButtonText>
        </RequestButton>*/

    return (
      
      


<Container>
<Popup
        isVisible={this.state.isVisible}
        onCancelPressed={() => this.setState({ isVisible: false })}
        onAppPressed={() => this.setState({ isVisible: false })}
        onBackButtonPressed={() => this.setState({ isVisible: false })}
        options={options}
      />
        <TypeTitle>Tudo certo!</TypeTitle>
        <TypeDescription>Agora só falta vc iniciar a sua viagem com nossos parceiros!!</TypeDescription>

      
       

        <RequestButton onPress={() => { this.setState({ isVisible: true })}}>
         <RequestButtonText>E aí, partiu!?</RequestButtonText>
        </RequestButton>
      </Container>



    )
  }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff'
    }
  })


  