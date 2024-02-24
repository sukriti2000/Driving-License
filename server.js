const PORT = 3000;
const app = require('./app');
const http = require('http');
const {mongoConnect} = require('./services/mongo');

const server = http.createServer(app);
async function startServer(){
 await mongoConnect();
  server.listen(PORT, () => {
    console.log(`The app is running on http://localhost:${PORT}`);
  });
  
}
startServer();
