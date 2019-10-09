import React,  { Component } from "react";
import api from '../services/api';

import { View, ImageBackground, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";

console.disableYellowBox = true;


export default class Main extends Component{

static navigationOptions = {
 title: "Dados Siga",
 alignItems: "center"
};

state = {

//userData: [],
//productInfo: {},
docs: [],
teste: "teste",
//page: 1,
};



componentDidMount(){
   // this.loadProducts();
  // this.loadDataUserSiga();
 // this.getMotorasSiga();
}



//Pegar dados do Siga

loadDataUserSiga = async () => {
  const response = await api.get('/pt-BR/admin/users.json');
  const  docs  = response.data;
  console.log(response.data);

  
  this.setState({ docs: docs });
  
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




    reclamaElogioSiga = async () => {
      const response = await api.post('/ombudsmen.json?ombudsman[driver_id]=3&ombudsman[user_id]=5&ombudsman[tipo]=reclamacao&ombudsman[message]=Teste de mensagem22'
     )
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

    };

    getMotorasSiga = async () => {
      const response = await api.get('/pt-BR/admin/drivers.json'
     );
     const  docs  = response.data;
     console.log(response.data);
   
     
     this.setState({ docs: docs });
     

    };




    logarUser = async () => {
      const response = await api.post('/drivers/sign_in.json?driver[login]=walison.deus@aparecida.go.gov.br&driver[password]=12345678')
       .then(response => this.elogioSucess(response.data))
       .catch(error => this.elogioError(error));
   
       };
   
        elogioSucess = (response) =>{
   // this.setState({ status: "Logou!"});
   console.log(response);
    this.showAlertSucess();
       }
   
       elogioError = (error) =>{
     //    this.setState({ status: "Não logou!!"});
     console.log(error);
         this.showAlertErro();
            }



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
                  'Acesso liberado!!',
                  [
                   // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                   // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'Entendi', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: false }
                )
                }
            





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



render(){
        return(

          /*
<View style={styles.container}>
    <FlatList 
      contentContainerStyle={styles.list}
      data={this.state.docs}
      keyExtractor={item => item._id}
      renderItem={this.renderItem}
      //onEndReached={this.loadMore}
      //onEndReachedThreshold={0.1}
      />
</View>*/


//Funciona com o Siga

/*
<View style={styles.container}>
    <FlatList 
      contentContainerStyle={styles.list}
      data={this.state.docs}
      keyExtractor={item => item.id}
      renderItem={this.renderDataMotora}
      
      /> 
</View> */


//<ImageBackground  source={require('../../src/imgs/bg.png')} style={{width: '100%', height: '100%'}}>
<View style={styles.Container}>
   

<View style={styles.productContainer}>
    
    <Text style={styles.productTitle}>Lista de Motoristas</Text>
    
   
   
<TouchableOpacity style={styles.productButton} onPress={() =>{
this.props.navigation.navigate("ListaMotora_Siga" );
}}>
<Text style={styles.productButtonText} >Detalhar</Text>
 </TouchableOpacity>


</View>



<View style={styles.productContainer}>
    
    <Text style={styles.productTitle}>Lista de Usuários</Text>
    
   
   
<TouchableOpacity style={styles.productButton} onPress={() =>{
this.props.navigation.navigate("ListaUser_Siga" );
}}>
<Text style={styles.productButtonText} >Detalhar</Text>
 </TouchableOpacity>


</View>


<View style={styles.productContainer}>
    
    <Text style={styles.productTitle}>Reclamação/Elogios</Text>
    
   
   
<TouchableOpacity style={styles.productButton} onPress={() =>{
this.props.navigation.navigate("Reclama" );
}}>
<Text style={styles.productButtonText} >Adicionar</Text>
 </TouchableOpacity>


</View>



<View style={styles.productContainer}>
    
    <Text style={styles.productTitle}>Login</Text>
    
   
   
<TouchableOpacity style={styles.productButton} onPress={() =>{
this.props.navigation.navigate("Login" );
}}>
<Text style={styles.productButtonText} >Logar</Text>
 </TouchableOpacity>


</View>
      
</View>

//</ImageBackground>





/*
<View
        style={{
          flexDirection: 'row',
          height: 100,
          padding: 20,
        }}>
        <View style={{backgroundColor: 'blue', flex: 0.3}} />
        <View style={{backgroundColor: 'red', flex: 0.5}} />
        <Text>Hello World!</Text>
      </View>
*/

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
    backgroundColor: "#3CB371",
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
    color: "black",
    marginTop: 5,
    lineHeight: 24
  },

  productButton: {
    height: 42,
    borderWidth: 2,
    borderColor: "#3CB371",
    borderRadius: 5,
    
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10

  },
  productButtonText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold"

  }


});