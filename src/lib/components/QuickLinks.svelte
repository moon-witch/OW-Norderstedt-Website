<script lang="ts">
	import type { QuickLink } from '$lib/types';

	let { items } = $props<{ items: QuickLink[] }>();
</script>

<section class="quick-links">
	<div class="container">
		<div class="quick-links__header">
			<p class="eyebrow">Direkt loslegen</p>
			<h2>Womit willst du anfangen?</h2>
		</div>
		<div class="quick-links__grid">
			{#each items as item, index}
				<a class="quick-link" href={item.href}>
					<span class="quick-link__index">0{index + 1}</span>
					<div class="quick-link__content">
						<span class="quick-link__label">{item.label}</span>
						<h3>{item.title}</h3>
						<p>{item.description}</p>
					</div>
					<span class="quick-link__arrow" aria-hidden="true">&gt;</span>
				</a>
			{/each}
		</div>
	</div>
</section>
