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
  TouchableOpacity
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

export default class PatientResult extends Component {
  static navigationOptions = {
    title: "PatientResult",
    header: null
  };
  constructor(props) {
    super(props);
    this.ref = firebase.database().ref();
    this.items = [];
    this.result = [];
    this.state = {
      sample: this.props.navigation.state.params.tests.sample,
      date: this.props.navigation.state.params.tests.date,
      nurseLastName: this.props.navigation.state.params.tests.nurseLastName,
      nurseFirstName: this.props.navigation.state.params.tests.nurseFirstName,
      patientID: this.props.navigation.state.params.patientKey,
      first_name: this.props.navigation.state.params.Patient.first_name,
      last_name: this.props.navigation.state.params.Patient.last_name,
      dob: this.props.navigation.state.params.Patient.dob,
      gender: this.props.navigation.state.params.Patient.gender
    };
  }
  componentWillMount() {
    let patientID = this.props.navigation.state.params.patientKey;
    let testKey = this.props.navigation.state.params.testKey;
    console.log("patient id is: ", patientID);
    console.log("test key is: ", testKey);
    this.ref
      .child(patientID + "/tests/" + testKey + "/sample")
      .on("value", snap => {
        snap.forEach(child => {
          let item = child.val();
          item.key = child.key;
          console.log("sample item:", item);
          this.items.push(item);
        });
      });

    let testResults = this.items;
    console.log("testResults: ", testResults);
    for (i = 0; i < testResults.length; i++) {
      console.log("testResults[i]: ", testResults[i]);
      this.result.push([
        i + 1,
        testResults[i].category,
        testResults[i].item,
        testResults[i].wheal,
        testResults[i].flare,
        testResults[i].ps
      ]);
    }
  }
  renderInputbox = () => {
    const buttons = [];
    let listRecord = this.result.length;
    console.log("length:", listRecord);
    for (let i = 1; i <= listRecord; i++) {
      buttons.push(
        <TextInput
          key={i}
          style={styles.input1}
          blurOnSubmit
          onChangeText={text => {
            this.setState({ text });
          }}
          onSubmitEditing={() => {
            this.setState({ text: "" });
          }}
        >
          <Cell
            style={style.table_Row_Button_Cell}
            textStyle={style.table_Text_Button_Cell}
          />
        </TextInput>
      );
    }
    return buttons;
  };

  render() {
    const { navigate } = this.props.navigation;

    const tableHead = ["No", "Category", "Item", "Wheal", "Flare", "PS"];
    const tableData = this.result;
    const widthArr = [60, 156, 156, 132, 132, 132];

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
                    navigate("Search_HasTest", {
                      Patient: this.props.navigation.state.params.Patient,
                      nurseId: this.props.navigation.state.params.nurseId
                    })}
                />
              </Button>
              <Body>
                <Title>Patient Result</Title>
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
              <Text style={style.heading_2}>Test Time: {this.state.date}</Text>
              <Text style={style.heading_2}>
                Nurse Name: {this.state.nurseLastName}{" "}
                {this.state.nurseFirstName}
              </Text>
            </View>

            <Table style={style.table_Container}>
              <TableWrapper style={{ width: 768 }}>
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
            </Table>

            <StyleProvider style={getTheme(platform)}>
              <Container style={style.twoButtons_ItemChosen}>
                <Button style={styles.add} onPress={() => this.home()}>
                  <Icon
                    style={styles.addIcon}
                    name="ios-checkmark-circle-outline"
                  />
                  <Text style={styles.buttonText}>Back to search</Text>
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

  add = () => {
    this.props.navigation.navigate();
  };

  clear = () => {};

  home = () => {
    this.props.navigation.navigate("SearchPage", {
      nurseId: this.props.navigation.state.params.nurseId
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
