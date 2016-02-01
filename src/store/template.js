/*<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/js/materialize.min.js"></script>*/

module.exports = (initialState) => (
  `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="description" content=""</meta>
        <link href="bundle.css" rel="stylesheet">
        <title>FCC Voting App</title>
      </head>
      <body>
        <div id="root"></div>
      <script>
        if(!window.__INITIAL_STATE__) {
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        }
      </script>
      <script src="bundle.js"></script>
      </body>
    </html>
  `
)
