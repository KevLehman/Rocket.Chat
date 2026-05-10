export const replaceVariables = (str: string, replacer: (substring: string, key: string) => string): string =>
	str.replaceAll(/\{ *([^\{\} ]+)[^\{\}]*\}/gim, replacer);
