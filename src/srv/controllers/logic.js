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
        let fetshedPosts;
        const pageSize = +req.query.pagesize;
        const currentPage = +req.query.page;
        const offset = (pageSize * (currentPage - 1));
        const limit = offset + pageSize;
     
        models.Log.findAndCountAll({
            include: [{
                model: models.Logitem ,
                attributes: ['id', 'startAt', 'breakOut', 'breakIn', 'endAt','logId'],
                required: true
            },
                      {
                model: models.User
            }],
            limit,
            offset,
            where: {'$User.key$': req.params.key},
            order: [['day', 'DESC'],]
        })
        .then(logs => {
            fetshedPosts = logs;
        }).then(count => {
            res.status(200).send({
            fetshedPosts
        })});
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
                console.log('Log created: '+created);
                return res.status(200).send({ log });
            })
    }
    
    createStartlog(req, res){
        if (!req.body.logId){
            return res.status(400).send({
                success: 'false',
                message: 'logId is required',
            });
        }
        const logitem ={
            logId: req.body.logId,
            startAt: req.body.startAt
        };
       
        models.Logitem.findOrCreate({
            where: {
                logId: req.body.logId},
            defaults: {startAt: req.body.startAt}})
        .spread(function(logitem, created){
            //console.log('StartTime created: '+created);
            return res.status(200).send({ logitem });
        })
    }

    updateTimelog(req, res, next){

        models.Logitem.findOne({
            where:{logId: req.params.logid}
        })
        .then(timelog =>{
            return timelog.update(req.body);
        })
        .then(updatedTimelog =>{
            res.json(updatedTimelog);
        });
    }
}

const logicController = new LogicController();
export default logicController;