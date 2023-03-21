import { test, expect } from '@playwright/test'

test('Teste básico', async ({ page }) => {
    await page.goto('https://www.example.com')
    const pageTitle = await page.locator('h1')
    await expect(pageTitle).toContainText('Example Domain')
})

test('Testando click em elementos da página', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.click('text=Sign in')
  
    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

test.describe('Plano de teste', () => {
    test('Teste de login @testPlan', async ({ page }) => {
      await page.goto('http://zero.webappsecurity.com/index.html')
      await page.click('#signin_button')
  
      await page.type('#user_login', 'some username')
      await page.type('#user_password', 'some password')
      await page.click('text=Sign in')
  
      const errorMessage = await page.locator('.alert-error')
      await expect(errorMessage).toContainText('Login and/or password are wrong.')
    })
  
    test('Verificando elementos da página @testPlan', async ({ page }) => {
      await page.goto('https://example.com/')
      await expect(page).toHaveURL('https://example.com/')
      await expect(page).toHaveTitle('Example Domain')
  
      const element = await page.locator('h1')
      await expect(element).toBeVisible()
      await expect(element).toHaveText('Example Domain')
      await expect(element).toHaveCount(1)
  
      const nonExistingElement = await page.locator('h5')
      await expect(nonExistingElement).not.toBeVisible()
    })
  })