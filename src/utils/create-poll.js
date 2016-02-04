module.exports = (name, options, currentOptions) => ({
  name: name.trim(),
  options: options.reduce((x, y) => {
    if (y) {
      return Object.assign(
        x,
        {[y.trim()]: currentOptions[y.trim()] || 0}
      )
    }
    return x;
  }, {}),
  selectedOption: 'select'
});
