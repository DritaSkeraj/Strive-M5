const { readJSON, writeJSON } = require("fs-extra")
const { join } = require("path")

const booksPath = join(__dirname, "./services/books/books.json")
const usersPath = join(__dirname, "./services/users/users.json")

const readDB = async filePath => {
  try {
    const fileJson = await readJSON(filePath)
    return fileJson
  } catch (error) {
    throw new Error(error)
  }
}

const writeDB = async (filePath, fileContent) => {
  try {
    await writeJSON(filePath, fileContent)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  getBooks: async () => readDB(booksPath),
  writeBooks: async booksData => writeDB(booksPath, booksData),
  getUsers: async () => readDB(usersPath),
  writeUsers: async usersData => writeDB(usersPath, usersData),
}
