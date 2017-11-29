/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Alert,
  AppRegistry,
  Image,
  TouchableHighlight,
  ScrollView,
  AsyncStorage,
  TextInput,
  DatePickerIOS,
  TouchableOpacity,
  AlertIOS
} from "react-native";

import style from "./style";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell
} from "react-native-table-component";
import { StackNavigator, NavigationActions } from "react-navigation";
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

export default class AddPatientResult extends Component {
  static navigationOptions = {
    title: "AddPatientResult",
    header: null
  };
  constructor(props) {
    super(props);
    this.ref = firebase.database().ref();
    this.items = [];
    this.itemArray = [];
    this.results = [];
    this.state = {
      testKey: this.props.navigation.state.params.testKey,
      date: this.props.navigation.state.params.tests.date,
      uid: this.props.navigation.state.params.patientKey,
      first_name: this.props.navigation.state.params.Patient.first_name,
      last_name: this.props.navigation.state.params.Patient.last_name,
      gender: this.props.navigation.state.params.Patient.gender,
      dob: this.props.navigation.state.params.Patient.dob
    };
  }

  componentWillMount() {
    let uid = this.state.uid;
    let testKey = this.state.testKey;
    console.log("patient id is: ", uid);
    console.log("test key is: ", testKey);
    this.ref.child(uid + "/tests/" + testKey + "/sample").on("value", snap => {
      snap.forEach(child => {
        let item = child.val();
        item.key = child.key;
        console.log("sample item:", item);
        this.items.push(item);
      });
    });
    let samples = this.items;
    for (i = 0; i < samples.length; i++) {
      this.itemArray.push([i + 1, samples[i].category, samples[i].item]);

      this.results.push([
        i + 1,
        samples[i].category,
        samples[i].item,
        ["wheal"],
        ["flare"],
        ["ps"]
      ]);
    }
  }

  renderInputbox = label => {
    var results = this.results;

    console.log("Results before adding", results);

    var listRecord = results.length;

    const buttons = [];
    for (let i = 1; i <= listRecord; i++) {
      buttons.push(
        <TextInput
          ref={"results"}
          key={i}
          style={styles.input1}
          blurOnSubmit
          keyboardType={"numeric"}
          onChangeText={text => {
            if (label === "wheal") {
              results[i - 1][3][1] = text;
            } else if (label === "flare") {
              results[i - 1][4][1] = text;
            } else if (label === "ps") {
              results[i - 1][5][1] = text;
            }

            this.setState({ results: results }); //update local data
          }}
          // onSubmitEditing={() => {
          //   this.setState({ text: "" });
          // }}
        >
          <Cell
            style={style.table_Row_Button_Cell}
            textStyle={style.table_Text_Button_Cell}
          />
        </TextInput>
      );
    } //end of for loop
    return buttons;
  };

