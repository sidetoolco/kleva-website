import { defineField, defineType } from 'sanity';

export const testimonialType = defineType({
	name: 'testimonial',
	title: 'Testimonial',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Company Name',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'fullName',
			title: 'Full Name',
			type: 'string',
			validation: (Rule) => Rule.required(),
			description: 'The name of the person in the testimonial.',
		}),
		defineField({
			name: 'role',
			title: 'Role',
			type: 'string',
			validation: (Rule) => Rule.required(),
			description:
				'The role of the person in the testimonial. This phrase will end with "at" and the company name, so if you put "CEO" it should be like "CEO at Company Name"',
		}),
		defineField({
			name: 'testimony',
			title: 'Testimony',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'avatar',
			title: 'Avatar',
			type: 'image',
			validation: (Rule) => Rule.required(),
			description: 'Make sure that your image is well compress and its not too big',
		}),
		defineField({
			name: 'logo',
			title: 'Company Logo',
			type: 'image',
		}),
	],
});
