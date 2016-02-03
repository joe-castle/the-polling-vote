export default (type, url, payload, dataType = 'json') => (
  $.ajax({
    type: type,
    url: url,
    contentType: 'application/json',
    data: JSON.stringify(payload),
    dataType: dataType
  })
)
