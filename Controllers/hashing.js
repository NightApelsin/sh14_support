import crypto from 'crypto'
import { sys_admin_token } from '../config.js'
export function createHash(input) {
	return crypto.createHash('sha256').update(input).digest('hex')
}
export function isAdmin(input){
	return createHash(input)===sys_admin_token
}