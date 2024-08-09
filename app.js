import {
	PORT,
	sys_admin_token,
	TOKEN,
	sys_admin_name
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
	createHash
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
	},
	isAdmin: false
})
bot.on("polling_error", err => console.log(err.data.error.message));
bot.start(ctx => {
	console.log(createHash(ctx.message.from.id.toString()))
	console.log(ctx.message.from.id)
	if (createHash(ctx.message.from.id.toString()) === sys_admin_token) {
		bot.isAdmin = true
		console.log('is admin')
		ctx.replyWithHTML(`Здравствуйте <b>${sys_admin_name}</b>

			Для того чтобы посмотреть запросы на поддержку вы можете нажать на кнопку в меню или отправить команду <i>/reports</i>

			Так же можете перезагрузить бота кнопкой в меню или командой <i>/restart</i>
			
			Для того чтобы создать рассылку новостей введите команду /newNews или соответствующую кнопку в меню`, getAdminMenu())
	} else {
		console.log('not admin')
		ctx.replyWithHTML(`
		<b>Добро пожаловать в канал поддержки МБОУ СОШ №14 города Кирова</b>

		Для того чтобы оставить запрос в техничесую поддержку отправте ' <i>/техническая поддержка</i> ' или нажмите на соответствующую кнопку в открывающейся клавиатуре`, getMainMenu())
	}
})

bot.hears('/motivation', ctx => {
	ctx.replyWithPhoto(
		'https://img2.goodfon.ru/wallpaper/nbig/7/ec/justdoit-dzhastduit-motivaciya.jpg', {
			caption: 'Не сдавайся!!'
		}
	)
})
bot.on('/restart', ctx => {
	if (bot.isAdmin) {
		ctx.reply('Бот будет перезапущен')
		console.log('Бот будет перезапучщенр')
	} else {
		ctx.reply('у вас недостаточно прав')
		console.log('у вас недостаточно прав')
	}
})

bot.hears('/техническая поддержка', async ctx => {
	const answerReportInput = {};


	let report = new CreateReport(bot, ctx, answerReportInput, pool)
})

app.use(express.json({
	type: ['application/json', 'text/plain']
}))

app.post('/createRep', addReportToDB)

bot.launch()


app.listen(PORT, () => console.log(`My server is running on port ${PORT}`))