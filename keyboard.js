import {Markup} from 'telegraf/markup.js'

export function getMainMenu() {
    return Markup.keyboard([
        ['/report','/motivation']
    ]).resize().extra()

}