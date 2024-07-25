import { src, dest, parallel, series, watch } from 'gulp';
import { deleteSync } from 'del';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import includeFiles from 'gulp-include';
import gulpSass from "gulp-sass";
import * as sass from 'sass';
const scss = gulpSass(sass);
import browserSync from 'browser-sync';
browserSync.create();


function browsersync() {
    browserSync.init({
        server: {
            baseDir: './build/',
            serveStaticOptions: {
                extensions: ['html'],
            },
        },
        port: 8080,
        ui: { port: 8081 },
        open: true,
    })
}


function styles_dev() {
    return src('./src/styles/index.scss')
        .pipe(sourcemaps.init())
        .pipe(scss({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({ grid: true }))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('./'))
        .pipe(dest('./build/css/'))
        .pipe(browserSync.stream())
}


function styles_build() {
    return src('./src/styles/index.scss')
        .pipe(scss({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({ grid: true }))
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('./build/css/'))
}


function scripts() {
    return src('./src/js/script.js')
    .pipe(
        includeFiles({
            includePaths: './src/components/**/',
        })
    )
    .pipe(dest('./build/js/'))
    .pipe(browserSync.stream())
}


function pages() {
    return src('./src/pages/*.html')
    .pipe(
        includeFiles({
            includePaths: './src/components/**/',
        })
    )
    .pipe(dest('./build/'))
    .pipe(browserSync.reload({ stream: true, }))
}


function copyFonts() {
    return src('./src/fonts/**/*')
    .pipe(dest('./build/fonts/'))
}


function copyImages() {
    return src('./src/images/**/*')
    .pipe(dest('./build/images/'))
}


async function copyResources() {
    copyFonts()
    copyImages()
}


async function clean() {
    return deleteSync(['./build/'])
}


function watch_dev() {
    watch(['./src/js/script.js', './src/components/**/*.js'], scripts)
    watch(['./src/styles/**/*.scss', './src/components/**/*.scss'], styles_dev).on(
        'change',
        browserSync.reload
    )
    watch(['./src/pages/*.html', './src/components/**/*.html'], pages).on(
        'change',
        browserSync.reload
    )
    
}

export { browsersync, styles_dev, scripts, pages, copyResources, clean };

export default parallel(
    clean,
    styles_dev,
    scripts,
    copyResources,
    pages,
    browsersync,
    watch_dev
)

export const build = series(
    clean,
    styles_build,
    scripts,
    copyResources,
    pages
)

