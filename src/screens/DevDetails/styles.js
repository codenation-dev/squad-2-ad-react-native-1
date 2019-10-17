import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    container: {
      padding:10,
      width: Math.round(Dimensions.get('window').width)-10,
      height: Math.round(Dimensions.get('window').height)-10
    },
    cardA:{
      backgroundColor:'#030442',
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
      width:'auto',
      height:'22%',
      top:'3%',
    },
    cardB:{
      flex:1,
      flexDirection:'column',
      justifyContent:'flex-start',
      padding:10,
      paddingTop:43,
      zIndex:1,
      borderRadius:25,
      backgroundColor:'white',
      width:'auto',
      height:'60%',
    },
    image:{
      position:'absolute',
      backgroundColor:'white',
      width:130,
      height:130,
      borderRadius:70,
      top:'10%',
      zIndex:5,
      alignSelf:'center',
      padding:5
    },
    devName:{
      alignSelf:'center',
      fontWeight:'bold',
      fontSize:22,
    }
  });

  export default styles;