const API_BASE_URL = 'http://localhost:3000/api/students';

async function apiGetStudents() {
    const res = await fetch(API_BASE_URL);
    return res.json();
}

async function apiCreateStudent(data) {
    const res = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

async function apiUpdateStudent(id, data) {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

async function apiUpdateGPA(id, gpa) {
    const res = await fetch(`${API_BASE_URL}/${id}/gpa`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gpa })
    });
    return res.json();
}

async function apiUpdateStatus(id, status) {
    const res = await fetch(`${API_BASE_URL}/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
    });
    return res.json();
}

async function apiDeleteStudent(id) {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
    });
    return res.json();
}
