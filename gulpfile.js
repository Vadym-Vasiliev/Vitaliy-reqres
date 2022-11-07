//Основний модуль
import gulp from "gulp";

//Імпорт шляхів

import { path } from "./gulp/config/path.js";

//Імпорт загальних плагінів

import { plugins } from "./gulp/config/plugins.js";

//Передаєм значення в глобальну змінну

global.app = {
  isBuild: process.argv.includes("--build"), //режим продакшена
  isDev: !process.argv.includes("--build"), //режим розробника
  path: path,
  gulp: gulp,
  plugins: plugins,
};

//Імпорт задач

import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

//Наглядач за змінами в файлах

function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html); //якщо потрібно любій зміні файла вони мають одразу попадати на сервер
  //тоді потрібно для кожної задачі добавити   gulp.watch(path.watch.html, gulp.series(html,  ftp));

  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
  gulp.watch(path.watch.svgicons, svgSprive);
}

export { svgSprive };

//Послідовна обробка шрифтів

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

//Основні задачі

const mainTasks = gulp.series(
  fonts,
  gulp.parallel(copy, html, scss, js, images, svgSprive)
);

//Побудова сценаріїв виконання задач

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks); // в режимі продакшена
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

//експорт сценаріїв

export { dev };
export { build };
export { deployZIP };
export { deployFTP };

//Виконання сценарію по замовчуванні

gulp.task("default", dev);
