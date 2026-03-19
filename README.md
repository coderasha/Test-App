# Leave Management System (Test App)

This repository is a work-in-progress HR platform focused on leave-management foundations.
The current implementation provides a NestJS backend with employee records and a PostgreSQL data model designed for department-based organization.

## Project Idea

The long-term goal is to build a leave management application where an organization can:

- Maintain departments and employees
- Associate each employee with a department
- Use that employee master data as the base for leave requests, approvals, and reporting

Right now, the project is in the foundation phase: core employee CRUD, validation, and database integration are in place.

## What Is Currently Happening

- Backend framework: NestJS (TypeScript)
- ORM: Prisma
- Database: PostgreSQL
- Validation: `class-validator` + global Nest `ValidationPipe`
- CORS enabled for frontend origin `http://localhost:3000`

### Implemented APIs

Employee module (`/employees`) is implemented with:

- `POST /employees` create employee
- `GET /employees` list employees (newest first)
- `GET /employees/:id` get employee by ID
- `PATCH /employees/:id` update employee
- `DELETE /employees/:id` delete employee

Employee responses include related department data via Prisma `include`.

### In Progress

- Department module is partially scaffolded (DTO + Prisma model exists)
- Department controller/service routes are not fully wired yet
- Frontend app scaffolding is not yet present

## User Flow (Current and Intended)

### Current practical flow (with existing backend)

1. Ensure at least one department exists in DB (for now via direct DB insert or Prisma tooling).
2. Create employees through `POST /employees` using a valid `departmentId`.
3. Retrieve employee lists/details for display or operational use.
4. Update or delete employee records as needed.

### Intended product flow (target)

1. Admin creates departments in UI.
2. Admin/HR creates employees and maps them to departments.
3. Employees submit leave requests.
4. Managers/HR approve or reject leave requests.
5. Dashboard/reporting shows balances, trends, and department-level analytics.

## Data Model Snapshot

### `Department`

- `id` (PK)
- `name` (unique)
- `description` (optional)
- `createdAt`, `updatedAt`

### `Employee`

- `id` (PK)
- `firstName`, `lastName`
- `email` (unique)
- `phone` (optional)
- `position`
- `salary` (optional)
- `departmentId` (FK -> `Department`)
- `hireDate`
- `createdAt`, `updatedAt`

## Example API Payloads

### Create Employee

```json
{
  "firstName": "Ava",
  "lastName": "Miller",
  "email": "ava.miller@company.com",
  "phone": "1234567890",
  "position": "Software Engineer",
  "salary": 85000,
  "departmentId": 1,
  "hireDate": "2025-03-01"
}
```

### Update Employee (partial)

```json
{
  "position": "Senior Software Engineer",
  "salary": 98000
}
```

## Tech Stack

- Backend: NestJS 11, TypeScript
- Database: PostgreSQL
- ORM: Prisma
- Validation: class-validator/class-transformer
- Testing: Jest (unit + e2e scaffolding)

## Repository Structure

```text
.
├── backend/         # NestJS API + Prisma schema
├── frontend/        # Frontend placeholder (not scaffolded yet)
├── test/            # Root-level test placeholder
└── docker-compose.yml (currently empty)
```

## Local Setup

### Prerequisites

- Node.js 18+ (recommended: 20+)
- npm
- PostgreSQL running locally

### Environment

Backend environment file (`backend/.env`):

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/employee_db?schema=public"
PORT=3001
```

Update values to match your local PostgreSQL credentials and database.

### Run Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run start:dev
```

Backend starts on: `http://localhost:3001`

## API Validation Rules (Employee)

- `firstName`, `lastName`, `position`: required strings
- `email`: required valid email
- `departmentId`: required number
- `hireDate`: required ISO date string
- `salary`: optional number, must be `>= 0`
- `phone`: optional string

## Current Limitations

- Department endpoints are not complete yet
- No leave request/approval module yet
- Frontend implementation pending
- Docker compose file is not configured yet

## Roadmap

1. Complete Department CRUD module
2. Add Leave Request entity and APIs
3. Add Role-based access (Admin/Manager/Employee)
4. Build frontend UI and integrate with backend
5. Add reporting and leave balance logic
6. Configure Docker for local full-stack startup
