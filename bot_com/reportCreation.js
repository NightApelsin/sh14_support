
let answerCallback = {}
export async function createReport(bot, cta){
	cta.reply(`Порядок заполнения формы запроса
		1. Короткое название проблемы
		2. Более подробное описание проблемы
		3. Номер кабинета в котором произошла проблема
		4. Ваше ФИО
		5. Контактна информация (номер мобильного телефна)`)
	cta.reply('Введиет проблему с который вы столкнулись (кротко)').then(()=>{
		bot.on('text', (ctb)=>{
			answerCallback.problem = ctb.message.text
			ctb.reply('Теперь опишите подробней').then(()=>{
				console.log('a')
				try{
				bot.on('text', (ctc)=>{
					answerCallback.description = ctc.message.text
					ctc.reply('Введите номер кабинета в котором это произошло')
				})
			}catch(err){
				console.log(err)
			}
			}).catch((err)=>{
				ctb.reply(err)
			})
		})
	}).catch((err)=>{

	})
	
}