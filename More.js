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

export default class More extends Component {
  static navigationOptions = {
    title: "More",
    header: null,
    headerLeft: null
  };

  constructor(props) {
    super(props);
    this.ref = firebase.database().ref();
  }

  render() {
    return (
      <View style={style.pageContainer}>
        <View style={style.contentContainer}>
          <StyleProvider style={getTheme(platform)}>
            <Header>
              <Body>
                <Title>More</Title>
              </Body>
            </Header>
          </StyleProvider>

          <StyleProvider style={getTheme(platform)}>
            <Container style={styles.buttonContainer}>
              <Button
                active
                style={styles.buttonStyle}
                onPress={() => this.logout()}
              >
                <Icon active style={style.records_Icon} name="ios-log-out" />
                <Text style={style.records_Text}>Log Out</Text>
              </Button>
            </Container>
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
                <Button vertical onPress={this.newT}>
                  <Icon active style={style.tabButton_Icon} name="person" />
                  <Text style={style.tabButton_Text}>New Patient</Text>
                </Button>
                <Button vertical active onPress={this.more}>
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

  logout = () => {
    AlertIOS.alert("You are going to log out", "Do you wish to continue?", [
      {
        text: "Yes",
        onPress: () => {
          firebase
            .auth()
            .signOut()
            .then(() => {
              // Sign-out successful.
              console.log("Sign out successfully");
              this.props.navigation.navigate("Login");
            })
            .catch(error => {
              // An error happened.
              console.log(error);
            });
        }
      },
      {
        text: "Cancel",
        onPress: () => console.log("User pressed cancel")
      }
    ]);
  };
}

const styles = StyleSheet.create({
  buttonContainer: {
    //backgroundColor: "rgba(30,50,59,0)"
    //justifyContent: "center",
    marginTop: 40,
    alignItems: "center"
  },
  buttonStyle: {
    width: "50%",
    alignSelf: "center",
    margin: 15,
    backgroundColor: "#0288D1"
  }
});
