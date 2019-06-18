import models from '../models';

class LogicController{

    start(req, res){
      return res.status(200).send({
          success: 'true',
          message: 'hello world'
      });
    }
    getUser(req, res, next){}
    getAllLogs(req, res, next){
        models.Log.findAll()
        .then(logs => res.status(200).send({
            success: 'true',
            message: 'All logs',
            logs,
        }));
    }
    addLog(req, res){
        if (!req.body.day){
            return res.status(400).send({
                success: 'false',
                message: 'day is required',
            });
        }
        const log = {
            day: req.body.day,
            userId: req.body.userId,
        };
        models.Log.create(log).then((log)=>{
            return res.status(201).send({
                succes: 'true',
                message: 'Log added succesfully',
                log,
            });
        });
    }
    getLog(req, res){}
}

const logicController = new LogicController();
export default logicController;