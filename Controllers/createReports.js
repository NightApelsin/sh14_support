import { pool } from './../Database/db.js';

export async function addReportToDB(req, res) {
const { problem, description, kabinet, name, phone } = req.body;

// Проверка типов данных и преобразование в строки
const problemStr = typeof problem === 'string' ? problem.trim() : String(problem);
const descriptionStr = typeof description === 'string' ? description.trim() : String(description);
const kabinetStr = typeof kabinet === 'string' ? kabinet.trim() : String(kabinet);
const nameStr = typeof name === 'string' ? name.trim() : String(name);
const phoneStr = typeof phone === 'string' ? phone.trim() : String(phone);

try {
const result = await pool.query(
`INSERT INTO "report_requests" (problem, description, kabinet, name, phone) VALUES ($1, $2, $3, $4, $5)`,
[problemStr, descriptionStr, kabinetStr, nameStr, phoneStr]
);
res.sendStatus(200);
} catch (error) {
console.error('Database error:', error);
res.sendStatus(500);
}
}
