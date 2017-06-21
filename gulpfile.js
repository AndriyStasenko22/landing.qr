var gulp = require('gulp'), // Подключаем gulp
	less = require('gulp-less'), // Подключаем Less
	browserSync = require('browser-sync'), // Подключаем Browser Sync
	concat      = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify      = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
	autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
    cssnano     = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    jade = require('gulp-jade'); // Подключаем пакет для минификации Jade

// Таск "LESS"
gulp.task('less', function(){
    return gulp.src('app/less/main.less') // Берем источник
        .pipe(less()) // Преобразуем LESS в CSS посредством gulp-less
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(cssnano())
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
    });

// Таск "scripts"
gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'app/libs/jquery/dist/jquery.min.js', // jQuery
        'app/libs/bootstrap/dist/js/bootstrap.min.js', // Bootsrap
        'app/libs/slick-carousel/slick/slick.min.js', //SlickSlider
        'app/libs/owl.carousel/dist/owl.carousel.min.js', //OwlCarousel
        'app/libs/fancybox-2.1.7/source/jquery.fancybox.js', //FancyBox
        'app/libs/jquery-mousewheel/jquery.mousewheel.min.js',
        'app/libs/jquery-mixitup/dist/mixitup.min.js', //MixitUp
        'app/libs/vivus/dist/vivus.min.js', //SVG drowin
        'app/libs/wow/dist/wow.min.js',
        'app/libs/jquery-ui/jquery-ui.min.js'
        ])
        .pipe(concat('libs.min.js')) // Собираем их в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
    });

// Таск "browser-sync"
gulp.task('browser-sync', function() {
    browserSync({ // Выполняем browser Sync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});
// Таск "Jade"
gulp.task('jade', function() {
    return gulp.src('app/jade/**/**.jade')
        .pipe(jade({
            pretty: true
        }))
        .on('error', console.log) // Выводим ошибки в консоль
        .pipe(gulp.dest('app/')) // указываем gulp куда положить скомпилированные HTML файлы
        .pipe(browserSync.reload({stream: true}));
    });

// gulp.task('icons', function() {
//   return gulp.src(config.bowerDir + '/app/libs/font-awesome/fonts/**.*')
//     .pipe(gulp.dest('./public/fonts'));
// });

// Таск "watch"
gulp.task('watch', ['browser-sync', 'less', 'scripts', 'jade'], function() {
    gulp.watch('app/less/**/*.less', ['less']); // Наблюдение за less файлами
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
    gulp.watch('app/jade/**/*.jade', ['jade']); // Наблюдение за less файлами
});

gulp.task('default', ['watch']);