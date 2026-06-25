import { page } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';

vi.mock('$app/stores', () => import('../test/mock-app-stores').then((m) => m.mockAppStores));

import Page from './+page.svelte';

describe('/+page.svelte', () => {
	it('should render ICS test sections', async () => {
		render(Page);

		const heading = page.getByRole('heading', { name: 'ICS 行事曆測試' });
		await expect.element(heading).toBeInTheDocument();

		const downloadLink = page.getByRole('link', { name: '下載 calendar.ics' });
		await expect.element(downloadLink).toBeInTheDocument();
		await expect.element(downloadLink).toHaveAttribute('href', '/calendar.ics?download=1');
	});
});
