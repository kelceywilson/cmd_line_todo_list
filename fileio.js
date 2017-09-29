const fs = require('fs');

// assigns taskFile to testTaskList.json if testing using npm test
//  - see package.json script setting enviroment variable
const taskFile = process.env.NODE_ENV || './taskList.json';
// reads json taskFile and converts to JS object
const readFromFile = () => JSON.parse(fs.readFileSync(taskFile, 'utf8'));
// creates new json file
const initializeFile = () => fs.writeFileSync(taskFile, '{"tasks": [], "completed": []}');
// overwrites current taskFile contents with new json taskList
const writeToFile = taskList => fs.writeFileSync(taskFile, JSON.stringify(taskList));
// creates new taskFile if the file doesn't exist
const createFileIfNeeded = () => {
  try {
    readFromFile();
  } catch (err) {
    if (err instanceof Error) {
      initializeFile();
    }
  }
};
createFileIfNeeded();

module.exports = {
  createFileIfNeeded,
  initializeFile,
  readFromFile,
  writeToFile,
  taskFile,
};
