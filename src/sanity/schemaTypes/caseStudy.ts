import { defineField, defineType } from 'sanity';

export const caseStudyType = defineType({
	name: 'caseStudy',
	title: 'Case Study',
	type: 'document',
	fields: [
		defineField({
			name: 'version',
			title: 'Version',
			type: 'number',
			description: 'The version of the case study. 1 is the old version, 2 is the new version',
			options: {
				list: [1, 2],
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'publishedAt',
			title: 'Published at',
			type: 'datetime',
			description: 'The date and time the post was published',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'colorTheme',
			title: 'Color Theme',
			type: 'color',
			description: 'This color is used on the Hero gradient and overall tone of the case study',
		}),
		defineField({
			name: 'mainColor',
			title: 'Main Color',
			type: 'string',
			description: 'The main color of the case study. This should be a hex color like: #C52D7C',
			deprecated: {
				reason: 'This field is deprecated. Use the colorTheme field instead.',
			},
		}),
		defineField({
			name: 'title',
			title: 'Company Name',
			type: 'string',
			description: 'The Company Name',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'industry',
			title: 'Industry',
			type: 'string',
			description: 'The industry of the company',
			validation: (Rule) =>
				Rule.custom((field, context) => {
					const { document } = context;
					if (document?.version === 2 && !field) {
						return 'This field is required when version is 2';
					}
					return true;
				}),
		}),
		defineField({
			name: 'duration',
			title: 'Duration',
			type: 'string',
			description: 'The duration of the project',
			validation: (Rule) =>
				Rule.custom((field, context) => {
					const { document } = context;
					if (document?.version === 2 && !field) {
						return 'This field is required when version is 2';
					}
					return true;
				}),
		}),
		defineField({
			name: 'teamSize',
			title: 'Team Size',
			type: 'string',
			description: 'The team size of the project, for example: 1 PM, 1 designer, 3 devs',
			validation: (Rule) =>
				Rule.custom((field, context) => {
					const { document } = context;
					if (document?.version === 2 && !field) {
						return 'This field is required when version is 2';
					}
					return true;
				}),
		}),
		defineField({
			name: 'location',
			title: 'Location',
			type: 'string',
			description: 'The location of the project',
			validation: (Rule) =>
				Rule.custom((field, context) => {
					const { document } = context;
					if (document?.version === 2 && !field) {
						return 'This field is required when version is 2';
					}
					return true;
				}),
		}),
		defineField({
			name: 'heroTitle',
			title: 'Hero Title',
			type: 'blockContent',
			description: 'This is the title of the case study shown at the Hero section of each case study page',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'string',
			description: 'The slug of the post',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'brief',
			title: 'Card description',
			type: 'string',
			description: "This is the description under the client's name",
			validation: (Rule) => Rule.required().max(210).error('The description must be less than 210 characters'),
		}),
		defineField({
			name: 'tags',
			title: 'Tags',
			type: 'array',
			of: [{ type: 'string' }],
			options: {
				list: [
					{ title: 'AI Agent', value: 'AI Agent' },
					{ title: 'Startup Apps', value: 'Startup Apps' },
					{ title: 'Websites', value: 'Websites' },
					{ title: 'Automatization', value: 'Automatization' },
					{ title: 'Internal Tool', value: 'Internal Tool' },
					{ title: 'Scalable App', value: 'Scalable App' },
				],
			},
			description: 'The tags of the post: things like MVP, Web Development, and so on..',
		}),
		defineField({
			name: 'logo',
			title: 'Logo',
			type: 'image',
			description: 'The logo of the client or company. This should be normalized',
		}),
		defineField({
			name: 'logoContrast',
			title: 'Logo Contrast',
			type: 'image',
			description: 'Logo for dark backgrounds',
		}),
		defineField({
			name: 'background',
			title: 'Card Background',
			type: 'image',
			description: 'The background of the card. This should be normalized',
		}),
		defineField({
			name: 'description',
			title: 'Case Study description',
			type: 'blockContent',
			description: 'This is the description of the case study shown at the Hero section of each case study page',
		}),
		defineField({
			name: 'videoUrl',
			type: 'url',
		}),
		defineField({
			name: 'heroImage',
			title: 'Hero Image',
			type: 'image',
			description: 'This is the image shown at the Hero section of each case study page',
		}),
		defineField({
			name: 'whyTheyCameToUs',
			title: 'Why they came to us - Description',
			type: 'string',
			initialValue:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis massa erat, hendrerit vel tempor quis, feugiat vel lorem. Aenean ultricies dui nec egestas sollicitudin. Aliquam quis malesuada nisl, at luctus ex. Praesent mollis massa est, tempus dapibus libero sollicitudin vel. Sed ac maximus est. Aliquam quis dolor suscipit, scelerisque augue in, sollicitudin ',
		}),
		defineField({
			name: 'whyCameCardsV2',
			title: 'Cards for why they came to us',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'whyCameCard',
					title: 'Card Why They Came To Us',
					fields: [
						defineField({
							name: 'title',
							type: 'string',
							description: 'The title of the card',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'description',
							type: 'string',
							description: 'The description of the card',
							validation: (Rule) => Rule.required(),
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
			name: 'whatWeDid',
			title: 'What we did for them',
			type: 'string',
			description: "This is the text under the section 'What we did for them'",
		}),
		defineField({
			name: 'whatWeDidCardsV2',
			title: 'Cards for what we did',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'whatWeDidCard',
					title: 'Card for what we did',
					fields: [
						defineField({
							name: 'title',
							title: 'Title',
							type: 'string',
							description: 'The title of the card',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'description',
							title: 'Description',
							type: 'text',
							description: 'The description of the card',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'image',
							title: 'Image',
							type: 'image',
							description: 'The image of the card',
						}),
					],
				},
			],
		}),
		defineField({
			name: 'solutionWeProvided',
			title: 'Solution we provided',
			type: 'string',
			description: "This is the text under the section 'Solution we provided'",
		}),
		defineField({
			name: 'imageGallery',
			title: 'Image Gallery',
			type: 'array',
			of: [{ type: 'image' }],
			description:
				'This is the image gallery of the case study. The order is important. The first two correspond to the 2 big photos.',
		}),
		defineField({
			name: 'killerFeatureTitle',
			title: 'Killer Feature Title',
			type: 'string',
			description: 'The title of the killer feature section',
		}),
		defineField({
			name: 'killerFeatureDescription',
			title: 'Killer Feature Description',
			type: 'string',
			description: 'The content of the killer feature section',
		}),
		defineField({
			name: 'killerFeatureImage',
			title: 'Killer Feature Image',
			type: 'image',
			description: 'The image of the killer feature section',
		}),
		defineField({
			name: 'quote',
			title: 'Quote',
			type: 'string',
			description:
				"This is the quote of the case study. Don't add quotes as they're already in the code, also don't finsih the sentence with a dot.",
		}),
		defineField({
			name: 'quoteAuthor',
			title: 'Quote Author',
			type: 'string',
			description: 'This is the author of the quote',
		}),
		defineField({
			name: 'quoteAuthorRole',
			title: 'Quote Author Role',
			type: 'string',
			description: 'This is the role of the quote author',
		}),
		defineField({
			name: 'quoteContact',
			title: 'Quote Email',
			type: 'string',
			description: 'The email of the quote author',
		}),
		defineField({
			name: 'quoteAvatar',
			title: 'Quote Avatar Image',
			type: 'image',
			description: 'The avatar image',
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'tags',
			media: 'logo',
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
