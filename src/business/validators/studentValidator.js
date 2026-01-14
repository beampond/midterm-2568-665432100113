class StudentValidator {

    validateId(id) {
        const num = Number(id);
        if (!Number.isInteger(num) || num <= 0) {
            throw new Error('Invalid student ID');
        }
        return num;
    }

    validateStudentData(data) {
        if (!data) {
            throw new Error('Student data is required');
        }

        const { student_code, first_name, last_name, email, major } = data;

        if (!student_code || !first_name || !last_name || !email || !major) {
            throw new Error('Missing required student fields');
        }
    }

    validateStudentCode(code) {
        if (!/^\d{10}$/.test(code)) {
            throw new Error('Student code must be 10 digits');
        }
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }
    }

    validateMajor(major) {
        const allowed = ['CS', 'SE', 'IT', 'CE', 'DS'];
        if (!allowed.includes(major)) {
            throw new Error('Invalid major');
        }
    }

    validateGPA(gpa) {
        const value = Number(gpa);
        if (isNaN(value) || value < 0 || value > 4) {
            throw new Error('Invalid GPA');
        }
    }

    validateStatus(status) {
        const allowed = ['active', 'graduated', 'suspended', 'withdrawn'];
        if (!allowed.includes(status)) {
            throw new Error('Invalid status');
        }
    }
}

module.exports = new StudentValidator();
