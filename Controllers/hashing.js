import crypto from 'crypto'
export function createHash(input) {
	return crypto.createHash('sha256').update(input).digest('hex')
}