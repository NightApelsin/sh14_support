import pg from 'pg'
const {Client} = pg

export class CreateReport {
constructor(bot, ctx, answerReportInput, dbConfig) {
this.answerReport = answerReportInput;
this.bot = bot;
this.ctx = ctx;
this.steps = [
{ field: 'problem', question: 'Опишите проблему, с которой вы столкнулись (коротко)' },
{ field: 'description', question: 'Расскажите подробнее, что случилось' },
{ field: 'kabinet', question: 'Введите номер кабинета' },
{ field: 'name', question: 'Введите ваше ФИО' },
{ field: 'phone', question: 'Введите контактную информацию (номер мобильного телефона)' },
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
const client = new Client(this.dbConfig);
try {
await client.connect();
const query = `
INSERT INTO report_requests (problem, description, kabinet, name, phone)
VALUES ($1, $2, $3, $4, $5)
`;
const values = [
this.answerReport.problem,
this.answerReport.description,
this.answerReport.kabinet,
this.answerReport.name,
this.answerReport.phone
];
await client.query(query, values);
this.ctx.reply('Отчет успешно создан и сохранен в базе данных. С вами свяжуться в ближайшее время.');
} catch (err) {
console.error('Ошибка при сохранении отчета в базу данных:', err);
this.ctx.reply('Произошла ошибка при сохранении отчета. Попробуйте позже.');
} finally {
await client.end();
}
}
}
