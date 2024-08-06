import { PORT, TOKEN } from './config.js'
import express from 'express'
import {Telegraf} from 'telegraf'
import { getMainMenu } from './keyboard.js'
import { ReportDataModel } from './reports/model.js'
import { CreateReport } from './bot_com/reportCreation.js'
import {addReportToDB} from'./Controllers/createReports.js'

const app = express()
const bot = new Telegraf(TOKEN)
bot.start(ctx => {

    ctx.replyWithHTML(`
		<b>Добро пожаловать в канал поддержки МБОУ СОШ №14 города Кирова</b>

		Для того чтобы оставить запрос в техничесую поддержку отправте ' <i>/техническая поддержка</i> ' или нажмите на соответствующую кнопку в открывающейся клавиатуре`, getMainMenu())
})

bot.hears('/motivation', ctx => {
    ctx.replyWithPhoto(
        'https://img2.goodfon.ru/wallpaper/nbig/7/ec/justdoit-dzhastduit-motivaciya.jpg',
        {
            caption: 'Не сдавайся!!'
        }
    )
})


bot.hears('/техническая поддержка', async ctx=>{
	const answerReportInput = {};

  const dbConfig = {
user: 'sh14_admin',
host: 'localhost',
database: 'sh14',
password: '1423',
port: 5432, // Порт по умолчанию для PostgreSQL
};
	let report = new CreateReport(bot, ctx, answerReportInput, dbConfig)
 })

app.use(express.json({
  type: ['application/json', 'text/plain']
}))

app.post('/createRep', addReportToDB)

bot.launch()


app.listen(PORT, () => console.log(`My server is running on port ${PORT}`))
