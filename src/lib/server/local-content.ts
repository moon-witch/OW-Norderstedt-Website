import type { SiteContent } from '$lib/types';

export const localSiteContent: SiteContent = {
	title: 'Offene Werkstatt Norderstedt',
	eyebrow: 'Gemeinnützige Werkstatt in Norderstedt',
	heroTitle: 'Werkstattkurse und offene Abende, bei denen man direkt ins Machen kommt.',
	heroText:
		'Von 3D-Druck und Lasercutting bis Holz, Metall, Elektronik und Familienformaten: Die Offene Werkstatt Norderstedt verbindet Kurse, eigene Projekte und handwerklich-technische Bildung an einem Ort.',
	footerNote:
		'Gemeinnütziger Verein für handwerklich-technische Bildung und offene Werkstattarbeit in Norderstedt.',
	quickLinks: [
		{
			href: '#starten',
			label: 'Einstieg',
			title: 'Den passenden Weg finden',
			description: 'Offener Abend, Kurs oder Familienformat: hier beginnt der einfachste Einstieg.'
		},
		{
			href: '#workshops',
			label: 'Kurse',
			title: 'Workshops und Reihen',
			description: 'Aktuelle Themen, klare Altersangaben und direkte Anfrage ohne Mail-Chaos.'
		},
		{
			href: '#werkstatt',
			label: 'Werkstatt',
			title: 'Maschinen und Einweisungen',
			description: 'Raum, Maschinen, Unterlagen und der Weg zur sicheren Nutzung an einer Stelle.'
		},
		{
			href: '#kontakt',
			label: 'Kontakt',
			title: 'Anfahrt und Nachricht',
			description: 'Adresse, Öffnungszeiten, Karte und Kontakt bleiben am Ende kompakt gebündelt.'
		}
	],
	keyFacts: [
		{
			label: 'Offen für Besucher',
			value: 'Donnerstag, 17:00 bis 20:00 Uhr',
			detail: 'Der offene Werkstattabend ist der einfachste Einstieg für neue Besucher.',
			linkLabel: 'Besuch anmelden',
			linkHref: 'mailto:moin@ow-norderstedt.de?subject=Besucheranmeldung%20-%20Offene%20Werkstatt'
		},
		{
			label: 'Mitgliederabend',
			value: 'Dienstag und Donnerstag, 17:00 bis 20:00 Uhr',
			detail: 'Dienstags ist freies Arbeiten für Vereinsmitglieder vorgesehen.'
		},
		{
			label: 'Werkstattort',
			value: 'Poppenbütteler Straße 230, 22851 Norderstedt',
			detail:
				'Werk- und Technikräume im Schulzentrum Süd, erreichbar zum Beispiel mit der Buslinie 493.'
		},
		{
			label: 'Teilnahme',
			value: 'Workshops grundsätzlich kostenfrei',
			detail: 'Freiwillige Beiträge zu Material und Unterhalt der Werkstatt sind willkommen.',
			linkLabel: 'Programmheft',
			linkHref: '/docs/workshopprogramm.pdf'
		}
	],
	offers: [
		{
			id: 'offene-werkstatt',
			title: 'Offener Werkstattabend',
			audience: 'Freies Arbeiten',
			schedule: 'Donnerstags für Besucher, dienstags und donnerstags für Mitglieder',
			description:
				'Die Werkstatt ist für nicht-kommerzielle Projekte geöffnet. Besucher arbeiten an Reparaturen, Holzprojekten, Elektronik oder 3D-Druck direkt vor Ort.',
			detail:
				'Viele Maschinen sind nach Einweisung nutzbar. Für den ersten Besuch ist die kurze Anmeldung der direkteste Weg.',
			image: '/media/02.JPG',
			ctaLabel: 'Besuch anmelden',
			ctaHref: 'mailto:moin@ow-norderstedt.de?subject=Besucheranmeldung%20-%20Offene%20Werkstatt'
		},
		{
			id: 'workshops',
			title: 'Werkstattkurse',
			audience: 'Lernen in kleinen Gruppen',
			schedule: 'Einzeltermine und Reihen für Einsteiger',
			description:
				'Zum Programm gehören unter anderem 3D-Druck, Lasercutter, Metallbearbeitung und Mikrocontroller.',
			detail: 'Alle Termine sind mit Datum, Uhrzeit, Altersangabe und direkter Anfrage sichtbar.',
			image: '/media/3dDruck3.png',
			ctaLabel: 'Programmheft öffnen',
			ctaHref: '/docs/workshopprogramm.pdf'
		},
		{
			id: 'familien-kinder',
			title: 'Familienwerkstatt',
			audience: 'Begleitete Formate',
			schedule: 'Samstage und Reihen über das Jahr',
			description:
				'Eltern-Kind-Werkstatt, Technik Kids, Robotik und projektbezogene Angebote schaffen einen klaren Einstieg für junge Besucher.',
			detail:
				'Viele Formate haben begrenzte Plätze. Deshalb bleiben klare Altersangaben und eine gut sichtbare Anfrage wichtig.',
			image: '/media/EKW2.png',
			ctaLabel: 'Familienangebote ansehen',
			ctaHref: '#familien'
		}
	],
	workshops: [
		{
			id: '3d-druck',
			title: '3D-Druck aus der Praxis',
			dateLabel: 'Samstag, 13.06.2026',
			timeLabel: '15:00 bis 17:00 Uhr',
			audience: 'ab 12 Jahre',
			level: 'Anfänger',
			summary:
				'Praxisnaher Einstieg vom Modell über den Slicer bis zum fertigen Druck. Geeignet für alle, die die Grundlagen für eigene Drucke in der offenen Werkstatt lernen möchten.',
			image: '/media/3dDruck3.png',
			ctaLabel: 'Anmeldung 13.06.26',
			ctaHref:
				'mailto:moin@ow-norderstedt.de?subject=Anmeldung%20zum%20WS%203D-Druck%2013.%20Juni%2026'
		},
		{
			id: 'lasercutter',
			title: 'Einführung Lasercutter',
			dateLabel: 'Samstag, 09.05.2026',
			timeLabel: '15:00 bis 17:00 Uhr',
			audience: 'ab 12 Jahre',
			level: 'Anfänger',
			summary:
				'Einführung in Materialgrenzen, Vorarbeiten und sichere Nutzung des Lasercutters für Holz, Kunststoff, Glas, Pappe und Papier.',
			image: '/media/Lasercutter.jpg',
			ctaLabel: 'Anmeldung Zusatztermin',
			ctaHref:
				'mailto:moin@ow-norderstedt.de?subject=Anmeldung%20zum%20WS%20Lasercutter%20am%209.%20Mai'
		},
		{
			id: 'metall',
			title: 'Grundlagen Metallbearbeitung',
			dateLabel: 'Samstag, 09.05.2026',
			timeLabel: '15:00 bis 17:00 Uhr',
			audience: 'ab 14 Jahre',
			level: 'Anfänger',
			summary:
				'Grundtechniken wie Sägen, Feilen, Bohren, Biegen und einfache Verbindungen, um die Hemmschwelle bei Metallprojekten zu senken.',
			image: '/media/Metallbearbeitung.png',
			ctaLabel: 'Anmeldung',
			ctaHref:
				'mailto:moin@ow-norderstedt.de?subject=Anmeldung%20zum%20WS%20Metallbearbeitung%20am%209.%20Mai'
		},
		{
			id: 'mikrocontroller',
			title: 'Mikrocontroller für Einsteiger',
			dateLabel: 'Teil 1: 06.06.2026, Teil 2: 27.06.2026',
			timeLabel: 'jeweils 15:00 bis 17:00 Uhr',
			audience: 'ab 12 Jahre',
			level: 'Anfänger',
			summary:
				'Einführung in Arduino, Programmierung, Sensorik und Aktoren. Der zweite Termin vertieft das Gelernte aus Teil 1.',
			image: '/media/Mikrocontroller.png',
			ctaLabel: 'Teil 1 anmelden',
			ctaHref:
				'mailto:moin@ow-norderstedt.de?subject=Anmeldung%20zum%20WS%20Mikrocontroller%201%20am%206.%20Juni'
		}
	],
	audienceTracks: [
		{
			id: 'familien',
			title: 'Für Familien',
			kicker: '5 bis 10 Jahre mit Begleitung',
			description:
				'Die Eltern-Kind-Werkstatt verbindet Materialerfahrung, handwerkliche Grundlagen und gemeinsames Ausprobieren in einem betreuten Rahmen.',
			detail:
				'Die aktuellen Termine liegen samstags zwischen Oktober 2025 und Mai 2026. Plätze sind begrenzt, deshalb bleibt die Anmeldung wichtig.',
			image: '/media/EKW2.png',
			ctaLabel: 'Eltern-Kind anmelden',
			ctaHref: 'mailto:moin@ow-norderstedt.de?subject=Anmeldung%20zu%20EKW%20%2F%202025%2F26'
		},
		{
			id: 'kids',
			title: 'Für Kinder',
			kicker: 'Technik Kids und Kreativformate',
			description:
				'Technik Kids richtet sich an 10- bis 12-Jährige und bündelt mehrere praktische Reihen mit klarer Altersangabe und überschaubaren Materialbeiträgen.',
			detail:
				'Dazu kommen weitere Formate wie Kreativangebote oder Brückenbau, die einen spielerischen Zugang zur Werkstatt schaffen.',
			image: '/media/Technik-Kids.png',
			ctaLabel: 'Technik Kids anfragen',
			ctaHref:
				'mailto:moin@ow-norderstedt.de?subject=Anmeldung%20zu%20Technik-Kids%20I%20%2F%202026'
		},
		{
			id: 'jugend',
			title: 'Für Jugendliche',
			kicker: 'Robotik, TiP und eigene Projekte',
			description:
				'Jugendliche können über Robotik-Angebote oder das offene Projektformat TiP einen Einstieg finden und später in die reguläre Werkstatt hineinwachsen.',
			detail:
				'Zwischen festen Reihen und offenen Projekten gibt es genug Raum, eigene Interessen auszuprobieren.',
			image: '/media/Brückentest.jpg',
			ctaLabel: 'TiP per Mail anfragen',
			ctaHref: 'mailto:moin@ow-norderstedt.de?subject=TiP:%20Interesse%20anmelden'
		}
	],
	machines: [
		{ name: 'Dekupiersäge', note: 'Hegner Multicut S2, elektrische Laubsäge' },
		{ name: 'Oberfräse', note: 'Einweisung erforderlich', ageRequirement: 'ab 18 Jahren' },
		{ name: 'Stichsäge', note: 'Einweisung erforderlich' },
		{ name: 'Abrichthobel', note: 'Einweisung erforderlich', ageRequirement: 'ab 18 Jahren' },
		{ name: 'Dickenhobel', note: 'Einweisung erforderlich' },
		{ name: 'Winkelschleifer', note: 'Einweisung erforderlich', ageRequirement: 'ab 18 Jahren' },
		{ name: 'Bohrmaschinen', note: 'Einweisung erforderlich' },
		{ name: 'Bandsäge', note: 'Einweisung erforderlich', ageRequirement: 'ab 18 Jahren' },
		{
			name: 'Kreissäge',
			note: 'Mafell Erika und Zuschnitt-Kreissäge SCM SC2C Compact',
			ageRequirement: 'ab 18 Jahren'
		},
		{ name: 'Gehrungskappsäge', note: 'Einweisung erforderlich' },
		{ name: 'Tischfräse', note: 'Einweisung erforderlich', ageRequirement: 'ab 18 Jahren' },
		{ name: 'CNC-Fräse', note: 'Einweisung erforderlich', ageRequirement: 'ab 18 Jahren' },
		{
			name: '3D-Drucker',
			note: 'FFF-Geräte wie Anet A8, Makerbot Replicator Z18 und Mingda Magician X'
		}
	],
	gallery: [
		{ src: '/media/01.JPG', alt: 'Eingang zur Werkstatt', caption: 'Eingang zur Werkstatt' },
		{ src: '/media/02.JPG', alt: 'Werkbänke', caption: 'Werkbänke für unterschiedliche Arbeiten' },
		{ src: '/media/03.JPG', alt: 'Maschinenraum', caption: 'Maschinenraum' },
		{ src: '/media/04.JPG', alt: 'Ständerbohrmaschinen', caption: 'Ständerbohrmaschinen' },
		{ src: '/media/05.JPG', alt: 'Löt- und Drucker-Raum', caption: 'Löt- und Drucker-Raum' },
		{ src: '/media/06.JPG', alt: 'Schraubzwingen', caption: 'Schraubzwingen und Spannwerkzeuge' }
	],
	documents: [
		{ label: 'Workshopprogramm 2025/26', href: '/docs/workshopprogramm.pdf' },
		{ label: 'Werkstattordnung', href: '/docs/werkstattordnung.pdf' },
		{ label: 'Satzung', href: '/docs/satzung.pdf' },
		{ label: 'Beitragsordnung', href: '/docs/beitragsordnung.pdf' }
	],
	stats: [
		{ value: '60+', label: 'aktive Mitglieder' },
		{ value: '2020', label: 'gegründet' },
		{ value: '20+', label: 'Maschinen und Spezialgeräte' },
		{ value: 'Di + Do', label: 'regelmäßige Werkstattabende' }
	],
	contactCards: [
		{
			title: 'Adresse',
			lines: ['Poppenbütteler Straße 230', '22851 Norderstedt', 'Schulzentrum Süd']
		},
		{
			title: 'Kontakt',
			lines: [
				'E-Mail: moin@ow-norderstedt.de',
				'ÖPNV: Buslinie 493',
				'Haltestelle: Schulzentrum Süd'
			],
			linkLabel: 'E-Mail schreiben',
			linkHref: 'mailto:moin@ow-norderstedt.de'
		},
		{
			title: 'Öffnungszeiten',
			lines: [
				'Mitglieder: Dienstag und Donnerstag, 17:00 bis 20:00 Uhr',
				'Besucher: Donnerstag, 17:00 bis 20:00 Uhr',
				'Geschlossen an Feiertagen sowie in Sommer- und Winterpause'
			]
		}
	],
	mapUrl:
		'https://www.google.com/maps/place/Schulzentrum+S%C3%BCd/@53.6894213,10.0280683,17z/data=!3m1!4b1!4m6!3m5!1s0x47b227be6341cd8f:0x3f9f5b0d19aa5a4d!8m2!3d53.6894213!4d10.0280683!16s%2Fg%2F1tctqqxv?entry=ttu',
	email: 'mailto:moin@ow-norderstedt.de',
	mastodonUrl: 'https://chaos.social/@OWN',
	membershipCopy:
		'Die Offene Werkstatt Norderstedt e. V. wurde 2020 gegründet und wird von rund 60 ehrenamtlich aktiven Mitgliedern getragen. Mitglieder unterstützen die Arbeit mit 1 bis 5 Euro im Monat und helfen dabei, Werkstattabende, Schulungen und offene Formate dauerhaft zu sichern.',
	campusCopy:
		'Die Werkstatt nutzt die Werk- und Technikräume im Schulzentrum Süd. Gute und verlässliche Räume bleiben eine wichtige Grundlage dafür, dass Angebote für Kinder, Jugendliche und Erwachsene langfristig stattfinden können.'
};
