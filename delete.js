const fs = require('fs');

const del = (taskList, taskNumber) => {
  console.log(taskNumber);
  taskList.tasks.splice(taskNumber, 1);
  fs.writeFileSync('taskList.json', JSON.stringify(taskList));
  console.log(`Deleted task ${taskNumber}`);
};

module.exports.del = del;
