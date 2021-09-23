const request = require('request');

const fs = require('fs');

let args = process.argv.slice(2);
let uri = args[0]; // http://www.google.com/index.html
let filePath = args[1]; // ./index.html

let content = 'Some content!';

request(uri, (httpRequestError, response, body) => {
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
  console.log('httpRequestError:', httpRequestError); // Print the httpRequestError if one occurred
  console.log('************************************************************');
  if (httpRequestError !== null) {
    return;
  }

  content = body;

  fs.writeFile(filePath, content, fileWriteError => {
    if (fileWriteError) {
      console.log({ fileWriteError });
      return;
    }

    let fileSize = content.length;
    const successMsg = `Downloaded and saved ${fileSize} bytes to ${{ filePath }}.`;
    //file written successfully
    console.log(successMsg);
  });

});