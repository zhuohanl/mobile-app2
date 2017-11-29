import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  AlertIOS,
  View,
  ScrollView,
  AsyncStorage,
  TextInput,
  DatePickerIOS,
  TouchableOpacity
} from "react-native";
import { StackNavigator } from "react-navigation";
import style from "./style";
import {
  Container,
  Body,
  Header,
  Item,
  Input,
  Icon,
  Content,
  Footer,
  FooterTab,
  Button,
  Badge,
  StyleProvider,
  Text,
  Card,
  CardItem,
  List,
  ListItem,
  Separator,
  Left,
  Right,
  Title
} from "native-base";

import getTheme from "./native-base-theme/components";
import platform from "./native-base-theme/variables/platform";
import firebaseApp from "./firebaseConfig";

var t = require("tcomb-form-native");

var Form = t.form.Form;

var Person = t.struct({
  LastName: t.String, // a required string
  FirstName: t.String, // a required string
  Date: t.String,
  UID: t.maybe(t.String)
});

var options = {
  fields: {
    LastName: {
      label: "Last Name (Require)", // <= label for the name field
      placeholder: "Last Name",
      autoCorrect: false
    },
    FirstName: {
      label: "First Name (Require)", // <= label for the name field
      placeholder: "First Name",
      autoCorrect: false
    },
    Date: {
      label: "Date of Birth (Require)", // <= label for the name field
      placeholder: "DD/MM/YYYY",
      autoCorrect: false,
      keyboardType: "numeric"
    },
    UID: {
      label: "UID", // <= label for the name field
      placeholder: "ID",
      autoCorrect: false
    }
  }
};

