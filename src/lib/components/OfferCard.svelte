<script lang="ts">
	import type { Offer } from '$lib/types';
	import { toRequestFormHref } from '$lib/utils/request-links';

	let { offer } = $props<{ offer: Offer }>();
</script>

<article class="card offer-card" id={offer.id}>
	<div class="offer-card__media">
		<img class="offer-card__image" src={offer.image} alt={offer.title} loading="lazy" />
		<span class="offer-card__badge">{offer.audience}</span>
	</div>
	<div class="offer-card__body">
		<p class="offer-card__schedule">{offer.schedule}</p>
		<h3>{offer.title}</h3>
		<p>{offer.description}</p>
		<p class="offer-card__detail">{offer.detail}</p>
		{#if offer.ctaHref && offer.ctaLabel}
			<a
				class="button-ghost offer-card__cta"
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
</article>
