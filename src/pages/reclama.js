import React,  { Component } from "react";

import api from '../services/api';

import { Alert, ImageBackground, View, ScrollView, Text, TextInput, Button, TouchableHighlight, Image, ActivityIndicator, StyleSheet, Picker, TouchableOpacity } from "react-native";

console.disableYellowBox = true;


export default class Reclama extends Component{

static navigationOptions = {
 title: "Reclamação&Elogios",
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

//userData: [],
//productInfo: {},
motoristas: [],
usuarios: [],
motora: "",
usuario: "",
idUsuario: "",
idMotora: "",
tipoOuvidoria: "",
mensagem: "",
status: "Aguardando....",
//page: 1,
};




componentDidMount(){
   // this.loadProducts();
   this.loadDataUserSiga();
  this.getMotorasSiga();
}



//Pegar dados do Siga

loadDataUserSiga = async () => {
  const response = await api.get('/pt-BR/admin/users.json');
  const  docs  = response.data;
  console.log(response.data);

  
  this.setState({ usuarios: docs });
  
  };

  loginUserSiga = async () => {
    const response = await api.post('/drivers/sign_in?driver[login]= motoralgk11@aparecida.go.gov.br&driver[password]=javajade')
    .then(function(response){
      console.log(response.data);
     // this.setState({ docs: response.data.status });
    }); 
    //const  docs  = response.data;
    //console.log(response.data);
  

    
    
    //this.setState({ docs: docs });
    
    };
  

    
    getUserMsgsSiga = async () => {
      const response = await api.get('/pt-BR/admin/drivers.json'
     )
    .then(function (response) {
      console.log(response.data);
      this.setState({ docs: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });

    };






    teste_var = () =>{
     console.log(this.props.mensagem);
     console.log(this.props.idUsuario);
    };

    reclamaElogioSiga =  async () => {

      console.log("mensagem:"+this.state.mensagem);
      console.log("Id Motora:"+this.state.idMotora);
      console.log("Tipo de ouvidoria:"+this.state.tipoOuvidoria);
      console.log("Id Usuario:"+this.state.idUsuario);

      const url1 = '/ombudsmen.json?ombudsman[driver_id]=';
      const url2 = '&ombudsman[user_id]=';
      const url3 = '&ombudsman[tipo]=';
      const url4 = '&ombudsman[message]=';
      
      
      
     // const response = await api.post('/ombudsmen.json?ombudsman[driver_id]=3&ombudsman[user_id]=5&ombudsman[tipo]=reclamacao&ombudsman[message]=Teste!!'
     const response = await api.post(url1+this.state.idMotora+url2+this.state.idUsuario+url3+this.state.tipoOuvidoria+url4+this.state.mensagem
     )
    .then(response => this.elogioSucess())
    .catch(error => this.elogioError());

    };

     elogioSucess = () =>{
 this.setState({ status: "Feito!"});

 this.showAlertSucess();
    }

    elogioError = () =>{
      this.setState({ status: "Ocorreu algum problema!!"});
      this.showAlertErro();
         }

    getMotorasSiga = async () => {
      const response = await api.get('/pt-BR/admin/drivers.json'
     );
     const  dados  = response.data;
     console.log(response.data);
   
     
     this.setState({ motoristas: dados });
     

    };




loadProducts = async (page = 1) => {
const response = await api.get('/products?page=${page}');
const { docs, ... productInfo } = response.data;

this.setState({ docs: [ ... this.state.docs, ...docs], productInfo, page });

};

loadMore = () =>{
 const { page, productInfo } = this.state;

 if(page == productInfo.pages ) return;


 const pageNumber = page + 1;
 this.loadProducts(pageNumber);
};


renderItem = ({ item}) => (
    
    <View style={styles.productContainer}>

      
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>

<TouchableOpacity style={styles.productButton} onPress={() =>{
    this.props.navigation.navigate("Product", { product: item } );
}}>
    <Text style={styles.productButtonText} >Acessar</Text>
     </TouchableOpacity>


    </View>
);


  showAlertErro = () => {
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


  showAlertSucess = () => {
    Alert.alert(
      'Tudo certo!',
      'Registro realizado!!',
      [
       // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
       // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Entendi', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
    }



renderDataUser = ({ item}) => (

  
    
  <View style={styles.productContainer}>
    
      <Text style={styles.productTitle}>{item.name}</Text>
      
     
     
<TouchableOpacity style={styles.productButton} onPress={() =>{
  this.props.navigation.navigate("User_Siga", { user: item } );
}}>
  <Text style={styles.productButtonText} >Detalhar</Text>
   </TouchableOpacity>
 

  </View>
);


renderDataMotora = ({ item}) => (

  
    
  <View style={styles.productContainer}>
    
      <Text style={styles.productTitle}>{item.name}</Text>
      
     
     
<TouchableOpacity style={styles.productButton} onPress={() =>{
  this.props.navigation.navigate("Motora_Siga", { user: item } );
}}>
  <Text style={styles.productButtonText} >Detalhar</Text>
   </TouchableOpacity>
 

  </View>
);


pickerChange(index, itemValue){


  this.state.motoristas.map( (v,i)=>{
   if( index === i ){
     this.setState({
     motora: itemValue,
     idMotora: this.state.motoristas[index].id
    })
   }
  })
 }

 pickerChangeUser(index, itemValue){
//  this.setState({usuario: itemValue});

  this.state.usuarios.map( (v,i)=>{
   if( index === i ){
     this.setState({
     usuario: itemValue,
     idUsuario: this.state.usuarios[index].id
    })
   }
  })
 }



render(){
        return(
   
   

         // <ImageBackground  source={require('../../src/imgs/bg.png')} style={{width: '100%', height: '100%'}}> 
<View style={styles.container}>
<View style={styles.productContainer}>
<ScrollView>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                         
                        
                    </View>
                   <View style={styles.productContainer}>
                      
                        <Text style={ styles.productTitle }>Usuário</Text>
                        <Picker
                              selectedValue={this.state.usuario}
                              style={{height: 100, width: 100}}
                                   onValueChange={(itemValue, itemIndex) => 
                                    this.pickerChangeUser(itemIndex, itemValue)}>{
                                      this.state.usuarios.map( (v)=>{
                                        return <Picker.Item label={v.name} value={v.id} />
                                       })
                                    }
                                                
                                   
                                      </Picker>
                                      </View>

                                      <View style={styles.productContainer}>


                       <Text style={ styles.productTitle }>Tipo de Ouvidioria:</Text>
                      <Picker
                              selectedValue={this.state.tipoOuvidoria}
                              style={{height: 70, width: 100}}
                                   onValueChange={(itemValue, itemIndex) =>
                                         this.setState({tipoOuvidoria: itemValue})
                                                }>
                                   <Picker.Item label="Reclamação" value="reclamacao" />
                                      <Picker.Item label="Elogio" value="elogio" />
                                      </Picker>
                       
                       
                        
                       
                    </View>
                    <View style={styles.productContainer}>
                      <Text style={ styles.productTitle }>Motorista:</Text>
                      <Picker
                              selectedValue={this.state.motora}
                              style={{height: 50, width: 100}}
                                   onValueChange={(itemValue, itemIndex) =>
                                    this.pickerChange(itemIndex, itemValue)}>{
                                      
                                      this.state.motoristas.map( (v)=>{
                                        return <Picker.Item label={v.name} value={v.id}  />
                                       })
                                    }
                                                
                                   
                                      </Picker>
                       
                        
                       
                    </View>

                    <View style={styles.productContainer}>
                    <Text style={ styles.productTitle }>Mensagem</Text>
                        <TextInput 
                            
                            style={{ fontSize: 20, height: 45 }} 
                            placeholder='Mensagem aqui!' placeholderTextColor='#000000' 
                            onChangeText={(mensagem) => this.setState({mensagem})}
                            value={this.state.mensagem}
                        />

                    </View>

                     <View style={styles.productContainer}>
                     <Text  style={ styles.productTitle } >{this.state.status}</Text>
                     </View>

                    <TouchableOpacity style={styles.productButton} onPress={() =>{
  this.reclamaElogioSiga();
}}>
  <Text style={styles.productButtonText} >Salvar</Text>
   </TouchableOpacity>


   </ScrollView>
                    </View>
                    
                    
                
</View> 

//</ImageBackground>

        );
    }
}


const styles = StyleSheet.create({
 container:{
     flex: 1,
     backgroundColor: "#fafafa"
 },

 list: {
     padding: 20
 },

  productContainer: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    padding: 20,
    marginBottom: 20
  },


  productTitle: {
      fontSize: 18,
      fontWeight: "bold",
    alignItems: "center",
      color: "#333"
  },

  productDescription: {
    fontSize: 16,
    color: "#999",
    marginTop: 5,
    lineHeight: 24
  },

  productButton: {
    height: 42,
    borderWidth: 2,
    borderColor: "#90EE90",
    borderRadius: 5,
    
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10

  },
  productButtonText: {
    fontSize: 16,
    color: "#90EE90",
    fontWeight: "bold"

  }


});