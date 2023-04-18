import { NextApiRequest, NextApiResponse } from "next";
import { TodoItem } from "../../models/todoItem";
import { connect } from '../../lib/db';

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
  const client = await connect();
  const db = client.db('todo-list');
  const collection = db.collection('todos');

  try {
    if (id) {
      const todo = await collection.findOne({ _id: id });
      if (todo) {
        res.status(200).json(todo);
      } else {
        res.status(404).json({ error: `Todo with ID ${id} not found` });
      }
    } else {
      const todos = await collection.find().toArray();
      res.status(200).json(todos);
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not get todos' });
  } finally {
    await client.close();
  }
}

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const todo: TodoItem = req.body;
  const client = await connect();
  const db = client.db('todo-list');
  const collection = db.collection('todos');

  try {
    const result = await collection.insertOne(todo);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Could not add todo' });
  } finally {
    await client.close();
  }
}

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  const todo: TodoItem = req.body;
  const client = await connect();
  const db = client.db('todo-list');
  const collection = db.collection('todos');

  try {
    const result = await collection.updateOne({ _id: todo._id }, { $set: todo });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Could not update todo' });
  } finally {
    await client.close();
  }
}

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string
  const client = await connect();
  const db = client.db('todo-list');
  const collection = db.collection('todos');

  try {
    await collection.deleteOne({ _id: id });
    res.status(200).json({ message: 'Todo deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Could not delete todo' });
  } finally {
    await client.close();
  }
} 