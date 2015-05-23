import bower from 'bower';
import fs from 'fs';


let config = {
	transpiler: 'babel',
	paths: {
		babel: 'node_modules/babel-core/browser.js'
	},
	baseURL: './'
};


bower.commands.list({paths:true}).on('end', (list) => {
	config.map = list;

	Object.keys(list)
		.forEach((key) => {
			list[key] = list[key].replace('.js', '');
		});
	fs.writeFileSync('./system.conf.js', `System.config(${JSON.stringify(config, null, 4)});`);
	console.log('file is written');
});