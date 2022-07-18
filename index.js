const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => { 
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('https://www2.recife.pe.gov.br/pagina/secretaria-de-saude');
   
   
    const imgList = await page.evaluate(() => {
        //Tudo isso será executado dentro do browser

        //Pegar as imagens que estão na parte de posts
            const nodeList = document.querySelectorAll('body img');
        //Transformar o NodeList em array
            const imgArray = [...nodeList]

        //Transforma os nodes (elementos HTML) em objetos JS
            const imgList = imgArray.map(img => ({
                src: img.src
            }))

            
        //Colocar pra fora da função
        return imgList
    });

    //Write data on local files(JSON)
    fs.writeFile('prefeitura.json', JSON.stringify(imgList,null,2), err =>{
        if (err) throw new Error('something went wrong')

        console.log('well done!')
    })

    await browser.close();
})();