import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemaTypes';
import { colorInput } from '@sanity/color-input';

export default defineConfig({
	name: 'default',
	title: 'sidetool-website',
	//projectId: process.env.PUBLIC_SANITY_PROJECT_ID || '',
	//dataset: process.env.PUBLIC_SANITY_DATASET || '',
	projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
	dataset: import.meta.env.PUBLIC_SANITY_DATASET,
	plugins: [structureTool(), visionTool(), colorInput()],
	schema: {
		types: schemaTypes,
	},
});
