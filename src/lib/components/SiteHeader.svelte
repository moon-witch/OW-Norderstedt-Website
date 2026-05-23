<script lang="ts">
	let { title, primaryCtaHref } = $props<{ title: string; primaryCtaHref: string }>();

	let navOpen = $state(false);

	const links = [
		{ href: '#starten', label: 'Mitmachen' },
		{ href: '#workshops', label: 'Kurse' },
		{ href: '#werkstatt', label: 'Werkstatt' },
		{ href: '#verein', label: 'Verein & Kontakt' }
	];

	function toggleNav() {
		navOpen = !navOpen;
	}

	function closeNav() {
		navOpen = false;
	}
</script>

<a class="skip-link" href="#main">Zum Inhalt</a>
<header class="site-header">
	<div class="container site-header__wrap">
		<div class="site-header__bar">
			<div class="site-header__lead">
				<a class="brand" href="#top">
					<span class="brand__mark" aria-hidden="true">
						<img src="/media/szfa2025.JPG" alt="" />
					</span>
					<span class="brand__text">
						<strong>{title}</strong>
						<small>Besucherabend Do 17:00 bis 20:00 Uhr</small>
					</span>
				</a>
			</div>
			<button
				class="menu-button"
				type="button"
				aria-expanded={navOpen}
				aria-controls="site-nav"
				onclick={toggleNav}
			>
				{navOpen ? 'Schließen' : 'Menü'}
			</button>
			<nav id="site-nav" class="site-nav" data-open={navOpen}>
				<div class="site-nav__links">
					{#each links as link}
						<a class="nav-link" href={link.href} onclick={closeNav}>
							{link.label}
						</a>
					{/each}
				</div>
				<a class="button site-header__cta" href={primaryCtaHref} onclick={closeNav}>
					Kursplatz anfragen
				</a>
			</nav>
		</div>
	</div>
</header>
