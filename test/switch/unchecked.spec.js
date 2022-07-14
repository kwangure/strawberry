import { describe, it } from 'vitest';
import { page, queries } from '../../src/lib/internal/test/playwright/vitest.js';

describe('Unchecked switch', async () => {
	let switchLocator;
	it('is unchecked when \'checked\' prop is false', async ({ expect }) => {
		await page.goto('http://localhost:3000/test/components/switch/unchecked');
		switchLocator = await queries.getByRole('switch');
		await expect(switchLocator).not.toBeChecked();
	});
	it('it becomes checked when clicked', async ({ expect }) => {
		await switchLocator.click();
		await expect(switchLocator).toBeChecked();
	});
});
