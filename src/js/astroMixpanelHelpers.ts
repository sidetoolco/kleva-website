/**
 * Astro-specific Mixpanel tracking helpers
 * These functions are designed to be used in Astro component scripts
 */

import { trackSectionView, trackCTAClick, trackCaseStudyView, trackSolutionInterest, trackVideoPlay } from './mixpanel';

/**
 * Track section visibility when it comes into view
 * Usage in Astro component:
 * <script>
 *   import { trackSectionVisibility } from '../js/astroMixpanelHelpers';
 *   trackSectionVisibility('hero-section', 'Hero', 'Home');
 * </script>
 */
export const trackSectionVisibility = (
	elementId: string,
	sectionName: string,
	pageName: string,
	threshold: number = 0.5
) => {
	if (typeof window === 'undefined') return;

	document.addEventListener('DOMContentLoaded', () => {
		const element = document.getElementById(elementId);
		if (!element) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						trackSectionView(sectionName, pageName);
					}
				});
			},
			{ threshold }
		);

		observer.observe(element);
	});
};

/**
 * Track all CTA clicks within a container
 * Usage in Astro component:
 * <script>
 *   import { trackCTAClicks } from '../js/astroMixpanelHelpers';
 *   trackCTAClicks('hero-section', 'Hero');
 * </script>
 */
export const trackCTAClicks = (containerId: string, location: string) => {
	if (typeof window === 'undefined') return;

	document.addEventListener('DOMContentLoaded', () => {
		const container = document.getElementById(containerId);
		if (!container) return;

		container.addEventListener('click', (event) => {
			const target = event.target as HTMLElement;
			const button = target.closest('a, button');
			if (!button) return;

			const text = button.textContent?.trim() || '';
			const href = button.getAttribute('href') || '';

			// Identify CTA patterns
			if (
				text.toLowerCase().includes('book') ||
				text.toLowerCase().includes('get started') ||
				text.toLowerCase().includes('contact') ||
				text.toLowerCase().includes('schedule') ||
				text.toLowerCase().includes('call') ||
				button.classList.contains('cta') ||
				href.includes('contact') ||
				href.includes('calendar')
			) {
				trackCTAClick(text, location, href);
			}
		});
	});
};

/**
 * Track case study interaction
 * Usage: trackCaseStudyInteraction('case-study-container', 'McDonald\'s App', 'Food & Beverage');
 */
export const trackCaseStudyInteraction = (containerId: string, caseStudyName: string, industry?: string) => {
	if (typeof window === 'undefined') return;

	document.addEventListener('DOMContentLoaded', () => {
		const container = document.getElementById(containerId);
		if (!container) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						trackCaseStudyView(caseStudyName, industry);
					}
				});
			},
			{ threshold: 0.3 }
		);

		observer.observe(container);
	});
};

/**
 * Track solution page interest
 * Usage: trackSolutionPageInterest('AI Agents');
 */
export const trackSolutionPageInterest = (solutionType: string) => {
	if (typeof window === 'undefined') return;

	document.addEventListener('DOMContentLoaded', () => {
		trackSolutionInterest(solutionType);
	});
};

/**
 * Track video interactions within a container
 * Usage: trackVideoInteractions('video-section', 'Hero Video');
 */
export const trackVideoInteractions = (containerId: string, videoName: string) => {
	if (typeof window === 'undefined') return;

	document.addEventListener('DOMContentLoaded', () => {
		const container = document.getElementById(containerId);
		if (!container) return;

		const videos = container.querySelectorAll('video');
		videos.forEach((video) => {
			video.addEventListener('play', () => {
				trackVideoPlay(videoName, containerId);
			});
		});
	});
};

/**
 * Generic element click tracking
 * Usage: trackElementClicks('pricing-section', 'pricing-card', 'Pricing Card Clicked', 'Pricing');
 */
export const trackElementClicks = (
	containerId: string,
	targetSelector: string,
	eventName: string,
	location: string
) => {
	if (typeof window === 'undefined') return;

	document.addEventListener('DOMContentLoaded', () => {
		const container = document.getElementById(containerId);
		if (!container) return;

		container.addEventListener('click', (event) => {
			const target = event.target as HTMLElement;
			const element = target.closest(targetSelector);
			if (element) {
				// Use the generic mixpanel track function
				const mixpanel = (window as any).mixpanel;
				if (mixpanel) {
					mixpanel.track(eventName, {
						location,
						page: window.location.pathname,
						element_text: element.textContent?.trim() || '',
						element_class: element.className,
					});
				}
			}
		});
	});
};

/**
 * Batch track multiple sections on a page
 * Usage:
 * trackMultipleSections([
 *   { id: 'hero', name: 'Hero', page: 'Home' },
 *   { id: 'features', name: 'Features', page: 'Home' }
 * ]);
 */
export const trackMultipleSections = (
	sections: Array<{
		id: string;
		name: string;
		page: string;
		threshold?: number;
	}>
) => {
	if (typeof window === 'undefined') return;

	sections.forEach((section) => {
		trackSectionVisibility(section.id, section.name, section.page, section.threshold);
	});
};

/**
 * Track page-specific metrics when the page loads
 * Usage: trackPageMetrics('Home', { page_type: 'landing', content_category: 'main' });
 */
export const trackPageMetrics = (pageName: string, customProperties?: Record<string, any>) => {
	if (typeof window === 'undefined') return;

	document.addEventListener('DOMContentLoaded', () => {
		// Get page-specific metrics
		const metrics = {
			page_load_time: performance.now(),
			viewport_width: window.innerWidth,
			viewport_height: window.innerHeight,
			user_agent: navigator.userAgent,
			language: navigator.language,
			...customProperties,
		};

		const mixpanel = (window as any).mixpanel;
		if (mixpanel) {
			mixpanel.track('Page Metrics', {
				page: pageName,
				...metrics,
			});
		}
	});
};
