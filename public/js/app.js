let students = [];
let currentFilter = 'all';

/* ---------- DOM ELEMENTS ---------- */
const studentList = document.getElementById('student-list');
const loading = document.getElementById('loading');

const modal = document.getElementById('student-modal');
const gpaModal = document.getElementById('gpa-modal');
const statusModal = document.getElementById('status-modal');

/* ---------- INITIAL LOAD ---------- */
document.addEventListener('DOMContentLoaded', () => {
    loadStudents();
    bindUIEvents();
});

/* ---------- LOAD & RENDER ---------- */
async function loadStudents() {
    loading.style.display = 'block';

    const result = await apiGetStudents();

    if (Array.isArray(result)) {
        students = result;
        updateStatisticsFromStudents(result);
    } else {
        students = result.students;
        renderStatistics(result.statistics);
    }

    renderStudents();
    loading.style.display = 'none';
}

function updateStatisticsFromStudents(list) {
    const stats = {
        active: list.filter(s => s.status === 'active').length,
        graduated: list.filter(s => s.status === 'graduated').length,
        suspended: list.filter(s => s.status === 'suspended').length,
        total: list.length,
        averageGPA:
            list.reduce((sum, s) => sum + Number(s.gpa || 0), 0) /
            (list.length || 1)
    };

    renderStatistics(stats);
}

function renderStudents() {
    studentList.innerHTML = '';

    const filtered = students.filter(s => {
        if (currentFilter === 'all') return true;
        return s.status === currentFilter;
    });

    filtered.forEach(s => {
        const card = document.createElement('div');
        card.className = 'student-card';

        card.innerHTML = `
            <h3>${s.first_name} ${s.last_name}</h3>
            <p><strong>Code:</strong> ${s.student_code}</p>
            <p><strong>Email:</strong> ${s.email}</p>
            <p><strong>Major:</strong> ${s.major}</p>
            <p><strong>GPA:</strong> ${Number(s.gpa).toFixed(2)}</p>
            <p><strong>Status:</strong> ${s.status}</p>
            <div class="actions">
                <button onclick="openEdit(${s.id})">Edit</button>
                <button onclick="openGPA(${s.id})">GPA</button>
                <button onclick="openStatus(${s.id})">Status</button>
                <button onclick="removeStudent(${s.id})">Delete</button>
            </div>
        `;

        studentList.appendChild(card);
    });
}

function renderStatistics(stat) {
    document.getElementById('stat-active').innerText = stat.active;
    document.getElementById('stat-graduated').innerText = stat.graduated;
    document.getElementById('stat-suspended').innerText = stat.suspended;
    document.getElementById('stat-total').innerText = stat.total;
    document.getElementById('stat-gpa').innerText = stat.averageGPA.toFixed(2);
}

/* ---------- UI EVENTS ---------- */
function bindUIEvents() {
    document.getElementById('add-btn').onclick = openAdd;
    document.getElementById('save-btn').onclick = submitStudentForm;

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderStudents();
        };
    });

    document.querySelectorAll('.close').forEach(c => c.onclick = closeAllModals);
    document.getElementById('cancel-btn').onclick = closeAllModals;
    document.getElementById('gpa-cancel').onclick = closeAllModals;
    document.getElementById('status-cancel').onclick = closeAllModals;

    document.getElementById('student-form').onsubmit = submitStudentForm;
    document.getElementById('gpa-form').onsubmit = submitGPAForm;
    document.getElementById('status-form').onsubmit = submitStatusForm;
}

/* ---------- MODALS ---------- */
function openAdd() {
    document.getElementById('student-form').reset();
    document.getElementById('student-id').value = '';
    document.getElementById('modal-title').innerText = 'Add New Student';
    modal.style.display = 'block';
}

function openEdit(id) {
    const s = students.find(x => x.id === id);
    document.getElementById('student-id').value = s.id;
    document.getElementById('student_code').value = s.student_code;
    document.getElementById('first_name').value = s.first_name;
    document.getElementById('last_name').value = s.last_name;
    document.getElementById('email').value = s.email;
    document.getElementById('major').value = s.major;
    modal.style.display = 'block';
}

function openGPA(id) {
    document.getElementById('gpa-student-id').value = id;
    gpaModal.style.display = 'block';
}

function openStatus(id) {
    document.getElementById('status-student-id').value = id;
    statusModal.style.display = 'block';
}

function closeAllModals() {
    modal.style.display = 'none';
    gpaModal.style.display = 'none';
    statusModal.style.display = 'none';
}

/* ---------- FORM SUBMIT ---------- */
async function submitStudentForm(e) {
    if (e) e.preventDefault();

    const id = document.getElementById('student-id').value;

    const data = {
        student_code: document.getElementById('student_code').value.trim(),
        first_name: document.getElementById('first_name').value.trim(),
        last_name: document.getElementById('last_name').value.trim(),
        email: document.getElementById('email').value.trim(),
        major: document.getElementById('major').value
    };

    console.log('SAVE CLICKED', data);

    if (id) {
        await apiUpdateStudent(id, data);
    } else {
        await apiCreateStudent(data);
    }

    closeAllModals();
    loadStudents();
}


async function submitGPAForm(e) {
    e.preventDefault();
    const id = document.getElementById('gpa-student-id').value;
    const gpa = parseFloat(document.getElementById('gpa').value);
    await updateGPA(id, gpa);
    closeAllModals();
    loadStudents();
}

async function submitStatusForm(e) {
    e.preventDefault();
    const id = document.getElementById('status-student-id').value;
    const status = document.getElementById('status').value;
    await updateStatus(id, status);
    closeAllModals();
    loadStudents();
}

/* ---------- DELETE ---------- */
async function removeStudent(id) {
    if (confirm('Delete this student?')) {
        await deleteStudent(id);
        loadStudents();
    }
}
