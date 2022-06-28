import { describe, it } from "vitest"
import { page, queries } from "../../src/lib/internal/test/playwright/vitest.js";

describe("Enabled switch", async () => {
    let switchLocator;
    it("is enabled when 'disabled' prop is false", async ({ expect }) => {
        await page.goto("http://localhost:3000/test/components/switch/enabled");
        switchLocator = await queries.getByRole("switch");
        await expect(switchLocator).not.toBeDisabled();
    });
});
