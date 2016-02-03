export default (type, payload, url = '/api/polls', dataType = 'json') => (
  $.ajax({
    type: type,
    url: url,
    contentType: 'application/json',
    data: JSON.stringify(payload),
    dataType: dataType
  })
)
