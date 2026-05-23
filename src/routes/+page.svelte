<script lang="ts">
	import Gallery from '$lib/components/Gallery.svelte';
	import QuickLinks from '$lib/components/QuickLinks.svelte';
	import SectionIntro from '$lib/components/SectionIntro.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import WorkshopCard from '$lib/components/WorkshopCard.svelte';
	import { slide } from 'svelte/transition';
	import { buildRequestFormHref, toRequestFormHref } from '$lib/utils/request-links';

	let { data } = $props<{ data: { site: import('$lib/types').SiteContent } }>();
	const site = $derived(data.site);
	const workshopRequestHref = buildRequestFormHref(
		'Anfrage zu Workshops der Offenen Werkstatt Norderstedt',
		'Workshop',
		'workshop'
	);
	const visitRequestHref = $derived.by(() =>
		toRequestFormHref(
			site.keyFacts[0]?.linkHref,
			'Besuchsanmeldung - Offene Werkstatt Norderstedt',
			'Erster Besuch',
			'visit'
		)
	);
	const machineRequestHref = buildRequestFormHref(
		'Anfrage zur Maschineneinweisung',
		'Maschineneinweisung',
		'workshop'
	);
	const generalRequestHref = buildRequestFormHref(
		'Allgemeine Anfrage an die Offene Werkstatt Norderstedt',
		'Allgemeine Anfrage',
		'general'
	);
	const heroTitlePrimary = $derived.by(() => site.heroTitle.split(',')[0] ?? site.heroTitle);
	const heroTitleSecondary = $derived.by(() => site.heroTitle.split(',').slice(1).join(',').trim());
	let activeOfferId = $state('');

	$effect(() => {
		if (!activeOfferId && site.offers[0]?.id) {
			activeOfferId = site.offers[0].id;
		}
	});
</script>

<svelte:head>
	<title>{site.title}</title>
	<meta
		name="description"
		content="Offene Werkstatt Norderstedt: Werkstattkurse, offene Werkstatt, Familienangebote, Maschinen, Kontakt und Anfahrt."
	/>
</svelte:head>

<SiteHeader title={site.title} primaryCtaHref={workshopRequestHref} />

