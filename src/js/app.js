import {
	initMixpanel,
	trackPageView,
	trackSectionView,
	trackScrollDepth,
	trackTimeOnPage,
	trackCTAClick,
	trackVideoPlay,
	trackPricingView,
} from './mixpanel';
import './useFormTracking'; // Auto-initialize form tracking
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
	initMixpanel();

	// Track page view
	const pageName = getPageName();
	trackPageView(pageName);

	// Setup engagement tracking
	setupScrollTracking();
	setupTimeTracking();
	setupCTATracking();
	setupSectionTracking();
	setupVideoTracking();
	setupPricingTracking();

	const fadeInElements = document.querySelectorAll('.fade-in');

	if (fadeInElements.length > 0) {
		fadeInElements.forEach((element) => {
			return gsap
				.timeline({
					scrollTrigger: {
						trigger: element,
						start: 'top 85%',
						end: 'bottom top',
					},
				})
				.from(element, {
					translateY: 48,
					opacity: 0,
					ease: 'power3.out',
					duration: 0.8,
				});
		});
	}

	const slideUpElements = document.querySelectorAll('.slide-up');

	if (slideUpElements.length > 0) {
		slideUpElements.forEach((element) => {
			return gsap
				.timeline({
					scrollTrigger: {
						trigger: element,
						start: 'top 85%',
						end: 'bottom top',
					},
				})
				.from(element, {
					translateY: 48,
					ease: 'power3.out',
					duration: 0.8,
				});
		});
	}

	const imageAnimations = document.querySelectorAll('.image__animation');

	if (imageAnimations.length > 0) {
		imageAnimations.forEach((imageAnimation) => {
			const image = imageAnimation.querySelector('img');
			return gsap
				.timeline({
					scrollTrigger: {
						trigger: imageAnimation,
						start: 'top 85%',
					},
				})
				.to(image, {
					clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
					scale: 1,
					duration: 1.5,
					ease: 'power2.out',
				});
		});
	}
});

// Helper Functions
function getPageName() {
	const path = window.location.pathname;
	if (path === '/') return 'Home';
	if (path.startsWith('/blog')) return 'Blog';
	if (path.startsWith('/post/')) return 'Blog Post';
	if (path.startsWith('/case-studies')) return 'Case Studies';
	if (path.startsWith('/solution/')) return 'Solution Detail';
	if (path.startsWith('/automation-solution/')) return 'Automation Solution';
	if (path.startsWith('/campaign/')) return 'Campaign';
	if (path === '/about') return 'About';
	if (path === '/contact') return 'Contact';
	if (path === '/automations') return 'Automations';
	return 'Other';
}

// Tracking Setup Functions
function setupScrollTracking() {
	let scrollTracked = [];

	window.addEventListener('scroll', () => {
		const scrollTop = window.pageYOffset;
		const docHeight = document.documentElement.scrollHeight - window.innerHeight;
		const scrollPercent = Math.round((scrollTop / docHeight) * 100);

		[25, 50, 75, 90].forEach((milestone) => {
			if (scrollPercent >= milestone && !scrollTracked.includes(milestone)) {
				scrollTracked.push(milestone);
				trackScrollDepth(milestone);
			}
		});
	});
}

function setupTimeTracking() {
	let timeSpent = 0;
	const startTime = Date.now();

	// Track time every 30 seconds
	setInterval(() => {
		timeSpent = Math.floor((Date.now() - startTime) / 1000);
		trackTimeOnPage(timeSpent);
	}, 30000);

	// Track on page unload
	window.addEventListener('beforeunload', () => {
		timeSpent = Math.floor((Date.now() - startTime) / 1000);
		if (timeSpent > 5) {
			// Only track if spent more than 5 seconds
			trackTimeOnPage(timeSpent);
		}
	});
}

function setupCTATracking() {
	// Track button clicks
	document.addEventListener('click', (event) => {
		const target = event.target.closest('a, button');
		if (!target) return;

		const text = target.textContent?.trim() || '';
		const href = target.getAttribute('href') || '';

		// Identify CTA buttons
		if (
			text.toLowerCase().includes('book') ||
			text.toLowerCase().includes('get started') ||
			text.toLowerCase().includes('contact') ||
			text.toLowerCase().includes('schedule') ||
			text.toLowerCase().includes('call') ||
			href.includes('contact') ||
			href.includes('calendar') ||
			href.includes('zcal.co')
		) {
			const location = getElementContext(target);
			trackCTAClick(text, location, href);
		}
	});
}

function setupSectionTracking() {
	// Track when sections come into view
	const sections = document.querySelectorAll('section[id], .section');
	const pageName = getPageName();

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
					const sectionName =
						entry.target.id ||
						entry.target.className.split(' ').find((cls) => cls.includes('section')) ||
						'Unknown Section';
					trackSectionView(sectionName, pageName);
				}
			});
		},
		{ threshold: 0.5 }
	);

	sections.forEach((section) => observer.observe(section));
}

function setupVideoTracking() {
	// Track video plays
	document.addEventListener(
		'play',
		(event) => {
			if (event.target.tagName === 'VIDEO') {
				const videoName =
					event.target.getAttribute('title') || event.target.getAttribute('data-name') || 'Unknown Video';
				const location = getElementContext(event.target);
				trackVideoPlay(videoName, location);
			}
		},
		true
	);
}

function setupPricingTracking() {
	// Track when pricing section is viewed
	const pricingSection = document.querySelector('section:has([class*="pricing"]), #pricing, .pricing');
	if (pricingSection) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						trackPricingView();
					}
				});
			},
			{ threshold: 0.5 }
		);

		observer.observe(pricingSection);
	}
}

function getElementContext(element) {
	// Try to determine the context/section of the element
	const section = element.closest('section');
	if (section) {
		return section.id || section.className.split(' ')[0] || 'Unknown Section';
	}

	const header = element.closest('header');
	if (header) return 'Header';

	const footer = element.closest('footer');
	if (footer) return 'Footer';

	return 'Page Body';
}
