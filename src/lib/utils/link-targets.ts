export function isPdfHref(href?: string | null) {
	return typeof href === 'string' && /\.pdf(?:$|[?#])/i.test(href);
}

export function getPdfLinkTarget(href?: string | null) {
	return isPdfHref(href) ? '_blank' : undefined;
}

export function getPdfLinkRel(href?: string | null) {
	return isPdfHref(href) ? 'noreferrer' : undefined;
}
