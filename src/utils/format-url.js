export default (str, url) => {
  if (url) {
    return str.trim()
      .replace(/ /ig, '_')
      .replace(/\?/ig, ';')
  } else {
    return str.trim()
      .replace(/_/ig, ' ')
      .replace(/;/ig, '?')
  }
}
