import { buildRoutePath } from './utils/build-route-path.js';
import { Database } from './database.js';
import { randomUUID } from 'node:crypto';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query 

      const tasks = database.select('tasks', search ? {
        title: search,
        description: search
      } : null )

      return res.end(JSON.stringify(tasks));
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title) {
        return res.writeHead(400).end(JSON.stringify({ message: 'title is required!' }))
      }

      if (!description) {
        return res.writeHead(400).end(JSON.stringify({ message: 'description is required!' }))
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      };
      database.insert('tasks', task);
      return res.writeHead(201).end();
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      let { title, description } = req.body;

      if (!title && !description) {
        return res.writeHead(400).end(JSON.stringify({message: 'title or description is required!'}))
      }

      const  task  = database.selectById('tasks', id )
      if (!task) {
        return res.writeHead(404).end(JSON.stringify({message: 'task not found!'}))
      }

      title = title ? title : task.title
      description = description ? description : task.description

      database.update('tasks', id, {
        title,
        description,
        updated_at: new Date()
      });
      return res.writeHead(204).end();
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params;

      const  task  = database.selectById('tasks', id )
      if (!task) {
        return res.writeHead(404).end(JSON.stringify({message: 'task not found!'}))
      }

      const completed_at = !task.completed_at ? new Date() : null;
      database.update('tasks', id, {
        updated_at: new Date(),
        completed_at
      });
      return res.writeHead(204).end();
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;

      const  task  = database.selectById('tasks', id )
      if (!task) {
        return res.writeHead(404).end(JSON.stringify({message: 'task not found!'}))
      }

      database.delete('tasks', id);
      return res.writeHead(204).end();
    }
  },
]