const { readFromFile, writeToFile } = require('../fileio');

const complete = (taskNumber) => {
  const taskList = readFromFile();
  const taskListLength = taskList.tasks.length;
  if (parseInt(taskNumber, taskListLength) > taskListLength || parseInt(taskNumber) < 1){
    const task = taskList.tasks.splice(taskNumber - 1, 1).toString();
    taskList.completed.push(task);
    writeToFile(taskList);
    console.log(`Completed task ${taskNumber}: '${task}'`);
  } else {
    console.log('  No task by that number exists');
  }
};

module.exports = complete;
