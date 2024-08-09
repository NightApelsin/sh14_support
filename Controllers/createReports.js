import {
	pool
} from './../Database/db.js';

export async function addReportToDB(req, res) {
	const {
		problem,
		description,
		kabinet,
		name,
		phone,
		user_id
	} = req.body;

	// Проверка типов данных и преобразование в строки
	const problemStr = typeof problem === 'string' ? problem.trim() : String(problem);
	const descriptionStr = typeof description === 'string' ? description.trim() : String(description);
	const kabinetStr = typeof kabinet === 'string' ? kabinet.trim() : String(kabinet);
	const nameStr = typeof name === 'string' ? name.trim() : String(name);
	const phoneStr = typeof phone === 'string' ? phone.trim() : String(phone);
	const userStr = typeof user_id === 'strig' ? user_id.trim() : String(user_id);

	try {
		const result = await pool.query(
			`INSERT INTO "report_requests" (problem, description, kabinet, name, phone, user_id) VALUES ($1, $2, $3, $4, $5, $6)`,
			[problemStr, descriptionStr, kabinetStr, nameStr, phoneStr, userStr]
		);
		res.sendStatus(200);
	} catch (error) {
		console.error('Database error:', error);
		res.sendStatus(500);
	}
}