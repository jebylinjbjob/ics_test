import { generateCalendarIcs } from '$lib/ics';

export function GET({ url }: { url: URL }) {
	const isDownload = url.searchParams.get('download') === '1';
	const headers = new Headers({
		'Content-Type': 'text/calendar; charset=utf-8',
		'Cache-Control': 'no-cache'
	});

	if (isDownload) {
		headers.set('Content-Disposition', 'attachment; filename="calendar.ics"');
	}

	return new Response(generateCalendarIcs(), { headers });
}
