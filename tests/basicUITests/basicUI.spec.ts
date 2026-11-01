import {test, expect, Page} from '@playwright/test';

const url = 'https://basic-ui.tl-academy.ee/'

const orderSelectors = (page: Page) => ({
    firstNameInput: page.getByTestId('first-name-input'),
    lastNameInput: page.getByTestId('last-name-input'),
    emailInput: page.getByTestId('email-input'),
    addressInput: page.getByTestId('address-input'),
    createOrderButton: page.getByTestId('create-order-button'),
    emailError: page.getByTestId('email-error'),
    orderSuccess: page.getByTestId('order-success'),
    pageTitle: page.getByTestId('page-title'),
    languageButtonRU: page.getByTestId('language-ru'),
    languageButtonEN: page.getByTestId('language-en'),
    languageButtonET: page.getByTestId('language-et')
});

test.describe('Basic UI tests', () => {

    test.beforeEach( async ({ page }) => {
        await page.goto(url);
    })

    test('create order button test', async ({ page }) => {
        const selectors = orderSelectors(page);

        await selectors.firstNameInput.fill('Rothaide');
        await selectors.lastNameInput.fill('Baggins');
        await selectors.emailInput.fill('rothaide@test.com');
        await selectors.addressInput.fill('rothaide@test.com');
        await selectors.createOrderButton.click();
        await expect(selectors.orderSuccess).toBeVisible()
    })

    test('incorrect email blocks create button and shows error', async ({ page }) => {
        const selectors = orderSelectors(page);

        await selectors.firstNameInput.fill('Rebecca');
        await selectors.lastNameInput.fill('Underfoot');
        await selectors.emailInput.fill('');
        await selectors.addressInput.fill('rebecca@test.com');
        await expect(selectors.emailError).toBeVisible();
        await expect(selectors.createOrderButton).toBeDisabled();
    })

    test('change language test', async ({ page }) => {
        const selectors = orderSelectors(page);

        await expect(selectors.pageTitle).toHaveText('Создать заказ');
        await expect(selectors.languageButtonRU).toBeVisible();
        await expect(selectors.languageButtonEN).toBeVisible();
        await expect(selectors.languageButtonET).toBeVisible();

        await selectors.languageButtonEN.click();
        await expect(selectors.pageTitle).toHaveText('Create order')

        await selectors.languageButtonET.click();
        await expect(selectors.pageTitle).toHaveText('Loo tellimus')
    })

})