export type QuickLink = {
	href: string;
	label: string;
	title: string;
	description: string;
};

export type KeyFact = {
	label: string;
	value: string;
	detail: string;
	linkLabel?: string;
	linkHref?: string;
};

export type Offer = {
	id: string;
	title: string;
	audience: string;
	schedule: string;
	description: string;
	detail: string;
	image: string;
	ctaLabel?: string;
	ctaHref?: string;
};

export type Workshop = {
	id: string;
	title: string;
	dateLabel: string;
	timeLabel: string;
	audience: string;
	level: string;
	summary: string;
	image: string;
	ctaLabel: string;
	ctaHref: string;
};

export type AudienceTrack = {
	id: string;
	title: string;
	kicker: string;
	description: string;
	detail: string;
	image: string;
	ctaLabel?: string;
	ctaHref?: string;
};

export type Machine = {
	name: string;
	note: string;
	ageRequirement?: string;
};

export type GalleryImage = {
	src: string;
	alt: string;
	caption: string;
};

export type DocumentLink = {
	label: string;
	href: string;
};

export type Stat = {
	value: string;
	label: string;
};

export type ContactCard = {
	title: string;
	lines: string[];
	linkLabel?: string;
	linkHref?: string;
};

export type SiteContent = {
	title: string;
	eyebrow: string;
	heroTitle: string;
	heroText: string;
	footerNote: string;
	quickLinks: QuickLink[];
	keyFacts: KeyFact[];
	offers: Offer[];
	workshops: Workshop[];
	audienceTracks: AudienceTrack[];
	machines: Machine[];
	gallery: GalleryImage[];
	documents: DocumentLink[];
	stats: Stat[];
	contactCards: ContactCard[];
	mapUrl: string;
	email: string;
	mastodonUrl: string;
	membershipCopy: string;
	campusCopy: string;
};
