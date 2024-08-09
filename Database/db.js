import pg from 'pg'
const {
	Pool
} = pg

export const pool = new Pool({
	host: 'localhost',
	user: 'sh14_admin',
	database: 'sh14',
	password: '20140101wasd',
	port: 5432,
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000,
})