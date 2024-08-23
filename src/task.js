const fs=require('fs');
const path=require('path');

async function task(userId) {
    const logMessage = `${userId} : Task completed at ${Date.now()}`;
    console.log(logMessage); 

    fs.appendFileSync(path.join(__dirname, 'log','task.log'), logMessage 
    + '\n', (err) => {
        if (err) throw err;
}
);
}
module.exports=task;