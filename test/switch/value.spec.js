import { describe, it } from 'vitest';
import '$lib/internal/test/playwright/vitest.js';

describe('Switch value', async () => {
	it('is adds input value from prop to form', async (context) => {
		const { baseUrl, expect, page } = context;
		await page.goto(`${baseUrl}/test/components/switch/value`);
		const value = await page.evaluate(() => foo.bar.value);
		expect(value).toEqual('baz');
	});
	it('defaults to on', async (context) => {
		const { baseUrl, expect, page } = context;
		await page.goto(`${baseUrl}/test/components/switch/value`);
		const value = await page.evaluate(() => foo.mah.value);
		expect(value).toEqual('on');
	});
});
