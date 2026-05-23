import { env } from '$env/dynamic/private';
import { createDirectus, readItems, readSingleton, rest } from '@directus/sdk';
import type {
	AudienceTrack,
	ContactCard,
	DocumentLink,
	GalleryImage,
	KeyFact,
	Machine,
	Offer,
	SiteContent,
	Stat,
	Workshop
} from '$lib/types';
import { localSiteContent } from './local-content';

type DirectusSiteSettings = {
	title?: string;
	eyebrow?: string;
	hero_title?: string;
	hero_text?: string;
	footer_note?: string;
	source_note?: string;
	map_url?: string;
	email?: string;
	mastodon_url?: string;
	membership_copy?: string;
	campus_copy?: string;
};

type DirectusOffer = Offer & { sort?: number };
type DirectusWorkshop = Workshop & { sort?: number };
type DirectusMachine = Machine & { sort?: number };
type DirectusGalleryImage = GalleryImage & { sort?: number };
type DirectusDocument = DocumentLink & { sort?: number };
type DirectusStat = Stat & { sort?: number };
type DirectusAudienceTrack = AudienceTrack & { sort?: number };
type DirectusFact = KeyFact & { sort?: number };
type DirectusContactCard = ContactCard & { sort?: number };

function sortByOptionalOrder<T extends { sort?: number }>(items: T[]) {
	return [...items].sort((left, right) => (left.sort ?? 999) - (right.sort ?? 999));
}

export async function getSiteContent(): Promise<SiteContent> {
	const directusUrl = env.DIRECTUS_URL?.trim().replace(/\/+$/, '');

	if (!directusUrl) {
		return localSiteContent;
	}

	try {
		const directus = createDirectus(directusUrl).with(rest());

		const [
			settings,
			offers,
			workshops,
			machines,
			gallery,
			documents,
			stats,
			audienceTracks,
			keyFacts,
			contactCards
		] = await Promise.all([
			directus.request(
				readSingleton('site_settings', {
					fields: [
						'title',
						'eyebrow',
						'hero_title',
						'hero_text',
						'footer_note',
						'source_note',
						'map_url',
						'email',
						'mastodon_url',
						'membership_copy',
						'campus_copy'
					]
				})
			) as Promise<DirectusSiteSettings>,
			directus.request(readItems('offers')) as Promise<DirectusOffer[]>,
			directus.request(readItems('workshops')) as Promise<DirectusWorkshop[]>,
			directus.request(readItems('machines')) as Promise<DirectusMachine[]>,
			directus.request(readItems('gallery_images')) as Promise<DirectusGalleryImage[]>,
			directus.request(readItems('documents')) as Promise<DirectusDocument[]>,
			directus.request(readItems('stats')) as Promise<DirectusStat[]>,
			directus.request(readItems('audience_tracks')) as Promise<DirectusAudienceTrack[]>,
			directus.request(readItems('key_facts')) as Promise<DirectusFact[]>,
			directus.request(readItems('contact_cards')) as Promise<DirectusContactCard[]>
		]);

		return {
			...localSiteContent,
			title: settings.title ?? localSiteContent.title,
			eyebrow: settings.eyebrow ?? localSiteContent.eyebrow,
			heroTitle: settings.hero_title ?? localSiteContent.heroTitle,
			heroText: settings.hero_text ?? localSiteContent.heroText,
			footerNote:
				settings.footer_note ?? settings.source_note ?? localSiteContent.footerNote,
			mapUrl: settings.map_url ?? localSiteContent.mapUrl,
			email: settings.email ? `mailto:${settings.email}` : localSiteContent.email,
			mastodonUrl: settings.mastodon_url ?? localSiteContent.mastodonUrl,
			membershipCopy: settings.membership_copy ?? localSiteContent.membershipCopy,
			campusCopy: settings.campus_copy ?? localSiteContent.campusCopy,
			offers: offers.length ? sortByOptionalOrder(offers) : localSiteContent.offers,
			workshops: workshops.length ? sortByOptionalOrder(workshops) : localSiteContent.workshops,
			machines: machines.length ? sortByOptionalOrder(machines) : localSiteContent.machines,
			gallery: gallery.length ? sortByOptionalOrder(gallery) : localSiteContent.gallery,
			documents: documents.length ? sortByOptionalOrder(documents) : localSiteContent.documents,
			stats: stats.length ? sortByOptionalOrder(stats) : localSiteContent.stats,
			audienceTracks: audienceTracks.length
				? sortByOptionalOrder(audienceTracks)
				: localSiteContent.audienceTracks,
			keyFacts: keyFacts.length ? sortByOptionalOrder(keyFacts) : localSiteContent.keyFacts,
			contactCards: contactCards.length
				? sortByOptionalOrder(contactCards)
				: localSiteContent.contactCards
		};
	} catch (error) {
		console.warn('Directus content could not be loaded. Falling back to local seed.', error);
		return localSiteContent;
	}
}
