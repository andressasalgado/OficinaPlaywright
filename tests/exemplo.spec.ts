import { test, expect } from '@playwright/test'

test('Teste básico', async ({ page }) => {
    await page.goto('https://www.example.com') //navegar até a página
    const tituloDaPagina = await page.locator('h1') //localizar o texto do elemento h1
    await expect(tituloDaPagina).toContainText('Example Domain') //verificar se o valor recebido é o esperado
})

test('Testando click em elementos da página', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html') //navegar até a página
    await page.click('#signin_button') //clicar no elemento de id sigin_button
    await page.click('text=Sign in') //clicar no elemento que contém o texto Sign in 
  
    const errorMessage = await page.locator('.alert-error') //localizar o texto do elemento da classe alert error
    await expect(errorMessage).toContainText('Login and/or password are wrong.') //verificar se o valor recebido é o esperado
})

test.describe('Plano de teste', () => {
    test('Teste de login @testPlan', async ({ page }) => {
      await page.goto('http://zero.webappsecurity.com/index.html') //navegar até a página
      await page.click('#signin_button') //clicar no elemento de id sigin_button
  
      await page.type('#user_login', 'some username') //escrever no elemento de id user_login a frase some username
      await page.type('#user_password', 'some password') //escrever no elemento de id user_password a frase some password
      await page.click('text=Sign in') //clicar no elemento que contém o texto Sign in 
  
      const errorMessage = await page.locator('.alert-error') //localizar o texto do elemento da classe alert error
      await expect(errorMessage).toContainText('Login and/or password are wrong.') //verificar se o valor recebido é o esperado
    })
  
    test('Verificando elementos da página @testPlan', async ({ page }) => {
      await page.goto('https://example.com/') //navegar até a página
      await expect(page).toHaveURL('https://example.com/') //validar se a url da página
      await expect(page).toHaveTitle('Example Domain') //validar título da página
  
      const element = await page.locator('h1') //localizar o texto do elemento h1
      await expect(element).toBeVisible() //validar se o elemento é visível
      await expect(element).toHaveText('Example Domain') //validar se o elemento contém o texto
      await expect(element).toHaveCount(1) //validar quantos elementos contém
  
      const nonExistingElement = await page.locator('h5') //localizar o elemento h5 (que não existe)
      await expect(nonExistingElement).not.toBeVisible() //validar se o elemento NÃO existe
    })
  })