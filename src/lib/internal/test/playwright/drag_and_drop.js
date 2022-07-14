
/**
 * @typedef {{
 *     locator: import("@playwright/test").Locator;
 *     options?: {
 *          force?: boolean;
 *          modifiers?: ("Alt"|"Control"|"Meta"|"Shift")[];
 *          position?: { x: number, y: number };
 *          timeout?: number;
 *          trial?: boolean;
 *     }
 * }} Locator
 * @param {import("@playwright/test").Page} page
 * @param {Locator} origin
 * @param {Locator} destination
 */
export async function dragAndDrop(page, origin, destination) {
	await origin.locator.hover(origin.options);
	await page.mouse.down();
	const box = await destination.locator.boundingBox();
	if (box === null) throw 'Destination has no boundingBox. Check that it exists and is visible';
	await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
	await destination.locator.hover(destination.options);
	await page.mouse.up();
}
