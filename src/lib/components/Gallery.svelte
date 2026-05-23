<script lang="ts">
	import type { GalleryImage } from '$lib/types';

	let { items } = $props<{ items: GalleryImage[] }>();
</script>

<div class="gallery-grid">
	{#each items as item}
		<figure>
			<img src={item.src} alt={item.alt} loading="lazy" />
			<figcaption>{item.caption}</figcaption>
		</figure>
	{/each}
</div>
