const fs = require('node:fs');
const path = require('node:path');
function copy(source,target) { fs.mkdirSync(path.dirname(target),{recursive:true}); fs.cpSync(source,target,{recursive:true}); }
copy('node_modules/chart.js/dist/chart.umd.js','vendor/chart.umd.js');
copy('node_modules/chart.js/LICENSE.md','vendor/chart.LICENSE.md');
copy('index.html','site/index.html');
copy('vbs-analytics','site/vbs-analytics');
copy('operations-demo','site/operations-demo');
copy('docs/screenshots','site/docs/screenshots');
copy('vendor','site/vendor');
