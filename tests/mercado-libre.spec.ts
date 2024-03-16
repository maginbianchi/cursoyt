import { test, expect } from '@playwright/test';

const url: string = 'http://mercadolibre.com.ar'

//Locators 

test('Primer test con mercado libre', async ({ page}) => {
    
    await page.goto(url);

    await page.locator('input[id="cb1-edit"]').fill('Iphone')
    await page.keyboard.press('Enter')

    await expect(page.locator('//ol[contains(@class, "ui-search-layout")]')).toBeVisible()

    const titles: string[] = await page.locator('//ol[contains(@class, "ui-search-layout")]//li//h2').allInnerTexts()

    console.log(titles.length)
    for( let title of titles ) {
        console.log(title)
    }
})