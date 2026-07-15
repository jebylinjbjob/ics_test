import type { CalendarEvent } from './ics';

function formatGoogleDate(date: Date): string {
	return date
		.toISOString()
		.replace(/[-:]/g, '')
		.replace(/\.\d{3}/, '');
}

/**
 * Google 行事曆「透過 URL 加入行事曆」連結，開啟後會出現訂閱確認對話框。
 * 傳入 HTTPS 的 ICS URL，會自動轉為 webcal:// 讓 Google 以訂閱方式處理。
 */
export function googleCalendarSubscribeUrl(icsUrl: string): string {
	const webcalUrl = icsUrl.replace(/^https?:/, 'webcal:');
	return `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(webcalUrl)}`;
}

/**
 * Google 行事曆「建立單一事件」的預填連結（action=TEMPLATE）。
 */
export function googleCalendarEventUrl(event: CalendarEvent): string {
	const params = new URLSearchParams({
		action: 'TEMPLATE',
		text: event.title,
		dates: `${formatGoogleDate(event.start)}/${formatGoogleDate(event.end)}`
	});

	if (event.description) params.set('details', event.description);
	if (event.location) params.set('location', event.location);

	return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
