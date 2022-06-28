import { describe, it } from "vitest"
import { page, queries } from "../../src/lib/internal/test/playwright/vitest.js";

describe("Checked switch", async () => {
    let switchLocator;
    it("is disabled when 'disabled' prop is true", async ({ expect }) => {
        await page.goto("http://localhost:3000/test/components/switch/disabled");
        switchLocator = await queries.getByRole("switch");
        await expect(switchLocator).toBeDisabled();
    });
});
