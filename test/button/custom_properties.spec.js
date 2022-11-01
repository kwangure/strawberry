import '$lib/internal/test/before-tests.js';
import { beforeEach, describe, test } from 'vitest';
import { disableAnimations } from '$lib/internal/test/playwright.js';

describe('Custom-property support', async () => {
    beforeEach(async (context) => {
        const { baseUrl, page } = context;
        await page.goto(`${baseUrl}/test/components/button/custom-properties`);
        await disableAnimations({ page });
    });

    function getPropertyValue({ selector, property, pseudo }) {
        const switchEl = document.querySelector(selector);
        const computedStylesheet = getComputedStyle(switchEl, pseudo);
        const value = computedStylesheet.getPropertyValue(property);
        window.CS = computedStylesheet;
        console.log({ computedStylesheet, property, pseudo, value });
        return value;
    }

    test('--br-button-root-border', async (context) => {
        const { expect, page } = context;
        const borderWidth = '3px';
        const borderColor = 'rgb(255, 0, 0)';
        const expectedValue = `${borderWidth} solid ${borderColor}`;
        await page.evaluate((expectedValue) => {
            const buttonParent = document.getElementById('button-parent');
            buttonParent.style.setProperty('--br-button-root-border', expectedValue);
        }, expectedValue);

        // Using getComputedStyles on ::file-selector-button doesn't seem to be supported on Chrome
        const [
            btnBorderColor,
            brBtnBorderColor,
            btnBorderWidth,
            brBtnBorderWidth,
        ] = await Promise.all([
            page.evaluate(getPropertyValue, { property: 'border-color', selector: 'button' }),
            page.evaluate(getPropertyValue, { property: 'border-color', selector: '.br-button' }),
            page.evaluate(getPropertyValue, { property: 'border-width', selector: 'button' }),
            page.evaluate(getPropertyValue, { property: 'border-width', selector: '.br-button' }),
        ]);

        expect(btnBorderColor).toBe(borderColor);
        expect(brBtnBorderColor).toBe(borderColor);
        expect(btnBorderWidth).toBe(borderWidth);
        expect(brBtnBorderWidth).toBe(borderWidth);
    });

    test('--br-button-root-font-color', async (context) => {
        const { expect, page } = context;
        const expectedValue = 'rgb(255, 0, 0)';
        await page.evaluate((expectedValue) => {
            const buttonParent = document.getElementById('button-parent');
            buttonParent.style.setProperty('--br-button-root-font-color', expectedValue);
        }, expectedValue);

        const [btnColor, brBtnColor] = await Promise.all([
            page.evaluate(getPropertyValue, { selector: 'button', property: 'color' }),
            page.evaluate(getPropertyValue, { selector: '.br-button', property: 'color' }),
        ]);

        expect(btnColor).toBe(expectedValue);
        expect(brBtnColor).toBe(expectedValue);
    });

    test('--br-button-root-background-color', async (context) => {
        const { expect, page } = context;
        const expectedValue = 'rgb(255, 0, 0)';
        await page.evaluate((expectedValue) => {
            const buttonParent = document.getElementById('button-parent');
            buttonParent.style.setProperty('--br-button-root-background-color', expectedValue);
        }, expectedValue);

        const [btnBackgroundColor, brBtnBackgroundColor] = await Promise.all([
            page.evaluate(getPropertyValue, { selector: 'button', property: 'background-color' }),
            page.evaluate(getPropertyValue, { selector: '.br-button', property: 'background-color' }),
        ]);

        expect(btnBackgroundColor).toBe(expectedValue);
        expect(brBtnBackgroundColor).toBe(expectedValue);
    });

});
