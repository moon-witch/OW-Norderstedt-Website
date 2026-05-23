import { fail } from '@sveltejs/kit';
import { sendWorkshopRequestMail } from '$lib/server/mailer';

const defaultSubject = 'Anfrage an die Offene Werkstatt Norderstedt';
type RequestType = 'visit' | 'general' | 'workshop';

function getTrimmedValue(formData: FormData, key: string) {
	return String(formData.get(key) ?? '').trim();
}

function isValidEmail(value: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function inferRequestType(subject: string, topic: string): RequestType {
	const haystack = `${subject} ${topic}`.toLowerCase();

	if (/(besuch|werkstattabend|vorbeikommen)/.test(haystack)) {
		return 'visit';
	}

	if (
		/(workshop|anmeldung|lasercutter|3d-druck|metall|mikrocontroller|technik-kids|technik kids|eltern-kind|tip|maschineneinweisung)/.test(
			haystack
		)
	) {
		return 'workshop';
	}

	return 'general';
}

function getRequestType(value: string, subject: string, topic: string): RequestType {
	if (value === 'visit' || value === 'general' || value === 'workshop') {
		return value;
	}

	return inferRequestType(subject, topic);
}

function getRequestTypeLabel(type: RequestType, subject: string, topic: string) {
	const haystack = `${subject} ${topic}`.toLowerCase();

	if (type === 'visit') {
		return 'Besuchsanfrage';
	}

	if (type === 'general') {
		return 'Generelle Anfrage';
	}

	if (/(famil|eltern-kind|eltern kind|ekw)/.test(haystack)) {
		return 'Familienangebot';
	}

	if (/(technik-kids|technik kids|kinder)/.test(haystack)) {
		return 'Kinderangebot';
	}

	if (/(jugend|tip|robotik)/.test(haystack)) {
		return 'Jugendangebot';
	}

	if (/maschineneinweisung/.test(haystack)) {
		return 'Maschineneinweisung';
	}

	return 'Workshopplatz';
}

export function load({ url }) {
	const subject = url.searchParams.get('subject')?.trim() || defaultSubject;
	const topic = url.searchParams.get('topic')?.trim() || subject;
	const type = getRequestType(url.searchParams.get('type')?.trim() || '', subject, topic);

	return {
		subject,
		topic,
		type
	};
}

export const actions = {
	default: async ({ request, url }) => {
		const formData = await request.formData();
		const subject = getTrimmedValue(formData, 'subject') || defaultSubject;
		const topic = getTrimmedValue(formData, 'topic') || subject;
		const type = getRequestType(getTrimmedValue(formData, 'type'), subject, topic);
		const requestTypeLabel = getRequestTypeLabel(type, subject, topic);
		const name = getTrimmedValue(formData, 'name');
		const email = getTrimmedValue(formData, 'email');
		const phone = getTrimmedValue(formData, 'phone');
		const participants = getTrimmedValue(formData, 'participants');
		const ageInfo = getTrimmedValue(formData, 'age_info');
		const message = getTrimmedValue(formData, 'message');
		const website = getTrimmedValue(formData, 'website');

		const values = {
			name,
			email,
			phone,
			participants,
			ageInfo,
			message
		};

		if (website) {
			return { success: true, subject, topic, type };
		}

		if (!name || !email || !message) {
			return fail(400, {
				success: false,
				subject,
				topic,
				type,
				values,
				error: 'Bitte füllen Sie Name, E-Mail und Nachricht aus.'
			});
		}

		if (!isValidEmail(email)) {
			return fail(400, {
				success: false,
				subject,
				topic,
				type,
				values,
				error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
			});
		}

		try {
			await sendWorkshopRequestMail({
				subject,
				name,
				email,
				phone,
				participants,
				ageInfo,
				message,
				requestTypeLabel,
				sourceLabel: topic,
				pageUrl: url.toString()
			});

			return {
				success: true,
				subject,
				topic,
				type
			};
		} catch (error) {
			console.error('Anmeldung could not be sent', error);

			return fail(500, {
				success: false,
				subject,
				topic,
				type,
				values,
				error:
					'Die Anfrage konnte gerade nicht versendet werden. Bitte versuchen Sie es später erneut oder schreiben Sie direkt an moin@ow-norderstedt.de.'
			});
		}
	}
};
