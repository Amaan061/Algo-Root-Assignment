const db = require('../config/database');

class Task {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static create(title, description) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO tasks (title, description) VALUES (?, ?)',
        [title, description],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({
              id: this.lastID,
              title,
              description,
              completed: false
            });
          }
        }
      );
    });
  }

  static update(id, { title, description, completed }) {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
        [title, description, completed, id],
        function(err) {
          if (err) {
            reject(err);
          } else {
            if (this.changes === 0) {
              reject(new Error('Task not found'));
            } else {
              resolve({ id, title, description, completed });
            }
          }
        }
      );
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM tasks WHERE id = ?', id, function(err) {
        if (err) {
          reject(err);
        } else {
          if (this.changes === 0) {
            reject(new Error('Task not found'));
          } else {
            resolve({ message: 'Task deleted successfully' });
          }
        }
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
        if (err) {
          reject(err);
        } else if (!row) {
          reject(new Error('Task not found'));
        } else {
          resolve(row);
        }
      });
    });
  }
}

module.exports = Task; 