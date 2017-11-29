import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  ScrollView,
  AsyncStorage,
  TextInput,
  DatePickerIOS,
  TouchableOpacity,
  Switch,
  Dimensions,
  AlertIOS
} from "react-native";
import { StackNavigator } from "react-navigation";
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
  Title,
  Segment,
  CheckBox
} from "native-base";

let { width, height } = Dimensions.get("window");
import style from "./style";
import getTheme from "./native-base-theme/components";
import platform from "./native-base-theme/variables/platform";

//import Switch from "./MaterialSwitch";

import firebase from "./firebaseConfig";

export default class newTest extends Component {
  static navigationOptions = {
    title: "NewTest",
    header: null,
    headerLeft: null
  };

  constructor(props) {
    super(props);

    this.ref = firebase.database().ref();

    var todayDate = new Date().toLocaleString();

    this.state = {
      date: todayDate,
      nurseFirstName: "",
      nurseLastName: "",
      antihistamineTrueIsOn: false,
      betablockerTrueIsOn: false,
      antihistamine: "No",
      betablocker: "No",
      details: "",
      nurseId: this.props.navigation.state.params.nurseId
    };
  }

  componentWillMount() {
    console.log("this.state.nurseId", this.state.nurseId);
    let nurseId = this.state.nurseId;
    this.ref.child("users/" + nurseId).on("value", snap => {
      console.log("snap.val()", snap.val());
      if (snap.exists()) {
        let item = snap.val();
        console.log("nurse last_name", item.last_name);
        this.setState({ nurseLastName: item.last_name });
        this.setState({ nurseFirstName: item.first_name });
      }
    });
  }

