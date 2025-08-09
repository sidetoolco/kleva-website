/**
 * Formats a given Date object into a string based on the specified locale and options.
 *
 * @param {Date} date - The date object to format.
 * @param {string} [locale='en-GB'] - The locale string used for formatting (default is 'en-GB').
 * @param {Intl.DateTimeFormatOptions} [options={ day: '2-digit', month: 'short', year: 'numeric' }] - An object containing options to configure the date format.
 * @returns {string} The formatted date string.
 *
 * @example
 * // Returns "17 May, 2024"
 * formatDate(new Date('2024-05-17T21:00:00Z'));
 *
 * @example
 * // Returns "17 mai 2024" (French locale)
 * formatDate(new Date('2024-05-17T21:00:00Z'), 'fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
 */

function useFormatDate(
	date: Date,
	locale: string = 'en-US',
	options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' }
): string {
	return date.toLocaleDateString(locale, options).replace(/ /g, ' ');
}

export default useFormatDate;
