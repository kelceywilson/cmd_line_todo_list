const fs = require('fs');

const add = (taskList, newTask) => {
  if (newTask !== undefined) {
    taskList.tasks.push(newTask);
    fs.writeFileSync('taskList.json', JSON.stringify(taskList));
    console.log(`Created task ${taskList.tasks.length}`);
  } else {
    console.log('Missing task');
  }
};

module.exports.add = add;
