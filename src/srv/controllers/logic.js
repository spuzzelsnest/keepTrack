import models from '../models';

class LogicController{

    start(req, res){
      return res.status(200).send({
            success: 'true',
            message: 'lets Go!',
      });
    }
    
    getLogin(req, res, next){
        
        if (!req.params.key){
            return res.status(404).send({
                success: 'false',
                message: 'Key is required',
            });
        }else{
        models.User.findOne({
             where: {key: req.params.key},
        })
            .then(userLogin => res.status(200).send({
                success: 'true',
                message: `Key found =${userLogin.key}`,
                userLogin
            }));
        }
    }
    
    getLogs(req, res, next){
        
        models.Log.findAll({
            include: [{
                model: models.Logitem
            },{
                model: models.User
            }],
             where: {'$User.key$': req.params.key},
        })
        .then(logs => res.status(200).send({
            logs,
        }));
    }
    
    getLog(req, res, next){
        models.Log.findOne({
            include: [{
                model: models.Logitem
            },{
                model: models.User
            }],
             where: {
                '$User.key$': req.params.key,
                id: req.params.logid
        }})
        .then(timelog => res.status(200).send({
            timelog,
    
        }));
    }
    
    userDate(req, res, next){
        
        models.Log.findOne({
            include: [{
                model: models.Logitem
            },{
                model: models.User
            }],
             where: {
                '$User.key$': req.params.key,
            
            }
        })
        .then(date => res.status(200).send({
                success: 'true',
                message: `Key found =${date.day}`,
                date
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
            startAt: req.body.startAt,
            breakOut: req.body.breakOut,
            breakIn: req.body.breakIn,
            endAt: req.body.endAt,
        };
        models.Log.create(log).then((log)=>{
            return res.status(201).send({
                succes: 'true',
                message: 'Log added succesfully',
                timelog,
            });
        });
    }

    editLog(req, res, next){
        models.Log.find(
            { where:{ id: req.params.logid}}
        )
    }
}

const logicController = new LogicController();
export default logicController;