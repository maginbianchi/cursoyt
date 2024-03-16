import { Locator, Page } from "@playwright/test";

export class Login {

    private readonly username: Locator
    private readonly password: Locator
    private readonly loginButton: Locator

    constructor(page: Page){
        this.username = page.getByRole('textbox', { name: "Username" })
        this.password = page.getByRole('textbox', { name: "Password" })
        this.loginButton = page.getByRole('button', { name: "Login" })
    }

    async login(username:string, password:string) {
        await this.username.fill(username)
        await this.password.fill(password)
        await this.loginButton.click()
    }
}