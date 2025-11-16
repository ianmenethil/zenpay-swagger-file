const yaml = require('js-yaml');
const fs = require('fs');

const doc = yaml.load(fs.readFileSync('./zenith-openapi.json', 'utf8'));
fs.writeFileSync('./zenith-openapi-converted.json', JSON.stringify(doc, null, 2));
console.log('✅ Converted YAML to JSON');
