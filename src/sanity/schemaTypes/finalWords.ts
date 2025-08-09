import { defineField, defineType } from 'sanity';

export const finalWordsType = defineType({
	name: 'finalWords',
	type: 'document',
	fields: [
		defineField({
			name: 'tag',
			type: 'string',
			description: "If there's one it'll be displayed on top of the Title",
		}),
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			description: 'The title displayed for the section',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'body',
			title: 'Final Words',
			type: 'blockContent',
			description: 'The final words...',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'label',
			title: 'CTA Label',
			type: 'string',
			description: 'The label on the CTA Button/Link',
		}),
	],
	preview: {
		select: {
			title: 'name',
		},
	},
});
