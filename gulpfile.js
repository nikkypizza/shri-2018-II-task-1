let gulp = require(`gulp`);

// ######################## //
// DEVELOPMENT images START //
// ####################### //

let imagemin = require(`gulp-imagemin`);
let webp = require(`gulp-webp`);
let svgstore = require(`gulp-svgstore`);
let rename = require(`gulp-rename`);
let imageminPngquant = require(`imagemin-pngquant`);
let cssmin = require(`gulp-csso`);
let run = require(`run-sequence`);
let del = require(`del`);
let uglify = require(`gulp-uglify-es`).default;

// Minify png
gulp.task(`pngmin`, () =>
  gulp.src(`img/**/*.png`)
  .pipe(imagemin([
    imageminPngquant({
      quality: 45
    })
  ]))
  .pipe(gulp.dest(`public/img`))
);

// Minify SVG
gulp.task(`svgo`, function () {
  gulp.src(`img/svg/*.svg`)
    .pipe(imagemin([
      imagemin.svgo()
    ]))
    .pipe(gulp.dest(`public/img/svg`));
});

// Genetare SVG sprite from icons starting with "icon-"
gulp.task(`sprite`, function () {
  gulp.src(`img/svg/icon-*.svg`)
    .pipe(imagemin([
      imagemin.svgo()
    ]))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename(`sprite.svg`))
    .pipe(gulp.dest(`img/svg`));
});

gulp.task(`webp`, function () {
  return gulp.src(`img/**/*.{png,jpg}`)
    .pipe(webp({
      quality: 90
    }))
    .pipe(gulp.dest(`img`));
});


// ###################### //
// DEVELOPMENT images END //
// ###################### //


// --------------------------------------------//


//    ######################   //
// BrowserSync all files START //
//    ######################   //

let browserSync = require(`browser-sync`);
let plumber = require(`gulp-plumber`);
let sass = require(`gulp-sass`);
let postcss = require(`gulp-postcss`);
let autoprefixer = require(`autoprefixer`);

// Convert SCSS to CSS
gulp.task(`compile-sass`, function () {
  gulp.src(`sass/style.scss`)
    .pipe(plumber())
    .pipe(sass({
      includePaths: [`sass`]
    }))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest(`css`))
    .pipe(browserSync.stream());
});

//   #####################   //
// BrowserSync all files END //
//   #####################   //


// --------------------------------------------//


// ##### //
// Build //
// ##### //

gulp.task(`copy`, function () {
  return gulp.src([
    `*.html`,
    `favicon.ico`
  ], {
    base: `.`
  })
    .pipe(gulp.dest(`public`));
});

gulp.task(`clean`, function () {
  return del(`public`);
});

gulp.task(`cssmin`, function () {
  gulp.src(`css/style.css`)
    .pipe(cssmin())
    .pipe(gulp.dest(`public/css`));
});

gulp.task(`jsmin`, function () {
  gulp.src(`js/*.js`)
    .pipe(uglify())
    .pipe(gulp.dest(`public/js`));
});

gulp.task(`build`, function (done) {
  run(`clean`, `copy`, `pngmin`, `jsmin`, `cssmin`, `svgo`, done);
});


// ########### //
// TypeScritpt //
// ########## //

let tslint = require(`gulp-tslint`);
gulp.task(`tslint`, () =>
  gulp.src(`ts/**/*.ts`)
  .pipe(tslint({
    formatter: `verbose`
  }))
  .pipe(tslint.report())
);

// const sourcemaps = require(`gulp-sourcemaps`);
// const rollup = require(`gulp-better-rollup`);
const ts = require(`gulp-typescript`);
const eslint = require(`gulp-eslint`);

gulp.task(`compile-ts`, function () {
  gulp.src(`ts/node-hw/**/*.ts`)
    .pipe(plumber())
    // .pipe(sourcemaps.init())
    .pipe(ts({
      // module: `amd`,
      lib: [`es6`, `dom`, `es2017`],
      target: `es6`,
      noImplicitAny: true,
      // outFile: `server.js`,
      // project: `tsconfig.json`
    }))
    // .pipe(rollup({}, `iife`))
    // .pipe(sourcemaps.write(``))
    .pipe(eslint({
      fix: true
    }))
    .pipe(gulp.dest(`node-hw`));


  gulp.src(`ts/page/**/*.ts`)
    .pipe(plumber())
    .pipe(ts({
      lib: [`es6`, `dom`, `es2017`],
      target: `es6`,
      noImplicitAny: true,
    }))
    .pipe(eslint({
      fix: true
    }))
    .pipe(gulp.dest(`js`));
});

gulp.task(`watch`, function () {
  browserSync.init([`css/*.css`, `ts/**/*.ts`, `*.html`, `sass/**/*.scss`], {
    server: `./`
  });
  gulp.watch(`sass/**/*.scss`, [`compile-sass`]);
  gulp.watch(`ts/**/*.ts`, [`compile-ts`]);
  gulp.watch(`*.html`).on(`change`, browserSync.reload);
});
