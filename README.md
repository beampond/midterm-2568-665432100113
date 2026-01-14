# Student Management System - Layered Architecture

## Project Information
- Student Name: ____________________
- Student ID: ____________________
- Course: ENGSE207 Software Architecture

## Architecture Style
Layered Architecture (3-tier)

## Project Structure
- Presentation Layer: Routes, Controllers, Middleware
- Business Layer: Services, Validators
- Data Layer: Repository, Database

## Refactoring Summary
### Problems (Monolithic)
- โค้ดปนกันทุก concern
- แก้ไขยาก
- ทดสอบยาก
- ขยายระบบลำบาก

### Solution
- แยก Layer ชัดเจน
- Business logic ไม่ผูกกับ HTTP
- Database แยกจาก logic

### Benefits
- ดูแลรักษาง่าย
- ทีมทำงานแยกกันได้
- รองรับการขยายในอนาคต

## How to Run
```bash
npm install
npm start
