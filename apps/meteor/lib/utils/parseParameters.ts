function split(parameters: string, ignoreExtraUnquotedSpaces = true): string[] {
	// Replace \n\r with a single \n
	const line = parameters.replaceAll(/\n\r/gm, '\n');

	const items = line.split(/[ \n\r\t]/);

	if (ignoreExtraUnquotedSpaces) {
		return items.filter(Boolean);
	}

	return items;
}

export function parseParameters(parameters: string, ignoreExtraUnquotedSpaces = true): string[] {
	if (!parameters.trim()) {
		return [];
	}

	const match = parameters.match(/((["'])(?:(?=(\\?))\3.)*?\2)/gs);
	let line = parameters;

	if (!match) {
		return split(line, ignoreExtraUnquotedSpaces);
	}

	match.forEach((item) => {
		const newItem = item
			// Replace start quote with SSA character
			.replaceAll(/(^['"])/g, '\u0086')
			// Replace end quote with ESA character
			.replaceAll(/['"]$/g, '\u0087')
			// Replace spaces inside the quotes with a Punctuation Space character
			.replaceAll(/ /g, '\u2008')
			// Replace new lines inside the quotes with a PLD character
			.replaceAll(/\n/gm, '\u008B')
			// Replace carriage returns inside the quotes with a PLU character
			.replaceAll(/\r/gm, '\u008C')
			// Replace tabs inside the quotes with a VTS character
			.replaceAll(/\t/g, '\u008A');

		line = line.replace(item, newItem);
	});

	// If two quoted parameters are not separated by a space, add one automatically
	line = line.replaceAll(/\u0087\u0086/g, '\u0087 \u0086');

	const items = split(line, ignoreExtraUnquotedSpaces);

	return items.map((item) =>
		item
			// Convert back the spaces from inside quotes
			.replaceAll(/\u2008/g, ' ')
			// Convert back the new lines from inside quotes
			.replaceAll(/\u008B/g, '\n')
			// Convert back the carriage returns from inside quotes
			.replaceAll(/\u008C/g, '\r')
			// Convert back the tabs from inside quotes
			.replaceAll(/\u008A/g, '\t')
			// Remove SSA and ESA characters
			.replaceAll(/[\u0086\u0087]/g, '')
			// Unescape quotes
			.replaceAll(/\\\"/g, '"'),
	);
}
