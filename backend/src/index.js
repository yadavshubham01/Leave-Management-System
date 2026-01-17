import express from 'express';
import cors from 'cors';
import dot from 'dotenv';
import ConnetDB from './config/db.js';
import { login, register } from './controllers/Auth.js';
import { protect } from './middleware/auth.middleware.js';
import { authorizeRole } from './middleware/role.middleware.js';
import { applyLeave, approvedLeave, getMyLeaves, getPendingLeaves, leaveCalendar, rejectLeave, revokeLeave, updateLeave } from './controllers/leaveRequest.js';

dot.config();
const app = express();
app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/register',register);
app.post('/api/login',login);


app.post("/api/leave/apply", protect,authorizeRole("Employee"),applyLeave);
app.get(
  "/api/leave/pending",
  protect,
  authorizeRole("Manager"),
  getPendingLeaves
);

app.get(
  "/api/leave/my",
  protect,
  authorizeRole("Employee"),
  getMyLeaves
);

app.patch(
  "/api/leave/:id/approve",
  protect,
  authorizeRole("Manager"),
  approvedLeave
);

app.patch(
  "/api/leave/:id/reject",
  protect,
  authorizeRole("Manager"),
  rejectLeave
);
app.get(
  "/api/leave/calendar",
  protect,
  leaveCalendar
);
app.patch("/api/leave/:id", protect, authorizeRole("Employee"), updateLeave);
app.delete("/api/leave/:id", protect, authorizeRole("Employee"), revokeLeave);

const PORT = process.env.PORT || 3000;
ConnetDB().then(() => {
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
});