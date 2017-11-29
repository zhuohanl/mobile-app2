import { Platform } from "react-native";

import variable from "./../variables/platform";

export default (variables = variable) => {
  const titleTheme = {
    fontSize: 14,
    fontFamily: variables.titleFontfamily,
    color: '#FFFFFF',//variables.titleFontColor,
    fontWeight: Platform.OS === "ios" ? "700" : undefined,
    textAlign: "center"
  };

  return titleTheme;
};
