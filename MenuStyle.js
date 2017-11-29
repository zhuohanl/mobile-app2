import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Button
} from "react-native";

var prefixType = "_type_";

var prefixStyle = "_style_";

var defaultBackgroundColor = { backgroundColor: "#fff" };

var MenuList = React.createClass({
  getInitialState: function() {
    var data = this.props.data;

    var nSelected = this.props.nSelected;

    var tabSelected = this.props.tabSelected;
    var obj = {};
    var kIndex = 0;
    for (var k in data) {
      var childData = data[k];
      var cIndex = 0;
      for (var c in childData) {
        var type = prefixType + k + "_" + c;
        var style = prefixStyle + k + "_" + c;
        obj[type] = false;
        obj[style] = {};

        if (nSelected === cIndex && tabSelected === kIndex) {
          obj[type] = true;
          obj[style] = defaultBackgroundColor;
        }
        cIndex++;
      }
      kIndex++;
    }
    obj.tabSelected = tabSelected;
    obj.nSelected = nSelected;
    return obj;
  },
  render: function() {
    var header = this.renderlHeader();
    var left = this.renderLeft();
    var right = this.renderRight();
    return (
      <View style={styles.container}>
        <View style={[styles.row, styles.header]}>{header}</View>
        <View style={[styles.row, styles.flex_1]}>
          <ScrollView style={[styles.flex_1, styles.left_pannel]}>
            {left}
          </ScrollView>
          <ScrollView style={[styles.flex_1, styles.right_pannel]}>
            {right}
          </ScrollView>
        </View>
      </View>
    );
  },

  renderlHeader: function() {
    var data = this.props.data;
    var tabSelected = this.state.tabSelected;
    var header = [];
    var tabIndex = 0;
    for (var i in data) {
      var tabStyle = null;
      if (tabIndex === tabSelected) {
        tabStyle = [styles.header_text, styles.active_blue];
      } else {
        tabStyle = [styles.header_text];
      }
      header.push(
        <TouchableOpacity
          style={[styles.flex_1, styles.center]}
          //onPress={this.headerPress.bind(this, i)}
          key={i}
        >
          <Text style={tabStyle}>{i}</Text>
        </TouchableOpacity>
      );
      tabIndex++;
    }
    return header;
  },

  renderLeft: function() {
    var data = this.props.data;
    var tabSelected = this.state.tabSelected;
    var leftPannel = [];
    var index = 0;
    for (var i in data) {
      if (index === tabSelected) {
        for (var k in data[i]) {
          var style = this.state[prefixStyle + i + "_" + k];
          leftPannel.push(
            <Text
              onPress={this.leftPress.bind(this, i, k)}
              style={[styles.left_row, style]}
              key={k}
            >
              {" "}
              {k}
            </Text>
          );
        }
        break;
      }
      index++;
    }
    return leftPannel;
  },

  renderRight: function() {
    var data = this.props.data;
    var tabSelected = this.state.tabSelected;
    var nSelected = this.state.nSelected;
    var index = 0;
    var rightPannel = [];
    for (var i in data) {
      if (tabSelected === index) {
        for (var k in data[i]) {
          if (this.state[prefixType + i + "_" + k]) {
            for (var j in data[i][k]) {
              rightPannel.push(
                /*
                            <Button onPress={this.props.click.bind(this, data[i][k][j])}
                                    style={styles.right_row}
                                    key={j}
                            title={data[i][k][j]}></Button>)*/

                <Text
                  onPress={this.props.click.bind(this, data[i][k][j])}
                  style={styles.right_row}
                  key={j}
                >
                  {data[i][k][j]}
                </Text>
              );
            }
            break;
          }
        }
      }
      index++;
    }
    return rightPannel;
  },

  leftPress: function(tabIndex, nIndex) {
    var obj = {};
    for (var k in this.state) {
      if (k.indexOf(prefixType) > -1) {
        var obj = {};
        obj[k] = false;
        this.setState(obj);
      }
      if (k.indexOf(prefixStyle) > -1) {
        var obj = {};
        obj[k] = {};
        this.setState(obj);
      }
    }
    obj[prefixType + tabIndex + "_" + nIndex] = true;
    obj[prefixStyle + tabIndex + "_" + nIndex] = defaultBackgroundColor;
    this.setState(obj);
  },

  headerPress: function(title) {
    var data = this.props.data;
    var index = 0;
    for (var i in data) {
      if (i === title) {
        this.setState({
          tabSelected: index
        });
        var obj = {};
        var n = 0;
        for (var k in data[i]) {
          if (n !== 0) {
            obj[prefixType + i + "_" + k] = false;
            obj[prefixStyle + i + "_" + k] = {};
          } else {
            obj[prefixType + i + "_" + k] = true;
            obj[prefixStyle + i + "_" + k] = defaultBackgroundColor;
          }
          n++;
        }
        this.setState(obj);
      }
      index++;
    }
  }
});

var styles = StyleSheet.create({
  container: {
    height: 240,
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ddd"
  },
  row: {
    flexDirection: "row"
  },
  flex_1: {
    flex: 1
  },
  header: {
    height: 35,
    borderBottomWidth: 1,
    borderColor: "#DFDFDF",
    backgroundColor: "#F5F5F5"
  },
  header_text: {
    color: "#7B7B7B",
    fontSize: 14,
    fontFamily: "Apple SD Gothic Neo"
  },
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  left_pannel: {
    backgroundColor: "#F2F2F2"
  },
  left_row: {
    height: 30,
    lineHeight: 20,
    fontSize: 14,
    fontFamily: "Apple SD Gothic Neo",
    color: "#616161"
  },

  right_row: {
    height: 30,
    lineHeight: 20,
    fontSize: 12,
    fontFamily: "Apple SD Gothic Neo",
    color: "#424242"
  },

  right_pannel: {
    marginLeft: 10
  },
  active_blue: {
    //color: 'rgba(30, 136, 229, 0.9),'
  },
  active_fff: {
    backgroundColor: "#fff"
  }
});

module.exports = MenuList;
