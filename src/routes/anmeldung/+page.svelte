<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	let { data, form } = $props<{ data: PageData; form: ActionData }>();

	type RequestType = 'visit' | 'general' | 'workshop';

	function getWorkshopHeadline(topic: string) {
		const value = topic.trim();

		if (!value || /^(workshop|werkstattkurs|werkstattkurse)$/i.test(value)) {
			return 'Workshopplatz anfragen';
		}

		if (/maschineneinweisung/i.test(value)) {
			return 'Maschineneinweisung anfragen';
		}

		return `Platz für ${value} anfragen`;
	}

	function getRequestVariant(type: RequestType, topic: string) {
		if (type === 'visit') {
			return {
				pageTitle: 'Besuch anfragen',
				eyebrow: 'Besuch planen',
				heading: 'Ersten Besuch planen',
				lead: 'Ein kurzer Hinweis reicht, damit der offene Werkstattabend besser planbar bleibt.',
				cardTitle: 'Hilfreich vor dem ersten Abend',
				cardItems: [
					'Ob Sie allein, mit Familie oder als kleine Gruppe kommen',
					'Woran Sie ungefähr arbeiten oder was Sie sich ansehen möchten',
					'Alter und Begleitung, wenn Kinder oder Jugendliche dabei sind'
				],
				formEyebrow: 'Besuchsanfrage',
				formTitle: 'Kurz anmelden',
				formLead: 'Die wichtigsten Angaben reichen. Alles Weitere kann vor Ort geklärt werden.',
				participantsLabel: 'Wie viele Personen kommen?',
				participantsPlaceholder: 'z. B. 1 Erwachsene Person und 1 Kind',
				ageLabel: 'Alter / Begleitung',
				agePlaceholder: 'z. B. 11 Jahre, mit Elternteil',
				messagePlaceholder:
					'Wann möchten Sie vorbeikommen und woran möchten Sie ungefähr arbeiten oder was möchten Sie sich zeigen lassen?',
				submitLabel: 'Besuch anfragen',
				showPlanningFields: true
			};
		}

		if (type === 'workshop') {
			const isGenericWorkshopTopic = /^(workshop|werkstattkurs|werkstattkurse)$/i.test(topic.trim());

			return {
				pageTitle: 'Workshop anfragen',
				eyebrow: 'Workshopanfrage',
				heading: getWorkshopHeadline(topic),
				lead: 'Die Werkstatt bekommt direkt die Angaben, die für Platz, Alter und Vorbereitung relevant sind.',
				cardTitle: 'Hilfreich für die Einplanung',
				cardItems: [
					'Welcher Workshop oder welche Einweisung gemeint ist',
					'Anzahl Teilnehmende und Alter, wenn das Angebot Altersgrenzen hat',
					'Vorkenntnisse oder Rückfragen, falls Material oder Maschinen eine Rolle spielen'
				],
				formEyebrow: 'Workshopplatz',
				formTitle: isGenericWorkshopTopic ? 'Workshop oder Einweisung anfragen' : topic,
				formLead: 'So landet die Anfrage direkt mit den passenden Eckdaten bei der Werkstatt.',
				participantsLabel: 'Anzahl Teilnehmende',
				participantsPlaceholder: 'z. B. 1 Person',
				ageLabel: 'Alter / Vorkenntnisse',
				agePlaceholder: 'z. B. 14 Jahre, erste Erfahrung mit 3D-Druck',
				messagePlaceholder:
					'Gibt es Fragen zum Termin, zum Ablauf oder zu Voraussetzungen? Hier ist auch Platz für kurze Hinweise zum Projekt.',
				submitLabel: 'Workshopplatz anfragen',
				showPlanningFields: true
			};
		}

		return {
			pageTitle: 'Nachricht senden',
			eyebrow: 'Allgemeine Anfrage',
			heading: 'Nachricht an die Werkstatt',
			lead: 'Für Mitgliedschaft, Kooperationen, Materialspenden oder allgemeine Rückfragen bleibt der Kontakt bewusst knapp gehalten.',
			cardTitle: 'Gut geeignet für',
			cardItems: [
				'Allgemeine Rückfragen zur Werkstatt',
				'Kooperationen, Spenden oder Vereinsanliegen',
				'Nachrichten, die keinem einzelnen Kurs zugeordnet sind'
			],
			formEyebrow: 'Kontakt',
			formTitle: 'Anliegen senden',
			formLead: 'Schreiben Sie kurz, worum es geht. Die Werkstatt meldet sich per E-Mail zurück.',
			participantsLabel: '',
			participantsPlaceholder: '',
			ageLabel: '',
			agePlaceholder: '',
			messagePlaceholder:
				'Worum geht es? Je klarer das Anliegen beschrieben ist, desto schneller kann die Werkstatt reagieren.',
			submitLabel: 'Nachricht senden',
			showPlanningFields: false
		};
	}

	const currentType = $derived.by(() => (form?.type ?? data.type ?? 'general') as RequestType);
	const currentSubject = $derived.by(() => form?.subject ?? data.subject);
	const currentTopic = $derived.by(() => form?.topic ?? data.topic);
	const variant = $derived.by(() => getRequestVariant(currentType, currentTopic));
