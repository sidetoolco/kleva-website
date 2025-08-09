// ./src/sanity/schemaTypes/post.ts
import { defineField, defineType } from 'sanity';

export const postType = defineType({
	name: 'post',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'mainImage',
			type: 'image',
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: 'alt',
					type: 'string',
					title: 'Alternative Text',
					options: {
						source: 'title',
					},
					hidden: ({ document }) => !document?.mainImage,
				},
			],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'tags',
			type: 'array',
			of: [{ type: 'string' }],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'publishedAt',
			type: 'datetime',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'body',
			type: 'blockContent',
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'tags',
			media: 'mainImage',
		},
		prepare({ title, subtitle, media }) {
			return {
				title,
				subtitle: subtitle?.join(', '),
				media,
			};
		},
	},
});
