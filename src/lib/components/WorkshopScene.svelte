<script lang="ts">
	import { animate, createTimeline, stagger } from 'animejs';
	import { onMount } from 'svelte';

	const printLayers = [
		{ offset: 0.2, width: 4.3 },
		{ offset: 0.35, width: 4.15 },
		{ offset: 0.5, width: 4 },
		{ offset: 0.65, width: 3.85 },
		{ offset: 0.8, width: 3.5 },
		{ offset: 1.25, width: 2.9 },
		{ offset: 1.65, width: 2.3 },
		{ offset: 2, width: 1.8 }
	];
	const sparks = Array.from({ length: 8 });
	const chips = Array.from({ length: 7 });

	let root: HTMLDivElement;

	onMount(() => {
		if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			return;
		}

		const cards = Array.from(root.querySelectorAll<HTMLElement>('.scene-card'));
		const layers = Array.from(root.querySelectorAll<HTMLElement>('.print-module__layer'));
		const sparkNodes = Array.from(root.querySelectorAll<HTMLElement>('.metal-module__spark'));
		const chipNodes = Array.from(root.querySelectorAll<HTMLElement>('.metal-module__chip'));
		const traceNodes = Array.from(root.querySelectorAll<HTMLElement>('.laser-module__trace'));
		const statusDots = Array.from(root.querySelectorAll<HTMLElement>('.scene__status-dot'));
		const nozzle = root.querySelector<HTMLElement>('.print-module__carriage');
		const laserHead = root.querySelector<HTMLElement>('.laser-module__head');
		const laserBeam = root.querySelector<HTMLElement>('.laser-module__beam');
		const spindle = root.querySelector<HTMLElement>('.metal-module__spindle');

		if (!nozzle || !laserHead || !laserBeam || !spindle) {
			return;
		}

		const intro = animate(cards, {
			translateY: [20, 0],
			opacity: [0, 1],
			delay: stagger(120),
			duration: 850,
			ease: 'out(3)'
		});

		const status = animate(statusDots, {
			scale: [0.8, 1.14, 0.8],
			opacity: [0.35, 1, 0.35],
			delay: stagger(180),
			duration: 1500,
			ease: 'inOutSine',
			loop: true
		});

		const printer = createTimeline({
			loop: true,
			defaults: {
				ease: 'inOutSine'
			}
		});

		printer
			.add(nozzle, {
				translateX: ['0rem', '8.5rem'],
				duration: 1200
			})
			.add(
				layers,
				{
					scaleX: [0.18, 1],
					opacity: [0.18, 0.96],
					duration: 420,
					delay: stagger(70)
				},
				'<'
			)
			.add(nozzle, {
				translateX: ['8.5rem', '1.8rem'],
				duration: 1100
			})
			.add(
				layers,
				{
					opacity: [0.96, 0.4],
					duration: 320,
					delay: stagger(40, { from: 'last' })
				},
				'<'
			);

		const laser = createTimeline({
			loop: true,
			defaults: {
				ease: 'inOutSine'
			}
		});

		laser
			.add(laserHead, {
				translateX: ['0rem', '6.6rem'],
				duration: 1000
			})
			.add(
				laserBeam,
				{
					opacity: [0, 0.92],
					scaleY: [0.2, 1],
					duration: 260
				},
				'<'
			)
			.add(
				traceNodes[0],
				{
					scaleX: [0, 1],
					opacity: [0.16, 0.9],
					duration: 420
				},
				'<'
			)
			.add(laserHead, {
				translateY: ['0rem', '3.8rem'],
				duration: 900
			})
			.add(
				traceNodes[1],
				{
					scaleY: [0, 1],
					opacity: [0.16, 0.9],
					duration: 420
				},
				'<'
			)
			.add(
				[laserBeam, ...traceNodes],
				{
					opacity: [0.9, 0.2],
					duration: 380
				},
				'-=160'
			)
			.add(laserHead, {
				translateX: ['6.6rem', '0rem'],
				translateY: ['3.8rem', '0rem'],
				duration: 1100
			});

		const metal = createTimeline({
			loop: true,
			defaults: {
				ease: 'inOutSine'
			}
		});

		metal
			.add(
				spindle,
				{
					translateY: ['0rem', '0.7rem'],
					rotate: '1turn',
					duration: 640,
					ease: 'inOutSine'
				},
				0
			)
			.add(
				sparkNodes,
				{
					translateX: stagger(['0rem', '2.8rem']),
					translateY: stagger(['0rem', '-1.2rem']),
					opacity: [0, 1, 0],
					scaleX: [0.16, 1, 0.16],
					duration: 520,
					delay: stagger(40)
				},
				'-=280'
			)
			.add(
				chipNodes,
				{
					translateY: ['0rem', '-0.65rem'],
					opacity: [0.18, 0.84, 0.18],
					duration: 900,
					delay: stagger(70, { from: 'center' })
				},
				'<'
			)
			.add(
				spindle,
				{
					translateY: ['0.7rem', '0rem'],
					duration: 500
				},
				'-=340'
			);

		return () => {
			intro.pause();
			status.pause();
			printer.pause();
			laser.pause();
			metal.pause();
		};
	});
