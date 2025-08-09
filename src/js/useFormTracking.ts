import { trackFormStart, trackFormSubmit } from './mixpanel';

interface FormTracker {
	formName: string;
	formLocation: string;
	hasStarted: boolean;
}

class FormTrackingManager {
	private trackers = new Map<string, FormTracker>();

	trackFormStart(formElement: HTMLFormElement, formName: string, formLocation: string) {
		const formId = formElement.id || `form-${Date.now()}`;

		if (!this.trackers.has(formId)) {
			this.trackers.set(formId, {
				formName,
				formLocation,
				hasStarted: false,
			});

			// Track when user starts interacting with the form
			const inputs = formElement.querySelectorAll('input, textarea, select');
			inputs.forEach((input) => {
				input.addEventListener(
					'focus',
					() => {
						const tracker = this.trackers.get(formId);
						if (tracker && !tracker.hasStarted) {
							tracker.hasStarted = true;
							trackFormStart(formName, formLocation);
						}
					},
					{ once: true }
				);
			});
		}
	}

	trackFormSubmission(formElement: HTMLFormElement, additionalData?: Record<string, any>) {
		const formId = formElement.id || `form-${Date.now()}`;
		const tracker = this.trackers.get(formId);

		if (tracker) {
			trackFormSubmit(tracker.formName, tracker.formLocation, additionalData);
		}
	}

	// Setup form tracking for all forms on the page
	setupAutoTracking() {
		document.addEventListener('DOMContentLoaded', () => {
			const forms = document.querySelectorAll('form');
			forms.forEach((form) => {
				const formName = form.getAttribute('data-form-name') || form.id || 'Unknown Form';
				const formLocation = this.getFormLocation(form);

				this.trackFormStart(form, formName, formLocation);
			});
		});
	}

	private getFormLocation(form: HTMLFormElement): string {
		// Try to determine form location from context
		const section = form.closest('section');
		if (section?.id) return section.id;

		const modal = form.closest('[class*="modal"], [class*="popup"]');
		if (modal) return 'Modal';

		const footer = form.closest('footer');
		if (footer) return 'Footer';

		const header = form.closest('header');
		if (header) return 'Header';

		return 'Page Body';
	}
}

export const formTracker = new FormTrackingManager();

// Auto-setup on import
if (typeof window !== 'undefined') {
	formTracker.setupAutoTracking();
}
