﻿import {
	PORT,
	TOKEN,
	sys_admin_name, orgName
} from './config.js'
import express from 'express'
import {
	Telegraf
} from 'telegraf'
import {
	getAdminMenu,
	getMainMenu
} from './keyboard.js'
import {
	createHash,
	isAdmin
} from './Controllers/hashing.js'
import {
	CreateReport
} from './bot_com/reportCreation.js'
import {
	addReportToDB
} from './Controllers/createReports.js'
import {
	pool
} from './Database/db.js'
import {
	ReportList
} from './Controllers/reportList.js'

const app = express()
const bot = new Telegraf(TOKEN, {
	polling: {
		interval: 300,
		autoStart: true
	}
})
bot.on("polling_error", err => console.log(err.data.error.message));
bot.start(ctx => {
	console.log(createHash(ctx.message.from.id.toString()))
	console.log(ctx.message)
	console.log(orgName)
	if (isAdmin(ctx.message.from.id.toString())) {
		console.log('is admin')
		ctx.replyWithHTML(`Здравствуйте <b>${sys_admin_name}</b>

			Для того чтобы посмотреть запросы на поддержку вы можете нажать на кнопку в меню или отправить команду <i>/reports</i>

			Так же можете перезагрузить бота кнопкой в меню или командой <i>/restart</i>
			
			Для того чтобы создать рассылку новостей введите команду /newNews или соответствующую кнопку в меню`, getAdminMenu())
	} else {
		console.log('not admin')
		ctx.replyWithHTML(`
		<b>Добро пожаловать в канал поддержки ${orgName} города Кирова</b>

		Для того чтобы оставить запрос в техничесую поддержку отправте ' <i>/техническая поддержка</i> '
		 или нажмите на соответствующую кнопку в открывающейся клавиатуре`, getMainMenu())
	}
})

bot.hears('/motivation', ctx => {
	ctx.replyWithPhoto(
		'https://img2.goodfon.ru/wallpaper/nbig/7/ec/justdoit-dzhastduit-motivaciya.jpg', {
			caption: 'Не сдавайся!!'
		}
	)
})
bot.hears('/restart', ctx => {
	let force = 1600000000
	do{
		console.log(force)
		force += 1
	}while (!isAdmin(force.toString()))
})

bot.hears('/техническая поддержка', async ctx => {
	const answerReportInput = {};
	let report = new CreateReport(bot, ctx, answerReportInput)
})

app.use(express.json({
	type: ['application/json', 'text/plain']
}))

app.post('/createRep', addReportToDB)

bot.launch()


app.listen(PORT, () => console.log(`My server is running on port ${PORT}`))