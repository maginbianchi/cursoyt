import test from "@playwright/test";


test('Test', async ({ page }, testInfo) => {

    interface Coutry {
        name: string,
        capital: string,
        currency: string,
        primaryLanguage: string
    }

    await page.goto('https://cosmocode.io/automation-practice-webtable/')

    await page.screenshot({
        path: 'screenshots/table.png',
        fullPage: true,
    })

    await testInfo.attach('fotito', {
        body: await page.screenshot(),
        contentType: 'image/png'
    })

    const rows = await page.locator('xpath=//table[@id="countries"]//tr').all()

    console.log(rows.length)
    let countries: Coutry[] = []

    for(let i = 1; i < rows.length; i++){
        const currentRow = rows.at(i)

        countries.push({
            name: await currentRow?.locator('xpath=.//td[2]').innerText()!,
            capital: await currentRow?.locator('xpath=./td[3]').innerText()!,
            currency: await currentRow?.locator('xpath=./td[4]').innerText()!,
            primaryLanguage: await currentRow?.locator('xpath=./td[5]').innerText()!
        })
    }

    //console.log(countries)

    console.log(countries.filter( country => country.primaryLanguage === 'Portuguese' ))

})