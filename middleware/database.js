import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';
const client = new MongoClient('mongodb+srv://vijay:vijay@cluster0.kqrka.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db('awesome_todos');
  return next();
}
const middleware = nextConnect();
middleware.use(database);
export default middleware;