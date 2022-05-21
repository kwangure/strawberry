import { describe, it } from "vitest"
import { page, queries } from "../../src/lib/internal/test/playwright.js";

describe("Toggle switch", async () => {
    let switchLocator;
    it("is checked when 'checked' prop is true", async ({ expect }) => {
        await page.goto("http://localhost:3000/components/switch");
        switchLocator = await queries.getByRole("switch");
        await expect(switchLocator).toBeChecked();
    });
    it("It toggles off clicked", async ({ expect }) => {
        await switchLocator.click();
        await expect(switchLocator).not.toBeChecked();
    });
});
