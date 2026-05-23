<script lang="ts">
	import type { Workshop } from '$lib/types';
	import { getPdfLinkRel, getPdfLinkTarget } from '$lib/utils/link-targets';
	import { toRequestFormHref } from '$lib/utils/request-links';

	let { workshop } = $props<{ workshop: Workshop }>();
	const href = $derived(toRequestFormHref(workshop.ctaHref, workshop.title, workshop.title, 'workshop'));
</script>

<article class="card workshop-card">
	<div class="workshop-card__head">
		<div class="workshop-card__date">
			<span class="workshop-card__date-label">Wann?</span>
			<strong>{workshop.dateLabel}</strong>
			<span>{workshop.timeLabel}</span>
		</div>
		<span class="pill">{workshop.level}</span>
	</div>
	<div class="workshop-card__image-wrap">
		<img src={workshop.image} alt={workshop.title} loading="lazy" />
	</div>
	<div class="workshop-card__body">
		<h3>{workshop.title}</h3>
		<div class="workshop-card__meta">
			<span>{workshop.audience}</span>
			<span>{workshop.timeLabel}</span>
		</div>
		<p>{workshop.summary}</p>
		<a
			class="button workshop-card__cta"
			{href}
			target={getPdfLinkTarget(href)}
			rel={getPdfLinkRel(href)}
		>
			{workshop.ctaLabel}
		</a>
	</div>
</article>
