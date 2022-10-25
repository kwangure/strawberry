import { describe, it } from 'vitest';
import { baseUrl, page } from '../../src/lib/internal/test/playwright/vitest.js';

describe('Dark mode switch', async () => {
	it('is light in lightmode', async ({ expect }) => {
		await page.emulateMedia({ colorScheme: 'light' });
		await page.goto(`${baseUrl}/test/components/switch/darkmode`);
		// Wait for animation to finish
		await new Promise(r => setTimeout(r, 500));
		const image = await page.locator('#test-switches').screenshot();
		expect(image).toMatchImageSnapshot();
	});
	it('is dark in darkmode', async ({ expect }) => {
		await page.emulateMedia({ colorScheme: 'dark' });
		await page.goto(`${baseUrl}/test/components/switch/darkmode`);
		// Wait for animation to finish
		await new Promise(r => setTimeout(r, 500));
		const image = await page.locator('#test-switches').screenshot();
		expect(image).toMatchImageSnapshot();
	});
});
