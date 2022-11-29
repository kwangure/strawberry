import '$lib/internal/test/before-tests.js';
import { beforeEach, describe, it } from 'vitest';
import { disableAnimations } from '$lib/internal/test/playwright.js';

describe('Pre element', async () => {
    it('doesn\'t add new lines to pre', async (context) => {
        const { baseUrl, expect, page } = context;
        await page.goto(`${baseUrl}/test/components/element/pre`);
        await disableAnimations({ page });
        const result = await page.evaluate(() => {
            const pre = document.querySelector('pre');
			if (pre) return pre.innerText;
            return '';
        });

        expect(result).toBe('\ntest text');
    });

});
