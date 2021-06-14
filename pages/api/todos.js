import { ObjectId } from 'bson';
import nextConnect from 'next-connect';
import middleware from '../../middleware/database';
const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { user } = req.query || 'test';
  let doc = await req.db.collection('todos').find({}).toArray();
  res.status(200).json({ data: doc });
});

handler.post(async (req, res) => {
  let { user, description, isDone } = JSON.parse(req.body);

  let doc = await req.db.collection('todos').insertOne({ user, description, isDone });
  res.status(201).json({ data: { newRecordId: doc.insertedId } });
});

handler.delete(async (req, res) => {
  const id = JSON.parse(req.body)._id;
  console.log(id);
  let doc = await req.db.collection('todos').deleteOne({ _id: ObjectId(id) });
  res.status(202).json({ deletedId: id });
});

export default handler;
