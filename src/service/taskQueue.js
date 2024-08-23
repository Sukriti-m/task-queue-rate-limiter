const Queue = require('bull');
const task = require('../task');  

const taskQueue = new Queue('tasks', {
    redis: { port: 6380, host: '127.0.0.1' }
});

function taskLine(userId) {
    taskQueue.add({ userId: userId });
}

taskQueue.process(async (job) => {
    const { userId } = job.data;
    console.log(`Processing task for user: ${userId} at ${Date.now()}`);
    await task(userId);
});

module.exports = taskLine;
