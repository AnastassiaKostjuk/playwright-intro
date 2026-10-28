import { test, expect } from '@playwright/test';

const url = 'https://playwright.dev/'

test.beforeEach( async ({ page }) => {
  await page.goto(url);
})

test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('check the GitHub icon', async ({ page }) => {
  const gitHubIcon = page.getByRole('link', { name: 'GitHub repository' });
  await expect(gitHubIcon).toBeVisible();
  await expect(gitHubIcon).toHaveAttribute('href', 'https://github.com/microsoft/playwright');
})

test('check the Discord icon', async ({ page }) => {
  const discordIcon = page.getByRole('link', { name: 'Discord server' });
  await expect(discordIcon).toBeVisible();
  await expect(discordIcon).toHaveAttribute('href', 'https://aka.ms/playwright/discord');
})

test('check the Light/Dark icon', async ({ page }) => {
  const themeModeIcon = page.getByRole('button', { name: /Switch between dark and light mode/});
  await expect(themeModeIcon).toBeVisible();
  await expect(themeModeIcon).toHaveAttribute('aria-label', /currently system mode/i);

  await themeModeIcon.click();
  await expect(themeModeIcon).toHaveAttribute('aria-label', /currently light mode/i);

  await themeModeIcon.click()
  await expect(themeModeIcon).toHaveAttribute('aria-label', /currently dark mode/i);

  await themeModeIcon.click();
  await expect(themeModeIcon).toHaveAttribute('aria-label', /currently system mode/i);
})
