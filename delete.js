const fs = require('fs');

const del = (taskList, taskNumber) => {
  if (taskNumber !== undefined) {
    if (taskNumber < taskList.tasks.length) {
      const deleted = taskList.tasks[taskNumber - 1];
      taskList.tasks.splice(taskNumber - 1, 1);
      fs.writeFileSync('taskList.json', JSON.stringify(taskList));
      console.log(`Deleted task ${taskNumber}: ${deleted}`);
    } else {
      console.log('Missing or invalid id');
    }
  } else {
    console.log('Missing or invalid id');
  }
};

module.exports.del = del;
