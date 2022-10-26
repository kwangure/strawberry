import { describe, it } from 'vitest';
import '$lib/internal/test/playwright/vitest.js';

describe('Named switch', async () => {
	it('has a named form input', async (context) => {
		const { baseUrl, expect, page } = context;
		await page.goto(`${baseUrl}/test/components/switch/name`);
		const hasNamedInput = await page.evaluate(() => {
			const form = document.getElementById('foo');
			return Boolean(form.bar);
		});
		expect(hasNamedInput).toBeTruthy();
	});
});
