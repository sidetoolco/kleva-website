// src/lib/mixpanel.ts
import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = import.meta.env.PUBLIC_MIXPANEL_TOKEN;

export const initMixpanel = () => {
	if (!MIXPANEL_TOKEN) return;
	mixpanel.init(MIXPANEL_TOKEN, {
		debug: import.meta.env.DEV,
		autotrack: false, // We'll do custom tracking
		loaded: (mixpanel) => {
			// Set user properties on init
			setUserProperties();
		},
	});
};

// User property setup
export const setUserProperties = () => {
	if (!MIXPANEL_TOKEN) return;

	const urlParams = new URLSearchParams(window.location.search);
	const referrer = document.referrer;
	const userAgent = navigator.userAgent;

	// Set user properties
	mixpanel.people.set({
		$browser: getBrowser(userAgent),
		$device: getDevice(userAgent),
		$initial_referrer: referrer || 'Direct',
		$initial_referring_domain: referrer ? new URL(referrer).hostname : 'Direct',
		first_visit: new Date().toISOString(),
	});

	// Track UTM parameters
	const utmParams = {
		utm_source: urlParams.get('utm_source'),
		utm_medium: urlParams.get('utm_medium'),
		utm_campaign: urlParams.get('utm_campaign'),
		utm_term: urlParams.get('utm_term'),
		utm_content: urlParams.get('utm_content'),
	};

	// Store UTM params in session storage for attribution
	if (Object.values(utmParams).some((param) => param !== null)) {
		sessionStorage.setItem('utm_params', JSON.stringify(utmParams));
		mixpanel.people.set(utmParams);
	}
};

// Helper functions
const getBrowser = (userAgent: string): string => {
	if (userAgent.includes('Chrome')) return 'Chrome';
	if (userAgent.includes('Firefox')) return 'Firefox';
	if (userAgent.includes('Safari')) return 'Safari';
	if (userAgent.includes('Edge')) return 'Edge';
	return 'Other';
};

const getDevice = (userAgent: string): string => {
	if (/tablet|ipad|playbook|silk/i.test(userAgent)) return 'Tablet';
	if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent))
		return 'Mobile';
	return 'Desktop';
};

// Page view tracking
export const trackPageView = (pageName: string, properties: Record<string, any> = {}) => {
	if (!MIXPANEL_TOKEN) return;

	const utmParams = sessionStorage.getItem('utm_params');
	const parsedUtmParams = utmParams ? JSON.parse(utmParams) : {};

	mixpanel.track('Page Viewed', {
		page: pageName,
		url: window.location.href,
		path: window.location.pathname,
		referrer: document.referrer || 'Direct',
		...parsedUtmParams,
		...properties,
	});
};

// Section view tracking (for long pages)
export const trackSectionView = (sectionName: string, pageName: string) => {
	if (!MIXPANEL_TOKEN) return;

	mixpanel.track('Section Viewed', {
		section: sectionName,
		page: pageName,
		url: window.location.href,
	});
};

// CTA click tracking
export const trackCTAClick = (ctaName: string, ctaLocation: string, destination?: string) => {
	if (!MIXPANEL_TOKEN) return;

	mixpanel.track('CTA Clicked', {
		cta_name: ctaName,
		cta_location: ctaLocation,
		destination: destination || '',
		page: window.location.pathname,
	});
};

// Form tracking
export const trackFormStart = (formName: string, formLocation: string) => {
	if (!MIXPANEL_TOKEN) return;

	mixpanel.track('Form Started', {
		form_name: formName,
		form_location: formLocation,
		page: window.location.pathname,
	});
};

export const trackFormSubmit = (formName: string, formLocation: string, formData?: Record<string, any>) => {
	if (!MIXPANEL_TOKEN) return;

	mixpanel.track('Form Submitted', {
		form_name: formName,
		form_location: formLocation,
		page: window.location.pathname,
		...formData,
	});

	// Also track as conversion
	mixpanel.track('Conversion', {
		conversion_type: 'Form Submission',
		form_name: formName,
		value: formName === 'Contact Form' ? 5900 : 0, // Estimated value based on pricing
	});
};

// Engagement tracking
export const trackScrollDepth = (depth: number) => {
	if (!MIXPANEL_TOKEN) return;

	// Only track meaningful scroll milestones
	if ([25, 50, 75, 90].includes(depth)) {
		mixpanel.track('Page Scroll', {
			scroll_depth: depth,
			page: window.location.pathname,
		});
	}
};

export const trackTimeOnPage = (timeSpent: number) => {
	if (!MIXPANEL_TOKEN) return;

	// Track time spent in 30-second intervals
	if (timeSpent > 0 && timeSpent % 30 === 0) {
		mixpanel.track('Time on Page', {
			time_spent: timeSpent,
			page: window.location.pathname,
		});
	}
};

// Business-specific tracking
export const trackCaseStudyView = (caseStudyName: string, industry?: string) => {
	if (!MIXPANEL_TOKEN) return;

	mixpanel.track('Case Study Viewed', {
		case_study: caseStudyName,
		industry: industry || 'Unknown',
	});
};

export const trackSolutionInterest = (solutionType: string) => {
	if (!MIXPANEL_TOKEN) return;

	mixpanel.track('Solution Interest', {
		solution_type: solutionType,
		page: window.location.pathname,
	});
};

export const trackPricingView = () => {
	if (!MIXPANEL_TOKEN) return;

	mixpanel.track('Pricing Viewed', {
		page: window.location.pathname,
	});
};

// Video interaction tracking
export const trackVideoPlay = (videoName: string, videoLocation: string) => {
	if (!MIXPANEL_TOKEN) return;

	mixpanel.track('Video Played', {
		video_name: videoName,
		video_location: videoLocation,
		page: window.location.pathname,
	});
};

export default mixpanel;
