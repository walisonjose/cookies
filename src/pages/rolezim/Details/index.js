import React, { Component } from "react";

import {
  Container,
  TypeTitle,
  TypeDescription,
  TypeImage,
  RequestButton,
  RequestButtonText
} from "./styles";

import uberx from "../assets/uberx.png";

export default class Details extends Component {
  render() {
/*
<Container>
        <TypeTitle>Popular</TypeTitle>
        <TypeDescription>Clique para solictar uma corrida!</TypeDescription>

        <TypeImage source={uberx} />
        <TypeTitle>Siga</TypeTitle>
        <TypeDescription>R$6,00</TypeDescription>

        <RequestButton onPress={() => {}}>
         <RequestButtonText>SOLICITAR CORRIDA</RequestButtonText>
        </RequestButton>
      </Container>
*/

    return (
      <Container>
       
        <TypeDescription>Clique aqui para solictar uma corrida!</TypeDescription>

        

        <RequestButton onPress={() => {}}>
         <RequestButtonText>SOLICITAR CORRIDA</RequestButtonText>
        </RequestButton>
      </Container>
    );
  }
}
