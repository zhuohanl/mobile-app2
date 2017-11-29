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

export default class Search_NoTest_Add extends Component {
  static navigationOptions = {
    title: "Search_NoTest_Add",
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      first_name: this.props.navigation.state.params.Patient.first_name,
      last_name: this.props.navigation.state.params.Patient.last_name,
      dob: this.props.navigation.state.params.Patient.dob,
      uid: this.props.navigation.state.params.Patient.uid,
      gender: this.props.navigation.state.params.Patient.gender
    };
  }
  render() {
    const { navigate } = this.props.navigation;

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

          <View>
            <Text style={style.heading_1_Patient}>
              {this.state.last_name} {this.state.first_name}
            </Text>
            <Text style={style.heading_2}>
              DoB: {this.state.dob} Gender:{this.state.gender}
            </Text>
          </View>

          <View>
            <Text style={style.heading_1_Patient}>
              The patient has no test record yet. Please create one now.
            </Text>
          </View>

          <StyleProvider style={getTheme(platform)}>
            <Container style={styles.buttonContainer}>
              <Button
                style={styles.buttonStyle}
                onPress={() =>
                  navigate("newTest", {
                    patientKey: this.props.navigation.state.params.Patient.key,
                    Patient: this.props.navigation.state.params.Patient,
                    nurseId: this.props.navigation.state.params.nurseId
                  })}
              >
                <Icon active style={style.records_Icon} name="md-add" />
                <Text style={style.records_Text}>Add Test</Text>
              </Button>
            </Container>
          </StyleProvider>
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
