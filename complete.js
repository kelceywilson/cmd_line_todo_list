const { readFromFile, writeToFile } = require('./fileio');

const complete = (taskNumber) => {
  const taskList = readFromFile();
  const taskListLength = taskList.tasks.length;
  console.log(taskNumber);
  if (parseInt(taskNumber) < 1 || parseInt(taskNumber) > taskListLength || taskNumber === NaN) {
    console.log('Missing or invalid id');
  } else {
    const task = taskList.tasks.splice(taskNumber - 1, 1).toString();
    taskList.completed.push(task);
    writeToFile(taskList);
    console.log(`Completed task ${taskNumber}: '${task}'`);
  }
};

module.exports.comp = complete;
