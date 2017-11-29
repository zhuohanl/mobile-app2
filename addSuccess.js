import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
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

export default class addSuccess extends Component<{}> {
  static navigationOptions = {
    title: "Add Success",
    header: null,
    headerLeft: null
  };

  render() {
    return (
      <View style={style.pageContainer}>
        <View style={style.contentContainer}>
          <StyleProvider style={getTheme(platform)}>
            <Header>
              <Body>
                <Title>New Test</Title>
              </Body>
            </Header>
          </StyleProvider>

          <Image
            source={require("./success.png")}
            style={style.Success_Image}
          />

          <Text style={style.Success_Instruction}>Add Patient</Text>

          <Text style={style.Success_Text}>Successful</Text>

          <StyleProvider style={getTheme(platform)}>
            <Button style={styles.newTest} onPress={this.newT}>
              <Icon style={style.Button_Icon} name="paper" />
              <Text style={styles.buttonText}>Choose Item</Text>
            </Button>
          </StyleProvider>

          <StyleProvider style={getTheme(platform)}>
            <Button style={styles.back} onPress={this.back}>
              <Icon style={style.Button_Icon} name="ios-arrow-back-outline" />
              <Text style={styles.buttonText}>Back</Text>
            </Button>
          </StyleProvider>
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

  newT = () => {
    this.props.navigation.navigate("newTest", {
      patientKey: this.props.navigation.state.params.patientKey,
      Patient: this.props.navigation.state.params.Patient,
      nurseId: this.props.navigation.state.params.nurseId
    });
  };

  more = () => {
    this.props.navigation.navigate("More", {
      nurseId: this.props.navigation.state.params.nurseId
    });
  };

  back = () => {
    this.props.navigation.navigate("Memberarea", {
      nurseId: this.props.navigation.state.params.nurseId
    });
  };
}

const styles = StyleSheet.create({
  newTest: {
    height: 30,
    backgroundColor: "#0277BD",
    width: 200,
    margin: 1,
    justifyContent: "center",
    alignSelf: "center",
    margin: 5
  },

  back: {
    height: 30,
    backgroundColor: "#BDBDBD",
    width: 200,
    margin: 1,
    justifyContent: "center",
    alignSelf: "center",
    margin: 5
  },

  buttonText: {
    padding: 4,
    color: "#fff",
    fontWeight: "bold",
    margin: 0,
    fontSize: 10
  }
});
