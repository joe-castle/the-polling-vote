export default (id, username, name, options, currentOptions) => ({
  id: id,
  submitter: username,
  name: name.trim(),
  options: options.reduce((x, y) => {
    if (y) {
      return {
        ...x,
        [y.trim()]: currentOptions[y.trim()] || 0
      }
    }
    return x;
  }, {}),
  selectedOption: 'select'
});
