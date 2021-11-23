const postcss = require('postcss');
function pxtovw(data) {
  const transformData = Number(data.slice(0, -2));
  return `${transformData * (1 / 375) * 100}vw`;
}
module.exports = postcss.plugin('postcss-px-to-vw', (opts) => {
  return (root) => {
    root.walkRules((rule) => {
      rule.walkDecls(function (decl, i) {
        if (/\d+px/g.test(decl.value)) {
          const transformData = decl.value.split(/\s+/);
          const targetText = transformData.reduce((total, cur) => {
            if (/\d+px/g.test(cur)) {
              return `${total} ${pxtovw(cur)}`;
            } else {
              return `${total} ${cur}`;
            }
          }, '');
          decl.value = targetText;
        }
      });
    });
  };
});
