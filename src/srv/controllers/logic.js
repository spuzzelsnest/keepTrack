import models from '../models';

class LogicController{

    start(req, res){
      return res.status(200).send({
          success: 'true',
          message: 'hello world'
      });
    }
    getUser(req, res){}
    getAllLogs(req, res, next){
        models.Log.findAll()
        .then(logs => res.status(200).send({
            success: 'true',
            message: 'All logs',
            logs,
        }));
    }
    getLog(req, res){}
}

const logicController = new LogicController();
export default logicController;