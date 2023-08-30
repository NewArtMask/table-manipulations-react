// Import the filesystem module
const {symlink} = require('fs');

// Create the symlink
symlink("../../back-end/server", "./node_modules/server", 'file', (err) => {
  if (err) console.log(err)
  else console.log("done");
});
