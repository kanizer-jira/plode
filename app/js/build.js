/**
*
* SINGLE FILE
*
*
*
**/
({
    baseUrl: ".",
    paths: {
        jquery: 'libs/jquery-1.8.3.min',
        underscore: 'libs/amd-enabled/underscore-min',
        backbone: 'libs/amd-enabled/backbone-min',
        spin: 'libs/spin.min',
        applogic: 'applogic',
        text: 'libs/text',
        template: '../templates'
    },
    name: "main",
    out: "../../deploy/js/main.js"
})
/***/

/**
*
* ENTIRE PROJECT - PATHS ARE RELATIVE TO LOCATION OF THIS FILE
*
({
    appDir: "../",
    baseUrl: "js",
    dir: "../../deploy",
    mainConfigFile: "main.js",
    removeCombined: true,
    modules: [
        {
            name: "main"
        }
    ]
})
**/
