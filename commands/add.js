const { readFromFile, writeToFile } = require('../fileio');

const add = (newTask) => {
  const taskList = readFromFile();
  taskList.tasks.push(newTask);
  writeToFile(taskList);

    // bds: what happens to the task number if a task is deleted?
    // bds: note the spec -- it wants task IDs to remain constant even after
    // bds: tasks are completed/deleted. This won't take care of that.
    // bds: Just a gentle reminder: paying careful attention to specs is going to be
    // bds: very important in the phase interview (and as a software engineer :-) )
  console.log(`Created task ${taskList.tasks.length}`);
};

module.exports = add;
