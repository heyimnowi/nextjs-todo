import { NextApiRequest, NextApiResponse } from "next";
import { TodoItem } from "../../models/todoItem";
import { ObjectId } from "mongodb";
import clientPromise from "../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return handleGet(req, res);
  } else if (req.method === 'POST') {
    return handlePost(req, res);
  } else if (req.method === 'PUT') {
    return handlePut(req, res);
  } else if (req.method === 'DELETE') {
    return handleDelete(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }

  res.status(404).json({ error: 'Not found' });
}

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;
  const client = await clientPromise;
  const db = client.db('todo-list');
  const collection = db.collection('todos');
  const objectId = new ObjectId(id);
  const filter = id ? { _id: objectId } : {};

  try {
    const result = await collection.find(filter).sort({ _id: -1 }).toArray();
    if (id) {
      res.status(200).json(result[0]);
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not get todos' });
  } finally {
    //await client.close();
  }
}

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const todo: TodoItem = req.body;
  const client = await clientPromise;
  const db = client.db('todo-list');
  const collection = db.collection('todos');

  try {
    const result = await collection.insertOne({ ...todo, completed: false });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Could not add todo' });
  } finally {
    //await client.close();
  }
}

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  const todo: TodoItem = req.body;
  const client = await clientPromise;
  const db = client.db('todo-list');
  const collection = db.collection('todos');

  const { _id, ...todoWithoutId } = todo;

  try {
    const result = await collection.updateOne({ _id: new ObjectId(_id) }, { $set: { ...todoWithoutId } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Could not update todo' });
  } finally {
    //await client.close();
  }
}

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string
  const client = await clientPromise;
  const db = client.db('todo-list');
  const collection = db.collection('todos');

  try {
    await collection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: 'Todo deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Could not delete todo' });
  } finally {
    //await client.close();
  }
} 