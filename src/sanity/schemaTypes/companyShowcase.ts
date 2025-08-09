import { defineField, defineType } from 'sanity';

export const companyShowcaseType = defineType({
	name: 'companyShowcase',
	title: 'Company Showcase',
	type: 'document',
	fields: [
		defineField({
			name: 'publishedAt',
			title: 'Published at',
			type: 'datetime',
			description: 'A date for reference. We order the showcases by this date.',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'link',
			title: 'Link',
			description: 'The link to the company site',
			type: 'url',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'color',
			title: 'Primary Color of the Company',
			description: 'This color is mainly used for the color of the company name',
			type: 'color',
			validation: (Rule: any) => Rule.required(),
		}),
		defineField({
			name: 'mainColor',
			title: 'Main Color',
			type: 'string',
			deprecated: {
				reason: 'Now we use color picker',
			},
			description:
				'The main color of the case study. This should be a hex color like: #C52D7C. This is used to set the overall tone of the showcase.',
		}),
		defineField({
			name: 'companyName',
			title: 'Company Name',
			type: 'string',
			description: 'The Company Name',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'title',
			title: 'ShowcaseTitle',
			type: 'string',
			description:
				'The title displayed for the showcase, this should be something different from the company name, think of it as a post title.',
			validation: (Rule) =>
				Rule.required()
					.max(100)
					.warning('The title should be less than 100 characters, otherwise it will look wierd.')
					.min(10)
					.error('The title should be at least 10 characters long.'),
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'string',
			description: 'Company description or brief. The text displayed under the title.',
			validation: (Rule) =>
				Rule.required()
					.min(100)
					.warning('You can do better with the description')
					.max(800)
					.error('The description should be 800 character max'),
		}),
		defineField({
			name: 'imageGallery',
			title: 'Image Gallery',
			type: 'array',
			description: 'This will be the image gallery of the showcase.',
			of: [
				{
					type: 'image',
					options: { hotspot: true },
					fields: [
						{
							name: 'alt',
							title: 'Alternative text',
							type: 'string',
							validation: (Rule) =>
								Rule.custom((value, context) => {
									const parent = context?.parent as { asset?: { _ref?: string } };
									return !value && parent?.asset?._ref
										? 'Alternative text is required when the image is used in the body'
										: true;
								}),
						},
					],
				},
			],
			validation: (Rule) =>
				Rule.custom((value) => {
					if (!value || value.length < 2) {
						return 'You need to upload at least 2 images for the gallery';
					}
					return true;
				}),
		}),
	],
	preview: {
		select: {
			title: 'companyName',
			subtitle: 'showcaseTitle',
			media: 'imageGallery',
		},
		prepare(selection) {
			const { title, subtitle, media } = selection;

			const firstImage = media?.[0];
			return {
				title,
				subtitle,
				media: firstImage,
			};
		},
	},
});
