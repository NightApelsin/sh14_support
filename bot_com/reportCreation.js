


export class CreateReport{
	constructor(bot, ctx, answerReportInput){
		this.answerReport = answerReportInput
		this.bot = bot
		this.ctx = ctx
		console.log(JSON.stringify(this.answerReport))
		return this.addParams()
	}
	addParams(){
		this.ctx.reply(`Порядок заполнения формы запроса
    1. Короткое название проблемы
    2. Более подробное описание проблемы
    3. Номер кабинета в котором произошла проблема
    4. Ваше ФИО
    5. Контактна информация (номер мобильного телефна)`)
		this.addProblem()		
		this.addProblem()
		this.addKabinet()
		this.addName()
		this.addPhone()
		return this.answerReport
	}
	addProblem(){
		this.ctx.reply('Опишите проблему с которой вы столкнулись (коротко)').then(async ()=>{

			await this.bot.on('text', (ctx)=>{
				this.answerReport.problem = ctx.message.text
			})
		}).catch(err=>{
			console.log(new Error(err))
		})
	}
	addDesc(){
		this.ctx.reply('Расскажите подробней что случилось').then(()=>{

			this.bot.on('text', (ctx)=>{
				this.answerReport.description = ctx.message.text
			})
		}).catch(err=>{
			console.log(new Error(err))
		})
	}
	addKabinet(){
		this.ctx.reply('Введите название кабинета').then(()=>{

			this.bot.on('text', (ctx)=>{
				this.answerReport.kabinet = ctx.message.text
			})
		}).catch(err=>{
			console.log(new Error(err))
		})
	}
	addName(){
		this.ctx.reply('Введите ваше ФИО').then(()=>{

			this.bot.on('text', (ctx=>{
				this.answerReport.name = ctx.message.text
			}))
		}).catch(err=>{
			console.log(new Error(err))
		})
	}
	addPhone(){
		this.ctx.reply('Введите контактную информацию (номер мобильного телефона)').then(()=>{

			this.bot.on('text', (ctx)=>{
				this.answerReport.phone = ctx.message.text
			})
		}).catch(err=>{
			console.log(new Error(err))
		})
	}
}
