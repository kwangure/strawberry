import { test as baseTest, expect } from "sitgent/playwright-test";
import { fixtures } from "sitgent/fixtures";

const test = baseTest.extend(fixtures);

test("Toggle switch", async ({ page, queries }) => {
    await page.goto("http://localhost:3000/components/switch");
    const switchLocator = await queries.getByRole("switch");
    await expect(switchLocator, "Switch 'input' should be checked when 'checked' prop is true.").toBeChecked();
    await switchLocator.click();
    await expect(switchLocator, "Switch 'input' should toggle checked when clicked.").not.toBeChecked();
});
