import {Markup} from 'telegraf'

export function getMainMenu() {
    return Markup.keyboard([
        ['/start','/техническая поддержка','/motivation']
    ]).resize()

}