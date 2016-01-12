var moment = require('./moment');
var fs = require('fs');
var langs = fs.readdirSync('./lang').map(function(name) {
	return name.replace('.js', '');
});

var supportedLangs = [ 'ar', 'cs', 'da', 'de', 'el', 'en', 'es', 'fi', 'fr',
		'he', 'hi', 'hu', 'id', 'it', 'ja', 'ko', 'ms', 'nb', 'nl', 'pl', 'pt_BR',
		'ro', 'ru', 'sv', 'th', 'tl', 'tr', 'vi', 'zh_CN', 'zh_TW' ]

var zl = {};
var zll = {};

langs.forEach(function(name) {
	require('./lang/' + name);
});

supportedLangs.forEach(function(jxmlName) {
	var lang = toMomentLangName(jxmlName);

	moment.lang(lang);
	if (moment.lang() !== lang) {
		console.error(new Error('moment does not support ' + jxmlName));
		return;
	}
	var d = moment.langData();

	zl[jxmlName] = d.longDateFormat('zl');
	zll[jxmlName] = d.longDateFormat('zll');
});

function toMomentLangName(jxmlLang) {
	var parts = jxmlLang.split('_');

	for (var i = 1; i < parts.length; i++) {
		parts[i] = parts[i].toLowerCase();
	}

	return parts.join('-');
}

var output = {zl: zl, zll: zll};

fs.writeFileSync('./output.json', JSON.stringify(output, null, '\t'), 'utf8');
