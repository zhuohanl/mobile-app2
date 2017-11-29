import {Platform} from "react-native";

import variable from "./../variables/platform";

export default (variables = variable) => {
    const platform = variables.platform;

    const footerTabTheme = {
        "NativeBase.Button": {
            ".active": {
                "NativeBase.Text": {
                    color: variables.tabBarActiveTextColor,
                    fontSize: variables.tabBarTextSize,
                    fontWeight: 'bold',
                    //lineHeight: 16,
                },
                "NativeBase.Icon": {
                    color: variables.tabBarActiveTextColor,
                    marginTop: '30%',
                },
                "NativeBase.IconNB": {
                    color: variables.tabBarActiveTextColor
                },
                backgroundColor: variables.tabActiveBgColor
            },
            flexDirection: null,
            backgroundColor: "#F5F5F5",
            borderColor: null,
            elevation: 0,
            shadowColor: 'rgba(189, 189, 189, 1)',
            shadowOffset: null,
            shadowRadius: 0,
            shadowOpacity: null,
            alignSelf: "center",
            flex: 1,
            height: variables.footerHeight,
            justifyContent: "center",
            ".badge": {
                "NativeBase.Badge": {
                    "NativeBase.Text": {
                        fontSize: 11,
                        fontWeight: platform === "ios" ? "600" : undefined,
                        lineHeight: 14
                    },
                    top: -3,
                    alignSelf: "center",
                    left: 10,
                    zIndex: 99,
                    height: 18,
                    padding: 1.7,
                    paddingHorizontal: 3
                },
                "NativeBase.Icon": {
                    marginTop: -18
                }
            },
            "NativeBase.Icon": {
                color: variables.tabBarTextColor,
                marginTop: '30%',
            },
            "NativeBase.IconNB": {
                color: variables.tabBarTextColor
            },
            "NativeBase.Text": {
                color: variables.tabBarTextColor,
                fontSize: variables.tabBarTextSize,
                lineHeight: 10
            }
        },
        backgroundColor: Platform.OS === "android"
            ? variables.tabActiveBgColor
            : undefined,
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
        alignSelf: "stretch"
    };

    return footerTabTheme;
};
