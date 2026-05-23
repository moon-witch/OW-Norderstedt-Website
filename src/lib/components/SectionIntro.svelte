<script lang="ts">
	let { eyebrow, title, text } = $props<{ eyebrow: string; title: string; text: string }>();
</script>

<div class="section-header">
	<p class="eyebrow">{eyebrow}</p>
	<h2>{title}</h2>
	<p>{text}</p>
</div>
