import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Temporary in-memory store instead of MySQL
const complaints = [];

// API route to insert complaints
app.post('/api/complaints', (req, res) => {
  const { name, nic, mobilenumber, email, department, subject, reportcontent, priority } = req.body;

  // Simple validation
  if (!name || !nic || !mobilenumber || !email || !department || !subject || !reportcontent || !priority) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const complaint = {
    id: complaints.length + 1,
    name,
    nic,
    mobilenumber,
    email,
    department,
    subject,
    reportcontent,
    priority,
    createdAt: new Date().toISOString(),
  };

  complaints.push(complaint);
  res.json({ message: 'Complaint submitted successfully (stored in memory)', complaint });
});

// Optional: list complaints (for testing)
app.get('/api/complaints', (req, res) => {
  res.json({ count: complaints.length, complaints });
});

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
