import '@babel/polyfill';
import server from "./server";

const port = process.env.PORT || 5000
server.listen(port, () => {
  console.log(`server listen on port ${port}${__dirname}`)
})