const fs = require('fs');
module.exports = function addChakraLoaderConfig(api) {
    let content = "const { ChakraLoaderPlugin } = require('chakra-loader')\n\n";
    content += "module.exports = {\n";
    content += "\tconfigureWebpack: {\n";
    content += "\t\tplugins: [\n";
    content += "\t\t\tnew ChakraLoaderPlugin()\n";
    content += "\t\t]\n";
    content += "\t}\n";
    content += "}\n"
    fs.appendFileSync("vue.config.js", content);

    api.exitLog('Auto import setup completed 🔥');
    api.exitLog('You can use Chakra UI components without importing and registering them now')
}