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
  Dimensions
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

let listRecord_Complete = 0;
let listRecord_Incomplete = 0;
export default class Search_HasTest extends Component {
  static navigationOptions = {
    title: "Search_HasTest",
    header: null
  };
  constructor(props) {
    super(props);
    this.ref = firebase.database().ref();
    this.incomplete_tests = [];
    this.complete_tests = [];
    this.incomplete = [];
    this.complete = [];
    this.items = [];
    this.state = {
      patientID: this.props.navigation.state.params.Patient.key,
      first_name: this.props.navigation.state.params.Patient.first_name,
      last_name: this.props.navigation.state.params.Patient.last_name,
      dob: this.props.navigation.state.params.Patient.dob,
      uid: this.props.navigation.state.params.Patient.uid,
      gender: this.props.navigation.state.params.Patient.gender
    };
  }
  componentWillMount() {
    let patientID = this.props.navigation.state.params.Patient.key;
    //console.log("patient id is: ", patientID);//for test purpose
    this.ref.child(patientID + "/tests").on("value", snap => {
      snap.forEach(child => {
        let item = child.val();
        item.key = child.key;
        //console.log("item:", item); //for test purpose
        this.items.push(item);
      });
    });

    let allTestRecords = this.items;
    for (i = 0; i < allTestRecords.length; i++) {
      if (allTestRecords[i].finishTime != null) {
        //console.log("finish time: ", allTestRecords[i].finishTime);//for test purpose
        this.complete.push([
          i + 1,
          allTestRecords[i].date,
          allTestRecords[i].nurseFirstName +
            " " +
            allTestRecords[i].nurseLastName,
          allTestRecords[i].finishTime
        ]);
        this.complete_tests.push(allTestRecords[i]);
      } else {
        this.incomplete.push([
          i + 1,
          allTestRecords[i].date,
          allTestRecords[i].nurseFirstName +
            " " +
            allTestRecords[i].nurseLastName
        ]);
        this.incomplete_tests.push(allTestRecords[i]);
        //console.log("incomplete_tests i: ", this.incomplete_tests[i]); for test purpose
      }
    }
  }

  renderButtons_Complete = name => {
    const buttons = [];
    listRecord_Complete = this.complete.length; //TODO: change to the number of test
    for (let i = 1; i <= listRecord_Complete; i++) {
      buttons.push(
        <TouchableOpacity
          key={i}
          style={style.table_Button_Opacity}
          onPress={() => this.viewPressCell(i - 1)}
        >
          <Cell
            data={name}
            style={style.table_Row_Button_Cell}
            textStyle={style.table_Text_Button_Cell}
          />
        </TouchableOpacity>
      );
    }
    return buttons;
  };
  renderButtons_Add = name => {
    listRecord_Incomplete = this.incomplete.length;
    //console.log("number of incomplete_tests: ", listRecord_Incomplete); //for test purpose
    const buttons = [];
    for (let i = 1; i <= listRecord_Incomplete; i++) {
      buttons.push(
        <TouchableOpacity
          key={i}
          style={style.table_Button_Opacity}
          onPress={() => this.addPressCell(i - 1)}
        >
          <Cell
            data={name}
            style={style.table_Row_Button_Cell}
            textStyle={style.table_Text_Button_Cell}
          />
        </TouchableOpacity>
      );
    }
    return buttons;
  };
  renderButtons_Modify = name => {
    listRecord_Incomplete = this.incomplete.length;
    //console.log("number of incomplete_tests: ", listRecord_Incomplete); //for test purpose
    const buttons = [];
    for (let i = 1; i <= listRecord_Incomplete; i++) {
      buttons.push(
        <TouchableOpacity
          key={i}
          style={style.table_Button_Opacity}
          onPress={() => this.modifyPressCell(i - 1)}
        >
          <Cell
            data={name}
            style={style.table_Row_Button_Cell}
            textStyle={style.table_Text_Button_Cell}
          />
        </TouchableOpacity>
      );
    }
    return buttons;
  };

