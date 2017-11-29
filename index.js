import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Navigator } from "react-native";
import { StackNavigator } from "react-navigation";
import App from "./App";

import Memberarea from "./Memberarea";
import addSuccess from "./addSuccess";
import newTest from "./newTest";
import Allergen from "./Allergen";
import TestAdded from "./TestAdded";
import recentIncomplete from "./recentIncomplete";
import recentComplete from "./recentComplete";
import searchByName from "./searchByName";
import searchByPhoneNumber from "./searchByPhoneNumber";
import searchByItem from "./searchByItem";
import Options from "./Options";
import More from "./More";
import SearchPage from "./SearchPage";
import Search_NoTest_Add from "./Search_NoTest_Add";
import AllItemChosen from "./AllItemChosen";
import ItemAddSuccess from "./ItemAddSuccess";
import AddPatientResult from "./AddPatientResult";
import Search_HasTest from "./Search_HasTest";
import PatientResult from "./PatientResult";

console.disableYellowBox = true;

export default class Project extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ id: "App" }}
        renderScene={this.navigatorRenderScene}
      />
    );
  }

  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.id) {
      case "App":
        return <App navigator={navigator} />;
      case "Memberarea":
        return <Memberarea navigator={navigator} />;
      case "addSuccess":
        return <addSuccess navigator={navigator} />;
      case "newTest":
        return <newTest navigator={navigator} />;
      case "Allergen":
        return <Allergen navigator={navigator} />;
      case "TestAdded":
        return <TestAdded navigator={navigator} />;
      case "recentIncomplete":
        return <recentIncomplete navigator={navigator} />;
      case "recentComplete":
        return <recentComplete navigator={navigator} />;
      case "searchByName":
        return <searchByName navigator={navigator} />;
      case "searchByPhoneNumber":
        return <searchByPhoneNumber navigator={navigator} />;
      case "searchByItem":
        return <searchByItem navigator={navigator} />;
      case "Options":
        return <Options navigator={navigator} />;
      case "More":
        return <More navigator={navigator} />;
      case "SearchPage":
        return <More navigator={navigator} />;
      case "Search_NoTest_Add":
        return <More navigator={navigator} />;
      case "AllItemChosen":
        return <More navigator={navigator} />;
      case "ItemAddSuccess":
        return <More navigator={navigator} />;
      case "AddPatientResult":
        return <More navigator={navigator} />;
      case "Search_HasTest":
        return <More navigator={navigator} />;
      case "PatientResult":
        return <More navigator={navigator} />;
    }
  }
}

AppRegistry.registerComponent("Awesome", () => App);
