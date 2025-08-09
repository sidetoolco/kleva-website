import type { SchemaTypeDefinition } from 'sanity';
import { blockContentType } from './blockContent';
import { caseStudyType } from './caseStudy';
import { postType } from './post';
import { solutionType } from './solution';
import { testimonialType } from './testimonial';
import { pageHomeType } from './pageHome';
import { finalWordsType } from './finalWords';
import { companyShowcaseType } from './companyShowcase';
import { staffType } from './staff';
import { automationSolutionType } from './automationSolution';
export const schemaTypes: SchemaTypeDefinition[] = [
	blockContentType,
	pageHomeType,
	finalWordsType,
	caseStudyType,
	postType,
	solutionType,
	testimonialType,
	companyShowcaseType,
	staffType,
	automationSolutionType,
];
