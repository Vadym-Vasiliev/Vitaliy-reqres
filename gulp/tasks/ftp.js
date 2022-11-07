import { configFTP } from "../config/ftp.js";
import vinyFTP from "vinyl-ftp";
import util from "gulp-util";

export const ftp = () => {
  configFTP.log = util.log; //добавляємо лог і присваюєм плагін
  const ftpConnect = vinyFTP.create(configFTP); // створюємо підключення
  return app.gulp
    .src(`${app.path.buildFolder}/**/*.*`, {}) // отримуємо всі файли
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SCSS",
          message: "Error: <%= error.message %>", // обробляємо помилки
        })
      )
    )
    .pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`)); // вказуємо шлях та добавляємо до нього назву рут папки
};
