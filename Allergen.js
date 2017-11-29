import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  AsyncStorage,
  TextInput,
  DatePickerIOS,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  AlertIOS
} from "react-native";
import { StackNavigator } from "react-navigation";
import {
  Container,
  Header,
  Left,
  List,
  ListItem,
  Switch,
  Item,
  Text,
  Input,
  Icon,
  Body,
  Right,
  Content,
  Footer,
  FooterTab,
  Button,
  Badge,
  Segment,
  StyleProvider,
  Title
} from "native-base";

import style from "./style";
import getTheme from "./native-base-theme/components";
import platform from "./native-base-theme/variables/platform";
import MenuList from "./MenuStyle";

import firebase from "./firebaseConfig";
let { width, height } = Dimensions.get("window");

export default class Allergen extends Component {
  static navigationOptions = {
    title: "NewTest",
    header: null,
    headerLeft: null
  };

  constructor(props) {
    super(props);
    this.ref = firebase.database().ref();
    this.sampleItems = [];
    this.itemArray = [];
    this.tests = [];
    this.temp = "";
    this.state = {
      items: [],
      error: "",
      str123: ""
    };
    // this.itemArray = [];
    this.data = {
      Category: {
        "Histamine / Control": ["Histamine", "Control"],
        Grasses: [
          "Perennial Rye Grass",
          "Barley Pollen",
          "Wheat Triticum Vulgare",
          "Bermuda",
          "Bahia Grass / Paspalum",
          "Johnsom / Sorgum",
          "Timothy",
          "Kentucky Blue",
          "Yorkshire Fog",
          "Oats Common"
        ],
        Weeds: [
          "Compositae",
          "Dock / Sorrel",
          "Chenopodium / Lambsquart",
          "Ragweed",
          "Plantain",
          "Wall Pellitory",
          "Sagebrush / Mugwart"
        ],
        "Moulds / Yeast": [
          "Penicillium Mix",
          "Mucor Racemosus",
          "Rhizopus",
          "Aspergillus",
          "Alternaria",
          "Candida albicans",
          "Pullularia",
          "Trichophyton mix",
          "Helminthosporium mix",
          "Cladosporium"
        ],
        Dermatophyts: [
          "House Dust Mix",
          "Storage mites",
          "D.Farinae",
          "D.Pteronyssinus"
        ],
        "Animal Dander/Insects": [
          "Cat",
          "Dog",
          "Cattle",
          "Horse",
          "Guinea Pig Hair",
          "Feather Mix",
          "Cockroach",
          "Mosquito"
        ],
        Miscellaneous: ["+", "+", "+"],
        "Grains & Yeast": [
          "Yeast - Bakers",
          "Yeast - Brewers",
          "Corn - whole",
          "Barley - whole",
          "Rice",
          "Wheat Grain",
          "Cereal Mix",
          "Rye - Wholegrain mix"
        ],
        "Dairy / Proteins": [
          "Cows milk",
          "Egg - white",
          "Egg - yolk",
          "Chicken",
          "Beef",
          "Pork"
        ],
        "Fruit & Vegetables": [
          "Apple",
          "Avocado",
          "Banana",
          "Bean (Green String)",
          "Carrot",
          "Celery",
          "Kiwi Fruit",
          "Mango",
          "Melon",
          "Orange",
          "Peach",
          "Potato",
          "Strawberry",
          "Tomato"
        ],
        "Nuts / Legumes": [
          "Almond",
          "Brazil",
          "Cashew",
          "Hazelnut",
          "Walnut - black",
          "Peanut",
          "Pecan",
          "Lupin",
          "Pea",
          "Soybean"
        ],
        Seafood: ["Codfish - mix", "Tuna", "Shrimp", "Oyster"],
        "Special Seeds": ["Sunflower", "Sesame - white"]
      },
      Item: {
        All: ["All"],
        Apple: ["Xcode"],
        Other: ["Sublime Text", "WebStrom"]
      }
    };
    this.hanleChange.bind(this);
  }

  hanleChange(value) {
    this.setState({ value });
  }

  componentWillMount() {
    this.state.items.length = 0;
    let patientID = this.props.navigation.state.params.patientKey;
    let testKey = this.props.navigation.state.params.testKey;

    this.ref
      .child(patientID + "/tests/" + testKey + "/sample")
      .on("child_added", snap => {
        let item = snap.val();
        item.key = snap.key;
        this.state.items.push(item);
      });

    for (var i = 0; i < this.state.items.length; i++) {
      this.state.str123 += this.state.items[i].item + ";  ";
      //console.log("item: ", this.state.items[i].item);
    }
    console.log("str123: ", this.state.str123);

    this.sampleItems = this.state.items;

    for (i = 0; i < this.sampleItems.length; i++) {
      this.itemArray.push({
        category: this.sampleItems[i].category,
        item: this.sampleItems[i].item
      });
    }
  }

