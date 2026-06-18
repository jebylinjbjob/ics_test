import { describe, expect, it } from 'vitest';
import { generateCalendarIcs, sampleEvents } from './ics';

describe('generateCalendarIcs', () => {
	it('produces a valid VCALENDAR with sample events', () => {
		const now = new Date('2026-06-18T08:00:00Z');
		const ics = generateCalendarIcs(sampleEvents, now);

		expect(ics).toContain('BEGIN:VCALENDAR');
		expect(ics).toContain('END:VCALENDAR');
		expect(ics).toContain('BEGIN:VEVENT');
		expect(ics).toContain('UID:ics-test-demo-001@jbhris.test');
		expect(ics).toContain('SUMMARY:ICS 測試會議');
		expect(ics).toContain('DTSTAMP:20260618T080000Z');
	});
});
