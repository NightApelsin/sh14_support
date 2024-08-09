export class CreateReport {
	constructor(bot, ctx, answerReportInput, dbConfig) {
		this.answerReport = answerReportInput;
		this.bot = bot;
		this.ctx = ctx;
		this.steps = [{
				field: 'problem',
				question: 'Опишите проблему, с которой вы столкнулись (коротко)'
			},
			{
				field: 'description',
				question: 'Расскажите подробнее, что случилось'
			},
			{
				field: 'kabinet',
				question: 'Введите номер кабинета'
			},
			{
				field: 'name',
				question: 'Введите ваше ФИО'
			},
			{
				field: 'phone',
				question: 'Введите контактную информацию (номер мобильного телефона)'
			},
		];
		this.currentStep = 0;
		this.dbConfig = dbConfig;
		this.init();
	}

	init() {
		this.bot.on('text', (ctx) => this.handleResponse(ctx));
		this.askQuestion();
	}

	askQuestion() {
		if (this.currentStep < this.steps.length) {
			this.ctx.reply(this.steps[this.currentStep].question);
		} else {
			this.finalizeReport();
		}
	}

	handleResponse(ctx) {
		if (this.currentStep < this.steps.length) {
			const step = this.steps[this.currentStep];
			this.answerReport[step.field] = ctx.message.text;
			this.currentStep++;
			this.askQuestion();
		}
	}

	async finalizeReport() {
		console.log('Отчет создан:', this.answerReport);

		// Сохранение отчета в базу данных

		try {

			const values = {
				problem: this.answerReport.problem,
				description: this.answerReport.description,
				kabinet: this.answerReport.kabinet,
				name: this.answerReport.name,
				phone: this.answerReport.phone,
				user_id: this.ctx.message.from.id
			};
			let request = await fetch('http://localhost:3000/createRep', {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(values)
			})
			this.ctx.reply('Отчет успешно создан и сохранен в базе данных. С вами свяжуться в ближайшее время.');
		} catch (err) {
			console.error('Ошибка при сохранении отчета в базу данных:', err);
			this.ctx.reply('Произошла ошибка при сохранении отчета. Попробуйте позже.');
		}
	}
}