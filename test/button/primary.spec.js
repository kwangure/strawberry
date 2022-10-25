import { describe, it } from 'vitest';
import { baseUrl, page } from '../../src/lib/internal/test/playwright/vitest.js';

describe('Primary button', async () => {
	it('is primary color when primary classname is added', async ({ expect }) => {
		await page.goto(`${baseUrl}/test/components/button/primary`);
		const image = await page.locator("#test-button").screenshot();
		expect(image).toMatchImageSnapshot();
	});
});
