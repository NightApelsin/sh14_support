import {
	Markup
} from 'telegraf'

export function getMainMenu() {
	return Markup.keyboard([
		['/start', '/техническая поддержка', '/motivation']
	]).resize()

}
export function getAdminMenu() {
	return Markup.keyboard([
		'/restart', '/reports', '/newNews'
	]).resize()
}