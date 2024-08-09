import {isAdmin} from "../Controllers/hashing.js";

export class ReportsListViewComand{
    constructor(bot, ctx) {
        this.bot = bot
        this.ctx = ctx
        if(isAdmin(ctx.message.from.id.toString())){
            this.init()
        }else{
            this.ctx.reply('У вас недостаточно прав чтобы пользоваться этой командой')
        }
    }
    
    async init(){
        let result;
        try {
            result = await fetch('http://localhost:3000/getReports')
        }catch(err){
            this.ctx.reply()
        }
    }
}