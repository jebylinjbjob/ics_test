import { describe, expect, it } from 'vitest';
import { googleCalendarEventUrl, googleCalendarSubscribeUrl } from './google-calendar';
import { sampleEvents } from './ics';

describe('googleCalendarSubscribeUrl', () => {
	it('converts the ICS URL to webcal and wraps it in a cid link', () => {
		const url = googleCalendarSubscribeUrl('https://example.com/calendar.ics');

		expect(url).toBe(
			'https://calendar.google.com/calendar/r?cid=webcal%3A%2F%2Fexample.com%2Fcalendar.ics'
		);
	});
});

describe('googleCalendarEventUrl', () => {
	it('builds a TEMPLATE link with UTC dates, details and location', () => {
		const url = new URL(googleCalendarEventUrl(sampleEvents[0]));

		expect(url.origin + url.pathname).toBe('https://calendar.google.com/calendar/render');
		expect(url.searchParams.get('action')).toBe('TEMPLATE');
		expect(url.searchParams.get('text')).toBe('ICS 測試會議');
		expect(url.searchParams.get('dates')).toBe('20260620T020000Z/20260620T030000Z');
		expect(url.searchParams.get('details')).toBe('這是 ICS 下載與訂閱功能的測試事件。');
		expect(url.searchParams.get('location')).toBe('線上會議');
	});

	it('omits details and location when the event has none', () => {
		const url = new URL(
			googleCalendarEventUrl({
				uid: 'bare@test',
				title: 'Bare event',
				start: new Date('2026-07-01T00:00:00Z'),
				end: new Date('2026-07-01T01:00:00Z')
			})
		);

		expect(url.searchParams.has('details')).toBe(false);
		expect(url.searchParams.has('location')).toBe(false);
	});
});