  render() {
    const { navigate } = this.props.navigation;
    const tableHead_Complete = [
      "No",
      "Start Time",
      "Nurse Name",
      "Finished Time"
    ];
    const tableData_Complete = this.complete;
    const widthArr_Complete = [48, 192, 240, 168];

    const tableHead_Incomplete = ["No", "Time Stamp", "Created By"];
    let tableData_Incomplete = this.incomplete;

    const widthArr_Incomplete = [48, 192, 288];

    return (
      <View style={style.pageContainer}>
        <View style={style.contentContainer}>
          <StyleProvider style={getTheme(platform)}>
            <Header>
              <Button transparent>
                <Icon
                  style={{ color: "#fff" }}
                  name="arrow-back"
                  onPress={() =>
                    navigate("SearchPage", {
                      nurseId: this.props.navigation.state.params.nurseId
                    })}
                />
              </Button>

              <Body>
                <Title>Patient Information</Title>
              </Body>
            </Header>
          </StyleProvider>

          <ScrollView>
            <View>
              <Text style={style.heading_1_Patient}>
                {this.state.last_name} {this.state.first_name}
              </Text>
              <Text style={style.heading_2}>
                DoB: {this.state.dob} Gender:
                {this.state.gender}
              </Text>
            </View>

            <View>
              <Text style={style.heading_1_CompleteRecord}>
                Incomplete Record
              </Text>
            </View>

            <Table style={style.table_Container}>
              <TableWrapper style={{ width: 528 }}>
                <Row
                  data={tableHead_Incomplete}
                  style={style.table_Head}
                  widthArr={widthArr_Incomplete}
                  textStyle={style.table_Text_Head}
                />
                <Rows
                  data={tableData_Incomplete}
                  style={style.table_Row}
                  widthArr={widthArr_Incomplete}
                  textStyle={style.table_Text}
                />
              </TableWrapper>

              <TableWrapper style={{ width: 120 }}>
                <Cell
                  data="Result"
                  style={style.table_Head}
                  textStyle={style.table_Text_Head}
                />

                {this.renderButtons_Add("Add")}
              </TableWrapper>

              <TableWrapper style={{ width: 120 }}>
                <Cell
                  data="Operation"
                  style={style.table_Head}
                  textStyle={style.table_Text_Head}
                />

                {this.renderButtons_Modify("Modify")}
              </TableWrapper>
            </Table>

            <View>
              <Text style={style.heading_1_CompleteRecord}>
                Complete Record
              </Text>
            </View>

            <Table style={style.table_Container}>
              <TableWrapper style={{ width: 648 }}>
                <Row
                  data={tableHead_Complete}
                  style={style.table_Head}
                  widthArr={widthArr_Complete}
                  textStyle={style.table_Text_Head}
                />
                <Rows
                  data={tableData_Complete}
                  style={style.table_Row}
                  widthArr={widthArr_Complete}
                  textStyle={style.table_Text}
                />
              </TableWrapper>

              <TableWrapper style={{ width: 120 }}>
                <Cell
                  data="Result"
                  style={style.table_Head}
                  textStyle={style.table_Text_Head}
                />

                {this.renderButtons_Complete("View")}
              </TableWrapper>
            </Table>

            <StyleProvider style={getTheme(platform)}>
              <Container style={styles.buttonContainer}>
                <Button
                  style={styles.buttonStyle}
                  onPress={() =>
                    navigate("newTest", {
                      patientKey: this.props.navigation.state.params.Patient
                        .key,
                      Patient: this.props.navigation.state.params.Patient,
                      nurseId: this.props.navigation.state.params.nurseId
                    })}
                >
                  <Icon active style={style.records_Icon} name="md-add" />
                  <Text style={style.records_Text}>Add Test</Text>
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

  addPressCell = i => {
    //console.log("incomplete_tests[i]:", this.incomplete_tests[i]);
    this.props.navigation.navigate("AddPatientResult", {
      Patient: this.props.navigation.state.params.Patient,
      patientKey: this.state.patientID,
      testKey: this.incomplete_tests[i].key,
      tests: this.incomplete_tests[i],
      nurseId: this.props.navigation.state.params.nurseId
    });
  };
  modifyPressCell = i => {
    this.props.navigation.navigate("AllItemChosen", {
      Patient: this.props.navigation.state.params.Patient,
      patientKey: this.state.patientID,
      testKey: this.incomplete_tests[i].key,
      tests: this.incomplete_tests[i],
      nurseId: this.props.navigation.state.params.nurseId
    });
  };
  viewPressCell = i => {
    //console.log("testKey:", this.complete_tests[i].key); for test purpose
    this.props.navigation.navigate("PatientResult", {
      Patient: this.props.navigation.state.params.Patient,
      patientKey: this.state.patientID,
      testKey: this.complete_tests[i].key,
      tests: this.complete_tests[i],
      nurseId: this.props.navigation.state.params.nurseId
    });
  };
}

const styles = StyleSheet.create({
  buttonContainer: {
    //backgroundColor: "rgba(30,50,59,0)"
    //justifyContent: "center",
    marginTop: 10,
    alignItems: "center"
  },
  buttonStyle: {
    width: "40%",
    alignSelf: "center",
    margin: 15,
    backgroundColor: "#0288D1"
  }
});
