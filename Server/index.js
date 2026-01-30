import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbConfig = {
  host: 'bipahe9rkwlvxlekovgi-mysql.services.clever-cloud.com',
  user: 'uj8yluob5umtrf1h',
  password: 'Wz9X5MmCkdDl8sZCZkbK',
  database: 'bipahe9rkwlvxlekovgi',
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.post('/api/complaints', (req, res) => {
  const { name, nic, mobilenumber, email, department, subject, reportcontent, priority } = req.body;

  const sql = `INSERT INTO Complaints (Name, NIC, \`Mobile Number\`, Email, Department, Subject, Content, Priority) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(
    sql,
    [name, nic, mobilenumber, email, department, subject, reportcontent, priority],
    (err, result) => {
      if (err) {
        console.error('Error inserting complaint:', err);
        return res.status(500).json({ error: 'Database Error' });
      }
      res.json({ message: 'Complaint submitted successfully' });
    }
  );
});

app.listen(5004, () => {
  console.log('Server is running on port 5004');
});
