import React from "react";

import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";



const Motora_Siga = ({ navigation }) => (




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
        
          source={{uri: navigation.state.params.user.profile_picture }}/> 
        </View>

        <View style={{ flex: 0.9}} >
<Text style={styles.productTitle}>{navigation.state.params.user.name}</Text>

        <Text style={styles.productTitle}>{navigation.state.params.user.management_unity}</Text>
        </View>
       
        
      </View>

      

);





Motora_Siga.navigationOptions = ({navigation}) => ({
 title: navigation.state.params.user.name,
 headerStyle: {
  backgroundColor: '#3CB371',
  bor

},
headerTintColor: '#fff',
headerTitleStyle: {
  fontWeight: 'bold',
  alignItems: "center",
},

});




export default Motora_Siga;


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
       fontSize: 18,
       color: "#333",
       
       marginTop: 5,
       lineHeight: 24
     },
   
     productButton: {
       height: 42,
       borderWidth: 2,
       borderColor: "#DA552F",
       borderRadius: 5,
       
       backgroundColor: "transparent",
       alignItems: "center",
       justifyContent: "center",
       marginTop: 10
   
     },
     productButtonText: {
       fontSize: 16,
       color: "#DA552F",
       fontWeight: "bold"
   
     }
   
   
   });