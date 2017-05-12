import React, {Component} from 'react';
import {
	View,
	ActivityIndicator
} from 'react-native';

import {
	Actions
} from 'react-native-router-flux';

import style from '@peanut/style/start';

import {
	isLogin
} from '@peanut/common';


export default class Start extends Component {
	constructor(props) {
		super(props);

		this.state = {};
		this.isLogin();
	}

	async isLogin() {
		isLogin().then(res => {
			if (res)
				// is logged
				Actions.Main({type: 'reset'})
			else
				// not login
				Actions.Login({type: 'reset'})
		})
	}

	render() {
		return (
			<View
				style={style.body}>
				<ActivityIndicator
					animating={true}
					size={'large'}/>
			</View>
		);
	}
}
