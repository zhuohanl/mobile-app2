import React, { Component } from "react";
import {
  Platform,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { StackNavigator } from "react-navigation";

import firebase from "./firebaseConfig";
import style from "./style";
import { Button } from "react-native-elements";

export default class LoginScreen extends Component<{}> {
  static navigationOptions = {
    title: "LoginScreen",
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={style.pageContainer}>
        <ImageBackground
          source={require("./back.jpg")}
          style={style.backgroundImage_Login}
        >
          <View style={style.innerPageContainer_Login}>
            <View style={style.inputContainer_Login}>
              <Text style={style.logo1_Login}>Royal Adelaide Hospital</Text>
              <Text style={style.logo2_Login}>
                Prick Test Management System
              </Text>
              <TextInput
                underlineColorIos="transparent"
                style={style.inputbox_Login}
                placeholder="username"
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
              <TextInput
                secureTextEntry={true}
                underlineColorIos="transparent"
                style={style.inputbox_Login}
                placeholder="password"
                autoCorrect={false}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
            </View>
            <View style={style.buttonContainer_Login}>
              <Button
                raised
                icon={{ name: "send" }}
                fontSize={12}
                textStyle={{ fontWeight: "bold" }}
                containerViewStyle={{ alignItems: "center" }}
                onPress={() =>
                  // {navigate("SearchPage");}
                  {
                    //navigate("SearchPage");
                    this.login();
                  }
                //TODO: need to enable
                }
                buttonStyle={style.Login_Button}
                title="Login"
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: "",
      loading: false
    };
  }

  login = () => {
    this.setState({ error: "", loading: true });

    const { email, password } = this.state;

    if (this.state.email === "") {
      alert("Authentication failed, please enter email/password!");
    } else if (this.state.password === "") {
      alert("Authentication failed, please enter email/password!");
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          this.setState({ error: "", loading: false });
          this.props.navigation.navigate("SearchPage", { nurseId: user.uid });
        })
        .catch(() => {
          this.setState({ error: "Authentication failed.", loading: false });
          alert("Authentication failed, please try again!");
        });
    }
  };
}
