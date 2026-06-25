import { readable } from 'svelte/store';
import type { Page } from '@sveltejs/kit';

function createMockPage(origin = 'http://localhost:5173'): Page {
	const url = new URL('/', origin) as Page['url'];
	return {
		url,
		params: {},
		route: { id: '/' },
		status: 200,
		error: null,
		data: {},
		form: undefined,
		state: {}
	};
}

export const mockAppStores = {
	page: readable(createMockPage()),
	navigating: readable(null),
	updated: readable(false)
};
