const { readFromFile, writeToFile } = require('./fileio');

const del = (taskNumber) => {
  const taskList = readFromFile();
  const taskListLength = taskList.tasks.length;
  console.log(taskNumber);
  if (parseInt(taskNumber) < 1 || parseInt(taskNumber) > taskListLength || taskNumber === NaN) {
    console.log('Missing or invalid id');
  } else {
    const deleted = taskList.tasks[taskNumber - 1];
    taskList.tasks.splice(taskNumber - 1, 1);
    writeToFile(taskList);
    console.log(`Deleted task ${taskNumber}: ${deleted}`);
  }
};

module.exports.del = del;
