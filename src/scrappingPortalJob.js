const puppeter = require('puppeteer');

async function scrappingPortalJob() {
  const url = 'https://www.portaljob-madagascar.com/emploi/liste';
  const browser = await puppeter.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  let data = await page.evaluate(async () => {
    let items = [];
    let length = await document.querySelector('div.max')
      .querySelectorAll('article').length;
    for (let i = 0; i < length; i++) {
      let contenu_annonce = await document.querySelector('div.max').children[i].querySelector('aside.contenu_annonce');
      let item = await {
        title: await contenu_annonce.children[0].innerText,
        contrat: await contenu_annonce.children[2].innerText,
        description: await contenu_annonce.querySelector('a.description').innerText
      };
      items.push(item);
    }
    return items;
  });
  await browser.close();
  return data;
}
scrappingPortalJob()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
module.exports = scrappingPortalJob;
