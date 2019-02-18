/**
 * This file handles the rules in compiling preprocessed scripts and styles
 * like: Typescript, Javascript, Vue.js
 * like: Scss / Sass.
 */

/**
 * Load laravel mix!
 * @type {*|Api}
 */
const mix = require('laravel-mix');

// Tell laravel-mix to only display a notification on a error
mix.disableNotifications();

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    .sass('resources/sass/app.scss', 'public/assets/css')
    .typeScript('resources/ts/app.ts', 'public/assets/js')
    .sourceMaps()
;