import { expect, test } from '@playwright/test';

test('logs in to ERPNext and opens the desk', async ({ page }) => {
  const baseUrl = process.env.ERPNEXT_URL;
  const username = process.env.ERPNEXT_USER;
  const password = process.env.ERPNEXT_PASSWORD;

  if (!baseUrl || !username || !password) {
    throw new Error('ERPNEXT_URL, ERPNEXT_USER, and ERPNEXT_PASSWORD must be set.');
  }

  await page.goto(new URL('/login', baseUrl).toString());
  await page.getByRole('textbox', { name: 'Email' }).fill(username);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByRole('button', { name: 'User Menu' })).toBeVisible({ timeout: 60_000 });
  await page.goto(new URL('/app/home', baseUrl).toString());
  await expect(page).toHaveURL(/\/app\/home(?:[/?#]|$)/);
  await expect(page.getByRole('heading', { name: 'Home' })).toBeVisible();
});
// Testscript login Redsun.