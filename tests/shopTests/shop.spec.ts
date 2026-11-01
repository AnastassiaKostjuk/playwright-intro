import { test, expect, Page } from '@playwright/test';

const url = 'https://shop.tl-academy.ee/checkout';

const checkoutSelectors = (page: Page) => ({
    emailInput: page.getByPlaceholder('Email address'),
    fullNameInput: page.getByPlaceholder('Full name'),
    parcelLocker: page.getByTestId('delivery-parcel-locker-option'),
    homeDelivery: page.getByTestId('delivery-home-option'),
    bankCard: page.getByTestId('payment-card-option'),
    paypal: page.getByTestId('payment-paypal-option'),
    productsPrice: page.getByTestId('summary-products'),
    deliveryPrice: page.getByTestId('summary-delivery'),
    totalSum: page.getByTestId('summary-total'),
    placeOrderButton: page.getByTestId('place-order-button'),
    orderSuccess: page.getByTestId('order-message'),
});

const prices = {
    products: '€79.00',
    parcelLockerDelivery: '€3.99',
    homeDelivery: '€5.99',
    parcelLockerTotal: '€82.99',
    homeDeliveryTotal: '€84.99',
};

test.describe('Nordic shop page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(url);
    });

    test('place order button test with parcel locker delivery + bank card payment', async ({ page }) => {
        const selectors = checkoutSelectors(page);

        await selectors.emailInput.fill('test@test.com');
        await selectors.fullNameInput.fill('Ena Aradan');
        await selectors.parcelLocker.click();
        await selectors.bankCard.click();
        await expect(selectors.productsPrice).toHaveText(prices.products);
        await expect(selectors.deliveryPrice).toHaveText(prices.parcelLockerDelivery);
        await expect(selectors.totalSum).toHaveText(prices.parcelLockerTotal);
        await selectors.placeOrderButton.click();
        await expect(selectors.orderSuccess).toBeVisible();
    });

    test('place order button test with home delivery + bank card payment', async ({ page }) => {
        const selectors = checkoutSelectors(page);

        await selectors.emailInput.fill('test@test.com');
        await selectors.fullNameInput.fill('Elashor Mirabalar');
        await selectors.homeDelivery.click();
        await selectors.bankCard.click();
        await expect(selectors.productsPrice).toHaveText(prices.products);
        await expect(selectors.deliveryPrice).toHaveText(prices.homeDelivery);
        await expect(selectors.totalSum).toHaveText(prices.homeDeliveryTotal);
        await selectors.placeOrderButton.click();
        await expect(selectors.orderSuccess).toBeVisible();
    });

    test('place order button test with parcel locker delivery + PayPal payment', async ({ page }) => {
        const selectors = checkoutSelectors(page);

        await selectors.emailInput.fill('test@test.com');
        await selectors.fullNameInput.fill('Arlen Elaran');
        await selectors.parcelLocker.click();
        await selectors.paypal.click();
        await expect(selectors.productsPrice).toHaveText(prices.products);
        await expect(selectors.deliveryPrice).toHaveText(prices.parcelLockerDelivery);
        await expect(selectors.totalSum).toHaveText(prices.parcelLockerTotal);
        await selectors.placeOrderButton.click();
        await expect(selectors.orderSuccess).toBeVisible();
    });

    test('place order button test with home delivery + PayPal payment', async ({ page }) => {
        const selectors = checkoutSelectors(page);

        await selectors.emailInput.fill('test@test.com');
        await selectors.fullNameInput.fill('Filarion Dorbella');
        await selectors.homeDelivery.click();
        await selectors.paypal.click();
        await expect(selectors.productsPrice).toHaveText(prices.products);
        await expect(selectors.deliveryPrice).toHaveText(prices.homeDelivery);
        await expect(selectors.totalSum).toHaveText(prices.homeDeliveryTotal);
        await selectors.placeOrderButton.click();
        await expect(selectors.orderSuccess).toBeVisible();
    });
});