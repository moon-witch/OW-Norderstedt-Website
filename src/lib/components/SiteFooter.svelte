<script lang="ts">
	import WorkshopLogo from '$lib/components/WorkshopLogo.svelte';

	let { footerNote, mastodonUrl, email } = $props<{
		footerNote: string;
		mastodonUrl: string;
		email: string;
	}>();
</script>

<footer class="footer">
	<div class="container footer__inner">
		<div class="footer__brand-block">
			<div>
				<div class="footer__brand">Offene Werkstatt Norderstedt</div>
				<p>{footerNote}</p>
			</div>
		</div>
		<div class="footer__meta">
			<span class="footer__label">Kontakt</span>
			<a class="footer__mail" href={email}>moin@ow-norderstedt.de</a>
		</div>
		<div class="footer__links">
			<a href={mastodonUrl} target="_blank" rel="noreferrer">Mastodon</a>
			<a href="/impressum">Impressum</a>
			<a href="/datenschutz">Datenschutz</a>
		</div>
	</div>
</footer>
