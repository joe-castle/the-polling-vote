module.exports = (str) => (
  str.trim()
    .toLowerCase()
    .replace(/[^\s[a-z]/ig, '')
    .replace(
      /(?:\s+([a-z]))/ig,
      (match) => match.substring(match.length-1).toUpperCase()
    )
)
