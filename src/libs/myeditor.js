
const slugify = (s) => encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-'));
const defaults = {
    includeLevel: [ 1, 2 ],
    containerClass: 'table-of-contents',
    slugify,
    markerPattern: /\[\[== ([\u4e00-\u9fa5_a-zA-Z0-9]+) ==\]\]/im,
    listType: 'ul',
    format: undefined,
    forceFullToc: false,
    containerHeaderHtml: undefined,
    containerFooterHtml: undefined,
  };

  function toc(state, silent) {
    const tocRegexp = defaults.markerPattern;
    var blockTokens, i, j, l, token, tokens;
    var Token = state.Token,
    blockTokens = state.tokens;
    j = 0;
    l = blockTokens.length;
    while (j < l) {
      if (blockTokens[j].type !== "inline") {
        j++;
        continue;
      }
      tokens = blockTokens[j].children;
      i = tokens.length - 1;
      while (i >= 0) {
        token = tokens[i];
       var  text = token.content;
       var  matches = text.match(defaults.markerPattern);
       if (matches === null) {
        return false;
      }
      var value = matches[1];
      var nodes = [];
      var token = new Token("label_open", "ins", 1);
      nodes.push(token);
      token = new Token("text", "", 0);
      token.content = value;
      nodes.push(token);
      nodes.push(new Token("label_close", "ins", -1));
      blockTokens[j].children = nodes;
        i--;
      }
      j++;
    }
  
  }

  module.exports = (md, o) => {
    let gstate;
    // Catch all the tokens for iteration later
    md.core.ruler.push('ins1', toc);
 };