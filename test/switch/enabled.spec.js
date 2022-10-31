import { describe, it } from 'vitest';
import '$lib/internal/test/before-tests.js';

describe('Enabled switch', async () => {
	it('is enabled when \'disabled\' prop is false', async (context) => {
		const { baseUrl, expect, page } = context;
		await page.goto(`${baseUrl}/test/components/switch/enabled`);
		let switchLocator = await page.getByRole('switch');
		await expect(switchLocator).not.toBeDisabled();
	});
});
