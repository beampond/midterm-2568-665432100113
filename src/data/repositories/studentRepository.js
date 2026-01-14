const db = require('../database/connection');

class StudentRepository {

    getAll(major, status) {
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM students WHERE 1=1';
            const params = [];

            if (major) {
                query += ' AND major = ?';
                params.push(major);
            }

            if (status) {
                query += ' AND status = ?';
                params.push(status);
            }

            db.all(query, params, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            db.get(
                'SELECT * FROM students WHERE id = ?',
                [id],
                (err, row) => {
                    if (err) return reject(err);
                    resolve(row);
                }
            );
        });
    }

    create(student) {
        const {
            student_code,
            first_name,
            last_name,
            email,
            major
        } = student;

        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO students
                (student_code, first_name, last_name, email, major, status, gpa)
                VALUES (?, ?, ?, ?, ?, 'active', 0.00)
            `;

            db.run(
                sql,
                [student_code, first_name, last_name, email, major],
                function (err) {
                    if (err) return reject(err);
                    resolve({ id: this.lastID, ...student });
                }
            );
        });
    }

    update(id, student) {
        return new Promise((resolve, reject) => {
            db.run(
                `
                UPDATE students
                SET first_name = ?, last_name = ?, email = ?, major = ?
                WHERE id = ?
                `,
                [
                    student.first_name,
                    student.last_name,
                    student.email,
                    student.major,
                    id
                ],
                function (err) {
                    if (err) return reject(err);
                    resolve({ updated: this.changes });
                }
            );
        });
    }

    updateGPA(id, gpa) {
        return new Promise((resolve, reject) => {
            db.run(
                'UPDATE students SET gpa = ? WHERE id = ?',
                [gpa, id],
                function (err) {
                    if (err) return reject(err);
                    resolve({ updated: this.changes });
                }
            );
        });
    }

    updateStatus(id, status) {
        return new Promise((resolve, reject) => {
            db.run(
                'UPDATE students SET status = ? WHERE id = ?',
                [status, id],
                function (err) {
                    if (err) return reject(err);
                    resolve({ updated: this.changes });
                }
            );
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            db.run(
                'DELETE FROM students WHERE id = ?',
                [id],
                function (err) {
                    if (err) return reject(err);
                    resolve({ deleted: this.changes });
                }
            );
        });
    }
}

module.exports = new StudentRepository();
