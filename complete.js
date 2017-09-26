const fs = require('fs');

const complete = (taskList, taskNumber) => {
  const task = taskList.tasks.splice(taskNumber - 1, 1).toString();
  console.log(task);
  taskList.completed.push(task);
  fs.writeFileSync('taskList.json', JSON.stringify(taskList));
  console.log(`Completed task ${taskNumber}: '${task}'`);
};

module.exports.complete = complete;
