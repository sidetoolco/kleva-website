import { defineQuery } from 'groq';

export const HOME_RELATED_CASE_STUDIES = defineQuery(`*[_type == "caseStudy"] | order(publishedAt asc)[0...3]{
		title,
		heroTitle,
		brief,
		slug,
		heroImage,
		colorTheme,
		tags,
		logoContrast,
	}`);

export const HOME_RELATED_CASE_STUDIES_GALLERY = defineQuery(`*[_type == "caseStudy"] | order(publishedAt asc){
		title,
		heroTitle,
		brief,
		slug,
		heroImage,
		colorTheme,
		tags,
		logoContrast,
	}`);

export const CASE_STUDIES = defineQuery(`*[_type == "caseStudy"] | order(publishedAt asc)`);

export const CASE_STUDY_BY_SLUG = defineQuery(`*[_type == "caseStudy" && slug == $slug][0]{
		...,
		whyCameCards[]->{
			title,
			description,
			icon
		},
		whatWeDidCards[]->{
			title,
			description,
			image
		},
	}`);

export const CASE_STUDY_RELATED_CASE_STUDIES = defineQuery(`*[_type == "caseStudy" && slug != $slug][0...3]{
		title,
		heroTitle,
		brief,
		slug,
		heroImage,
		colorTheme,
		tags,
		logoContrast,
	}`);

export const SOLUTIONS = defineQuery(`*[_type == "solution"]`);

export const SOLUTION_BY_SLUG = defineQuery(`*[_type == "solution" && slug == $slug][0]{
		...,
		whoIsThisFor[]{
			title,
			description,
			icon
		},
	}`);

export const SOLUTION_RELATED_SOLUTIONS = defineQuery(`*[_type == "caseStudy"][0...3]{
		title,
		heroTitle,
		brief,
		slug,
		heroImage,
		colorTheme,
		tags,
		logoContrast,
	}`);

export const COMPANY_SHOWCASE = defineQuery(`*[_type == "companyShowcase"]`);

export const STAFF = defineQuery(`*[_type == "staff"] | order(publishedAt asc)`);

export const AUTOMATION_SOLUTIONS = defineQuery(`*[_type == "automationSolution"]`);

export const AUTOMATION_SOLUTION_BY_SLUG =
	defineQuery(`*[_type == "automationSolution" && slug['current'] == $slug][0] {
	...,
}`);
