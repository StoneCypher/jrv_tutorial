function removeCodeBlockLeadingLine() {
  var cblocks = Array.prototype.slice.call(document.getElementsByTagName("code"), 0);
  cblocks.map(b => b.firstChild.nodeValue = b.firstChild.nodeValue.replace(/^\n+|\n+$/g, ""));
}

window.onload = () => removeCodeBlockLeadingLine();

hljs.initHighlightingOnLoad();