<main id="main">
	<section class="hero" id="top">
		<div class="container hero__layout">
			<div class="hero__copy">
				<p class="eyebrow">{site.eyebrow}</p>
				<h1>{heroTitlePrimary}</h1>
				{#if heroTitleSecondary}
					<p class="hero__subline">{heroTitleSecondary}</p>
				{/if}
				<p class="lead">{site.heroText}</p>
				<div class="hero__actions">
					<a class="button" href={workshopRequestHref}>Workshopplatz anfragen</a>
					<a class="button-ghost" href={visitRequestHref}>Ersten Besuch planen</a>
					<a class="button-ghost" href="/docs/workshopprogramm.pdf">Programmheft</a>
				</div>
			</div>

			<div class="hero__visual">
				<figure class="hero__photo">
					<img
						src="/media/02.JPG"
						alt="Werkbänke in der Offenen Werkstatt Norderstedt"
						loading="eager"
					/>
					<figcaption>Werkbänke, Material und Platz für eigene Projekte</figcaption>
				</figure>
			</div>

			<ul class="hero__list">
				<li>
					<span class="hero__list-title">Einsteigerfreundlich</span>
					<span class="hero__list-text">
						Viele Kurse starten bei den Grundlagen und führen direkt in die offene Werkstatt.
					</span>
				</li>
				<li>
					<span class="hero__list-title">Kostenfrei</span>
					<span class="hero__list-text">
						Freiwillige Beiträge zu Material und Unterhalt sind willkommen, aber kein Hindernis für
						den Einstieg.
					</span>
				</li>
				<li>
					<span class="hero__list-title">Vor Ort</span>
					<span class="hero__list-text">
						Im Schulzentrum Süd, gut erreichbar für Familien, Jugendliche und Erwachsene in
						Norderstedt.
					</span>
				</li>
			</ul>
		</div>
	</section>

	<section class="hero-facts-band" aria-label="Wichtige Informationen">
		<div class="container hero__facts">
			{#each site.keyFacts as fact}
				<article class="hero-fact">
					<span class="hero-fact__label">{fact.label}</span>
					<h2>{fact.value}</h2>
					<p>{fact.detail}</p>
					{#if fact.linkHref && fact.linkLabel}
						<a
							class="hero-fact__link"
							href={toRequestFormHref(
								fact.linkHref,
								fact.value,
								fact.label,
								fact.label === 'Offen für Besucher' ? 'visit' : 'general'
							)}
						>
							{fact.linkLabel}
						</a>
					{/if}
				</article>
			{/each}
		</div>
	</section>

	<QuickLinks items={site.quickLinks} />

	<section class="section section--paper" id="starten">
		<div class="container start-grid">
			<div class="start-copy">
				<p class="eyebrow">So starten Sie</p>
				<h2 class="section-title">Drei klare Wege zu uns</h2>
				<p class="section-copy">
					Der Einstieg bleibt sichtbar und übersichtlich: offener Abend, Werkstattkurs oder
					Familienformat.
				</p>
				<div class="button-row">
					<a class="button" href={visitRequestHref}>Besuch anmelden</a>
					<a class="button-ghost" href={generalRequestHref}>Frage senden</a>
				</div>
			</div>

			<div class="start-accordion">
				{#each site.offers as offer}
					{@const isActive = activeOfferId === offer.id}
					<article class:offer-panel--active={isActive} class="offer-panel">
						<button
							class="offer-panel__trigger"
							type="button"
							aria-expanded={isActive}
							aria-controls={`offer-panel-${offer.id}`}
							onclick={() => (activeOfferId = offer.id)}
						>
							<div>
								<span class="offer-panel__kicker">{offer.audience}</span>
								<h3>{offer.title}</h3>
							</div>
							<span class="offer-panel__toggle" aria-hidden="true">{isActive ? '–' : '+'}</span>
						</button>

						{#if isActive}
							<div
								class="offer-panel__content"
								id={`offer-panel-${offer.id}`}
								transition:slide={{ duration: 220 }}
							>
								<img src={offer.image} alt={offer.title} loading="lazy" />
								<div class="offer-panel__body">
									<p class="offer-panel__schedule">{offer.schedule}</p>
									<p>{offer.description}</p>
									<p class="offer-panel__detail">{offer.detail}</p>
									{#if offer.ctaHref && offer.ctaLabel}
										<a
											class="button-ghost offer-panel__cta"
											href={toRequestFormHref(
												offer.ctaHref,
												offer.title,
												offer.title,
												offer.id === 'offene-werkstatt' ? 'visit' : 'workshop'
											)}
										>
											{offer.ctaLabel}
										</a>
									{/if}
								</div>
							</div>
						{/if}
					</article>
				{/each}
			</div>
		</div>
	</section>

	<section class="section" id="workshops">
		<div class="container">
			<div class="workshops-top">
				<SectionIntro
					eyebrow="Workshops"
					title="Kurse, die direkt ins Machen führen"
					text="Jeder Termin zeigt Datum, Uhrzeit, Altersangabe und einen klaren Anmeldeweg. Die Themen greifen genau das auf, was später in der Werkstatt genutzt wird."
				/>
				<article class="card workshop-note">
					<span class="pill">Gut für den Einstieg</span>
					<h3>Warum die Kurse der schnellste Weg in die Werkstatt sind</h3>
					<ul class="note-list">
						<li>Maschinen und Material werden im echten Einsatz erklärt.</li>
						<li>Die Gruppen sind klein genug für Nachfragen und erste eigene Schritte.</li>
						<li>
							Wer danach weitermachen will, hat direkt den Anschluss an den offenen Werkstattabend.
						</li>
					</ul>
					<div class="button-row">
						<a class="button" href={workshopRequestHref}>Kursplatz anfragen</a>
						<a class="button-ghost" href="/docs/workshopprogramm.pdf">Programmheft</a>
					</div>
				</article>
			</div>

			<div class="workshops-grid">
				{#each site.workshops as workshop}
					<WorkshopCard {workshop} />
				{/each}
			</div>
		</div>
	</section>

	<section class="section section--warm" id="familien">
		<div class="container">
			<SectionIntro
				eyebrow="Kinder, Jugendliche und Familien"
				title="Begleitete Formate mit klaren Altersgruppen"
				text="Von der Eltern-Kind-Werkstatt über Technik Kids bis zu Projektformaten für Jugendliche bleiben die Angebote gut lesbar und zielgerichtet."
			/>
			<div class="audience-grid">
				{#each site.audienceTracks as track}
					<article class="card audience-card" id={track.id}>
						<img class="audience-card__image" src={track.image} alt={track.title} loading="lazy" />
						<div class="audience-card__body">
							<span class="pill">{track.kicker}</span>
							<h3>{track.title}</h3>
							<p>{track.description}</p>
							<p class="audience-card__detail">{track.detail}</p>
							{#if track.ctaLabel && track.ctaHref}
								<a
									class="button-ghost audience-card__cta"
									href={toRequestFormHref(track.ctaHref, track.title, track.title, 'workshop')}
								>
									{track.ctaLabel}
								</a>
							{/if}
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<section class="section section--paper" id="werkstatt">
		<div class="container studio-layout">
			<div class="studio-copy">
				<SectionIntro
					eyebrow="Werkstatt und Maschinen"
					title="Raum, Einweisungen und Maschinen für eigene Ideen"
					text="Viele Maschinen sind nach Einweisung nutzbar. Genau deshalb stehen Sicherheit, guter Überblick und ein unkomplizierter Zugang nebeneinander."
				/>
				<div class="button-row">
					<a class="button" href={machineRequestHref}>Maschineneinweisung anfragen</a>
				</div>
				<ul class="machine-list">
					{#each site.machines as machine}
						<li>
							<strong>{machine.name}</strong>
							<span>
								{machine.note}
								{#if machine.ageRequirement}
									<br />{machine.ageRequirement}
								{/if}
							</span>
						</li>
					{/each}
				</ul>
			</div>

			<div class="studio-side">
				<Gallery items={site.gallery} />

				<article class="card docs-panel">
					<div class="docs-panel__intro">
						<span class="pill">Unterlagen</span>
						<h3>Wichtige Dateien an einer Stelle</h3>
						<p>Programm, Werkstattordnung und Vereinsunterlagen bleiben schnell auffindbar.</p>
					</div>
					<div class="docs-grid">
						{#each site.documents as document}
							<a href={document.href}>{document.label}</a>
						{/each}
					</div>
				</article>
			</div>
		</div>
	</section>

	<section class="section section-dark final-section" id="verein">
		<div class="container final-layout">
			<div class="final-copy">
				<p class="eyebrow">Verein und Kontakt</p>
				<h2 class="section-title">
					Gemeinnützig organisiert. Offen für neue Projekte und neue Leute.
				</h2>
				<p class="section-copy">{site.membershipCopy}</p>
				<p class="section-copy final-copy__spacer">{site.campusCopy}</p>

				<div class="stats-grid">
					{#each site.stats as stat}
						<div class="stat-card">
							<strong>{stat.value}</strong>
							<span>{stat.label}</span>
						</div>
					{/each}
				</div>
			</div>

			<div class="contact-panel" id="kontakt">
				<div class="contact-panel__intro">
					<span class="pill">Vor Ort in Norderstedt</span>
					<h3>Vorbeikommen, nachfragen oder direkt anmelden</h3>
					<p>Adresse, Öffnungszeiten und Kontakt bleiben kompakt, lesbar und ohne Umwege.</p>
				</div>

				<div class="contact-overview">
					{#each site.contactCards as card}
						<article class="contact-item">
							<div class="contact-item__main">
								<p class="contact-item__title">{card.title}</p>
								<div class="contact-item__lines">
									{#each card.lines as line}
										<p>{line}</p>
									{/each}
								</div>
							</div>
							{#if card.linkHref && card.linkLabel}
								<a
									class="button-ghost contact-item__cta"
									href={toRequestFormHref(
										card.linkHref,
										'Allgemeine Anfrage an die Offene Werkstatt Norderstedt',
										card.title,
										'general'
									)}
								>
									{card.linkLabel}
								</a>
							{/if}
						</article>
					{/each}
				</div>

				<div class="button-row">
					<a class="button" href={generalRequestHref}>Nachricht senden</a>
					<a class="button-ghost" href={site.mapUrl} target="_blank" rel="noreferrer"
						>Karte öffnen</a
					>
					<a class="button-ghost" href={site.mastodonUrl} target="_blank" rel="noreferrer"
						>Mastodon</a
					>
				</div>
			</div>
		</div>
	</section>
</main>

<SiteFooter footerNote={site.footerNote} mastodonUrl={site.mastodonUrl} email={site.email} />
