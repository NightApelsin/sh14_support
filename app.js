import { PORT, TOKEN } from './config.js'
import express from 'express'
import {Telegraf} from 'telegraf'
import { getMainMenu } from './keyboard.js'


const app = express()
const bot = new Telegraf(TOKEN)
bot.start(ctx => {
    ctx.reply('Welcome, bro', getMainMenu())
})

bot.hears('/motivation', ctx => {
    ctx.replyWithPhoto(
        'https://img2.goodfon.ru/wallpaper/nbig/7/ec/justdoit-dzhastduit-motivaciya.jpg',
        {
            caption: 'Не вздумай сдаваться!'
        }
    )
})
bot.launch()
app.listen(PORT, () => console.log(`My server is running on http://${PORT}`))