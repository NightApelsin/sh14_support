import { PORT, TOKEN } from './config.js'
import express from 'express'
import {Telegraf} from 'telegraf'
import { getMainMenu } from './keyboard.js'
import { ReportDataModel } from './reports/model.js'
import { CreateReport } from './bot_com/reportCreation.js'

const app = express()
const bot = new Telegraf(TOKEN)
bot.start(ctx => {

	console.log('asd')
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
	let obj = {
		problem:"",
		description:"",
		name:"",
		kabinet:"",
		phone:""
	}
	let report = new CreateReport(bot, ctx, obj)
})


bot.launch()


app.listen(PORT, () => console.log(`My server is running on port ${PORT}`))