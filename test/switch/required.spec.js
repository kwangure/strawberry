import { describe, it } from 'vitest';
import { baseUrl, page } from '../../src/lib/internal/test/playwright/vitest.js';

describe.only('Required switch', async () => {
	it('prevents submission when \'required\' prop is true and Switch is unchecked', async ({ expect }) => {
		await page.goto(`${baseUrl}/test/components/switch/required`);
		await Promise.all([
			page.waitForNavigation({ timeout: 500 }),
			page.evaluate(() => foo.submit()),
		]);
		const search = await page.evaluate(() => location.search);
		const searchParams = new URLSearchParams(search);
		expect(searchParams.get('fizz')).toBeNull();
	});
});
