const cluster=require('cluster');
const express=require('express');
const rateLimit=require('./middleware/rateLimit');
const taskQueueHandler= require('./controller/taskController');

if(cluster.isMaster)
{
    const numCPUs=2;
    for(let i=0;i<numCPUs;i++)
    {
        cluster.fork();
    }
cluster.on('exit',(worker)=>{
    console.log(`Worker ${worker.process.pid} died, starting a new one.`);
        cluster.fork();

});

}
else{
    const app=express();
    app.use(express.json());
    app.get('/api/v1/task', (req,res)=>{
        console.log("Server running successfully");
        
    });
    app.post('/api/v1/task',  rateLimit, taskQueueHandler);

    app.listen(3000,()=>{
        console.log(`Worker ${process.pid} started and listening on port 3000`);
 
    })
}
