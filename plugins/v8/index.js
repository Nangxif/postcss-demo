function pxtovw(data) {
  const transformData = Number(data.slice(0, -2));
  return `${transformData * (1 / 375) * 100}vw`;
}
module.exports = (options = {}) => {
  return {
    postcssPlugin: 'postcss-px-to-vw',
    Declaration(decl) {
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
    },
  };
};
module.exports.postcss = true;
