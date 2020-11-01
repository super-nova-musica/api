import { createServer } from 'http';

import app from './src/app.js';
const server = createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`🚀 - running in port ${port}`);
});
