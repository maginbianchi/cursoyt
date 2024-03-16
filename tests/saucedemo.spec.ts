import { test, expect } from "@playwright/test";
import { Login } from "./pages/loginPage";

test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto(process.env.URL!)

    const loginPage = new Login(page)
    await loginPage.login('standard_user', 'secret_sauce')

});


test('Test Sauce', async ({ page }) => {

    const inventoryItems = await page.locator('.inventory_item').all()

    const text = await inventoryItems[0].locator('.inventory_item_desc').innerText()
    const name = await inventoryItems[0].locator('.inventory_item_name').innerText()
    const price = await inventoryItems[0].locator('.inventory_item_price').innerText()

    console.log({ text, name, price })


    await page.getByRole('button', { name: 'Add to cart' }).first().click()
    await page.locator('.shopping_cart_link').click()

    await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible()

    let actualText = await page.locator('.inventory_item_desc').innerText()
    let actualName = await page.locator('.inventory_item_name').innerText()
    let actualPrice = await page.locator('.inventory_item_price').innerText()

    expect(actualName).toEqual(name)
    expect(actualText).toEqual(text)
    expect(actualPrice).toEqual(price)

    await page.getByRole('button', { name: 'Checkout' }).click()

    await page.getByRole('textbox', { name: "First Name" }).fill('Magin')
    await page.getByRole('textbox', { name: "Last Name" }).fill('Bianchi')
    await page.getByRole('textbox', { name: "Zip/Postal Code" }).fill('X5000')
    await page.getByRole('button', { name: "Continue" }).click()

    await expect(page.getByRole('button', { name: 'Finish' })).toBeVisible()

    actualText = await page.locator('.inventory_item_desc').innerText()
    actualName = await page.locator('.inventory_item_name').innerText()
    actualPrice = await page.locator('.inventory_item_price').innerText()

    expect(actualName).toEqual(name)
    expect(actualText).toEqual(text)
    expect(actualPrice).toEqual(price)

    await page.getByRole('button', { name: "Finish" }).click()

    //await expect(page.locator('.complete-header').innerText()).toEqual('Thank you for your order!')
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!')
})