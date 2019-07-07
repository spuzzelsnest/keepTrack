import models from '../models';

class LogicController{

    start(req, res){
      return;
    }
    
    getLogin(req, res, next){
        if (!req.params.key){
            return res.status(400).send({
                success: 'false',
                message: 'Key is required',
            });
        }else{
        models.User.findOne({
             where: {key: req.params.key},
        })
            .then(userLogin => res.status(200).send({
                succes: 'true',
                message: `Key found =${userLogin.key}`,
                userLogin
            }));
        }
    }
    
    getLogs(req, res, next){
        
        models.Log.findAll({
            include: [{
                model: models.Logitem,
                model: models.User
            }],
             where: {'$User.key$': req.params.key},
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