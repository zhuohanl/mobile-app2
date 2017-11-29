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
import firebase from "./firebaseConfig";

var t = require("tcomb-form-native");

var Form = t.form.Form;

var Person = t.struct({
  FirstName: t.String, // a required string
  LastName: t.String, // a required string
  Date: t.String,
  UID: t.maybe(t.String),
  Gender: t.maybe(t.String)
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
      placeholder: "Patient UID",
      autoCorrect: false
    },
    Gender: {
      label: "Gender", // <= label for the name field
      placeholder: "M/F",
      autoCorrect: false
    }
  }
};

//const rootRef = firebaseApp.database().ref();

export default class Memberarea extends Component {
  static navigationOptions = {
    title: "NewPatient",
    header: null,
    headerLeft: null
  };

  constructor(props) {
    super(props);
    this.state = {
      value: {
        UID: "",
        FirstName: "", // a required string
        LastName: "", // a required string
        Gender: "",
        Date: ""
      }
    };
    this.hanleChange.bind(this);
  }

  hanleChange(value) {
    this.setState({ value });
  }

  render() {
    return (
      <View style={style.pageContainer}>
        <View style={style.contentContainer}>
          <StyleProvider style={getTheme(platform)}>
            <Header>
              <Body>
                <Title>New Patient</Title>
              </Body>
            </Header>
          </StyleProvider>

          <ScrollView>
            <StyleProvider style={getTheme(platform)}>
              <Container style={style.addNewPatient_NewTest}>
                <Separator bordered>
                  <Text>Add New Patient</Text>
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
              <Container style={style.twoButtons_NewTest}>
                <Button style={styles.add} onPress={() => this.add()}>
                  <Icon style={styles.addIcon} name="ios-add-circle" />
                  <Text style={styles.buttonText}>Save</Text>
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
                <Button vertical onPress={this.searchPage}>
                  <Icon active style={style.tabButton_Icon} name="search" />
                  <Text style={style.tabButton_Text}>Search</Text>
                </Button>
                <Button vertical active onPress={this.newT}>
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

  validateDob = dob => {
    if (dob.match(/^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/)) {
      return true;
    } else {
      return false;
    }
  };

  add = () => {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue(); // value here is an instance of Person

    if (value) {
      if (this.validateDob(value.Date) === true) {
        var postData = {
          last_name: value.LastName,
          first_name: value.FirstName,
          dob: value.Date,
          uid: value.UID,
          gender: value.Gender
        };

        //console.log("postData:", postData); // For test Purpose

        var newPatientPostKey = firebase
          .database()
          .ref()
          .push().key;

        // var uid = value.UID;

        var updates = {};
        updates[newPatientPostKey] = postData;

        firebase
          .database()
          .ref()
          .update(updates);

        this.props.navigation.navigate("addSuccess", {
          patientKey: newPatientPostKey,
          Patient: postData,
          nurseId: this.props.navigation.state.params.nurseId
        });
      } else {
        AlertIOS.alert(
          "Please make sure your Date Of Birth input as DD/MM/YYYY format!"
        );
      }
    } else {
      AlertIOS.alert("Please fill all the required fields!");
    }
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
  //cler form
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
