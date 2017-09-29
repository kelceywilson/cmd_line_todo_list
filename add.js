const { readFromFile, writeToFile } = require('./fileio');

const add = (newTask) => {
  console.log(newTask);
  if (newTask !== '') {
    const taskList = readFromFile();
    taskList.tasks.push(newTask);
    writeToFile(taskList);
    console.log(`Created task ${taskList.tasks.length}`);
  } else {
    console.log('Missing task');
  }
};

module.exports.add = add;
