import { describe, it } from 'vitest';
import { baseUrl, page } from '../../src/lib/internal/test/playwright/vitest.js';

describe('Dark mode button', async () => {
	it('is light in lightmode', async ({ expect }) => {
		await page.emulateMedia({ colorScheme: 'light' });
		await page.goto(`${baseUrl}/test/components/button/darkmode`);
		const image = await page.locator("#test-button").screenshot();
		expect(image).toMatchImageSnapshot();
	});
	it('is dark in darkmode', async ({ expect }) => {
		await page.emulateMedia({ colorScheme: 'dark' });
		await page.goto(`${baseUrl}/test/components/button/darkmode`);
		const image = await page.locator("#test-button").screenshot();
		expect(image).toMatchImageSnapshot();
	});
});
