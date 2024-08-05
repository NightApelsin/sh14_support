import { PORT, TOKEN } from './config.js'
import express from 'express'
import {Telegraf} from 'telegraf'
import { getMainMenu } from './keyboard.js'
import { ReportDataModel } from './reports/model.js'
import { createReport } from './bot_com/reportCreation.js'

const app = express()
const bot = new Telegraf(TOKEN)
bot.start(ctx => {
    ctx.reply('Welcome, bro', getMainMenu())
})

bot.hears('/motivation', ctx => {
    ctx.replyWithPhoto(
        'https://img2.goodfon.ru/wallpaper/nbig/7/ec/justdoit-dzhastduit-motivaciya.jpg',
        {
            caption: 'Не сдавайся!!'
        }
    )
})


bot.hears('/Обращение в тех поддержку', ctx=>{
	createReport(ctx)
})


bot.launch()


app.listen(PORT, () => console.log(`My server is running on port ${PORT}`))