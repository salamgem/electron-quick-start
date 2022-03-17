class MainMenu {
    constructor() {                                   // output
        const { Menu }  = require('electron')
        let template =[
            {
                label: "File",
                submenu: [
                    {
                        label: "Close",
                        role: "quit"
                    }
                ]
            },
            {
                label: "Help",
                click: () => {
                    const { shell } = require('electron')
                    shell.openExternal("https://www.google.com/?hl=ar")
                }
            },
            {
                label: "About",
                click: () => {
                    const { dialog } = require('electron')
                    dialog.showMessageBox({
                        type: "info",
                        buttons: ["ok"],
                        title: "About",
                        message: "Hello from sbout window"
                    })
                }
            },
        ]
        let menu = Menu.buildFromTemplate(template)   // definition of menu is list template
        Menu.setApplicationMenu(menu)                 // Use the menu as The main menu in the system
    }
}

module.exports = { MainMenu }