export default class SearchPage extends Component {
  static navigationOptions = {
    title: "Search Page",
    header: null,
    headerLeft: null
  };

  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database().ref();
    this.items = [];
    this.state = {
      value: {
        UID: "",
        FirstName: "", // a required string
        LastName: "", // a required string
        Date: ""
      },
      date: new Date(),
      showDatePicker: false
    };
  }

  componentWillMount() {
    console.log(
      "this.props.navigation.state.params.nurseId",
      this.props.navigation.state.params.nurseId
    );
    this.itemRef.on("value", snap => {
      snap.forEach(child => {
        let item = child.val();
        item.key = child.key;
        //console.log("item:", item); for test purpose
        this.items.push(item);
      });
    });
  }

  filterPatient(value) {
    let last_name = value.LastName;
    let first_name = value.FirstName;
    let dob = value.Date;
    let patient = this.items;
    // console.log("length: ", patient.length);
    console.log("UID:", value.UID);
    if (value.UID != null) {
      let uid = value.UID;
      console.log("UID:", uid);
      for (i = 0; i < patient.length; i++) {
        if (
          patient[i].first_name === first_name &&
          patient[i].last_name === last_name &&
          patient[i].dob === dob &&
          patient[i].uid === uid
        ) {
          console.log("found: ", patient[i].key);
          return patient[i];
        }
      }
    } else {
      for (i = 0; i < patient.length; i++) {
        if (
          patient[i].first_name === first_name &&
          patient[i].last_name === last_name &&
          patient[i].dob === dob
        ) {
          return patient[i];
        }
      }
    }
  }

  validateDob = dob => {
    if (dob.match(/^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/)) {
      return true;
    } else {
      return false;
    }
  };

  add = () => {
    var value = this.refs.form.getValue();
    let patient = null;
    if (value) {
      if (this.validateDob(value.Date) === true) {
        patient = this.filterPatient(value);
        //console.log("The patient is:", patient); //for test purpose
        if (patient != null) {
          //console.log(patient.tests);//for test purpose,to check the value of the patient.tests
          if (patient.tests != null) {
            this.props.navigation.navigate("Search_HasTest", {
              Patient: patient,
              nurseId: this.props.navigation.state.params.nurseId
            });
          } else {
            this.props.navigation.navigate("Search_NoTest_Add", {
              Patient: patient,
              nurseId: this.props.navigation.state.params.nurseId
            });
          }
        } else {
          AlertIOS.alert("The patient doesn't exist!");
        }
      } else {
        AlertIOS.alert(
          "Please make sure your Date Of Birth input as DD/MM/YYYY format!"
        );
      }
    } else {
      AlertIOS.alert("Please fill all the required fields!");
    }
  };

  render() {
    return (
      <View style={style.pageContainer}>
        <View style={style.contentContainer}>
          <StyleProvider style={getTheme(platform)}>
            <Header>
              <Body>
                <Title>Search</Title>
              </Body>
            </Header>
          </StyleProvider>

          <ScrollView>
            <StyleProvider style={getTheme(platform)}>
              <Container style={style.searchPatient_Search}>
                <Separator bordered>
                  <Text>Search Patient</Text>
                </Separator>

                <View style={style.form_Container}>
                  <Form
                    ref="form"
                    type={Person}
                    options={options}
                    value={this.state.value}
                    onChangeText={value => this.setState({ value })}
                    /*onChangeText{()=>{}}
                                                                            onSubmitEditing{()=>{}}*/
                  />
                </View>
              </Container>
            </StyleProvider>

            <StyleProvider style={getTheme(platform)}>
              <Container style={style.twoButtons_Search}>
                <Button style={styles.add} onPress={() => this.add()}>
                  <Icon style={styles.addIcon} name="ios-search" />
                  <Text style={styles.buttonText}>Search</Text>
                </Button>
                <Button style={styles.clear} onPress={this.clear}>
                  <Icon style={styles.clearIcon} name="trash" />
                  <Text style={styles.buttonText}>Clear</Text>
                </Button>
              </Container>
            </StyleProvider>
          </ScrollView>
        </View>

        <StyleProvider style={getTheme(platform)}>
          <Container style={style.tabContainer}>
            <Footer>
              <FooterTab>
                <Button vertical active onPress={this.searchPage}>
                  <Icon active style={style.tabButton_Icon} name="search" />
                  <Text style={style.tabButton_Text}>Search</Text>
                </Button>
                <Button vertical onPress={this.newT}>
                  <Icon active style={style.tabButton_Icon} name="person" />
                  <Text style={style.tabButton_Text}>New Patient</Text>
                </Button>

                <Button vertical onPress={this.more}>
                  <Icon style={style.tabButton_Icon} name="apps" />
                  <Text style={style.tabButton_Text}>More</Text>
                </Button>
              </FooterTab>
            </Footer>
          </Container>
        </StyleProvider>
      </View>
    );
  }

  searchPage = () => {
    this.props.navigation.navigate("SearchPage", {
      nurseId: this.props.navigation.state.params.nurseId
    });
  };

  newT = () => {
    this.props.navigation.navigate("Memberarea", {
      nurseId: this.props.navigation.state.params.nurseId
    });
  };

  more = () => {
    this.props.navigation.navigate("More", {
      nurseId: this.props.navigation.state.params.nurseId
    });
  };

  clear = () => {
    this.setState({ value: null });
  };
}

const styles = StyleSheet.create({
  searchBar: {
    width: "100%",
    backgroundColor: "rgba(30,50,59,0)"
  },

  add: {
    height: 25,
    backgroundColor: "#0277BD",
    width: 100,
    marginRight: 7,
    justifyContent: "center"
  },

  clear: {
    height: 25,
    backgroundColor: "#BDBDBD",
    width: 100,
    marginLeft: 7,
    justifyContent: "center"
  },

  addIcon: {
    fontSize: 15,
    margin: 0,
    padding: 0
  },

  clearIcon: {
    fontSize: 18
  },

  buttonText: {
    padding: 4,
    color: "#fff",
    fontWeight: "bold",
    margin: 0,
    fontSize: 10
  }
});
