import variable from './../variables/platform';

export default (variables = variable) => {
	const theme = {
		'.group': {
			height: 30,
			paddingVertical: variables.listItemPadding - 8,
			paddingTop: variables.listItemPadding + 12,
			'.bordered': {
				height: 30,
				paddingVertical: variables.listItemPadding - 8,
				paddingTop: variables.listItemPadding + 12,
			},
		},
		'.bordered': {
			'.noTopBorder': {
				borderTopWidth: 0,
			},
			'.noBottomBorder': {
				borderBottomWidth: 0,
			},
			height: 35,
			paddingTop: variables.listItemPadding,
			paddingBottom: variables.listItemPadding,
			borderBottomWidth: variables.borderWidth,
			borderTopWidth: variables.borderWidth,
			borderColor: variables.listBorderColor,
		},
		'NativeBase.Text': {
			fontSize: 14,
			color: 'rgba(97, 97, 97, 0.9)',
			fontFamily:'Apple SD Gothic Neo',
		},
		'.noTopBorder': {
			borderTopWidth: 0,
		},
		'.noBottomBorder': {
			borderBottomWidth: 0,
		},
		height: 35,
		backgroundColor: '#F0EFF5',
		flex: 1,
		justifyContent: 'center',
		paddingLeft: variables.listItemPadding + 5,
	};

	return theme;
};
