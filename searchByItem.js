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

var Items = t.struct({
    Sample_Item_1: t.String,              // a required string
    Sample_Item_2: t.maybe(t.String),
});

var options = {
    fields: {
        Sample_Item_1: {
            label: 'Sample Item', // <= label for the name field
            placeholder: 'Item name',
        },
        Sample_Item_2: {
            label: 'Sample Item 2', // <= label for the name field
            placeholder: 'Item name (optional)',
        },
    }
};



export default class searchByItem extends Component {

    static navigationOptions = {
        title: 'searchByItem',
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


                    <Text style={style.navigation_Heading}>Search By Sample Item</Text>

                </View>

                <View style={style.contentContainer_has_header}>

                    <Text style={style.instructions}>
                        Please input the following information in order to perform a search:
                    </Text>

                    <View style={style.form_Container}>
                        <Form
                            ref="form"
                            type={Items}
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
