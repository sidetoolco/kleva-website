import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import sanity from '@sanity/astro';
import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, PUBLIC_SANITY_API_VERSION, PUBLIC_SANITY_STUDIO_BASE_PATH } =
	loadEnv(process.env.NODE_ENV, process.cwd(), '');

// https://astro.build/config
export default defineConfig({
	site: 'https://www.sidetool.co',
	integrations: [
		tailwind(),
		icon(),
		sanity({
			projectId: PUBLIC_SANITY_PROJECT_ID,
			dataset: PUBLIC_SANITY_DATASET,
			useCdn: false,
			apiVersion: PUBLIC_SANITY_API_VERSION,
			studioBasePath: '/sanity',
		}),
		react(),
		sitemap(),
	],
});
