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
    Image,
    TouchableHighlight,
    ScrollView,
    AsyncStorage,
    TextInput,
    DatePickerIOS,
    TouchableOpacity,
} from 'react-native';

import style from './style';
import {StackNavigator, NavigationActions} from 'react-navigation';
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
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from 'react-native-table-component';


var listRecord = 3;

export default class recentIncomplete extends Component {

    static navigationOptions = {
        title: 'recentIncomplete',
        header: null,
    };

    renderButtons = (name) => {
        const buttons = [];
        for (let i = 1; i <= listRecord; i++) {
            buttons.push(
                <TouchableOpacity key={i} style={style.table_Button_Opacity} onPress={() => {
                }}>
                    <Cell data={name} style={style.table_Row_Button_Cell}
                          textStyle={style.table_Text_Button_Cell}/>
                </TouchableOpacity>
            )
        }
        return buttons;
    }

    render() {

        const {navigate} = this.props.navigation;
        const tableHead = ['No', 'Time Stamp', 'Name', 'Sex', 'DoB'];
        const tableData = [
            ['1', '20171011-1130', 'John Smiths', 'M', '07-23-1963'],
            ['2', '20171011-1130', 'Selina Smithsdeuydsgsdydhd', 'F', '11-09-1997'],
            ['3', '20171011-1130', 'Selina Smiths', 'F', '11-09-1997'],
        ];
        const widthArr = [20, 70, 90, 20, 60];

        return (
            <View style={style.pageContainer}>

                <View style={style.contentContainer}>

                    <StyleProvider style={getTheme(platform)}>
                        <Header>
                            <Button transparent>
                                <Icon style={{color: '#fff'}} name='arrow-back'
                                      onPress={() => navigate('Options')}/>
                            </Button>

                            <Body>
                            <Title>Records</Title>
                            </Body>
                        </Header>
                    </StyleProvider>

                    <ScrollView>
                        <Text style={style.instructions}>Here presents the latest 25 incomplete records recently: (DoB
                            MM/DD/YY)</Text>

                        <Table style={style.table_Container}>
                            <TableWrapper style={{width: 260}}>
                                <Row data={tableHead} style={style.table_Head} widthArr={widthArr}
                                     textStyle={style.table_Text_Head}/>
                                <Rows data={tableData} style={style.table_Row} widthArr={widthArr}
                                      textStyle={style.table_Text}/>
                            </TableWrapper>

                            <TableWrapper style={{width: 30}}>

                                <Cell data="Result" style={style.table_Head} textStyle={style.table_Text_Head}/>

                                {this.renderButtons('Add')}

                            </TableWrapper>

                            <TableWrapper style={{width: 30}}>

                                <Cell data="Operation" style={style.table_Head} textStyle={style.table_Text_Head}/>

                                {this.renderButtons('Modify')}

                            </TableWrapper>

                        </Table>
                    </ScrollView>
                </View>


                <StyleProvider style={getTheme(platform)}>
                    <Container style={style.tabContainer}>
                        <Footer>
                            <FooterTab>
                                <Button vertical onPress={this.searchPage}>
                                    <Icon active style={style.tabButton_Icon} name="search"/>
                                    <Text style={style.tabButton_Text}>Search</Text>
                                </Button>
                                <Button vertical onPress={this.newT}>
                                    <Icon active style={style.tabButton_Icon} name="person"/>
                                    <Text style={style.tabButton_Text}>New Patient</Text>
                                </Button>
                                <Button vertical active onPress={this.recordSearch}>
                                    <Icon style={style.tabButton_Icon} name="paper"/>
                                    <Text style={style.tabButton_Text}>Records</Text>
                                </Button>

                                <Button vertical onPress={this.more}>
                                    <Icon style={style.tabButton_Icon} name="apps"/>
                                    <Text style={style.tabButton_Text}>More</Text>
                                </Button>
                            </FooterTab>
                        </Footer>
                    </Container>
                </StyleProvider>

            </View>

        );
    }

    save = () => {

        this.props.navigation.navigate('Updated');
    };

    searchPage = () => {
        this.props.navigation.navigate("SearchPage");
    };

    recordSearch = () => {
        this.props.navigation.navigate("Options");
    };

    newT = () => {
        this.props.navigation.navigate("Memberarea");
    };

    more = () => {
        this.props.navigation.navigate("More");
    };
}
