import { defineCollection, reference, z } from 'astro:content';

const authors = defineCollection({
	type: 'data',
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			role: z.string().optional(),
			photo: image(),
			bio: z.string().optional(),
		}),
});

const tools = defineCollection({
	type: 'data',
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			imageUrl: image().optional(),
			imageAlt: z.string().optional(),
			description: z.string(),
		}),
});

const topics = defineCollection({
	type: 'data',
	schema: z.object({
		name: z.string(),
		description: z.string(),
	}),
});

const posts = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			date: z.date(),
			author: reference('authors'),
			cover: image().optional(),
			coverAlt: z.string().optional(),
			topics: z.array(reference('topics')),
			tools: z.array(reference('tools')),
		}),
});

const cases = defineCollection({
	type: 'data',
	schema: ({ image }) =>
		z.object({
			slug: z.string(),
			image: image(),
			project_title: z.string(),
			meta_description: z.string(),
			overview: z.string(),
			client: z.string(),
			industry: z.string(),
			company_size: z.string(),
			challenges: z.object({
				problems_faced: z.array(z.string()),
				impact: z.array(z.string()),
			}),
			solutions: z.object({
				features_developed: z.union([
					z.array(z.string()),
					z.array(
						z.object({
							title: z.string(),
							description: z.string(),
						})
					),
				]),
				technologies: z.array(z.string()),
				dev_time: z.array(z.string()),
			}),
			results: z.object({
				metrics_improved: z.union([
					z.array(z.string()),
					z.array(
						z.object({
							title: z.string(),
							description: z.string(),
						})
					),
				]),
				client_feedback: z.array(z.string()).optional(),
				longterm_impact: z.array(z.string()).optional(),
			}),
			takeaways: z.object({
				lessons_learned: z.array(z.string()),
				challenges_overcome: z.array(z.string()),
				what_made_project_success: z.array(z.string()),
				what_went_well: z.array(z.string()),
				what_could_be_improved: z.array(z.string()),
				unique_insights: z.array(z.string()),
			}),
			team: z.object({
				developers: z.array(z.string()),
				project_manager: z.array(z.string()),
				others: z.array(z.string()).optional(),
			}),
		}),
});

export const collections = { authors, tools, topics, posts, cases };
