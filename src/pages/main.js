import React, { Component } from "react";
import api from '../services/api';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';


import CookieManager from 'react-native-cookies';

import { Platform, SafeAreaView, View, ImageBackground, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";

console.disableYellowBox = true;


export default class Main extends Component {

  



  static navigationOptions = {
    title: "Gerenciador Siga",
   
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
    data: [
      { id: "00", name: "Usuários", src: "https://img.icons8.com/color/96/000000/team-skin-type-7.png", comando: "listaUser" },
      { id: "01", name: "Meu Perfil", src: "https://img.icons8.com/color/96/000000/collaborator-male--v2.png", comando: "sigaUser" },
      { id: "02", name: "Motoristas", src: "https://img.icons8.com/color/96/000000/driver.png", comando: "listaMotora" },
      { id: "03", name: "Ouvidoria", src: "https://img.icons8.com/color/96/000000/signal-horn.png", comando: "ouvidoria" },
     { id: "04", name: "Corrida", src: "https://img.icons8.com/material-outlined/96/000000/marker.png", comando: "Uber" },
     { id: "05", name: "Sair", src: "https://img.icons8.com/color/96/000000/shutdown--v1.png", comando: "formLogin" }
      
    
    
    ]
    //page: 1,
  };

  clearCookies = () => { 

    CookieManager.clearAll()
      .then((res) => {
        console.log('CookieManager.clearAll =>', res);
      });
  }

  logout = () => { 
        this.clearCookies();
    this.props.navigation.navigate("formLogin");
  }

  rota = (comando) =>{  


  switch(comando){
    case 'formLogin':
        this.clearCookies();
        this.props.navigation.navigate(comando);
        break;

        case 'listaUser':
        this.props.navigation.navigate(comando);
        break;

        case 'Map':
        this.props.navigation.navigate(comando);
        break;

        case 'listaMotora':
        this.props.navigation.navigate(comando);
        break;

        case 'CalloutMap':
        this.props.navigation.navigate(comando);
        break;

        case 'sigaMotora':
        this.props.navigation.navigate(comando);
        break;

        case 'sigaUser':
        this.props.navigation.navigate(comando);
        break;

        case 'ouvidoria': 
        this.props.navigation.navigate(comando);
        break;

        case 'Uber': 
        this.props.navigation.navigate(comando);
        break;

    default:
      console.log("Ocorreu algum erro!");
      break;    
  }

    /*if(comando == "formLogin"){
     this.clearCookies();
     this.props.navigation.navigate(comando);
    } */

 
  
  }

  componentDidMount() {
    // this.loadProducts();
    // this.loadDataUserSiga();
    // this.getMotorasSiga();
  }



  //Pegar dados do Siga

  loadDataUserSiga = async () => {
    const response = await api.get('/pt-BR/admin/users.json');
    const docs = response.data;
    console.log(response.data);


    this.setState({ docs: docs });

  };

  loginUserSiga = async () => {
    const response = await api.post('/drivers/sign_in?driver[login]= motoralgk11@aparecida.go.gov.br&driver[password]=javajade')
      .then(function (response) {
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
    const docs = response.data;
    console.log(response.data);


    this.setState({ docs: docs });


  };




  logarUser = async () => {
    const response = await api.post('/drivers/sign_in.json?driver[login]=walison.deus@aparecida.go.gov.br&driver[password]=12345678')
      .then(response => this.elogioSucess(response.data))
      .catch(error => this.elogioError(error));

  };

  elogioSucess = (response) => {
    // this.setState({ status: "Logou!"});
    console.log(response);

   

    //this.showAlertSucess();
  }

  elogioError = (error) => {
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
        { text: 'Entendi', onPress: () => console.log('OK Pressed') },
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
        { text: 'Entendi', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    )
  }






  loadProducts = async (page = 1) => {
    const response = await api.get('/products?page=${page}');
    const { docs, ...productInfo } = response.data;

    this.setState({ docs: [... this.state.docs, ...docs], productInfo, page });

  };

  loadMore = () => {
    const { page, productInfo } = this.state;

    if (page == productInfo.pages) return;


    const pageNumber = page + 1;
    this.loadProducts(pageNumber);
  };


  renderItem = ({ item }) => (

    <View style={styles.productContainer}>


      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>

      <TouchableOpacity style={styles.productButton} onPress={() => {
        this.props.navigation.navigate("Product", { product: item });
      }}>
        <Text style={styles.productButtonText} >Acessar</Text>
      </TouchableOpacity>


    </View>
  );


  renderDataUser = ({ item }) => (



    <View style={styles.productContainer}>

      <Text style={styles.productTitle}>{item.name}</Text>



      <TouchableOpacity style={styles.productButton} onPress={() => {
        this.props.navigation.navigate("User_Siga", { user: item });
      }}>
        <Text style={styles.productButtonText} >Detalhar</Text>
      </TouchableOpacity>


    </View>
  );





  renderDataMotora = ({ item }) => (



    <View style={styles.productContainer}>

      <Text style={styles.productTitle}>{item.name}</Text>



      <TouchableOpacity style={styles.productButton} onPress={() => {
        this.props.navigation.navigate("Motora_Siga", { user: item });
      }}>
        <Text style={styles.productButtonText} >Detalhar</Text>
      </TouchableOpacity>


    </View>
  );



  render() {
    const columns = 3;
    return (

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

      /*
      
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
          
          <Text style={styles.productTitle}>Sair</Text>
          
         
         
      <TouchableOpacity style={styles.productButton} onPress={() =>{
      this.logout();
      }}>
      <Text style={styles.productButtonText} >Sair</Text>
       </TouchableOpacity>
      
      
      </View>
            
      </View>
      */

      //</ImageBackground>


      <SafeAreaView>
        <FlatList
          data={createRows(this.state.data, columns)}
          keyExtractor={item => item.id}
          numColumns={columns}
          renderItem={({ item }) => {
            if (item.empty) {
              return <View style={[styles.item, styles.itemEmpty]} />;
            }
            return (
              <View style={styles.item}>
             

                <TouchableOpacity style={styles.productButton} onPress={() => {
                    this.rota(item.comando);
                }}>
                   

                  <Image
                    style={{ width: 60, height: 60 }}
                    source={{ uri: item.src }}
                  />
                </TouchableOpacity>
                <Text style={styles.productButtonText}>{item.name}</Text>
              </View>
            );
          }}
        />
      </SafeAreaView>



    );
  }
}

function createRows(data, columns) {
  const rows = Math.floor(data.length / columns);
  let lastRowElements = data.length - rows * columns;

  while (lastRowElements !== columns) {
    data.push({
      id: `empty-${lastRowElements}`,
      name: `empty-${lastRowElements}`,
      empty: true
    });
    lastRowElements += 1;
  }

  return data;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },


  item: {
    alignItems: "center",
    backgroundColor: "transparent",
    flexBasis: 0,
    flexGrow: 1,
    margin: 4,
    padding: 20
  },
  itemEmpty: {
    backgroundColor: "transparent"
  },
  text: {
    color: "#333333"
  },

  instructions: {
    textAlign: 'center',
    color: '#333333',
    margin: 10,
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
    height: 50,
    borderWidth: 2,
    borderColor: "#3CB371",
    borderRadius: 5,
    height: 75,
    width: 75,
    backgroundColor: "#3CB371",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10

  },
  productButtonText: {
    fontSize: 10,
    color: "black",
    fontWeight: "bold"

  },
  MainContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 10,
  },
  GooglePlusStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc4e41',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: 220,
    borderRadius: 5,
    margin: 5,
  },
  FacebookStyle: {
    flexDirection: 'row',
    //alignItems: 'baseline',
    backgroundColor: '#485a96',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: 40,
    borderRadius: 5,
    margin: 5,
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  TextStyle: {
    color: '#fff',
    marginBottom: 4,
    marginRight: 20,
  },
  SeparatorLine: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
  },


});