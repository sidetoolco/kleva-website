import { trackFormSubmit } from './mixpanel';

interface FormData {
	origin: string;
	name: string;
	email: string;
	phone: string;
	message: string;
}

export const sendData = async (data: FormData) => {
	try {
		// Add current URL to the data
		const dataWithPath = {
			...data,
			path: window.location.href,
		};

		// Log the complete data being sent
		console.log('Sending webhook data:', window.location.href);

		const response = await fetch('https://sidetool.app.n8n.cloud/webhook/sidetool-website-form', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(dataWithPath),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		// Track successful form submission
		trackFormSubmit('Contact Form', dataWithPath.origin, {
			has_phone: !!dataWithPath.phone,
			has_message: !!dataWithPath.message,
			message_length: dataWithPath.message?.length || 0,
		});

		//console.log('Webhook sent successfully', dataWithPath);
		return { success: true };
	} catch (error) {
		console.error('Error sending webhook:', error);
		return { success: false, error };
	}
};
