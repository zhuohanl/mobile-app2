import variable from "./../variables/platform";

export default (variables = variable) => {
	const platform = variables.platform;

	const segmentTheme = {
		height: 45,
		borderColor: variables.segmentBorderColorMain,
		flexDirection: "row",
		justifyContent: "flex-end",
		backgroundColor: "transparent",
        marginRight: 20,
		//marginTop: 20,
		"NativeBase.Button": {
			alignSelf: "center",
			borderRadius: 0,
			paddingHorizontal: 5,
			height: 25,
			backgroundColor: "transparent",
			borderWidth: 1,
			borderLeftWidth: 0,
			borderColor: variables.segmentBorderColor,
			elevation: 0,
			".active": {
				backgroundColor: variables.segmentActiveBackgroundColor,
				"NativeBase.Text": {
					color: variables.segmentActiveTextColor,
				},
			},
			".first": {
				borderTopLeftRadius: platform === "ios" ? 5 : undefined,
				borderBottomLeftRadius: platform === "ios" ? 5 : undefined,
				borderLeftWidth: 1,
			},
			".last": {
				borderTopRightRadius: platform === "ios" ? 5 : undefined,
				borderBottomRightRadius: platform === "ios" ? 5 : undefined,
			},
			"NativeBase.Text": {
				color: variables.segmentTextColor,
				fontSize: 10,
			},
		},
	};

	return segmentTheme;
};
