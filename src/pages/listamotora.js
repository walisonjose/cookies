import React,  { Component } from "react";
import api from '../services/api';

import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

console.disableYellowBox = true;


export default class ListaMotora extends Component{

static navigationOptions = {
 title: "Motoristas Siga",
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
docs: [],
teste: "teste",
//page: 1,
};



componentWillMount(){
  // this.loadProducts();
 // this.loadDataUserSiga();
 this.getMotorasSiga();
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
    <Text style={styles.productButtonText}>Acessar</Text>
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
  this.props.navigation.navigate("sigaMotora", { user: item } );
}}>
  <Text style={styles.productButtonText} >Detalhar</Text>
   </TouchableOpacity>
 

  </View>
);



render(){
        return(

       

<View style={styles.container}>
    <FlatList 
      contentContainerStyle={styles.list}
      data={this.state.docs}
      keyExtractor={item => item.id}
      renderItem={this.renderDataMotora}
      
      /> 
</View> 


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