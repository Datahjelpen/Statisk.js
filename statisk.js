const fs = require("fs");
const getDirName = require("path").dirname;
const nunjucks = require("nunjucks");

const inputDir = "src";
const outputDir = "dist";

const nunjucksDir = inputDir + "/views";
const nunjucksViews = nunjucksDir + "/**/*.njk";
const nunjucksTemplates = nunjucksDir + "/templates/**/*.njk";

function renderNunjucks(inputPath, outputPath, callback) {
  nunjucks.configure("./" + nunjucksDir, { autoescape: true });
  const htmlOutput = nunjucks.render(inputPath);

  writeFile(outputPath, htmlOutput, callback);
}

// Write to a new file or overwrite an existing one. Recursively creates all directories nessecary.
function writeFile(path, contents, cb) {
  fs.mkdir(getDirName(path), { recursive: true }, function (err) {
    if (err) return cb(err);

    fs.writeFile(path, contents, cb);
  });
}

// Copy a new file or overwrite an existing one. Recursively creates all directories nessecary.
function copyFile(input, output, cb) {
  fs.mkdir(getDirName(output), { recursive: true }, function (err) {
    if (err) return cb(err);

    fs.copyFile(input, output, (err) => {
      if (err) throw err;
      cb();
    });
  });
}

function log(event, input, output) {
  console.log("event", event);
  console.log("input", input);
  console.log("output", output);
}

function handleEvent(event, bs) {
  return new Promise((resolve, reject) => {
    if (event === "unlink") {
      bs.reload();
      reject("File deleted");
    } else {
      resolve();
    }
  });
}

// TODO
exports.build = () => {
  // render(nunjucksDir + "/index.njk", outputDir + "/index.html");
};

exports.startDevEnv = () => {
  const bs = require("browser-sync").create();
  bs.init({
    server: "./" + outputDir,
    open: false,
    files: [
      // Just refresh for templates
      nunjucksTemplates,
      // Copy everything that is not a .njk file
      {
        match: [inputDir + "/**/!(*.njk)"],
        fn: function (event, file) {
          const input = file;
          const output = file.replace(inputDir, outputDir);
          log(event, input, output);

          handleEvent(event, bs)
            .then(() => {
              copyFile(input, output, (error) => {
                if (error) console.error("Copy error", error);
                bs.reload();
              });
            })
            .catch((error) => console.error(error));
        },
      },
      // Render templates and save output (exclude templates)
      {
        match: [nunjucksViews, "!" + nunjucksTemplates],
        fn: function (event, file) {
          const input = file.replace(nunjucksDir + "/", "");
          const output = file.replace(nunjucksDir, outputDir).replace(".njk", ".html");
          log(event, input, output);

          handleEvent(event, bs)
            .then(() => {
              renderNunjucks(input, output, (error) => {
                if (error) console.error("Render error", error);
                bs.reload();
              });
            })
            .catch((error) => console.error(error));
        },
      },
    ],
  });
};
