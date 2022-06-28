import { describe, it } from "vitest"
import { page } from "../../src/lib/internal/test/playwright/vitest.js";

describe("Named switch", async () => {
    it("has a named form input", async ({ expect }) => {
        await page.goto("http://localhost:3000/test/components/switch/name");
        const hasNamedInput = await page.evaluate(() => {
            const form = document.getElementById("foo");
            return Boolean(form.bar);
        });
        expect(hasNamedInput).toBeTruthy();
    });
});