</script>

<svelte:head>
	<title>{variant.pageTitle} | Offene Werkstatt Norderstedt</title>
	<meta
		name="description"
		content="Anfrage- und Anmeldeformular für Kurse, Werkstattbesuche und Angebote der Offenen Werkstatt Norderstedt."
	/>
</svelte:head>

<main class="request-page">
	<div class="container">
		<div class="request-layout">
			<section class="request-side">
				<a class="legal-page__back" href="/">Zur Startseite</a>
				<p class="eyebrow">{variant.eyebrow}</p>
				<h1>{variant.heading}</h1>
				<p class="request-side__lead">{variant.lead}</p>
				<div class="card request-side__card">
					<h2>{variant.cardTitle}</h2>
					<ul class="note-list">
						{#each variant.cardItems as item}
							<li>{item}</li>
						{/each}
					</ul>
				</div>
			</section>

			<section class="card request-card">
				{#if form?.success}
					<div class="request-success" role="status" aria-live="polite">
						<h2>Vielen Dank.</h2>
						<p>Ihre Anfrage wurde versendet. Die Werkstatt meldet sich per E-Mail bei Ihnen.</p>
					</div>
				{:else}
					<div class="request-card__header">
						<p class="eyebrow request-card__eyebrow">{variant.formEyebrow}</p>
						<h2>{variant.formTitle}</h2>
						<p>{variant.formLead}</p>
					</div>

					<form method="POST" use:enhance class="request-form">
						<input type="hidden" name="subject" value={currentSubject} />
						<input type="hidden" name="topic" value={currentTopic} />
						<input type="hidden" name="type" value={currentType} />
						<input
							class="request-form__honeypot"
							type="text"
							name="website"
							tabindex="-1"
							autocomplete="off"
						/>

						{#if form?.error}
							<p class="request-form__error" role="alert">{form.error}</p>
						{/if}

						<div class="request-form__grid">
							<label>
								<span>Name</span>
								<input
									name="name"
									autocomplete="name"
									placeholder="Vor- und Nachname"
									value={form?.values?.name ?? ''}
									required
								/>
							</label>

							<label>
								<span>E-Mail</span>
								<input
									name="email"
									type="email"
									autocomplete="email"
									placeholder="name@beispiel.de"
									value={form?.values?.email ?? ''}
									required
								/>
							</label>

							<label class:request-form__field--wide={!variant.showPlanningFields}>
								<span>Telefon</span>
								<input
									name="phone"
									autocomplete="tel"
									placeholder="optional"
									value={form?.values?.phone ?? ''}
								/>
							</label>

							{#if variant.showPlanningFields}
								<label>
									<span>{variant.participantsLabel}</span>
									<input
										name="participants"
										placeholder={variant.participantsPlaceholder}
										value={form?.values?.participants ?? ''}
									/>
								</label>
							{/if}
						</div>

						{#if variant.showPlanningFields}
							<label>
								<span>{variant.ageLabel}</span>
								<input
									name="age_info"
									placeholder={variant.agePlaceholder}
									value={form?.values?.ageInfo ?? ''}
								/>
							</label>
						{/if}

						<label>
							<span>Nachricht</span>
							<textarea
								name="message"
								rows="8"
								placeholder={variant.messagePlaceholder}
								required>{form?.values?.message ?? ''}</textarea
							>
						</label>

						<div class="request-form__actions">
							<button class="button" type="submit">{variant.submitLabel}</button>
							<a class="button-ghost" href="/">Abbrechen</a>
						</div>
					</form>
				{/if}
			</section>
		</div>
	</div>
</main>
