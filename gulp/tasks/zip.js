import del from "del";
import zipPlugin from "gulp-zip";

export const zip = () => {
  del(`./${app.path.rootFolder}.zip`); //удаляєм зіп архів, якщо існує
  return app.gulp
    .src(`${app.path.buildFolder}/**/*.*`, {}) // звертаємось в папку з результатом і  ортимуємо всі файли любого рівня вкладеності
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SCSS",
          message: "Error: <%= error.message %>", // обробляємо помилки
        })
      )
    )
    .pipe(zipPlugin(`${app.path.rootFolder}.zip`)) // викликаємо модуль і отримуємо імя папки і назву архіва
    .pipe(app.gulp.dest("./")); // виводимо результат
};
