const klaw = require("klaw")
const { parse } = require("path")

const exploreFolders = path => {
  return new Promise(async (resolve, reject) => {
    const responseArray = []
    klaw(path, {})
      .on("data", item => {
        const name = parse(item.path).base
        const isDir = item.stats.isDirectory()
        responseArray.push({
          path: item.path,
          name,
          isDir,
        })
      })
      .on("end", () => resolve(responseArray))
      .on("error", err => reject(new Error(err)))
  })
}

module.exports = exploreFolders