  addItems = val => {
    var data = this.data; //get the menu source data//store all selected the categoryName and items
    let patientId = this.props.navigation.state.params.patientKey;
    let testKey = this.props.navigation.state.params.testKey;
    var updates = {};
    var newSamplePostKey;

    var categoryName; //need to search in data based on the item

    if (val === "+") {
      // pop up a window for nurse to input item
      AlertIOS.prompt("Enter a new miscellaneous item: ", null, text => {
        //check if the entered item exists in the menu already
        //if yes, alert
        var repeatCount1 = 0;

        for (var key in this.data.Category) {
          var tempArray = this.data.Category[key]; //store all the items in the category
          for (var i = 0; i < tempArray.length; i++) {
            if (tempArray[i].toLowerCase().indexOf(text.toLowerCase()) > -1) {
              //control letter case
              repeatCount1++;
              alert(
                "The item you input " +
                  tempArray[i] +
                  " has been in the list in Category " +
                  key
              );
            }
          }
        }
        //if no, update the menu source data
        if (repeatCount1 === 0) {
          data.Category.Miscellaneous.push(text.toLowerCase()); //control letter case
          this.setState({ data: data });
        }
      });
    } else {
      // get the category based on item
      for (var key in this.data.Category) {
        var tempArray = this.data.Category[key];
        for (var i = 0; i < tempArray.length; i++) {
          if (tempArray[i] === val) {
            categoryName = key;
          }
        }
      }

      //check if the bascket already contains the item,
      //if yes alert
      var repeatCount2 = 0;
      for (var i = 0; i < this.itemArray.length; i++) {
        if (this.itemArray[i].item === val) {
          repeatCount2++;
          alert("The item " + this.itemArray[i].item + " has been selected");
        }
      }

      // if not, put it into the bascket
      if (repeatCount2 === 0) {
        this.itemArray.push({ category: categoryName, item: val });
        //console.log("itemArray after: ", this.itemArray);

        var postData = { category: categoryName, item: val };

        newSamplePostKey = firebase
          .database()
          .ref()
          .child(patientId + "/tests/" + testKey + "/sample")
          .push().key;

        updates[
          patientId + "/tests/" + testKey + "/sample/" + newSamplePostKey
        ] = postData;
        let item_chosen = postData;
        item_chosen.key = newSamplePostKey;
        this.state.items.push(item_chosen);
        this.temp = "";

        var sel = [];
        for (var i = 0; i < this.state.items.length; i++) {
          //this.temp += this.state.items[i].item + ";  ";
          //console.log("item: ", this.state.items[i].item);
          sel.push(this.state.items[i].item);
        }

        var uniqueItems = Array.from(new Set(sel));

        for (var i = 0; i < uniqueItems.length; i++) {
          this.temp += uniqueItems[i] + ";  ";
        }

        this.setState({
          str123: this.temp,
          error: ""
        });

        console.log("chosen: ", this.state.items);
        console.log("unique: ", uniqueItems);
        //    console.log("str123: ", this.state.str123);
        console.log("sel: ", sel);

        this.temp = "";
        console.log("line 273 push success");
        firebase
          .database()
          .ref()
          .update(updates); //save result
      }
    }
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={style.pageContainer}>
        <View style={style.contentContainer}>
          <StyleProvider style={getTheme(platform)}>
            <Header>
              {/*<Left>
                                    <Button transparent>
                                        <Icon name='arrow-back' />
                                    </Button>
                                </Left>*/}
              <Left />
              <Body>
                <Title>Category</Title>
              </Body>

              <Right>
                <Button transparent>
                  <Icon
                    style={{ color: "#fff" }}
                    name="list"
                    onPress={() => this.switchPage()}
                  />
                </Button>
              </Right>
            </Header>
          </StyleProvider>

          <Container style={{ flex: 3.5 }}>
            <MenuList
              data={this.data}
              nSelected={1}
              tabSelected={0}
              click={val => this.addItems(val)}
            />
          </Container>
          <Container style={{ flex: 0.8 }}>
            <Text style={styles.show}> Items chosen: </Text>
            <Text style={styles.show}> {this.state.str123}</Text>
          </Container>
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

  switchPage = () => {
    var tests = {
      date: this.props.navigation.state.params.tests.date,
      nurseFirstName: this.props.navigation.state.params.tests.nurseFirstName,
      nurseLastName: this.props.navigation.state.params.tests.nurseLastName,
      antihistamine: this.props.navigation.state.params.tests.antihistamine,
      betablocker: this.props.navigation.state.params.tests.betablocker,
      details: this.props.navigation.state.params.tests.details
    };
    // console.log("tests", tests);
    this.props.navigation.navigate("AllItemChosen", {
      Patient: this.props.navigation.state.params.Patient,
      // selectedItems: this.state.sampleItems,
      patientKey: this.props.navigation.state.params.patientKey,
      testKey: this.props.navigation.state.params.testKey,
      tests: tests,
      nurseId: this.props.navigation.state.params.nurseId
    });
  };

  addTest = () => {
    this.props.navigation.navigate("TestAdded", {
      nurseId: this.props.navigation.state.params.nurseId
    });
  };

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
  list: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5
  },

  chosen: {
    flex: 1,
    height: "15%",
    backgroundColor: "white"
  },

  show: {
    fontSize: 10
  },

  button: {
    height: 50,
    width: "30%",
    justifyContent: "center",
    margin: 5,
    backgroundColor: "#a5c1ef"
  },
  save: {
    backgroundColor: "#4286f4",
    height: 50,
    width: 98,
    justifyContent: "center",
    margin: 5
  },
  clear: {
    backgroundColor: "#f44144",
    height: 50,
    width: 98,
    justifyContent: "center",
    margin: 5
  }
});
