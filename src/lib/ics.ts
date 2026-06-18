export type CalendarEvent = {
	uid: string;
	title: string;
	description?: string;
	location?: string;
	start: Date;
	end: Date;
};

const CRLF = '\r\n';

function formatIcsDate(date: Date): string {
	return date
		.toISOString()
		.replace(/[-:]/g, '')
		.replace(/\.\d{3}/, '');
}

function escapeIcsText(value: string): string {
	return value
		.replace(/\\/g, '\\\\')
		.replace(/;/g, '\\;')
		.replace(/,/g, '\\,')
		.replace(/\n/g, '\\n');
}

function foldLine(line: string): string {
	if (line.length <= 75) return line;

	const chunks: string[] = [];
	let remaining = line;

	while (remaining.length > 75) {
		chunks.push(remaining.slice(0, 75));
		remaining = ` ${remaining.slice(75)}`;
	}

	if (remaining.length > 0) chunks.push(remaining);

	return chunks.join(CRLF);
}

function buildEvent(event: CalendarEvent, now: Date): string {
	const lines = [
		'BEGIN:VEVENT',
		`UID:${event.uid}`,
		`DTSTAMP:${formatIcsDate(now)}`,
		`DTSTART:${formatIcsDate(event.start)}`,
		`DTEND:${formatIcsDate(event.end)}`,
		`SUMMARY:${escapeIcsText(event.title)}`
	];

	if (event.description) {
		lines.push(`DESCRIPTION:${escapeIcsText(event.description)}`);
	}

	if (event.location) {
		lines.push(`LOCATION:${escapeIcsText(event.location)}`);
	}

	lines.push('END:VEVENT');

	return lines.map(foldLine).join(CRLF);
}

export const sampleEvents: CalendarEvent[] = [
	{
		uid: 'ics-test-demo-001@jbhris.test',
		title: 'ICS 測試會議',
		description: '這是 ICS 下載與訂閱功能的測試事件。',
		location: '線上會議',
		start: new Date('2026-06-20T10:00:00+08:00'),
		end: new Date('2026-06-20T11:00:00+08:00')
	},
	{
		uid: 'ics-test-demo-002@jbhris.test',
		title: 'ICS 訂閱同步測試',
		description: '修改伺服器端事件後，訂閱端應在下次同步時更新。',
		location: 'JBHRIS',
		start: new Date('2026-06-25T14:00:00+08:00'),
		end: new Date('2026-06-25T15:30:00+08:00')
	}
];

export function generateCalendarIcs(
	events: CalendarEvent[] = sampleEvents,
	now = new Date()
): string {
	const body = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//JBHRIS//ICS Test//ZH',
		'CALSCALE:GREGORIAN',
		'METHOD:PUBLISH',
		...events.map((event) => buildEvent(event, now)),
		'END:VCALENDAR'
	].join(CRLF);

	return `${body}${CRLF}`;
}
