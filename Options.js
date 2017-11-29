import React, {Component} from "react";
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
import {StackNavigator} from "react-navigation";
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


export default class Options extends Component {

    static navigationOptions = {
        title: 'Records',
        header: null,
    };

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={style.pageContainer}>

                <View style={style.contentContainer}>

                    <StyleProvider style={getTheme(platform)}>
                        <Header>
                            <Body>
                            <Title>Records</Title>
                            </Body>
                        </Header>
                    </StyleProvider>

                    <View>
                        <Text
                            style={style.heading_1}>How would you like to search?</Text>
                    </View>

                    <StyleProvider style={getTheme(platform)}>
                        <Container style={styles.buttonContainer}>
                            <Button style={styles.buttonStyle}
                                    onPress={() => navigate('recentComplete')}>
                                <Icon active style={style.records_Icon} name="search"/>
                                <Text style={style.records_Text}>Recent (Complete)</Text>
                            </Button>
                            <Button active style={styles.buttonStyle}
                                    onPress={() => navigate('recentIncomplete')}>
                                <Icon active style={style.records_Icon} name="person"/>
                                <Text style={style.records_Text}>Recent (Incomplete)</Text>
                            </Button>
                            {/*<Button style={styles.buttonStyle}
                                    onPress={() => navigate('searchByItem')}>
                                <Icon style={style.records_Icon} name="paper"/>
                                <Text style={style.records_Text}>Sample Item</Text>
                            </Button>*/}
                        </Container>

                    </StyleProvider>
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

const styles = StyleSheet.create({
    buttonContainer: {
        //backgroundColor: "rgba(30,50,59,0)"
        //justifyContent: "center",
        alignItems: "center",
    },
    buttonStyle:{
        width: "50%",
        alignSelf:'center',
        margin: 15,
        backgroundColor:'#0288D1',
    },
})
