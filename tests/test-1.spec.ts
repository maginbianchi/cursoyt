import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.ar/');
  await page.getByPlaceholder('Buscar productos, marcas y má').fill('Iphone');
  await page.getByPlaceholder('Buscar productos, marcas y má').press('Enter');
  await page.getByRole('link', { name: 'Apple iPhone SE SE (3ª generación, 64 GB) - Azul medianoche - Distribuidor' }).click();
  await page.getByRole('button', { name: 'Comprar ahora' }).click();
});