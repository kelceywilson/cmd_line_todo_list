const list = (taskList) => {
  let idNumber = 1;
  console.log('\nID Description');
  console.log('-- -----------');
  taskList.tasks.forEach((task) => {
    console.log(`${idNumber}  ${task}`);
    idNumber += 1;
  });
  console.log(`\nYou have ${idNumber - 1} tasks\n`);
};

module.exports.list = list;
