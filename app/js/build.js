/**
 *
 * SINGLE FILE
 * sample config:
 * https://github.com/jrburke/r.js/blob/master/build/example.build.js
 *
 */
({
    baseUrl: '.',
    paths: {
        requireLib : 'libs/require.2.1.2.min',
        jquery     : 'libs/jquery-1.8.3.min',
        underscore : 'libs/amd-enabled/underscore-min',
        backbone   : 'libs/amd-enabled/backbone-min',
        spin       : 'libs/spin.min',
        velocity   : 'libs/velocity.min',
        applogic   : 'applogic',
        text       : 'libs/text',
        template   : '../templates'
    },
    shim: {
        'velocity': {
            deps: [ 'jquery' ]
        },
        // // Optional, if you're using the UI pack:
        // 'velocity-ui': {
        //     deps: [ 'velocity' ]
        // }
    },
    include: ['requireLib'],
    name: 'main',
    out: '../../deploy/js/main.js'
})

/**
 *
 * ENTIRE PROJECT - PATHS ARE RELATIVE TO LOCATION OF THIS FILE
 *
({
    appDir         : '../',
    baseUrl        : 'js',
    dir            : '../../deploy',
    mainConfigFile : 'main.js',
    keepBuildDir   : false,
    optimizeCss    : 'standard',
    removeCombined : true,
    modules        : [{ name: 'main' }]
})
 */
