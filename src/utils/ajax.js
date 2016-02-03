export default (type, url, payload) => (
  $.ajax({
    type: type,
    url: url,
    contentType: 'application/json',
    data: JSON.stringify(payload),
    dataType: 'json'
  })
)
