import models from '../models';

class LogicController{

    start(req, res){
      return res.status(200).send({
          success: 'true',
          message: 'hello world'
      });
    }
    
    getLogin(req, res, next){
        models.User.findAll({
            include: [{
                model: models.User
            }]
        })
    .then(login => res.status(200).send({
            succes: 'true',
            login
        }));
    }
    
    getLogs(req, res, next){
        models.Log.findAll({
            include: [{
                model: models.Logitem,
              //  where: {"key": key}
            }]
        })
        .then(logs => res.status(200).send({
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

    editLog(req, res){}
}

const logicController = new LogicController();
export default logicController;