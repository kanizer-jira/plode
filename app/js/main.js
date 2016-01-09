require.config({
        paths        : {
        underscore   : 'libs/amd-enabled/underscore-min',
        backbone     : 'libs/amd-enabled/backbone-min',
        jquery       : 'libs/jquery-1.8.3.min',
        spin         : 'libs/spin.min',
        velocity     : 'libs/velocity.min',
        tweenmax     : 'libs/gsap/TweenMax.min',
        applogic     : 'applogic',
        text         : 'libs/text',
        template     : '../templates'
    },
    shim: {
        velocity: {
            deps: [ 'jquery' ]
        }
    }
});

require(['app'], function(App) { App.init(); });