</script>

<div class="scene" bind:this={root}>
	<div class="scene__masthead">
		<div>
			<p class="scene__eyebrow">Werkstattbetrieb</p>
			<p class="scene__title">Maschinen, Material und saubere erste Schritte.</p>
		</div>
		<div class="scene__status" aria-hidden="true">
			<span class="scene__status-dot"></span>
			<span class="scene__status-dot"></span>
			<span class="scene__status-dot"></span>
		</div>
	</div>

	<div class="scene__board">
		<article class="scene-card scene-card--laser">
			<header class="scene-card__header">
				<span class="scene-card__index">01</span>
				<span class="scene-card__label">Lasercutter</span>
			</header>
			<p class="scene-card__step">Datei → Holz → Zuschnitt</p>
			<div class="laser-module">
				<div class="laser-module__grid"></div>
				<div class="laser-module__sheet"></div>
				<div class="laser-module__head"></div>
				<div class="laser-module__beam"></div>
				<div class="laser-module__hole"></div>
				<div class="laser-module__trace laser-module__trace--horizontal"></div>
				<div class="laser-module__trace laser-module__trace--vertical"></div>
			</div>
		</article>

		<article class="scene-card scene-card--print">
			<header class="scene-card__header">
				<span class="scene-card__index">02</span>
				<span class="scene-card__label">3D-Druck</span>
			</header>
			<p class="scene-card__step">Modell → Slicer → Druck</p>
			<div class="print-module">
				<div class="print-module__rail"></div>
				<div class="print-module__bed"></div>
				<div class="print-module__carriage"></div>
				<div class="print-module__guide"></div>
				<div class="print-module__object">
					{#each printLayers as layer, index}
						<span
							class="print-module__layer"
							style={`--layer:${index};--offset:${layer.offset}rem;--width:${layer.width}rem;`}
						></span>
					{/each}
				</div>
			</div>
		</article>

		<article class="scene-card scene-card--metal">
			<header class="scene-card__header">
				<span class="scene-card__index">03</span>
				<span class="scene-card__label">Metallbohren</span>
			</header>
			<p class="scene-card__step">Anreißen → Spannen → Bohren</p>
			<div class="metal-module">
				<div class="metal-module__column"></div>
				<div class="metal-module__spindle"></div>
				<div class="metal-module__plate-hole"></div>
				<div class="metal-module__clamp"></div>
				<div class="metal-module__workpiece"></div>
				<div class="metal-module__sparks">
					{#each sparks as _, index}
						<span class="metal-module__spark" style={`--spark:${index};`}></span>
					{/each}
				</div>
				<div class="metal-module__chips">
					{#each chips as _, index}
						<span class="metal-module__chip" style={`--chip:${index};--row:${index % 2};`}></span>
					{/each}
				</div>
			</div>
		</article>
	</div>

	<div class="scene__rail" aria-hidden="true">
		<span>Kurse</span>
		<span>Einweisungen</span>
		<span>Freies Arbeiten</span>
	</div>
</div>

<style>
	.scene {
		position: relative;
		padding: 1.2rem;
		border: 1px solid rgba(239, 242, 233, 0.14);
		border-radius: 0.75rem;
		background:
			radial-gradient(circle at top left, rgba(197, 146, 60, 0.18), transparent 32%),
			linear-gradient(180deg, rgba(20, 26, 25, 0.96), rgba(11, 15, 14, 0.96));
		box-shadow:
			0 32px 72px rgba(5, 8, 8, 0.45),
			inset 0 1px 0 rgba(255, 255, 255, 0.06);
		color: #eff2e9;
	}

	.scene__masthead,
	.scene__rail,
	.scene-card__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.scene__eyebrow,
	.scene__title {
		margin: 0;
	}

	.scene__eyebrow {
		font-size: 0.72rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: rgba(239, 242, 233, 0.58);
	}

	.scene__title {
		font-size: 1rem;
		font-weight: 700;
	}

	.scene__status {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
	}

	.scene__status-dot {
		width: 0.52rem;
		height: 0.52rem;
		border-radius: 999px;
		background: #c5923c;
		box-shadow: 0 0 0 0.3rem rgba(197, 146, 60, 0.12);
	}

	.scene__board {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.9rem;
		margin-top: 1rem;
	}

	.scene-card {
		position: relative;
		min-height: 12.5rem;
		padding: 0.95rem;
		border: 1px solid rgba(239, 242, 233, 0.12);
		border-radius: 0.5rem;
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02)),
			radial-gradient(circle at top right, rgba(197, 146, 60, 0.12), transparent 45%);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
		opacity: 0;
	}

	.scene-card__index {
		font-size: 0.78rem;
		font-weight: 800;
		color: rgba(239, 242, 233, 0.44);
	}

	.scene-card__label {
		font-size: 0.9rem;
		font-weight: 700;
	}

	.scene-card__step {
		margin: 0.55rem 0 0;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: rgba(239, 242, 233, 0.5);
	}

	.laser-module,
	.print-module,
	.metal-module {
		position: relative;
		height: 9.3rem;
		margin-top: 1rem;
		border-radius: 0.5rem;
		overflow: hidden;
		background: rgba(6, 10, 9, 0.6);
	}

	.laser-module__grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(239, 242, 233, 0.06) 1px, transparent 1px),
			linear-gradient(90deg, rgba(239, 242, 233, 0.06) 1px, transparent 1px);
		background-size: 1.25rem 1.25rem;
	}

	.laser-module__sheet {
		position: absolute;
		left: 2rem;
		top: 2.2rem;
		width: 7rem;
		height: 4.4rem;
		border-radius: 0.55rem;
		background: linear-gradient(180deg, rgba(198, 167, 121, 0.42), rgba(121, 91, 54, 0.34));
		border: 1px solid rgba(255, 255, 255, 0.08);
	}

	.laser-module__head {
		position: absolute;
		top: 1rem;
		left: 1rem;
		width: 1.7rem;
		height: 1.1rem;
		border-radius: 0.5rem 0.5rem 0.35rem 0.35rem;
		background: linear-gradient(180deg, #d6d8d3, #8c9289);
		box-shadow: 0 0.25rem 0.8rem rgba(0, 0, 0, 0.35);
	}

	.laser-module__beam {
		position: absolute;
		top: 2.05rem;
		left: 1.8rem;
		width: 0.16rem;
		height: 4.2rem;
		transform-origin: top center;
		border-radius: 999px;
		background: linear-gradient(180deg, rgba(197, 146, 60, 0), rgba(197, 146, 60, 0.96));
		opacity: 0;
	}

	.laser-module__trace {
		position: absolute;
		left: 3.05rem;
		top: 5rem;
		background: linear-gradient(90deg, rgba(94, 169, 136, 0.28), rgba(94, 169, 136, 1));
		opacity: 0.22;
	}

	.laser-module__trace--horizontal {
		width: 4.4rem;
		height: 0.12rem;
		transform-origin: left center;
	}

	.laser-module__trace--vertical {
		left: 7.35rem;
		width: 0.12rem;
		height: 2.5rem;
		transform-origin: center top;
		background: linear-gradient(180deg, rgba(94, 169, 136, 0.28), rgba(94, 169, 136, 1));
	}

	.laser-module__hole {
		position: absolute;
		left: 3.25rem;
		top: 3rem;
		width: 0.65rem;
		height: 0.65rem;
		border-radius: 999px;
		border: 0.12rem solid rgba(94, 169, 136, 0.72);
		opacity: 0.5;
	}

	.print-module__rail {
		position: absolute;
		top: 1.15rem;
		left: 1rem;
		right: 1rem;
		height: 0.26rem;
		border-radius: 999px;
		background: rgba(239, 242, 233, 0.16);
	}

	.print-module__carriage {
		position: absolute;
		top: 0.65rem;
		left: 1rem;
		width: 1.7rem;
		height: 1.2rem;
		border-radius: 0.55rem;
		background: linear-gradient(180deg, #d6d8d3, #8c9289);
		box-shadow: 0 0.25rem 0.8rem rgba(0, 0, 0, 0.35);
	}

	.print-module__carriage::after {
		content: '';
		position: absolute;
		left: 0.72rem;
		top: 0.9rem;
		width: 0.24rem;
		height: 1.55rem;
		border-radius: 999px;
		background: linear-gradient(180deg, rgba(197, 146, 60, 0.98), rgba(197, 146, 60, 0));
	}

	.print-module__bed {
		position: absolute;
		left: 1rem;
		right: 1rem;
		bottom: 0.95rem;
		height: 1rem;
		border-radius: 0.6rem;
		background: linear-gradient(180deg, rgba(214, 216, 211, 0.18), rgba(214, 216, 211, 0.08));
		border: 1px solid rgba(239, 242, 233, 0.12);
	}

	.print-module__guide {
		position: absolute;
		left: 2.15rem;
		bottom: 1.95rem;
		width: 5rem;
		height: 3.1rem;
		border: 1px dashed rgba(239, 242, 233, 0.18);
		border-top-left-radius: 0.35rem;
		border-top-right-radius: 1.2rem;
		border-bottom-left-radius: 0.35rem;
		border-bottom-right-radius: 0.35rem;
		opacity: 0.35;
	}

	.print-module__object {
		position: absolute;
		left: 2.15rem;
		right: 2.4rem;
		bottom: 1.95rem;
		height: 3rem;
	}

	.print-module__layer {
		position: absolute;
		left: var(--offset);
		bottom: calc(var(--layer) * 0.16rem);
		width: var(--width);
		height: 0.34rem;
		transform-origin: left center;
		border-radius: 999px;
		background: linear-gradient(90deg, rgba(94, 169, 136, 0.3), rgba(94, 169, 136, 0.96));
		opacity: 0.3;
	}

	.metal-module__column {
		position: absolute;
		left: 2rem;
		top: 0.9rem;
		width: 0.65rem;
		height: 5rem;
		border-radius: 999px;
		background: linear-gradient(180deg, rgba(214, 216, 211, 0.28), rgba(83, 90, 86, 0.8));
	}

	.metal-module__spindle {
		position: absolute;
		left: 1.3rem;
		top: 1.75rem;
		width: 1.9rem;
		height: 1.4rem;
		border-radius: 0.55rem 0.55rem 0.35rem 0.35rem;
		background: linear-gradient(180deg, #d6d8d3, #8c9289);
		box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.35);
	}

	.metal-module__spindle::after {
		content: '';
		position: absolute;
		left: 0.82rem;
		top: 0.98rem;
		width: 0.18rem;
		height: 2rem;
		border-radius: 999px;
		background: linear-gradient(180deg, rgba(214, 216, 211, 0.92), rgba(214, 216, 211, 0.1));
	}

	.metal-module__clamp {
		position: absolute;
		left: 4.1rem;
		top: 2.65rem;
		width: 4.2rem;
		height: 0.5rem;
		border-radius: 0.2rem;
		background: rgba(214, 216, 211, 0.36);
		box-shadow:
			0 1.25rem 0 rgba(214, 216, 211, 0.3),
			0.55rem 0.65rem 0 rgba(214, 216, 211, 0.18);
	}

	.metal-module__workpiece {
		position: absolute;
		left: 4.05rem;
		right: 1rem;
		top: 3.15rem;
		height: 1.7rem;
		border-radius: 0.35rem;
		background: linear-gradient(180deg, rgba(148, 154, 149, 0.96), rgba(96, 102, 97, 0.96));
	}

	.metal-module__plate-hole {
		position: absolute;
		left: 6.25rem;
		top: 3.7rem;
		width: 0.36rem;
		height: 0.36rem;
		border-radius: 999px;
		background: rgba(9, 12, 11, 0.76);
		box-shadow: 0 0 0 0.12rem rgba(214, 216, 211, 0.24);
	}

	.metal-module__sparks,
	.metal-module__chips {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.metal-module__spark {
		position: absolute;
		left: 6rem;
		top: calc(3.2rem + var(--spark) * 0.16rem);
		width: 0.9rem;
		height: 0.12rem;
		transform-origin: left center;
		border-radius: 999px;
		background: linear-gradient(90deg, rgba(197, 146, 60, 1), rgba(197, 146, 60, 0));
		opacity: 0;
	}

	.metal-module__chip {
		position: absolute;
		left: calc(5rem + var(--chip) * 0.78rem);
		top: calc(5.3rem + var(--row) * 0.26rem);
		width: 0.62rem;
		height: 0.18rem;
		border-radius: 999px;
		background: rgba(214, 216, 211, 0.68);
		opacity: 0.3;
	}

	.scene__rail {
		margin-top: 0.95rem;
		padding-top: 0.9rem;
		border-top: 1px solid rgba(239, 242, 233, 0.12);
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.75rem;
		font-size: 0.82rem;
		font-weight: 700;
		color: rgba(239, 242, 233, 0.62);
	}

	@media (max-width: 860px) {
		.scene__board {
			grid-template-columns: 1fr;
		}

		.scene-card {
			min-height: 10.8rem;
		}

		.scene__rail {
			grid-template-columns: 1fr;
		}
	}
</style>
