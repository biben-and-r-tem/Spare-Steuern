//Подключаем галп
const gulp = require('gulp'),
    //Объединение файлов
    concat = require('gulp-concat'),
    //Добапвление префиксов
    autoprefixer = require('gulp-autoprefixer'),
    //Минимизация html
    htmlmin = require('gulp-htmlmin'),
    //Минимизация стилей
    cleanCSS = require('gulp-clean-css'),
    //Минимизация скриптов
    uglify = require('gulp-uglify'),
    //Оптимизация скриптов
    babel = require('gulp-babel'),
    //Удаление файлов
    del = require('del'),
    //Синхронизация с браузером
    browserSync = require('browser-sync').create(),
    //Для препроцессоров стилей
    sourcemaps = require('gulp-sourcemaps'),
    //Sass препроцессор
    sass = require('gulp-sass'),
    //Модуль для сжатия изображений
    imagemin = require('gulp-imagemin'),
    // плагин для сжатия jpeg
    jpegrecompress = require('imagemin-jpeg-recompress'),
    // плагин для сжатия png
    pngquant = require('imagemin-pngquant'),
    //Модуль обьеденения медиа запросов
    gcmq = require('gulp-group-css-media-queries'),
    //Модуль вывода ошибок
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify"),
    // модуль для кэширования
    cache = require('gulp-cache'),
    //Модуль переноса файлов из bower в gulp
    mainBowerFiles = require('main-bower-files');

//Порядок подключения файлов со стилями
const styleFiles = [
        './src/main_files/**/*.css',
        './src/main_files/**/*.scss',
        './src/scss/**/fonts.scss',
        './src/scss/**/*.scss',
        './src/scss/**/*.css',
    ],
    //Порядок подключения js файлов
    scriptFiles = [
        './src/main_files/**/jquery.js',
        './src/main_files/**/jquery.min.js',
        './src/main_files/**/gsap.js',
        './src/main_files/**/gsap.min.js',
        './src/main_files/**/TweenMax.js',
        './src/main_files/**/TweenMax.min.js',
        './src/main_files/**/ScrollToPlugin.js',
        './src/main_files/**/ScrollToPlugin.min.js',
        './src/main_files/**/ScrollMagic.js',
        './src/main_files/**/ScrollMagic.min.js',
        './src/main_files/**/animation.gsap.js',
        './src/main_files/**/animation.gsap.min.js',
        './src/main_files/**/*.js',
        './src/js/**/*.js'
    ]

//Таск для переноса файлов из bower в gulp
gulp.task('mainFilesRun', () => {
    return gulp.src(mainBowerFiles())
        //Выходная папка для файлов из bower
        .pipe(gulp.dest('./src/main_files'))
});

//Таск для обработки html
gulp.task('html', () => {
    return gulp.src('./src/**/*.html')
        //Выходная папка для html
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream());
});

//Таск для обработки и сжатия html
gulp.task('htmlMin', () => {
    return gulp.src('./src/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        //Выходная папка для html
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream());
});

//Таск для обработки стилей
gulp.task('styles', () => {
    //Шаблон для поиска файлов CSS
    //Всей файлы по шаблону './src/css/**/*.css'
    return gulp.src(styleFiles)

        //Проверка на ошибки
        .pipe(plumber({
            errorHandler: notify.onError({
                title: 'Styles',
                message: "Error: <%= error.message %>"
            })
        }))

        .pipe(sourcemaps.init())

        //Указать stylus() , sass() или less()
        .pipe(sass())

        //Объединение файлов в один
        .pipe(concat('style.css'))

        //Добавить префиксы
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
            cascade: true
        }))

        //Объединение медиа запросов
        .pipe(gcmq())

        //Создание sourcemap
        .pipe(sourcemaps.write('.'))

        //Выходная папка для стилей
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
});

//Таск для обработки и сжатия стилей
gulp.task('stylesMin', () => {
    //Шаблон для поиска файлов CSS
    //Всей файлы по шаблону './src/css/**/*.css'
    return gulp.src(styleFiles)

        //Проверка на ошибки
        .pipe(plumber({
            errorHandler: notify.onError({
                title: 'Styles',
                message: "Error: <%= error.message %>"
            })
        }))

        //Указать stylus() , sass() или less()
        .pipe(sass())

        //Объединение файлов в один
        .pipe(concat('style.css'))

        //Добавить префиксы
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
            cascade: true
        }))

        //Объединение медиа запросов
        .pipe(gcmq())

        //Минификация CSS
        .pipe(cleanCSS({
            level: {
                1: {
                    specialComments: 0
                }
            }
        }, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))

        //Выходная папка для стилей
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
});

