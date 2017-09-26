// const expect = require('chai').expect;
// const { describe, it } = require('mocha');
const { expect } = require('chai');
const { exec } = require('child_process');
const fs = require('fs');


let taskList;

// sanity check
describe('Mocha', () => {
  it('should run our tests using npm', () => {
    expect(true).to.be.ok;
  });
});

// test suite covering invalid commands
describe('usage message for invalid commands', () => {
  // test specs (unit tests)
  it('displays error msg for missing command', (done) => {
    exec('./tasks', (err, stdout, stderr) => {
      expect(stdout).to.include('Missing or invalid command');
      // done has to run before it can move on to next test
      done();
    });
  });
  it('displays error for invalid command', (done) => {
    exec('./tasks blah', (err, stdout, stderr) => {
      expect(stdout).to.include('Missing or invalid command');
      done();
    });
  });
  it('displays error for missing task', (done) => {
    exec('./tasks add', (err, stdout, stderr) => {
      expect(stdout).to.include('Missing task');
      done();
    });
  });
  it('displays error for missing or invalid id', (done) => {
    exec('./tasks delete', (err, stdout, stderr) => {
      expect(stdout).to.include('Missing or invalid id');
      done();
    });
  });
});

// test suite covering functions
describe('usage message for valid commands', () => {
  it('displays success message when task added', (done) => {
    exec('./tasks add "test"', (err, stdout, stderr) => {
      expect(stdout).to.include('Created task');
      // done has to run before it can move on to next test
      done();
    });
  });
  it('displays success message when task deleted', (done) => {
    taskList = fs.readFileSync('./taskList.json', 'utf8');
    taskList = JSON.parse(taskList);
    // console.log(taskList);
    exec(`./tasks delete ${taskList.tasks.length}`, (err, stdout, stderr) => {
      expect(stdout).to.include('Deleted task');
      // done has to run before it can move on to next test
      done();
    });
  });
  it('displays success message when task completed', (done) => {
    exec('./tasks add "test"', (err, stdout, stderr) => {
      // expect(stdout).to.include('Created task');
      // done has to run before it can move on to next test
      done();
      taskList = fs.readFileSync('./taskList.json', 'utf8');
      taskList = JSON.parse(taskList);
      // console.log(`./tasks complete ${taskList.tasks.length}`);
      exec(`./tasks complete ${taskList.tasks.length}`, (err, stdout, stderr) => {
        expect(stdout).to.include('Completed task');
        // done has to run before it can move on to next test
        done();
        taskList = fs.readFileSync('./taskList.json', 'utf8');
        taskList = JSON.parse(taskList);
        exec(`./tasks completeDelete ${taskList.completed.length}`, (err, stdout, stderr) => {
          expect(stdout).to.include('Deleted completed task');
          // done has to run before it can move on to next test
          done();
        });
      });
    });
  });
  // it('deletes the completed test task', (done) => {
  //   taskList = fs.readFileSync('./taskList.json', 'utf8');
  //   taskList = JSON.parse(taskList);
  //   exec(`./tasks completeDelete ${taskList.completed.length}`, (err, stdout, stderr) => {
  //     expect(stdout).to.include('Deleted completed task');
  //     // done has to run before it can move on to next test
  //     done();
  //   });
  // });
});
