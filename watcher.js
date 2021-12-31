const chokidar = require('chokidar');
const sass = require('node-sass');
const path = require('path');
const fs = require('fs');

//监听的文件
const watchFile = path.join(__dirname, "/client/style/scss/*.scss")

chokidar.watch(watchFile).on('all', (event, file) => {
  const {
    dir,
    name
  } = path.parse(file);

  //忽略以_开头的文件
  if (name.startsWith('_')) {
    return;
  }

  console.log(event, file);

  //编译生成的wxss文件目录
  let target = path.join(path.resolve(dir, '..'), 'wxss');
  sass.render({
    file: file,
    outputStyle: "compact"
  }, function (err, result) {
    if (!err) {
      const newFile = `${target}/${name}.wxss`

      fs.writeFile(newFile, result.css, function (err) {
        if (!err) {
          //file written on disk
          console.log(`updated ${newFile}`)
        } else {
          console.log(err)
        }
      });

    } else {
      console.log(err)
    }
  });
});