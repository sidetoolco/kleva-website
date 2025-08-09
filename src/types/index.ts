export interface Testimonial {
	title: string;
	fullName: string;
	role: string;
	testimony: string;
	avatar: {
		asset: {
			_ref: string;
		};
	};
	logo?: {
		asset: {
			_ref: string;
		};
	};
}

export interface Post {
	_id: string;
	publishedAt: string;
	title: string;
	slug: {
		current: string;
	};
	mainImage: {
		alt: string;
		asset: {
			_ref: string;
		};
	};
	tags: string[];
	body: string;
}

export interface SolutionCard {
	selector: string;
	category: string;
	icon: string;
	features: string[];
}
