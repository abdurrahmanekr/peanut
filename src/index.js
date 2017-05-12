/**
 * @providesModule @peanut/index
 */

import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	View,
	Alert
} from 'react-native';

import {
	Actions,
	Scene,
	Router
} from 'react-native-router-flux';

import XMPP from 'stanza.io';

import {
	Start,
	Login,
	Main
} from '@peanut/pages';

export default class Peanut extends Component {

	constructor(props) {
		super(props);
		this.connectServer(); // uygulama başlayınca otomatik çalıştırıyorum
	}

	async connectServer() {
		/*
		 * @jid: jid'miz
		 * @password: şifremiz
		 * @sasl: basit oturum doğrulama sistemini şeçiyoruz
		 * @transport: http-bind kullandığımız için bosh seçiyoruz
		 * @boshURL: sunucumuzun http-bind adresi
		*/
		var client = XMPP.createClient({
			jid: 'kodcu@avare',
			password: '1234',
			sasl: "plain",
			transport: 'bosh',
			boshURL: 'http://192.168.1.102:7070/http-bind/'
		});

		// oturumumuz başladı
		client.on('session:started', () => {
			// ekrana mesaj verdik
			Alert.alert('Oturum açtın!!!');
		});

		// mesaj geldiğinde
		client.on('message', msg => {
			console.log(msg);
		});

		// bağlanılamadığında veya bağlantı koptuğunda
		client.on('disconnected', xml => {
			console.log(xml);
		});

		// bağlantı isteği at
		client.connect();
	}

	render() {
		const scenes = Actions.create(
			<Scene key="root">
				<Scene key="Start" component={Start} title="Start" hideNavBar={true}/>
				<Scene key="Main" component={Main} title="Main" />
				<Scene key="Login" component={Login} title="Login" />
			</Scene>
		);

		return (
			<Router
				scenes={scenes}/>
		);
	}
}

AppRegistry.registerComponent('Peanut', () => Peanut);
