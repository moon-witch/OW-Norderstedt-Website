const DEFAULT_SUBJECT = 'Anfrage an die Offene Werkstatt Norderstedt';
export type RequestFormType = 'visit' | 'general' | 'workshop';

function getRequestFormType(value?: string | null): RequestFormType | undefined {
	if (value === 'visit' || value === 'general' || value === 'workshop') {
		return value;
	}
}

export function buildRequestFormHref(
	subject: string,
	topic?: string,
	type: RequestFormType = 'general'
) {
	const params = new URLSearchParams({
		subject,
		type
	});

	if (topic) {
		params.set('topic', topic);
	}

	return `/anmeldung?${params.toString()}`;
}

export function toRequestFormHref(
	href?: string,
	fallbackSubject = DEFAULT_SUBJECT,
	fallbackTopic?: string,
	fallbackType: RequestFormType = 'general'
) {
	if (!href || !href.startsWith('mailto:')) {
		return href ?? '#';
	}

	try {
		const url = new URL(href);
		const subject = url.searchParams.get('subject') ?? fallbackSubject;
		const topic = url.searchParams.get('topic') ?? fallbackTopic;
		const type = getRequestFormType(url.searchParams.get('type')) ?? fallbackType;

		return buildRequestFormHref(subject, topic, type);
	} catch {
		return buildRequestFormHref(fallbackSubject, fallbackTopic, fallbackType);
	}
}