  render() {
    const { navigate } = this.props.navigation;

    const tableHead = ["No", "Category", "Item"];
    const tableData = this.itemArray;
    // [
    //   ["1", "Bean (Green String)"],
    //   ["2", "Rye - Wholegrain mix"],
    //   ["3", "Latex"]
    // ];
    const widthArr = [60, 156, 156];

    return (
      <View style={style.pageContainer}>
        <View style={style.contentContainer}>
          <StyleProvider style={getTheme(platform)}>
            <Header>
              <Body>
                <Title>Add Test Result</Title>
              </Body>
            </Header>
          </StyleProvider>

          <ScrollView>
            <View>
              <Text style={style.heading_1_Patient}>
                {this.state.first_name} {this.state.last_name}
              </Text>
              <Text style={style.heading_2}>
                DoB: {this.state.dob} Gender:{this.state.gender}
              </Text>
              <Text style={style.heading_2}>Test Date: {this.state.date}</Text>
            </View>

            <Table style={style.table_Container}>
              <TableWrapper style={{ width: 372 }}>
                <Row
                  data={tableHead}
                  style={style.table_Head}
                  widthArr={widthArr}
                  textStyle={style.table_Text_Head}
                />
                <Rows
                  data={tableData}
                  style={style.table_Row}
                  widthArr={widthArr}
                  textStyle={style.table_Text}
                />
              </TableWrapper>

              <TableWrapper style={{ width: 132 }}>
                <Cell
                  data="WHEAL"
                  style={style.table_Head}
                  textStyle={style.table_Text_Head}
                />

                {this.renderInputbox("wheal")}
              </TableWrapper>

              <TableWrapper style={{ width: 132 }}>
                <Cell
                  data="FLARE"
                  style={style.table_Head}
                  textStyle={style.table_Text_Head}
                />

                {this.renderInputbox("flare")}
              </TableWrapper>

              <TableWrapper style={{ width: 132 }}>
                <Cell
                  data="PS"
                  style={style.table_Head}
                  textStyle={style.table_Text_Head}
                />

                {this.renderInputbox("ps")}
              </TableWrapper>
            </Table>

            <StyleProvider style={getTheme(platform)}>
              <Container style={style.twoButtons_ItemChosen}>
                <Button style={styles.add} onPress={() => this.add()}>
                  <Icon
                    style={styles.addIcon}
                    name="ios-checkmark-circle-outline"
                  />
                  <Text style={styles.buttonText}>Submit results</Text>
                </Button>
                <Button style={styles.clear} onPress={this.cancel}>
                  <Icon
                    style={styles.clearIcon}
                    name="ios-close-circle-outline"
                  />
                  <Text style={styles.buttonText}>Cancel</Text>
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

  add = () => {
    var results = this.results;

    //check if there is unfilled blanks
    var incompleteCount = 0;
    for (var i = 0; i < results.length; i++) {
      if (typeof results[i][3][1] === "undefined") {
        incompleteCount++;
      }

      if (results[i][3][1] === "") {
        incompleteCount++;
      }

      if (typeof results[i][4][1] === "undefined") {
        incompleteCount++;
      }

      if (results[i][4][1] === "") {
        incompleteCount++;
      }
    }

    // if there are unfilled blanks, alert
    // here has not controlled PS fill/unfill
    if (incompleteCount !== 0) {
      AlertIOS.alert(
        "You have " + incompleteCount + " blanks unfilled",
        "Please fill in",
        [{ text: "OK", onPress: () => console.log("User pressed OK") }]
      );
      //if all filled, alert the user to confirm
    } else {
      AlertIOS.alert(
        "You are going to submit the test results",
        "Do you confirm to submit?",
        [
          { text: "Cancel" },
          {
            text: "OK",
            onPress: () => {
              // Loop over each sample item
              for (var i = 0; i < results.length; i++) {
                if (typeof results[i][5][1] == "undefined") {
                  psResult = "";
                } else {
                  psResult = results[i][5][1];
                }

                var postData = {
                  category: results[i][1],
                  item: results[i][2],
                  wheal: results[i][3][1],
                  flare: results[i][4][1],
                  ps: psResult
                  // ps : results[i][5][1], //contain undefined
                };

                // Get the path
                var itemIndex = this.items[i].key;
                var uid = this.props.navigation.state.params.patientKey;
                var testKey = this.props.navigation.state.params.testKey;

                //hardcode for testing purpose
                // var uid = '-Kx6swMwADG0XdToGe7P';
                // var testKey = '-Kx6t0sOfECs2Lx8Azpw';

                // Get the update
                var updates = {};
                updates[
                  uid + "/tests/" + testKey + "/sample/" + itemIndex
                ] = postData;

                // Fire update
                firebase
                  .database()
                  .ref()
                  .update(updates); //save result
              } //end of for loop of each sample

              //finish time update
              this.ref
                .child(uid + "/tests/" + testKey)
                .once("value")
                .then(snapshot => {
                  var value = snapshot.val();
                  value.finishTime = new Date().toLocaleString();
                  return value;
                })
                .then(value => {
                  var updates = {};
                  updates[uid + "/tests/" + testKey] = value;

                  // Fire update
                  this.ref.update(updates); //save result
                })
                .catch(err => {
                  console.log("err", err);
                });

              //go to the view page
              this.props.navigation.navigate("PatientResult", {
                Patient: this.props.navigation.state.params.Patient,
                patientKey: this.state.uid,
                testKey: this.props.navigation.state.params.testKey,
                tests: this.props.navigation.state.params.tests,
                nurseId: this.props.navigation.state.params.nurseId
              });
            } // end of onPress function
          } // end of "OK" option
        ] //end of alert options
      ); //end of alert
    } //end of if else
  };

  cancel = () => {
    this.props.navigation.navigate("SearchPage", {
      nurseId: this.props.navigation.state.params.nurseId
    }); //if cancel, back to search page
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
  },

  input1: {
    height: 30,
    width: 132,
    textAlign: "center",
    alignSelf: "center",
    fontSize: 10,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderRightWidth: 1,
    borderColor: "#212121"
  }
});
