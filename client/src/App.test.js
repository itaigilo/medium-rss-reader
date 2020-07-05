const puppeteer = require('puppeteer');

const TIME_LIMIT = 16000;

const initTest = async () => {
	const launchParams = { headless: false, slowMo: 50 };
	const browser = await puppeteer.launch(launchParams);
	const page = await browser.newPage();
	await page.goto('http://localhost:3000/');
	return { browser, page };
};

describe('App should', () => {
	test('Loads correctly', async () => {
		const { browser, page } = await initTest();

		await page.waitForSelector('h1');
		const h1Html = await page.$eval('h1', e => e.innerHTML);
		expect(h1Html).toBe('Medium RSS Reader');

		await browser.close();
	}, TIME_LIMIT);

	test('Search feed correctly', async () => {
		const { browser, page } = await initTest();

		const feedId = '@Medium';

		await page.click('.search-input');
		await page.type('.search-input', feedId);
		await page.click('.search-submit');

		await page.waitForSelector('.history-item');
		const historyItemHtml = await page.$eval('.history-item', e => e.innerHTML);
		expect(historyItemHtml).toBe(feedId);

		await page.waitForSelector('.feed-item h6');
		const feedItemHtml = await page.$eval('.feed-item h6', e => e.innerHTML);
		expect(feedItemHtml).toBeTruthy();

		await browser.close();
	}, TIME_LIMIT);

	test('Search non-existing feed', async () => {
		const { browser, page } = await initTest();

		const feedId = 'kcsdkjfn32kcjn2';

		await page.click('.search-input');
		await page.type('.search-input', feedId);
		await page.click('.search-submit');

		await page.waitForSelector('.feed-not-found');
		const feedNotFoundHtml = await page.$eval('.feed-not-found', e => e.innerHTML);
		expect(feedNotFoundHtml).toBe('Feed not found.');

		await browser.close();
	}, TIME_LIMIT);
});