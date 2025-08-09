import { defineField, defineType } from 'sanity';

export const automationSolutionType = defineType({
	name: 'automationSolution',
	title: 'Automation Solution',
	type: 'document',
	fields: [
		defineField({
			name: 'publishedAt',
			title: 'Published at',
			type: 'datetime',
			description: 'The date and time the post was published',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'tags',
			title: 'Tags',
			type: 'array',
			of: [{ type: 'string' }],
			options: {
				list: [
					{ title: 'Sales', value: 'sales' },
					{ title: 'Marketing', value: 'marketing' },
					{ title: 'Operations', value: 'operations' },
					{ title: 'Support', value: 'support' },
				],
			},
			description: 'The tags of the post: things like MVP, Web Development, and so on..',
		}),
		defineField({
			name: 'subTitle',
			title: 'Sub Title',
			type: 'string',
			description: 'The sub title of the automation solution, displayed on the Hero above the banner.',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			description: 'This is the title of the automation solution, displayed on the Hero above the banner.',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
			description:
				'The slug of the automation solution displayed on the URL. Example: /automations/sales-automation. Just press click on generate and it will be filled in automatically.',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'icon',
			title: 'Icon',
			type: 'string',
			description:
				'The icon of the automation solution, displayed on the gallery under the card main image. You can pick any icon from https://icones.js.org/collection/ion, name should be something like "ion:rocket-outline"',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'brief',
			title: 'Brief',
			type: 'string',
			description:
				'This is the brief description of the automation solution, displayed on the gallery under the card main image. It should be a short description, less than 150 characters.',
			validation: (Rule) => Rule.required().max(150).error('Brief should be less than 150 characters'),
		}),
		defineField({
			name: 'solutionBanner',
			title: 'Banner',
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
					hidden: ({ document }) => !document?.solutionBanner,
				},
			],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'solutionDescription',
			title: 'Solution Description',
			type: 'string',
			description: 'This is the description of the automation solution, displayed on the Hero below the banner.',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'helpCards',
			title: 'How can it help blocks',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'helpCard',
					title: 'Help Card',
					description: 'Each card has a title, a list of benefits and an icon',
					fields: [
						defineField({
							name: 'title',
							type: 'string',
							description: 'The title of the card',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'benefits',
							type: 'array',
							of: [{ type: 'string' }],
							description: 'The benefits of the card',
							validation: (Rule) => Rule.required().min(1).error('At least one benefit is required'),
						}),
						defineField({
							name: 'icon',
							type: 'string',
							description:
								'Pick any icon from https://icones.js.org/collection/ion, name should be something like "ion:rocket-outline"',
							validation: (Rule) => Rule.required(),
						}),
					],
				},
			],
		}),
		defineField({
			name: 'cta',
			title: 'Call to Action',
			type: 'blockContent',
			description:
				'This is the call to action for the automation solution, displayed below the "How can it help?" section.',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'businessImpact',
			title: 'Business Impact Items',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'businessImpactItem',
					title: 'Business Impact Item',
					fields: [
						defineField({
							name: 'title',
							type: 'string',
							description: 'The title of the business impact item',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'description',
							type: 'string',
							description: 'The description of the business impact item',
							validation: (Rule) => Rule.required(),
						}),
					],
				},
			],
		}),
		defineField({
			name: 'businessImpactImage',
			title: 'Business Impact Image',
			type: 'image',
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: 'alt',
					type: 'string',
					title: 'Alternative Text',
					hidden: ({ document }) => !document?.businessImpactImage,
				},
			],
			deprecated: {
				reason: 'This field is no longer used, use the "Implementation Images" field instead.',
			},
		}),
		defineField({
			name: 'integrationEcosystem',
			title: 'Integration Ecosystem',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'integrationEcosystemItem',
					title: 'Integration Ecosystem Item',
					fields: [
						defineField({
							name: 'title',
							type: 'string',
							description: 'The title of the integration ecosystem item',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'description',
							type: 'string',
							description: 'The description of the integration ecosystem item',
							validation: (Rule) => Rule.required(),
						}),
					],
				},
			],
		}),
		defineField({
			name: 'toolsLogos',
			title: 'Tools Logos',
			type: 'array',
			of: [{ type: 'image' }],
			description:
				'Be sure to add logos that are mormalized (i.e, the same height for each image). This is only for keep consistency, I nice to have.',
		}),
		defineField({
			name: 'implementation',
			title: 'Implementation Description',
			type: 'string',
			description: 'This is the text for the section "Implementation Flexibility"',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'implementationImages',
			title: 'Implementation Images',
			type: 'array',
			of: [
				{
					type: 'image',
					options: { hotspot: true },
					fields: [
						{
							name: 'alt',
							type: 'string',
							title: 'Alternative Text',
							validation: (Rule) => Rule.required(),
						},
					],
				},
			],
			description:
				'This is the image gallery for the section "Implementation Flexibility". Please complete the alternative text with actual information about the image.',
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'tags',
			media: 'solutionBanner',
		},
		prepare(selection) {
			const { title, subtitle, media } = selection;
			return {
				title,
				subtitle: subtitle?.join(', '),
				media,
			};
		},
	},
});
