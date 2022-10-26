import { describe, it } from 'vitest';
import '$lib/internal/test/playwright/vitest.js';

describe('Checked switch', async () => {
	it('is disabled when \'disabled\' prop is true', async (context) => {
		const { baseUrl, expect, page } = context;
		await page.goto(`${baseUrl}/test/components/switch/disabled`);
		let switchLocator = await page.getByRole('switch');
		await expect(switchLocator).toBeDisabled();
	});
});
