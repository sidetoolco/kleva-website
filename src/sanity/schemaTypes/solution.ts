import { defineField, defineType } from 'sanity';

export const solutionType = defineType({
	name: 'solution',
	title: 'Solution',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Solution Name',
			type: 'string',
			description: 'The name of the solution',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'string',
			description: 'The slug of the solution',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'heroIcon',
			title: 'Hero Icon',
			type: 'string',
			description: 'The icon of the solution',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'solutionTitle',
			title: 'Solution Title',
			type: 'string',
			description: 'The title of the solution',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'blockContent',
			description: 'The description of the solution',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'heroQuotes',
			title: 'Hero Quotes',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'heroQuote',
					title: 'Hero Quote',
					fields: [
						{
							title: 'Company Logo',
							name: 'companyLogo',
							description: 'The logo of the company',
							type: 'image',
						},
						{
							title: 'Quote',
							name: 'quote',
							description: 'The quote to display',
							type: 'string',
						},
						{
							title: 'Name of the client',
							name: 'clientFullName',
							description: 'Client full name: John Doe',
							type: 'string',
						},
						{
							title: 'Role in the company',
							name: 'companyRole',
							description: 'Client role in the company: CEO',
							type: 'string',
						},
					],
				},
			],
			description: 'The quotes of the solution',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'storyImage',
			title: 'Story Image',
			type: 'image',
			description: 'The image of the story',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'storyTitle',
			title: 'Story Title',
			type: 'blockContent',
			description: 'The title of the story',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'story',
			title: 'Story',
			type: 'blockContent',
			description: 'The story of the solution',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'storyBonus',
			title: 'Story Bonus',
			type: 'blockContent',
			description: 'Bonus if any',
		}),
		defineField({
			name: 'whoIsThisFor',
			title: 'Who is this for? Cards',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'whoIsThisForCards',
					title: 'Who is this for? Cards',
					fields: [
						defineField({
							name: 'title',
							type: 'string',
							description: 'The title of the card',
						}),
						defineField({
							name: 'description',
							type: 'string',
							description: 'The description of the card',
						}),
						defineField({
							name: 'icon',
							type: 'string',
							description:
								'The name of the icon to be used in the card. You can pick one from: https://icones.js.org/collection/ion',
						}),
					],
				},
			],
		}),
		defineField({
			name: 'tools',
			title: 'Tools Images',
			description:
				'The tools images with logos. This should be normalized (each image with the same height) to avoid conflicts with the aspect ratio. Recommended height: 30px',
			type: 'array',
			of: [{ type: 'image' }],
		}),
		defineField({
			name: 'useCases',
			title: 'Use Cases',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'useCase',
					title: 'Use Case',
					fields: [
						{
							title: 'Title',
							name: 'title',
							description: 'The title of the use case',
							type: 'string',
							validation: (Rule) => Rule.required(),
						},
						{
							title: 'Description',
							name: 'description',
							description: 'The description of the use case',
							type: 'string',
							validation: (Rule) => Rule.required(),
						},
						{
							title: 'Icon name',
							name: 'iconName',
							description:
								'Pick a icon name from this library: https://icones.js.org/collection/ion. Must be Ion Icons set.',
							type: 'string',
							validation: (Rule) => Rule.required(),
						},
					],
				},
			],
		}),
		defineField({
			name: 'finalWords',
			title: 'Final Words',
			type: 'blockContent',
			validation: (Rule) => Rule.required(),
		}),
	],
});
