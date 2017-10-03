const { readFromFile, writeToFile } = require('./fileio');

const complete = (taskNumber) => {
  const taskList = readFromFile();
  const taskListLength = taskList.tasks.length;

  // this is debugging, should be removed in final product as it's not part of spec
  console.log(taskNumber);

  // bds: as mentioned in the tasks file, this is more of a job for the input
  // bds: parser (i.e. tasks) than for this function. Also, you can combine the
  // bds: duplicated code from this file and delete.js that way
  // bds: Also, what do you wish to catch with taskNumber === NaN ?
  // bds: That will only catch when taskNumber is literally NaN, not when
  // bds: taskNumber is, say, a string
  // bds: the expression ('hello' === NaN) evaluates to false
  // bds: Perhaps you meant parseInt(taskNumber) === NaN ?
  if (parseInt(taskNumber) < 1 || parseInt(taskNumber) > taskListLength || taskNumber === NaN) {
    console.log('Missing or invalid id');
  } else {
    const task = taskList.tasks.splice(taskNumber - 1, 1).toString();

    // bds: nice way to track completed tasks
    taskList.completed.push(task);
    writeToFile(taskList);
    console.log(`Completed task ${taskNumber}: '${task}'`);
  }
};

module.exports.comp = complete;
