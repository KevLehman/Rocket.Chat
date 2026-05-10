// default email engines - like gmail - will render texts with dots as an anchor tag.
// If we can, we should avoid that.
export const safeHtmlDots = (text: string): string => {
	return text.replaceAll(/\./g, '&#8228');
};
