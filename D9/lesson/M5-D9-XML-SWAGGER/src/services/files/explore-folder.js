const klaw = require("klaw")

const items = []

const explore = path =>
  new Promise((resolve, reject) => {
    klaw(path)
      .on("data", item => {
        console.log(item.path)
        items.push(item.path)
      })
      .on("end", () => resolve(items))
      .on("error", error => reject(error))
  })

// try {
//   const myItems = await explore('../files')

// } catch (error) {
//   console.log(error)
// }

// explore('../files').then(
//   myItems => console.log(myItems)
// ).catch(error => console.log(error))

module.exports = explore
