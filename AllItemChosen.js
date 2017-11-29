/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  ListView,
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

export default class AllItemChosen extends Component {
  static navigationOptions = {
    title: "AllItemChosen",
    header: null
  };
  constructor(props) {
    super(props);
    this.ref = firebase.database().ref();
    this.items = [];
    this.allItemChosen = [];
    this.state = {
      tests: this.props.navigation.state.params.tests,
      testKey: this.props.navigation.state.params.testKey,
      date: this.props.navigation.state.params.tests.date,
      nurseLastName: this.props.navigation.state.params.tests.nurseLastName,
      nurseFirstName: this.props.navigation.state.params.tests.nurseFirstName,
      //patientID: this.props.navigation.state.params.patientKey,
      first_name: this.props.navigation.state.params.Patient.first_name,
      last_name: this.props.navigation.state.params.Patient.last_name,
      // dob_year: this.props.navigation.state.params.Patient.dob_year,
      // dob_month: this.props.navigation.state.params.Patient.dob_month,
      // dob_day: this.props.navigation.state.params.Patient.dob_day,
      // phone: this.props.navigation.state.params.Patient.phone,
      gender: this.props.navigation.state.params.Patient.gender,
      dob: this.props.navigation.state.params.Patient.dob,
      uid: this.props.navigation.state.params.patientKey
    };
  }
  componentWillMount() {
    let uid = this.state.uid;
    let testKey = this.state.testKey;
    //console.log("patient id is: ", patientID);
    //console.log("test key is: ", testKey);
    this.ref.child(uid + "/tests/" + testKey + "/sample").on("value", snap => {
      snap.forEach(child => {
        let item = child.val();
        item.key = child.key;
        this.items.push(item);
      });
    });

    let testItems = this.items;
    // console.log("test items: ", testItems);
    for (i = 0; i < testItems.length; i++) {
      // console.log("testItems[i]: ", testItems[i]);
      this.allItemChosen.push([
        i + 1,
        testItems[i].category,
        testItems[i].item
      ]);
      //console.log("allItemChosen", this.allItemChosen);
    }
    this.ref
      .child(uid + "/tests/" + testKey + "/sample")
      .on("child_removed", dataSnapshot => {
        this.items = this.items.filter(i => i.key !== dataSnapshot.key);
        //console.log("Remove success!");
      });
  }
  removeItems = i => {
    let uid = this.state.uid;
    let testKey = this.state.testKey;
    let sampleKey = this.items[i].key;
    //console.log("sample key is: ", sampleKey);
    //Alert.alert("remove this item from the test!");//TODO:add ok and cancel
    this.ref.child(uid + "/tests/" + testKey + "/sample/" + sampleKey).remove();

    this.props.navigation.navigate("AllItemChosen", {
      Patient: this.props.navigation.state.params.Patient,
      patientKey: this.state.uid,
      testKey: this.state.testKey,
      tests: this.state.tests,
      nurseId: this.props.navigation.state.params.nurseId
    });
    //console.log("length1: ", this.allItemChosen.length);
  };

  renderButtons = name => {
    var listRecord = this.items;
    // console.log("listRecord length:", listRecord.length);
    const buttons = [];
    for (let i = 1; i <= listRecord.length; i++) {
      buttons.push(
        <TouchableOpacity
          key={i}
          style={style.table_Button_Opacity}
          onPress={() => this.removeItems(i - 1)}
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

    const tableHead = ["No", "Category", "Item"];
    const tableData = this.allItemChosen;

    const widthArr = [72, 264, 264];

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
                    this.props.navigation.navigate("Allergen", {
                      tests: this.props.navigation.state.params.tests,
                      Patient: this.props.navigation.state.params.Patient,
                      patientKey: this.state.uid,
                      testKey: this.state.testKey,
                      nurseId: this.props.navigation.state.params.nurseId
                      // onGoBack: value => this.setState({ sampleItems: value })
                    })}
                />
              </Button>

              <Body>
                <Title>Items Chosen</Title>
              </Body>
            </Header>
          </StyleProvider>

          <ScrollView>
            <View>
              <Text style={style.heading_1_Patient}>
                {this.state.first_name} {this.state.last_name}
              </Text>
              <Text style={style.heading_2}>
                DoB: {this.state.dob} Gender: {this.state.gender}
              </Text>
            </View>

            <View>
              <Text style={style.heading_2} />
              <Text style={style.heading_2}>All the items selected are:</Text>
            </View>

            <Table style={style.table_Container}>
              <TableWrapper style={{ width: 600 }}>
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

              <TableWrapper style={{ width: 168 }}>
                <Cell
                  data="Result"
                  style={style.table_Head}
                  textStyle={style.table_Text_Head}
                />

                {this.renderButtons("Remove")}
              </TableWrapper>
            </Table>

            <StyleProvider style={getTheme(platform)}>
              <Container style={style.twoButtons_ItemChosen}>
                <Button style={styles.add} onPress={() => this.add()}>
                  <Icon style={styles.addIcon} name="ios-add-circle" />
                  <Text style={styles.buttonText}>Save</Text>
                </Button>
                <Button style={styles.clear} onPress={() => this.home()}>
                  <Icon style={styles.clearIcon} name="remove-circle" />
                  <Text style={styles.buttonText}>Cancle</Text>
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
                  <Text style={style.tabButton_Text}>New Test</Text>
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
    // Go to next page
    this.props.navigation.navigate("ItemAddSuccess", {
      Patient: this.props.navigation.state.params.Patient,
      tests: this.props.navigation.state.params.tests,
      patientKey: this.props.navigation.state.params.patientKey,
      testKey: this.props.navigation.state.params.testKey,
      nurseId: this.props.navigation.state.params.nurseId
    });
  };

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
  }
});
