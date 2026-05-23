<script lang="ts">
</script>

<svg class="workshop-logo" viewBox="0 0 64 64" fill="none" aria-hidden="true">
	<rect class="workshop-logo__plate" x="9" y="9" width="46" height="46" rx="12" />
	<path class="workshop-logo__frame" d="M18 22h28M21 22v20M43 22v20M18 43h28" />
	<path class="workshop-logo__bench" d="M25 30.5h14a3 3 0 0 1 3 3V37H22v-3.5a3 3 0 0 1 3-3Z" />
	<path class="workshop-logo__frame" d="M26 37v6M38 37v6" />
	<path
		class="workshop-logo__spark"
		d="M32 14.5 33.9 19l4.6 1.9-4.6 1.9L32 27.5 30.1 22.8 25.5 20.9l4.6-1.9L32 14.5Z"
	/>
</svg>

<style>
	.workshop-logo {
		display: block;
		width: 2.2rem;
		height: 2.2rem;
		color: currentColor;
	}

	.workshop-logo__plate {
		fill: rgba(255, 255, 255, 0.04);
		stroke: rgba(255, 255, 255, 0.2);
		stroke-width: 1.5;
	}

	.workshop-logo__frame,
	.workshop-logo__bench {
		stroke: currentColor;
		stroke-width: 2.4;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.workshop-logo__bench {
		fill: none;
	}

	.workshop-logo__spark {
		fill: var(--logo-accent, #f0c67e);
	}
</style>
