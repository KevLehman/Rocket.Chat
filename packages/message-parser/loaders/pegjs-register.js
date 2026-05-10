const fs = require('node:fs');
const Module = require('node:module');

const peggy = require('peggy');

Module._extensions['.pegjs'] = function (mod, filename) {
	const content = fs.readFileSync(filename, 'utf-8');
	const code = peggy.generate(content, {
		output: 'source',
		format: 'commonjs',
	});
	mod._compile(code, filename);
};
