class LogicController{

    start(req, res){
      return res.status(200).send({
          success: 'true',
          message: 'hello world'
      });
    }
}

const logicController = new LogicController();
export default logicController;