  render() {
    return (
      <View style={style.pageContainer}>
        <View style={style.contentContainer}>
          <StyleProvider style={getTheme(platform)}>
            <Header>
              {/*<Left>
                                    <Button transparent>
                                        <Icon name='arrow-back' />
                                    </Button>
                                </Left>*/}
              <Body>
                <Title>New Test</Title>
              </Body>
            </Header>
          </StyleProvider>

          <ScrollView>
            <StyleProvider style={getTheme(platform)}>
              <Container style={{ height: 225 }}>
                <Separator bordered>
                  <Text>Test Information</Text>
                </Separator>
                <View style={style.form_Container}>
                  <Text style={style.input_Instruction}>Date</Text>
                  <TextInput
                    style={style.inputNormal}
                    placeholder={"Date: YYYY-MM-DD"}
                    multiline
                    blurOnSubmit
                    defaultValue={this.state.date}
                    editable={false}
                    placeholderTextColor={"rgba(198,198,204,1)"}
                  />
                  <Text style={style.input_Instruction}>Nurse First Name</Text>
                  <TextInput
                    ref={"nurseFirstNameInput"}
                    style={style.inputNormal}
                    autoCorrect={false}
                    placeholder={"Nurse: First Name"}
                    defaultValue={this.state.nurseFirstName}
                    onChangeText={value => {
                      this.setState({ nurseFirstName: value });
                    }}
                    multiline
                    blurOnSubmit
                    placeholderTextColor={"rgba(198,198,204,1)"}
                  />
                  <Text style={style.input_Instruction}>Nurse Last Name</Text>
                  <TextInput
                    ref={"nurseLastNameInput"}
                    style={style.inputNormal}
                    autoCorrect={false}
                    placeholder={"Nurse: Last Name"}
                    defaultValue={this.state.nurseLastName}
                    onChangeText={value => {
                      this.setState({ nurseLastName: value });
                    }}
                    multiline
                    blurOnSubmit
                    placeholderTextColor={"rgba(198,198,204,1)"}
                  />
                </View>
              </Container>
            </StyleProvider>

            <View style={styles.beta}>
              <Left>
                <Text style={style.switch_Text}>Antihistamine Recently?</Text>
              </Left>
              <Right>
                <Switch
                  onValueChange={value => {
                    this.setState({ antihistamineTrueIsOn: value });

                    // alert(value);
                  }}
                  style={{
                    marginRight: 20,
                    marginBottom: 15,
                    height: 17,
                    width: 24
                  }}
                  value={this.state.antihistamineTrueIsOn}
                />
              </Right>

              <Left>
                <Text style={style.switch_Text}>Betablocker?</Text>
              </Left>
              <Right>
                <Switch
                  onValueChange={value => {
                    this.setState({ betablockerTrueIsOn: value });

                    // alert(value);
                  }}
                  style={{
                    marginRight: 20,
                    marginBottom: 15,
                    height: 17,
                    width: 24
                  }}
                  value={this.state.betablockerTrueIsOn}
                />
              </Right>
            </View>

            <StyleProvider style={getTheme(platform)}>
              <TextInput
                ref={"detailsInput"}
                style={styles.input1}
                placeholder={"Details"}
                multiline
                blurOnSubmit
                autoCorrect={false}
                // clearButtonMode="always"
                placeholderTextColor={"rgba(198,198,204,1)"}
                onChangeText={text => {
                  this.setState({ details: text });
                }}
                onSubmitEditing={() => {
                  this.setState({ details: "" });
                }}
                value={this.state.details}
              />
            </StyleProvider>

            <StyleProvider style={getTheme(platform)}>
              <Container style={style.twoButtons_NewTest}>
                <Button style={styles.add} onPress={() => this.add()}>
                  <Icon style={styles.addIcon} name="ios-arrow-dropright" />
                  <Text style={styles.buttonText}>Save&Next</Text>
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

  confirmAndNavigate = () => {
    // A post entry.
    var postData = {
      date: this.state.date,
      nurseFirstName: this.state.nurseFirstName,
      nurseLastName: this.state.nurseLastName,
      antihistamine: this.state.antihistamine,
      betablocker: this.state.betablocker,
      details: this.state.details,
      sample: ""
    };

    console.log(postData); //for testing purpose

    //control input. Date, nurse first name, nurse last name cannot be empty
    if (postData.nurseFirstName === "") {
      alert("Nurse first name cannot be empty");
    } else if (postData.nurseLastName === "") {
      alert("Nurse last name cannot be empty");
    } else {
      var patientId = this.props.navigation.state.params.patientKey;

      // Get a key for a new Post.
      var newTestPostKey = firebase
        .database()
        .ref()
        .child(patientId)
        .push().key;

      // Get the path
      var updates = {};
      updates[patientId + "/tests/" + newTestPostKey] = postData;

      this.props.navigation.navigate("Allergen", {
        Patient: this.props.navigation.state.params.Patient,
        patientKey: this.props.navigation.state.params.patientKey,
        testKey: newTestPostKey,
        tests: postData,
        nurseId: this.props.navigation.state.params.nurseId
      }); //next page

      return firebase
        .database()
        .ref()
        .update(updates); //save result
    }
  };

  add = () => {
    if (
      this.state.antihistamineTrueIsOn === true ||
      this.state.betablockerTrueIsOn === true
    ) {
      AlertIOS.alert(
        "The patient has antihistamine/betablocker recently",
        "Are you sure to continue the test?",
        [
          {
            text: "Yes, continue to next step",
            onPress: () => {
              if (this.state.antihistamineTrueIsOn === true) {
                this.setState({ antihistamine: "Yes" });
              }

              if (this.state.betablockerTrueIsOn === true) {
                this.setState({ betablocker: "Yes" });
              }

              this.confirmAndNavigate();
            }
          },
          {
            text: "No, cancel the test",
            onPress: () =>
              this.props.navigation.navigate("SearchPage", {
                nurseId: this.props.navigation.state.params.nurseId
              })
          },
          {
            text: "Stay on this page",
            onPress: () => console.log("User cancels")
          }
        ]
      );
    } else {
      this.confirmAndNavigate();
    }

    // this.props.navigation.navigate('Allergen');
  };

  clear = () => {
    this.refs["nurseFirstNameInput"].setNativeProps({ text: "" });
    this.refs["nurseLastNameInput"].setNativeProps({ text: "" });
    this.refs["detailsInput"].setNativeProps({ text: "" });

    this.setState({
      date: new Date().toLocaleString(),
      nurseFirstName: "",
      nurseLastName: "",
      antihistamineTrueIsOn: false,
      betablockerTrueIsOn: false,
      details: ""
    });
  };

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
}

const styles = StyleSheet.create({
  beta: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 10,
    width: "80%"
  },

  InputBox: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },

  ButtonBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  input1: {
    height: 60,
    width: 280,
    borderRadius: 5,
    borderWidth: 1,
    textAlign: "left",
    margin: 3,
    marginBottom: 15,
    alignSelf: "center",
    borderColor: "#cccccc",
    fontSize: 12,
    paddingHorizontal: 6
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
