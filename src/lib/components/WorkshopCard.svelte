<script lang="ts">
	import type { Workshop } from '$lib/types';
	import { toRequestFormHref } from '$lib/utils/request-links';

	let { workshop } = $props<{ workshop: Workshop }>();
</script>

<article class="card workshop-card">
	<div class="workshop-card__head">
		<div class="workshop-card__date">
			<span class="workshop-card__date-label">Termin</span>
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
			href={toRequestFormHref(workshop.ctaHref, workshop.title, workshop.title, 'workshop')}
		>
			{workshop.ctaLabel}
		</a>
	</div>
</article>
