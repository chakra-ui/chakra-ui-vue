module.exports = function registerChakraVuePlugin(api) {
    let vueUseLine = `\n\nVue.use(Chakra)`;

    const fs = require('fs');

    let contentMain = fs.readFileSync(api.entryFile, { encoding: 'utf-8' });

    const lines = contentMain.split(/\r?\n/g).reverse();

    const lastImportIndex = lines.findIndex((line) => line.match(/^import/));

    lines[lastImportIndex] += vueUseLine;

    // modify app
    contentMain = lines.reverse().join('\n');

    fs.writeFileSync(api.entryFile, contentMain, { encoding: 'utf-8' });
}