/**
 * @param {{ page: import('playwright-core').Page}} options
 */
export async function disableAnimations({ page }) {
    await page.addStyleTag({
        content: [
            '*,',
            '*::before,',
            '*::after {',
            '    -moz-animation: none !important;',
            '    -moz-transition: none !important;',
            '    animation: none !important;',
            '    caret-color: transparent !important;',
            '    transition: none !important;',
            '}'
        ].join('\n'),
    });
}