const fs = require('fs');

const add = (taskList, newTask) => {
  taskList.tasks.push(newTask);
  fs.writeFileSync('taskList.json', JSON.stringify(taskList));
  console.log(`Created task ${taskList.tasks.length}`);
};

module.exports.add = add;
