/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Alert,
    AppRegistry,
    Text,
    Image,
    TouchableHighlight,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import style from './style';

import {Button} from 'react-native-elements';


var t = require('tcomb-form-native');

var Form = t.form.Form;

var Person = t.struct({
    FirstName: t.String,              // a required string
    LastName: t.String,           // a required string
});

t.form.Form.stylesheet.controlLabel.normal.fontSize = 12;
t.form.Form.stylesheet.controlLabel.error.fontSize = 12;
t.form.Form.stylesheet.textbox.normal.height = 25;
t.form.Form.stylesheet.textbox.error.height = 25;
t.form.Form.stylesheet.textbox.notEditable.height = 25;
t.form.Form.stylesheet.textbox.normal.fontSize = 12;
t.form.Form.stylesheet.textbox.error.fontSize = 12;
t.form.Form.stylesheet.textbox.notEditable.fontSize = 12;
t.form.Form.stylesheet.textbox.normal.paddingVertical = 4;
t.form.Form.stylesheet.textbox.error.paddingVertical = 4;
t.form.Form.stylesheet.textbox.notEditable.paddingVertical = 4;
t.form.Form.stylesheet.textbox.normal.marginBottom = 3;
t.form.Form.stylesheet.textbox.error.marginBottom = 3;
t.form.Form.stylesheet.textbox.notEditable.marginBottom = 3;

var options = {
    fields: {
        FirstName: {
            label: 'First Name', // <= label for the name field
            placeholder: 'First Name',
        },
        LastName: {
            label: 'Last Name', // <= label for the name field
            placeholder: 'Last Name',
        },
    }
};



export default class searchByName extends Component {

    static navigationOptions = {
        title: 'searchByName',
        header: null,
    };

    render() {

        const {navigate} = this.props.navigation;

        return (
            <View style={style.pageContainer}>


                <View style={style.headerContainer}>

                    <TouchableHighlight onPress={() => navigate('searchPage')}
                                        underlayColor='rgba(0,0,0,0)'>
                        <Image source={require('./image/left-arrow.png')}
                               style={style.left_arrow}
                        />
                    </TouchableHighlight>


                    <Text style={style.navigation_Heading}>Search By Name</Text>

                </View>

                <View style={style.contentContainer_has_header}>

                    <Text style={style.instructions}>
                        Please input the following information in order to perform a search:
                    </Text>

                    <View style={style.form_Container}>
                        <Form
                            ref="form"
                            type={Person}
                            options={options}
                        />
                    </View>

                    <Button
                        raised
                        icon={{name: 'cached'}}
                        fontSize={10}
                        containerViewStyle={{alignItems:'center'}}
                        buttonStyle={style.searchPage_Button}
                        title='Search'/>

                </View>


                <View style={style.tabContainer}>

                </View>

            </View>

        );
    }
}
