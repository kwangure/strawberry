import { describe, it } from "vitest"
import { page, queries } from "../../src/lib/internal/test/playwright.js";

describe("Not disabled switch", async () => {
    let switchLocator;
    it("is not disabled when 'disabled' prop is false", async ({ expect }) => {
        await page.goto("http://localhost:3000/test/components/switch/not_disabled");
        switchLocator = await queries.getByRole("switch");
        await expect(switchLocator).not.toBeDisabled();
    });
});
