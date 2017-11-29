import { StyleSheet } from "react-native";

var style = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },

  backgroundImage_Login: {
    flex: 1,
    alignSelf: "stretch",
    width: null,
    justifyContent: "center"
  },

  innerPageContainer_Login: {
    flex: 1,
    backgroundColor: "rgba(79, 195, 247,0.2)"
    //alignItems: 'center',
    //justifyContent:'center',
  },

  inputContainer_Login: {
    //flex:15,
    margin: 20,
    marginTop: 80,
    marginBottom: 0,
    padding: 20,
    paddingBottom: 10,
    alignSelf: "stretch",
    //borderWidth: 1,
    //borderColor: 'rgba(2, 119, 189,0.9)',
    backgroundColor: "rgba(30,50,59,0.5)"
  },

  logo1_Login: {
    color: "white",
    textAlign: "center",
    fontSize: 26,
    margin: 8,
    fontFamily: "Apple SD Gothic Neo", //Helvetica Neue
    fontWeight: "bold",
    marginBottom: 15
  },
  logo2_Login: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Apple SD Gothic Neo",
    fontWeight: "bold",
    marginBottom: 15
  },

  inputbox_Login: {
    //this style indicates the login page's input box frontend style.
    fontSize: 12,
    height: 30,
    padding: 7,
    marginBottom: 10,
    textAlign: "center",
    backgroundColor: "rgba(255,255,255,1)"
  },

  buttonContainer_Login: {
    alignSelf: "stretch",
    margin: 20,
    padding: 20
    /*        borderWidth: 1,
                borderColor: '#fff',
                //backgroundColor: 'rgba(30,50,59,0.6)',*/
  },

  Login_Button: {
    width: 200,
    height: 35,
    backgroundColor: "rgba(2, 119, 189,0.9)"
  },

  tabContainer: {
    flex: 1.25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5"
  },

  tabButton_Icon: {
    fontSize: 20
  },

  tabButton_Text: {
    height: -3,
    fontSize: 8
  },

  records_Icon: {
    fontSize: 20,
    fontWeight: "bold"
  },

  records_Text: {
    fontSize: 10,
    fontWeight: "bold"
  },

  contentContainer: {
    flex: 11
    /*       borderWidth: 1,
               borderColor: 'rgba(213,0,0,1)',*/
  },

  headerContainer: {
    flex: 2,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center"
    //justifyContent: 'space-around',
  },

  contentContainer_has_header: {
    flex: 10,
    backgroundColor: "#FFFFFF"
    //justifyContent: 'space-around',
  },

  searchPatient_Search: {
    //flex: 11,
    height: 310
  },

  twoButtons_Search: {
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  addNewPatient_NewTest: {
    height: 370
    /*        borderWidth: 1,
                borderColor: 'rgba(213,0,0,1)',*/
  },

  twoButtons_NewTest: {
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  twoButtons_ItemChosen: {
    marginTop: 30,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  switchStyle: {
    marginRight: 12
  },

  Button_Icon: {
    fontSize: 18,
    //marginLeft: 70,
    padding: 0
  },

  Save_Button_Icon: {
    fontSize: 13,
    justifyContent: "center",
    alignSelf: "center"
  },

  Save_Button_Text: {
    //padding: 4,
    color: "#fff",
    fontWeight: "bold",
    margin: 0,
    fontSize: 10,
    fontFamily: "Apple SD Gothic Neo"
  },

  Success_Image: {
    marginTop: 30,
    margin: 10,
    height: 130,
    width: 130,
    alignSelf: "center"
  },

  Success_Instruction: {
    color: "rgba(30,50,59,1)",
    fontSize: 17,
    margin: 10,
    fontFamily: "Apple SD Gothic Neo",
    alignSelf: "center",
    fontWeight: "bold"
  },

  Success_Text: {
    color: "rgba(30,50,59,1)",
    fontSize: 45,
    marginTop: 10,
    margin: 8,
    fontWeight: "normal",
    fontFamily: "Apple SD Gothic Neo",
    alignSelf: "center"
  },

  switch_Text: {
    fontSize: 9,
    fontFamily: "Apple SD Gothic Neo",
    fontWeight: "bold",
    marginLeft: 20
  },

  heading_1: {
    fontSize: 17,
    textAlign: "left",
    margin: 30,
    marginTop: 20,
    fontWeight: "bold",
    fontFamily: "Apple SD Gothic Neo",
    //color: '#FFFFFF',
    backgroundColor: "rgba(0,0,0,0)"
  },

  heading_1_Patient: {
    fontSize: 17,
    textAlign: "left",
    margin: 10,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 5,
    fontWeight: "bold",
    fontFamily: "Apple SD Gothic Neo",
    //color: '#FFFFFF',
    backgroundColor: "rgba(0,0,0,0)"
  },

  heading_1_CompleteRecord: {
    fontSize: 15,
    textAlign: "left",
    margin: 10,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 5,
    fontWeight: "bold",
    fontFamily: "Apple SD Gothic Neo",
    //color: '#FFFFFF',
    backgroundColor: "rgba(0,0,0,0)"
  },

  heading_2: {
    fontSize: 11,
    textAlign: "left",
    margin: 5,
    marginLeft: 20,
    //fontWeight: 'bold',
    fontFamily: "Apple SD Gothic Neo",
    //color: '#FFFFFF',
    backgroundColor: "rgba(0,0,0,0)"
  },

  form_Container: {
    justifyContent: "center",
    //marginTop: 0,
    padding: 20
    //backgroundColor: '#ffffff',
  },

  instructions: {
    fontSize: 12,
    fontFamily: "Apple SD Gothic Neo",
    margin: 30,
    marginTop: 20,
    marginBottom: 10,
    textAlign: "left",
    backgroundColor: "rgba(0,0,0,0)"
  },

  navigation_Heading: {
    fontSize: 18,
    textAlign: "center",
    //margin: 20,
    //marginTop: 15,
    //fontWeight: 'bold',
    //fontFamily: '',
    //color: '#FFFFFF',
    backgroundColor: "rgba(0,0,0,0)"
  },

  searchPage_Button: {
    width: 200,
    height: 30,
    //marginRight: 50,
    //marginLeft: 50,
    margin: 7,
    //paddingTop: 10,
    //paddingBottom: 10,
    //borderRadius: 10,
    //borderWidth: 1,
    //borderColor: 'rgba(253,254,254,0.3)',
    backgroundColor: "rgba(52, 152, 219,0.6)"
  },

  Confirm_Button: {
    width: 120,
    height: 50,
    //marginRight: 50,
    //marginLeft: 50,
    margin: 7,
    //paddingTop: 10,
    //paddingBottom: 10,
    //borderRadius: 10,
    //borderWidth: 1,
    //borderColor: 'rgba(253,254,254,0.3)',
    backgroundColor: "rgba(52, 152, 219,0.6)"
  },

  left_arrow: {
    width: 30,
    height: 30,
    marginLeft: 20,
    margin: 10
  },

  table_Container: {
    //flex: 1,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },

  table_Head: {
    height: 25,
    backgroundColor: "#f1f8ff"
  },

  table_Row: {
    height: 30
  },

  table_Text_Head: {
    fontSize: 9,
    //marginLeft: 5,
    fontWeight: "bold",
    textAlign: "center"
  },

  table_Text: {
    fontSize: 8,
    //marginLeft: 5,
    textAlign: "center"
  },

  table_Button_Opacity: {
    flex: 1
  },

  table_Row_Button_Cell: {
    height: 30,
    backgroundColor: "rgba(39, 174, 96, 0.6)"
  },

  table_Text_Button_Cell: {
    fontSize: 8,
    textAlign: "center",
    color: "#FDFEFE",
    fontWeight: "bold"
  },

  inputNormal: {
    height: 24,
    width: 280,
    borderRadius: 5,
    borderWidth: 1,
    textAlign: "left",
    margin: 3,
    marginBottom: 10,
    alignSelf: "center",
    borderColor: "#cccccc",
    fontSize: 12,
    paddingHorizontal: 6
  },

  input_Instruction: {
    fontSize: 10,
    textAlign: "left",
    //color: '#FDFEFE',
    fontWeight: "bold",
    fontFamily: "Apple SD Gothic Neo",
    marginBottom: 4
  }
});

export default style;
