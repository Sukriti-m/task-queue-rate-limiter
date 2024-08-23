const taskLine=require('../service/taskQueue');

function taskQueueHandler(req,res)
{
    const userId=req.body.userId;
    taskLine(userId);
    res.status(202).json({
        message:'Task received'
    });
}

module.exports=taskQueueHandler;