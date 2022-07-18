const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://rocketseat.com.br');
    await page.screenshot({path: 'rocketseat.png'});

    await browser.close();
})();