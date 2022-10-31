import { describe, it } from 'vitest';
import '$lib/internal/test/before-tests.js';

describe.only('Required switch', async () => {
	it('prevents submission when \'required\' prop is true and Switch is unchecked', async (context) => {
		const { baseUrl, expect, page } = context;
		await page.goto(`${baseUrl}/test/components/switch/required`);
		await Promise.all([
			page.waitForNavigation({ timeout: 1500 }),
			page.evaluate(() => foo.submit()),
		]);
		const search = await page.evaluate(() => location.search);
		const searchParams = new URLSearchParams(search);
		expect(searchParams.get('fizz')).toBeNull();
	});
});
