/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';
import {StackNavigator} from 'react-navigation';

import LoginScreen from './LoginScreen';
import Memberarea from './Memberarea';
import addSuccess from './addSuccess';
import newTest from './newTest';
import Allergen from './Allergen';
import TestAdded from './TestAdded';
import recentIncomplete from './recentIncomplete';
import recentComplete from './recentComplete';
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


export default StackNavigator({
    Login: {screen: LoginScreen},
    Memberarea: {screen: Memberarea},
    addSuccess: {screen: addSuccess},
    newTest: {screen: newTest},
    Allergen: {screen: Allergen},
    TestAdded: {screen: TestAdded},
    recentIncomplete: {screen: recentIncomplete},
    recentComplete: {screen: recentComplete},
    searchByName: {screen: searchByName},
    searchByPhoneNumber: {screen: searchByPhoneNumber},
    searchByItem: {screen: searchByItem},
    Options: {screen: Options},
    More: {screen: More},
    SearchPage: {screen: SearchPage},
    Search_NoTest_Add: {screen: Search_NoTest_Add},
    AllItemChosen: {screen: AllItemChosen},
    ItemAddSuccess: {screen: ItemAddSuccess},
    AddPatientResult:{screen: AddPatientResult},
    Search_HasTest: {screen: Search_HasTest},
    PatientResult: {screen: PatientResult},
}, {
    header: {
        left: null,
    }
});
