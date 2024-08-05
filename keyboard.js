import {Markup} from 'telegraf'

export function getMainMenu() {
    return Markup.keyboard([
        ['/start','/Обращение в тех поддержку','/motivation']
    ]).resize()

}