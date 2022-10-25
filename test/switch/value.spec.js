import { describe, it } from 'vitest';
import { baseUrl, page } from '../../src/lib/internal/test/playwright/vitest.js';

describe('Switch value', async () => {
	it('is adds input value from prop to form', async ({ expect }) => {
		await page.goto(`${baseUrl}/test/components/switch/value`);
		const value = await page.evaluate(() => foo.bar.value);
		expect(value).toEqual('baz');
	});
	it('defaults to on', async ({ expect }) => {
		await page.goto(`${baseUrl}/test/components/switch/value`);
		const value = await page.evaluate(() => foo.mah.value);
		expect(value).toEqual('on');
	});
});