//Таск для обработки скриптов
gulp.task('scripts', () => {
    //Шаблон для поиска файлов JS
    //Всей файлы по шаблону './src/js/**/*.js'
    return gulp.src(scriptFiles)

        //Проверка на ошибки
        .pipe(plumber({
            errorHandler: notify.onError({
                title: 'Scripts',
                message: "Error: <%= error.message %>"
            })
        }))

        //Объединение файлов в один
        .pipe(concat('main.js'))

        //Выходная папка для скриптов
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream());
});

//Таск для обработки и сжатия скриптов
gulp.task('scriptsMin', () => {
    //Шаблон для поиска файлов JS
    //Всей файлы по шаблону './src/js/**/*.js'
    return gulp.src(scriptFiles)

        //Проверка на ошибки
        .pipe(plumber({
            errorHandler: notify.onError({
                title: 'Scripts',
                message: "Error: <%= error.message %>"
            })
        }))

        //Объединение файлов в один
        .pipe(concat('main.js'))

        // Подключение babel
        .pipe(babel({
            presets: ['es2015']
        }))

        //Минификация JS
        .pipe(uglify({
            toplevel: true
        }))

        //Выходная папка для скриптов
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream());
});

//Таск для очистки папки build
gulp.task('del', () => {
    return del(['build/*'])
});

//Таск для очистки папки mainFiles
gulp.task('delMainFiles', () => {
    return del(['src/main_files/*'])
});

//Таск для переноса изображений
gulp.task('img', () => {
    return gulp.src('./src/img/**')
        //Выходная папка для изображений
        .pipe(gulp.dest('./build/img/'))
});

//Таск для сжатия изображений
gulp.task('img-compress', () => {
    return gulp.src('./src/img/**')
        // сжатие изображений
        .pipe(cache(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            jpegrecompress({
                progressive: true,
                max: 90,
                min: 80
            }),
            pngquant(),
            imagemin.svgo({
                plugins: [{
                    removeViewBox: false
                }]
            })
        ])))
        //Выходная папка для изображений
        .pipe(gulp.dest('./build/img/'))
});

//Таск для переноса шрифтов в папку build
gulp.task('fonts', () => {
    return gulp.src('./src/fonts/**/*')
        //Выходная папка для шрифтов
        .pipe(gulp.dest('./build/fonts/'))
});

//Таск для отслеживания изменений в файлах
gulp.task('watch', () => {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
    //Следить за добавлением новых изображений
    gulp.watch('./src/img/**', gulp.series('img'))
    //Следить за добавлением новых шрифтов
    gulp.watch('./src/fonts/**', gulp.series('fonts'))
    //Следить за файлами с html
    gulp.watch('./src/**/*.html', gulp.series('html'))
    //Следить за файлами со стилями с нужным расширением
    gulp.watch(styleFiles, gulp.series('styles'))
    //Следить за JS файлами
    gulp.watch(scriptFiles, gulp.series('scripts'))
});

//Таск для отслеживания изменений в сжатых файлах
gulp.task('watchCompress', () => {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
    //Следить за добавлением новых изображений
    gulp.watch('./src/img/**', gulp.series('img-compress'))
    //Следить за добавлением новых шрифтов
    gulp.watch('./src/fonts/**', gulp.series('fonts'))
    //Следить за файлами с html
    gulp.watch('./src/**/*.html', gulp.series('htmlMin'))
    //Следить за файлами со стилями с нужным расширением
    gulp.watch(styleFiles, gulp.series('stylesMin'))
    //Следить за JS файлами
    gulp.watch(scriptFiles, gulp.series('scriptsMin'))
});

//Таск по умолчанию, Запускает del, styles, scripts, img и watch
gulp.task('default', gulp.series('del', gulp.parallel('html', 'styles', 'scripts', 'img', 'fonts'), 'watch'));
//Таск для продакшена, Запускает del, styles, scripts, img-compress
gulp.task('compress', gulp.series('del', gulp.parallel('htmlMin', 'stylesMin', 'scriptsMin', 'img-compress', 'fonts'), 'watchCompress'));
//Таск для создания и обновления папки main_files
gulp.task('mainFiles', gulp.series('delMainFiles', gulp.parallel('mainFilesRun')));