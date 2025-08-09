import { defineField, defineType } from 'sanity';

export const pageHomeType = defineType({
	name: 'pageHome',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			type: 'string',
		}),
		defineField({
			name: 'slug',
			type: 'string',
		}),
		defineField({
			title: 'Company Logos for the Marquee',
			name: 'companyLogo',
			type: 'array',
			of: [{ type: 'image' }],
		}),
		defineField({
			name: 'contact',
			title: 'Contact block at the end of the page',
			type: 'finalWords',
		}),
	],
	preview: {
		select: {
			title: 'name',
		},
	},
});
