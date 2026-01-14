const studentRepository = require('../../data/repositories/studentRepository');
const studentValidator = require('../validators/studentValidator');

class StudentService {
    async getAllStudents(major, status) {
        const students = await studentRepository.findAll(major, status);

        const statistics = {
            active: students.filter(s => s.status === 'active').length,
            graduated: students.filter(s => s.status === 'graduated').length,
            suspended: students.filter(s => s.status === 'suspended').length,
            total: students.length,
            averageGPA: students.length
                ? Number((students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2))
                : 0
        };

        return { students, statistics };
    }

    async getStudentById(id) {
        const validId = studentValidator.validateId(id);
        const student = await studentRepository.findById(validId);

        if (!student) throw new Error('Student not found');
        return student;
    }

    async createStudent(data) {
        studentValidator.validateStudentData(data);
        studentValidator.validateStudentCode(data.student_code);
        studentValidator.validateEmail(data.email);
        studentValidator.validateMajor(data.major);

        try {
            return await studentRepository.create(data);
        } catch (err) {
            if (err.message.includes('UNIQUE')) {
                throw new Error('Student code or email already exists');
            }
            throw err;
        }
    }

    async updateStudent(id, data) {
        const validId = studentValidator.validateId(id);
        studentValidator.validateStudentData(data);
        studentValidator.validateStudentCode(data.student_code);
        studentValidator.validateEmail(data.email);
        studentValidator.validateMajor(data.major);

        const existing = await studentRepository.findById(validId);
        if (!existing) throw new Error('Student not found');

        try {
            return await studentRepository.update(validId, data);
        } catch (err) {
            if (err.message.includes('UNIQUE')) {
                throw new Error('Student code or email already exists');
            }
            throw err;
        }
    }

    async updateGPA(id, gpa) {
        const validId = studentValidator.validateId(id);
        studentValidator.validateGPA(gpa);

        const student = await studentRepository.findById(validId);
        if (!student) throw new Error('Student not found');

        return await studentRepository.updateGPA(validId, gpa);
    }

    async updateStatus(id, status) {
        const validId = studentValidator.validateId(id);
        studentValidator.validateStatus(status);

        const student = await studentRepository.findById(validId);
        if (!student) throw new Error('Student not found');

        if (student.status === 'withdrawn') {
            throw new Error('Cannot change status of withdrawn student');
        }

        return await studentRepository.updateStatus(validId, status);
    }

    async deleteStudent(id) {
        const validId = studentValidator.validateId(id);
        const student = await studentRepository.findById(validId);

        if (!student) throw new Error('Student not found');
        if (student.status === 'active') {
            throw new Error('Cannot delete active student');
        }

        return await studentRepository.delete(validId);
    }
}

module.exports = new StudentService();
