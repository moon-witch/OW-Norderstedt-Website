import { env } from '$env/dynamic/private';
import nodemailer from 'nodemailer';

type WorkshopRequest = {
	subject: string;
	name: string;
	email: string;
	phone?: string;
	participants?: string;
	ageInfo?: string;
	message: string;
	requestTypeLabel?: string;
	sourceLabel?: string;
	pageUrl?: string;
};

function createTransport() {
	if (env.SMTP_URL) {
		return nodemailer.createTransport(env.SMTP_URL);
	}

	if (!env.SMTP_HOST) {
		throw new Error('SMTP configuration missing: SMTP_HOST or SMTP_URL must be set.');
	}

	return nodemailer.createTransport({
		host: env.SMTP_HOST,
		port: Number(env.SMTP_PORT ?? 587),
		secure: env.SMTP_SECURE === 'true',
		auth:
			env.SMTP_USER && env.SMTP_PASS
				? {
						user: env.SMTP_USER,
						pass: env.SMTP_PASS
					}
				: undefined
	});
}

export async function sendWorkshopRequestMail(input: WorkshopRequest) {
	const transporter = createTransport();
	const toAddress = env.SMTP_TO ?? 'moin@ow-norderstedt.de';
	const fromAddress = env.SMTP_FROM ?? env.SMTP_USER;

	if (!fromAddress) {
		throw new Error('SMTP configuration missing: SMTP_FROM or SMTP_USER must be set.');
	}

	const lines = [
		'Neue Anfrage über das Anmeldeformular der Offenen Werkstatt Norderstedt',
		'',
		`Formulartyp: ${input.requestTypeLabel || '-'}`,
		`Betreff: ${input.subject}`,
		`Name: ${input.name}`,
		`E-Mail: ${input.email}`,
		`Telefon: ${input.phone || '-'}`,
		`Teilnehmende: ${input.participants || '-'}`,
		`Alter / Hinweise: ${input.ageInfo || '-'}`,
		`Kontext: ${input.sourceLabel || '-'}`,
		`Seite: ${input.pageUrl || '-'}`,
		'',
		'Nachricht:',
		input.message
	];

	await transporter.sendMail({
		to: toAddress,
		from: fromAddress,
		replyTo: input.email,
		subject: input.requestTypeLabel ? `[${input.requestTypeLabel}] ${input.subject}` : input.subject,
		text: lines.join('\n')
	});
}
