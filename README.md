# 🎓 Student Management System  
### Layered Architecture (3-Tier)

---

## 📌 Project Information
- **Student Name:** ณํฏธพงษ์ เรือนเทศ
- **Student ID:** 66543210011-3
- **Course:** ENGSE207 Software Architecture

---

## 🏗 Architecture Style
**Layered Architecture (3-Tier)**

แยกโครงสร้างระบบออกเป็น 3 ชั้นหลัก เพื่อความชัดเจนในการพัฒนา ดูแลรักษา และขยายระบบในอนาคต

---

## 📂 Project Structure

# 🎓 Student Management System  
### Layered Architecture (3-Tier)

---

## 📌 Project Information
- **Student Name:** ____________________
- **Student ID:** 66543210011-3
- **Course:** ENGSE207 Software Architecture

---

## 🏗 Architecture Style
**Layered Architecture (3-Tier)**

แยกโครงสร้างระบบออกเป็น 3 ชั้นหลัก เพื่อความชัดเจนในการพัฒนา ดูแลรักษา และขยายระบบในอนาคต

---

## 📂 Project Structure

# 🎓 Student Management System  
### Layered Architecture (3-Tier)

---

## 📌 Project Information
- **Student Name:** ____________________
- **Student ID:** 66543210011-3
- **Course:** ENGSE207 Software Architecture

---

## 🏗 Architecture Style
**Layered Architecture (3-Tier)**

แยกโครงสร้างระบบออกเป็น 3 ชั้นหลัก เพื่อความชัดเจนในการพัฒนา ดูแลรักษา และขยายระบบในอนาคต

---

## 📂 Project Structure

src/
├── presentation/
│ ├── routes/
│ ├── controllers/
│ └── middlewares/
│
├── business/
│ ├── services/
│ └── validators/
│
├── data/
│ ├── repositories/
│ └── database/
│
server.js


### 🔹 Presentation Layer
- จัดการ HTTP Request / Response
- Routes, Controllers, Middleware
- ไม่เขียน Business Logic

### 🔹 Business Layer
- ประมวลผล Business Logic
- ตรวจสอบความถูกต้องของข้อมูล (Validators)
- ไม่ผูกกับ Express หรือ Database

### 🔹 Data Layer
- ติดต่อฐานข้อมูล SQLite
- Repository Pattern
- แยก SQL ออกจาก Business Logic

---

## 🔄 Refactoring Summary

### ❌ Problems (Monolithic Architecture)
- โค้ดปนกันหลาย Concern
- แก้ไขยาก
- ทดสอบยาก
- ขยายระบบลำบาก

### ✅ Solution
- แยก Layer ชัดเจน
- Business Logic ไม่ผูกกับ HTTP
- Database แยกจาก Logic
- โครงสร้างรองรับการขยายในอนาคต

### 🌟 Benefits
- ดูแลรักษาง่าย
- ทีมทำงานแยกกันได้
- ทดสอบแต่ละ Layer ได้
- รองรับการเพิ่ม Feature ใหม่

---

## ▶️ How to Run

```bash
npm install
npm start

จากนั้นเปิดเบราว์เซอร์:

http://localhost:3000

🛠 Technologies Used

Node.js

Express.js

SQLite

JavaScript (ES6)

📚 Course Requirement

โปรเจกต์นี้เป็นส่วนหนึ่งของรายวิชา
ENGSE207 Software Architecture
เพื่อฝึกการออกแบบระบบแบบ Layered Architecture
