# Leave Management System

A full-stack **Leave Management System** that allows employees to apply for leave and managers to approve or reject requests with comments. The system includes role-based authentication, leave balance management, a leave calendar, and a complete leave lifecycle workflow.

##  Tech Stack

### Frontend
- React (Vite)
- JavaScript
- Tailwind CSS
- Axios
- FullCalendar
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

##  Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Employee / Manager)
- Protected frontend and backend routes

### Employee Features
- Register & Login
- Apply for leave (vacation / sick)
- View leave status (Pending / Approved / Rejected)
- View manager comments
- Edit or revoke pending leave requests
- View leave history
- View company-wide leave calendar

### Manager Features
- View all pending leave requests
- Approve or reject leave requests
- Add comments during approval/rejection
- Automatic leave balance deduction on approval

### User Experience
- Loading states to prevent duplicate submissions
- Client-side input validation
- Toast notifications for success and error handling
- Clean and responsive UI using Tailwind CSS


## Database Design

### User Collection
- email
- firstName
- lastName
- password (hashed)
- role (Employee / Manager)
- leaveBalance

### LeaveRequest Collection
- employee (User reference)
- leaveType (vacation / sick)
- startDate
- endDate
- status (Pending / Approved / Rejected)
- managerComment
- timestamps



##  API Endpoints

| Method | Endpoint | Description | Role |
|------|--------|------------|------|
| POST | /auth/register | Register user | All |
| POST | /auth/login | Login user | All |
| POST | /leave/apply | Apply for leave | Employee |
| GET | /leave/my | Get own leave history | Employee |
| GET | /leave/pending | Get pending leaves | Manager |
| PATCH | /leave/:id/approve | Approve leave | Manager |
| PATCH | /leave/:id/reject | Reject leave | Manager |
| DELETE | /leave/:id | Revoke leave | Employee |
| GET | /leave/calendar | View leave calendar | All |



##  Pages

- Login Page  
- Register Page  
- Employee Dashboard  
- Apply Leave Page  
- Manager Dashboard (with comment box)  
- Leave Calendar  
- Leave History (showing manager comments)



##  How to Run the Project

### Backend Setup
```bash
cd backend
npm install
npm start

```
### Frontend Setup
```bash
cd frontend
npm install
npm run dev

```

### Environment Variables
Create a .env file in the backend:

env
```bash
Copy code
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```
## Author

Shubham Yadav