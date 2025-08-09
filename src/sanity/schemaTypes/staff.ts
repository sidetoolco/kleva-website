import { defineField, defineType } from 'sanity';

export const staffType = defineType({
	name: 'staff',
	title: 'Staff',
	type: 'document',
	fields: [
		defineField({
			name: 'publishedAt',
			title: 'Date',
			type: 'date',
			description: 'just for order',
		}),
		defineField({
			name: 'fullName',
			title: 'Full Name',
			type: 'string',
			description: 'The full name of the staff member',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'image',
			title: 'Image',
			type: 'image',
			options: {
				hotspot: true,
			},
			description: 'The image of the staff member',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'role',
			title: 'Role',
			type: 'string',
			description: 'The role of the staff member',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'category',
			title: 'Category',
			type: 'string',
			description: 'The category of the staff member',
			options: {
				layout: 'radio',
				list: [
					{ title: 'Growth', value: 'growth' },
					{ title: 'Engineering', value: 'engineering' },
					{ title: 'Product', value: 'product' },
					{ title: 'Operations', value: 'operations' },
				],
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'location',
			title: 'Location',
			type: 'string',
			description: 'The location of the staff member',
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: 'fullName',
			subtitle: 'role',
			media: 'image',
		},
		prepare(selection) {
			const { title, subtitle, media } = selection;
			return {
				title,
				subtitle,
				media,
			};
		},
	},
});
