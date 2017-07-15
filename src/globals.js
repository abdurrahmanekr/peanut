/**
 * @providesModule @peanut/globals
 */

if (typeof __dirname === 'undefined') global.__dirname = '/'
if (typeof __filename === 'undefined') global.__filename = ''
if (typeof process === 'undefined') {
	global.process = require('process')
} else {
	var bProcess = require('process')
	for (var p in bProcess) {
		if (!(p in process)) {
			process[p] = bProcess[p]
		}
	}
}

global.Buffer = require('buffer').Buffer;
global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
