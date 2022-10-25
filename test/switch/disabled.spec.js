import { describe, it } from 'vitest';
import { baseUrl, page, queries } from '../../src/lib/internal/test/playwright/vitest.js';

describe('Checked switch', async () => {
	let switchLocator;
	it('is disabled when \'disabled\' prop is true', async ({ expect }) => {
		await page.goto(`${baseUrl}/test/components/switch/disabled`);
		switchLocator = await queries.getByRole('switch');
		await expect(switchLocator).toBeDisabled();
	});
});
