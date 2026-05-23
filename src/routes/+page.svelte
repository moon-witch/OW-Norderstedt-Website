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
		content="Offene Werkstatt Norderstedt: Kurse, offene Abende, Familienangebote, Maschinen, Kontakt und Anfahrt auf einen Blick."
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
					<figcaption>Werkbänke, Material und Platz für eigene Ideen</figcaption>
				</figure>
			</div>

			<ul class="hero__list">
				<li>
					<span class="hero__list-title">Leichter Einstieg</span>
					<span class="hero__list-text">
						Viele Kurse starten bei den Grundlagen und führen direkt in die Werkstatt hinein.
					</span>
				</li>
				<li>
					<span class="hero__list-title">Kostenfrei</span>
					<span class="hero__list-text">
						Workshops sind bei uns kostenfrei. Freiwillige Beiträge helfen bei Material und Unterhalt.
					</span>
				</li>
				<li>
					<span class="hero__list-title">In Norderstedt</span>
					<span class="hero__list-text">
						Im Schulzentrum Süd, gut erreichbar für Familien, Jugendliche und Erwachsene.
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
				<p class="eyebrow">Mitmachen</p>
				<h2 class="section-title">Drei einfache Wege, um dabei zu sein</h2>
				<p class="section-copy">
					Ob offener Abend, Werkstattkurs oder Familienformat: Der Einstieg ist kinderleicht.
				</p>
				<div class="button-row">
					<a class="button" href={visitRequestHref}>Besuch anmelden</a>
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
					title="Kurse mit direktem Einstieg ins Handwerken"
					text=""
				/>
				<article class="card workshop-note">
					<span class="pill">Gut zum Reinkommen</span>
					<h3>Warum Kurse oft der schnellste Weg in die Werkstatt sind</h3>
					<ul class="note-list">
						<li>Maschinen und Material werden direkt im echten Einsatz erklärt.</li>
						<li>Die Gruppen bleiben klein genug für Fragen und erste eigene Schritte.</li>
						<li>
							Wer danach weitermachen will, findet direkt Anschluss an den offenen Werkstattabend.
						</li>
					</ul>
					<div class="button-row">
						<a class="button" href={workshopRequestHref}>Workshopplatz anfragen</a>
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
				title="Angebote bei denen jeder dabei sein kann"
				text="Von der Eltern-Kind-Werkstatt über Technik Kids bis zu Projekten für Jugendliche."
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
					title="Raum, Einweisungen und Maschinen"
					text="Viele Maschinen sind nach Einweisung nutzbar. Sicherheit, guter Überblick und ein unkomplizierter Zugang gehören dabei zusammen."
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
						<h3>Wichtige Unterlagen an einem Ort</h3>
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
				<h2 class="section-title">Verein, Kontakt und neue Projekte</h2>
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
					<h3>Vorbeikommen, schreiben oder direkt einen Platz anfragen</h3>
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
					<a class="button" href={generalRequestHref}>Schreib uns</a>
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
