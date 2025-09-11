const { src, dest, watch, series, parallel } = require('gulp');

const scss = require('gulp-sass')(require('sass'));  // Один require для sass/scss
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const newer = require('gulp-newer');
const ttf2woff2 = require('gulp-ttf2woff2');
const sourcemaps = require('gulp-sourcemaps');  // Добавьте, если не установлен: npm i --save-dev gulp-sourcemaps
const include = require('gulp-include');
const svgstore = require('gulp-svgstore');
const gulp = require('gulp');

gulp.task('scss', function () {
  return gulp.src('app/scss/style.scss')
    .pipe(scss({
      includePaths: ['app/scss']  // @use 'vars';
    }).on('error', scss.logError))
    .pipe(gulp.dest('app/css'));
});

function sprites() {
  return src('app/images/sprite/*.svg')
    .pipe(svgstore())
    .pipe(dest('app/images'));
}

function pages() {
  return src('app/pages/*.html')
    .pipe(include({
      includePaths: 'app/components'
    }))
    .pipe(dest('app'))
    .pipe(browserSync.stream());
}

function fonts() {
  return src('app/fonts/*.ttf')
    .pipe(ttf2woff2())
    .pipe(dest('app/fonts'));
}

function images() {
  // Исправление: Один src, затем ветвление для форматов (используем filter для избежания перезаписи)
  const imageSrc = ['app/images/src/*.*', '!app/images/src/*.svg'];  // Исключаем SVG

  return src(imageSrc)
    .pipe(newer('app/images'))
    // AVIF
    .pipe(avif({ quality: 50 }))
    .pipe(dest('app/images'))  // Сохраняем AVIF
    // WebP (на оригиналах)
    .pipe(src(imageSrc))  // Новый stream для WebP
    .pipe(newer('app/images'))
    .pipe(webp())
    .pipe(dest('app/images'))
    // Оригиналы оптимизированные
    .pipe(src(imageSrc))
    .pipe(newer('app/images'))
    .pipe(imagemin())
    .pipe(dest('app/images'));
}

function styles() {
  console.log('Запуск задачи styles');
  return src('app/scss/style.scss')
    .pipe(sourcemaps.init())  // Перемещено ДО scss() для корректных карт
    .pipe(scss({
      outputStyle: 'expanded',  // Для prod: 'compressed'
      includePaths: ['app/scss']
    }).on('error', scss.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],  // Современный browserslist
      cascade: false
    }))
    .pipe(concat('style.min.css'))
    .pipe(sourcemaps.write('.'))  // Генерирует .map файлы
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
}

function scripts() {
  return src([
    'node_modules/swiper/swiper-bundle.js',
    'node_modules/nouislider/dist/nouislider.js',
    'app/js/main.js'
  ])
    .pipe(sourcemaps.init())  // Добавлено: sourcemaps для JS
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))  // Добавлено: write maps
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}

function watching() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  });
  watch(['app/scss/**/*.scss'], styles);
  watch('app/images/src/**/*.{png,jpg,jpeg,gif}', images);  // Убрал svg из watch, т.к. исключаем
  watch(['app/images/sprite/*.svg'], sprites);  // Уточнил glob
  watch(['app/pages/*', 'app/components/*'], pages);
  watch(['app/js/main.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload);
}

function cleanDist() {
  return src('dist', { allowEmpty: true })
    .pipe(clean({ force: true }));
}

function building() {
  return src([
    'app/**/*.html',
    'app/css/**/*.css',
    'app/js/**/*.js',
    'app/images/**/*.*',
    'app/fonts/**/*.*'
  ], { base: 'app' })
  .pipe(dest('dist'));
}

exports.styles = styles;
exports.watching = watching;
exports.scripts = scripts;
exports.images = images;
exports.fonts = fonts;
exports.sprites = sprites;
exports.pages = pages;
exports.cleanDist = cleanDist;
exports.building = building;

exports.build = series(cleanDist, parallel(styles, images, sprites, scripts, pages), building);  // Добавил parallel для задач перед копированием
exports.default = watching;  // Только dev, без build