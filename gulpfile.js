import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import cleanCSS from 'gulp-clean-css';
import del from 'gulp-clean';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import cssimport from 'gulp-cssimport';
import autoprefixer from 'gulp-autoprefixer';

const sass = gulpSass(dartSass);

const paths = {
  styles: {
    src: [
      'node_modules/vazirmatn/Vazirmatn-font-face.css',
      'node_modules/vazirmatn/misc/Farsi-Digits/Vazirmatn-FD-font-face.css',
      'node_modules/@fortawesome/fontawesome-free/css/all.css'
    ],
    dest: 'dist'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'assets/scripts/'
  },
  images: {
    src: 'src/images/**/*',
    dest: 'dist/images'
  },
  icons: {
    src: 'src/icons/*',
    dest: 'dist/icons'
  },
  bootstrap: {
    src: 'node_modules/bootstrap/dist/**/*',
    dest: 'dist/bootstrap'
  },
  fonts: {
    src: [
      'node_modules/vazirmatn/fonts/webfonts/*',
      'node_modules/vazirmatn/misc/Farsi-Digits/fonts/webfonts/*',
      'node_modules/@fortawesome/fontawesome-free/webfonts/*'
    ],
    dest: 'dist/fonts'
  }
};

export function clean() {
  return gulp.src('dist', { read: false, allowEmpty: true })
    .pipe(del());
}

export function styles() {
  var options = { includePaths: ['node_modules'], matchPattern: "*.css"};
  return gulp.src(paths.styles.src, {removeBOM: false, allowEmpty: true})
    .pipe(cssimport(options))
    .pipe(sass({ style: 'expanded', includePaths: ['node_modules'] }))
    .pipe(autoprefixer())
    .pipe(replace('fonts/webfonts/', 'fonts/'))
    .pipe(replace('../webfonts/', 'fonts/'))
    .pipe(concat('styles.css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cleanCSS({level: 2}))
    .pipe(gulp.dest(paths.styles.dest));
}

export function scripts() {
  return gulp.src(paths.scripts.src, {removeBOM: false, sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

export function images() {
  return gulp.src(paths.images.src, {removeBOM: false, allowEmpty: true})
    .pipe(gulp.dest(paths.images.dest));
}

export function fonts() {
  return gulp.src(paths.fonts.src, {removeBOM: false, allowEmpty: true})
  .pipe(gulp.dest(paths.fonts.dest));
}

export function bootstrap() {
  return gulp.src(paths.bootstrap.src, {removeBOM: false, allowEmpty: true})
  .pipe(gulp.dest(paths.bootstrap.dest));
}

export function icons() {
  return gulp.src(paths.icons.src, {removeBOM: false, allowEmpty: true})
  .pipe(gulp.dest(paths.icons.dest));
}

function watchFiles() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.icons.src, icons);
  gulp.watch(paths.fonts.src, fonts);
}
export { watchFiles as watch };

export const build = gulp.series(clean, styles, bootstrap, fonts);

export default build;
