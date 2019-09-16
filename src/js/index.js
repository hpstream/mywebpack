var snabbdom = require('snabbdom')
var patch = snabbdom.init([ // Init patch function with chosen modules
  require('snabbdom/modules/class').default, // makes it easy to toggle classes
  require('snabbdom/modules/props').default, // for setting properties on DOM elements
  require('snabbdom/modules/style').default, // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners').default, // attaches event listeners
]);
var h = require('snabbdom/h').default; // helper function for creating vnodes
var toVNode = require('snabbdom/tovnode').default;

var newVNode = h('div', {
  style: {
    color: '#f00',
  },
  class: {
    active: true
  }
}, [
  h('h1', 'Headline'),
  h('p', 'A paragraph'),
]);


patch(toVNode(document.querySelector('#container')), newVNode)

// patch(toVNode(document.querySelector('#container')), newVNode)



// var md = require('markdown-it')();
// md.use(require('../libs/title.js'));
// md.use(require('../libs/content.js'));
// md.use(require('../libs/ins.js'));
// md.use(require('../libs/myeditor.js'));
// // md.use(require('../libs/checkoutbox.js'));
// var mdstr = ` 
// # 我是中国人 [[== sdsd ==]]
// ## id2
// `;
// // var result = md.render(mdstr);
// var result = md.render(mdstr)


// $('.app').append(result);
