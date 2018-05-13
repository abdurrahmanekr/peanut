import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	View,
	Text,
	Alert,
} from 'react-native';

import './init';

import XMPP from 'stanza.io';

export default class Peanut extends Component {

	constructor(props) {
		super(props);

		this.state = {
			logs: []
		};

		this.connectServer = this.connectServer.bind(this);
		this.addLog = this.addLog.bind(this);
	}

	componentWillMount() {
		this.connectServer(); // uygulama başlayınca otomatik çalıştırıyorum
	}

	addLog(log) {
		this.state.logs.push(String(log));
		this.setState({logs: this.state.logs});
	}

	connectServer() {
		var self = this;
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
			self.addLog('Oturum başladı');
		});

		// mesaj geldiğinde
		client.on('message', msg => {
			console.log(msg);
			self.addLog(msg.toString());
		});

		// bağlanılamadığında veya bağlantı koptuğunda
		client.on('disconnected', xml => {
			console.log(xml);
			self.addLog('Bağlantınız Koptu');
		});

		// bağlantı isteği at
		client.connect();
	}

	render() {
		return(
			<View style={{marginTop: 50}}>
				<Text style={{borderBottomWidth: 1, borderBottomColor: '#ccc'}}>Tüm logları aşağıdan takip edebilirsiniz</Text>
				{
					this.state.logs.map((x, i) => (
						<Text
							key={i}>
							{x}
						</Text>
					))
				}
			</View>
		);
	}
}

AppRegistry.registerComponent('Peanut', () => Peanut);
