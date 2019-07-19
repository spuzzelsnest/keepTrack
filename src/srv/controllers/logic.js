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
                model: models.Logitem ,
                attributes: ['id', 'startAt', 'breakOut', 'breakIn', 'endAt','logId'],
                required: true
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
                model: models.Logitem ,
                attributes: ['id', 'startAt', 'breakOut', 'breakIn', 'endAt','logId'],
                required: true
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
    
    createLog(req, res){
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
        
         models.Log.findOrCreate({
            where: {
                day: req.body.day,
                userId: req.body.userId}
         })
            .spread((log, created)=>{
                console.log(created);
                return res.status(200).send({ log });
            })
    }
    
    createTimelog(req, res){
        if (!req.body.logId){
            return res.status(400).send({
                success: 'false',
                message: 'logId is required',
            });
        }
        const logitem ={
            logId: req.body.logId,
            startedAt: req.body.startedAt
        };
        models.Logitem.findOrCreate({
            where: {
            logId: req.body.logId}
        })
        .spread(function(logitem, created){
                console.log(logitem.get({
                    plain: true
                }));
                console.log(created)
            })
    }

    updateTimelog(req, res, next){
        models.Log.find(
            { where:{ id: req.params.logid}}
        )
    }
}

const logicController = new LogicController();
export default logicController;