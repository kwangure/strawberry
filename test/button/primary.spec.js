import { describe, it } from 'vitest';
import '$lib/internal/test/playwright/vitest.js';

describe('Primary button', async () => {
	it('is primary color when primary classname is added', async (context) => {
		const { baseUrl, expect, page } = context;
		await page.goto(`${baseUrl}/test/components/button/primary`);
		const image = await page.locator("#test-button").screenshot();
		expect(image).toMatchImageSnapshot();
	});
});
