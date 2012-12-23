/**
*
* SINGLE FILE
*
*
*
({
    baseUrl: ".",
    paths: {
        jquery: "some/other/jquery"
    }
    name: "main",
    out: "main-built.js"
})
**/

/**
*
* ENTIRE PROJECT - PATHS ARE RELATIVE TO LOCATION OF THIS FILE
*
**/
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
