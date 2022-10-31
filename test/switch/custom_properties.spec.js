import '$lib/internal/test/before-tests.js';
import { beforeEach, describe, test } from 'vitest';
import { disableAnimations } from '$lib/internal/test/playwright.js';

describe('Custom-property support', async () => {
    beforeEach(async (context) => {
        const { baseUrl, page } = context;
        await page.goto(`${baseUrl}/test/components/switch/custom-properties`);
        await disableAnimations({ page });
    });

    function getPropertyValue({ selector, property, pseudo }) {
        const switchEl = document.querySelector(selector);
        const computedStylesheet = getComputedStyle(switchEl, pseudo);
        return computedStylesheet.getPropertyValue(property);
    }

    test('--br-switch-thumb-background-color', async (context) => {
        const { expect, page } = context;
        const expectedValue = 'rgb(255, 0, 0)';
        await page.evaluate((expectedValue) => {
            const switchParent = document.getElementById('switch-parent');
            switchParent.style.setProperty('--br-switch-thumb-background-color', expectedValue);
        }, expectedValue);

        const [switchBackgroundColor] = await Promise.all([
            page.evaluate(getPropertyValue, {
                property: 'background-color',
                selector: '[role=switch]',
                pseudo: ':before'
            }),
        ]);

        expect(switchBackgroundColor).toBe(expectedValue);
    });

    test('--br-switch-thumb-size', async (context) => {
        const { expect, page } = context;
        const expectedValue = '20px';
        await page.evaluate((expectedValue) => {
            const switchParent = document.getElementById('switch-parent');
            switchParent.style.setProperty('--br-switch-thumb-size', expectedValue);
        }, expectedValue);

        const selector = '[role=switch]';
        const thumbSelector = ':before';
        const [thumbWidth, thumbHeight, switchHeight] = await Promise.all([
            page.evaluate(getPropertyValue, { selector, property: 'width', pseudo: thumbSelector }),
            page.evaluate(getPropertyValue, { selector, property: 'height', pseudo: thumbSelector }),
            page.evaluate(getPropertyValue, { selector, property: 'height' }),
        ]);

        expect(thumbWidth).toBe(expectedValue);
        expect(thumbHeight).toBe(expectedValue);
        expect(switchHeight).toBe(expectedValue);
    });

    test('--br-switch-track-active-background-color', async (context) => {
        const { expect, page } = context;
        const expectedValue = 'rgb(255, 0, 0)';
        const switchLocator = page.locator('[role=switch]:checked');
        await switchLocator.waitFor();

        await page.evaluate((expectedValue) => {
            const switchParent = document.getElementById('switch-parent');
            switchParent.style.setProperty('--br-switch-track-active-background-color', expectedValue);
        }, expectedValue);
        const [switchBackgroundColor] = await Promise.all([
            page.evaluate(getPropertyValue, {
                property: 'background-color',
                selector: '[role=switch]:checked',
            }),
        ]);
        expect(switchBackgroundColor).toBe(expectedValue);
    });

    test('--br-switch-track-background-color', async (context) => {
        const { expect, page } = context;
        const expectedValue = 'rgb(255, 0, 0)';
        await page.evaluate((expectedValue) => {
            const switchParent = document.getElementById('switch-parent');
            switchParent.style.setProperty('--br-switch-track-background-color', expectedValue);
        }, expectedValue);

        const [switchBackgroundColor] = await Promise.all([
            page.evaluate(getPropertyValue, {
                property: 'background-color',
                selector: '[role=switch]',
            }),
        ]);

        expect(switchBackgroundColor).toBe(expectedValue);
    });

    test('--br-switch-track-background-color', async (context) => {
        const { expect, page } = context;
        const expectedValue = 'rgb(255, 0, 0)';
        await page.evaluate((expectedValue) => {
            const switchParent = document.getElementById('switch-parent');
            switchParent.style.setProperty('--br-switch-track-background-color', expectedValue);
        }, expectedValue);

        const [switchBackgroundColor] = await Promise.all([
            page.evaluate(getPropertyValue, {
                property: 'background-color',
                selector: '[role=switch]',
            }),
        ]);

        expect(switchBackgroundColor).toBe(expectedValue);
    });

    test('--br-switch-track-padding', async (context) => {
        const { expect, page } = context;
        const expectedValue = '5px';
        await page.evaluate((expectedValue) => {
            const switchParent = document.getElementById('switch-parent');
            switchParent.style.setProperty('--br-switch-track-padding', expectedValue);
        }, expectedValue);

        const [switchPadding] = await Promise.all([
            page.evaluate(getPropertyValue, {
                property: 'padding',
                selector: '[role=switch]',
            }),
        ]);

        expect(switchPadding).toBe(expectedValue);
    });

    test('--br-switch-track-size', async (context) => {
        const { expect, page } = context;
        const expectedValue = '20px';
        await page.evaluate((expectedValue) => {
            const switchParent = document.getElementById('switch-parent');
            switchParent.style.setProperty('--br-switch-track-size', expectedValue);
        }, expectedValue);

        const [switchWidth] = await Promise.all([
            page.evaluate(getPropertyValue, {
                property: 'width',
                selector: '[role=switch]',
            }),
        ]);

        expect(switchWidth).toBe(expectedValue);
    });

});
