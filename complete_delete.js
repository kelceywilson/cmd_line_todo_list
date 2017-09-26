const fs = require('fs');

const completeDelete = (taskList, taskNumber) => {
  const task = taskList.completed.splice(taskNumber - 1, 1).toString();
  console.log(task);
  taskList.completed.pop(task);
  fs.writeFileSync('taskList.json', JSON.stringify(taskList));
  console.log(`Deleted completed task ${taskNumber}: '${task}'`);
};

module.exports.completeDelete = completeDelete;
