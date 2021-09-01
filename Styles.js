
import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    view:{
        // backgroundColor: '#050505',
        flex:1
    },
    header:{
	    textAlign: 'center', 
	    fontWeight: 'bold',
	    fontSize: 30,
    },
    loginContainer: {
        backgroundColor:'black',
        padding:30,
        paddingTop: "30%"
    },
    label:{
        color: "#fff", // <-- The magic
        opacity:0.5
	    //textAlign: 'center', // <-- The magic
	    //fontWeight: 'bold',
	    //fontSize: 30,
    },
    input: {
        height: 50,
        margin: 12,
        borderColor:"#1c1c1c",
        backgroundColor:"#121212",
        color: '#919191',
        fontSize:20,
        borderRadius: 8,
        borderWidth: 1,
        padding: 10,
      },
      button:{
          padding:12,
          margin: 24,
          alignItems:"center",
          borderRadius:30,
          backgroundColor:"#dc1f43"
      },
      card: {
        backgroundColor: 'rgba(120,120,120,0.2)',
        borderRadius:8,
        padding: 5,
        paddingVertical: 10,
        margin: 10
      }
})  