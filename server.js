const app = require('./src/app.js');
const server = require('http').createServer(app);


const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`🚀 - running in port ${port}`);
});
