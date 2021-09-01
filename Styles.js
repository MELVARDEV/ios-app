
import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    view:{
        backgroundColor: '#121212',
        width: "100%",
        height: "100%"
    },
    header:{
        color: '#fcfcfc', // <-- The magic
	    textAlign: 'center', // <-- The magic
	    fontWeight: 'bold',
	    fontSize: 30,
    },
    loginContainer: {
        marginTop: "20%",
        padding:30
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
        borderColor:"#919191",
        color: '#919191',
        fontSize:20,
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
      },
      button:{
          padding:12,
          margin: 24,
          alignItems:"center",
          borderRadius:30,
          backgroundColor:"#dc1f43"
      }
})  