
var md = require('markdown-it')();
md.use(require('../libs/title.js'));
md.use(require('../libs/content.js'));
md.use(require('../libs/ins.js'));
md.use(require('../libs/myeditor.js'));
// md.use(require('../libs/checkoutbox.js'));
var mdstr = ` [[== dsds ==]]
`;
// var result = md.render(mdstr);
var result = md.render(mdstr)


$('.app').append(result);
