<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	let { data, form } = $props<{ data: PageData; form: ActionData }>();

	type RequestType = 'visit' | 'general' | 'workshop';

	function getWorkshopHeadline(topic: string) {
		if (!topic.trim() || /^(workshop|werkstattkurs|werkstattkurse)$/i.test(topic.trim())) {
			return 'Workshopplatz anfragen';
		}

		if (/maschineneinweisung/i.test(topic)) {
			return 'Maschineneinweisung anfragen';
		}

		return 'Workshopplatz anfragen';
	}

	function getRequestVariant(type: RequestType, topic: string) {
		if (type === 'visit') {
			return {
				pageTitle: 'Besuch anfragen',
				eyebrow: 'Erster Besuch',
				heading: 'Den ersten Besuch planen',
				lead: 'Für den offenen Abend reicht ein kurzer Hinweis, damit alles besser planbar bleibt.',
				cardTitle: 'Das ist vorab gut zu wissen',
				cardItems: [
					'Ob ihr allein, mit Familie oder als kleine Gruppe kommt',
					'Woran ihr ungefähr arbeiten möchtet oder was ihr euch ansehen wollt',
					'Alter und Begleitung, wenn Kinder oder Jugendliche dabei sind'
				],
				formEyebrow: 'Besuchsanfrage',
				formTitle: 'Kurz Bescheid geben',
				formLead: 'Die wichtigsten Angaben reichen. Alles Weitere kann vor Ort geklärt werden.',
				participantsLabel: 'Wie viele Personen kommen?',
				participantsPlaceholder: 'z. B. 1 erwachsene Person und 1 Kind',
				ageLabel: 'Alter / Begleitung',
				agePlaceholder: 'z. B. 11 Jahre, mit Elternteil',
				messagePlaceholder:
					'Wann möchtet ihr vorbeikommen und woran möchtet ihr ungefähr arbeiten oder was möchtet ihr euch zeigen lassen?',
				submitLabel: 'Besuch anmelden',
				showPlanningFields: true
			};
		}

		if (type === 'workshop') {
			const isGenericWorkshopTopic = /^(workshop|werkstattkurs|werkstattkurse)$/i.test(topic.trim());

			return {
				pageTitle: 'Workshop anfragen',
				eyebrow: 'Workshopanfrage',
				heading: getWorkshopHeadline(topic),
				lead: 'Ein paar Angaben helfen bei Platz, Alter und Vorbereitung.',
				cardTitle: 'Das hilft bei der Planung',
				cardItems: [
					'Welcher Workshop oder welche Einweisung gemeint ist',
					'Wie viele Personen dabei sind und welches Alter wichtig ist',
					'Vorkenntnisse oder Rückfragen, wenn Material oder Maschinen eine Rolle spielen'
				],
				formEyebrow: 'Workshopplatz',
				formTitle: 'Workshop oder Einweisung',
				formLead: 'So landet die Anfrage direkt mit den passenden Eckdaten an der richtigen Stelle.',
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
				eyebrow: 'Kontakt',
				heading: 'Nachricht an die Werkstatt',
				lead: 'Fragen zu Mitgliedschaft, Kooperationen, Materialspenden oder allgemeinen Themen können hier kurz landen.',
				cardTitle: 'Gut geeignet',
			cardItems: [
				'Allgemeine Fragen rund um die Werkstatt',
				'Kooperationen, Spenden oder Vereinsanliegen',
				'Alles, was zu keinem einzelnen Kurs gehört'
			],
				formEyebrow: 'Kontakt',
				formTitle: 'Kurz schreiben',
				formLead: 'Kurz schreiben, worum es geht. Eine Antwort kommt per E-Mail zurück.',
			participantsLabel: '',
			participantsPlaceholder: '',
			ageLabel: '',
			agePlaceholder: '',
			messagePlaceholder:
				'Worum geht es? Je klarer die Nachricht ist, desto schneller kommt eine Rückmeldung.',
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
		content="Direkter Weg für Anfragen zu Kursen, Besuchen und weiteren Angeboten der Offenen Werkstatt Norderstedt."
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
						<h2>Danke.</h2>
						<p>Die Anfrage ist raus. Eine Antwort kommt per E-Mail zurück.</p>
					</div>
				{:else}
					<div class="request-card__header">
						<p class="eyebrow request-card__eyebrow">{variant.formEyebrow}</p>
						<h2>{variant.formTitle}</h2>
						{#if currentType === 'workshop' && currentTopic}
							<p><strong>Thema:</strong> {currentTopic}</p>
						{/if}
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
									placeholder="Vorname und Nachname"
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
									placeholder="wenn ihr mögt"
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
							<a class="button-ghost" href="/">Zurück</a>
						</div>
					</form>
				{/if}
			</section>
		</div>
	</div>
</main>
