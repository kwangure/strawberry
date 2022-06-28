import { describe, it } from "vitest"
import { page, queries } from "../../src/lib/internal/test/playwright/vitest.js";

describe("Checked switch", async () => {
    let switchLocator;
    it("is checked when 'checked' prop is true", async ({ expect }) => {
        await page.goto("http://localhost:3000/test/components/switch/checked");
        switchLocator = await queries.getByRole("switch");
        await expect(switchLocator).toBeChecked();
    });
    it("it becomes unchecked when clicked", async ({ expect }) => {
        await switchLocator.click();
        await expect(switchLocator).not.toBeChecked();
    });
});
