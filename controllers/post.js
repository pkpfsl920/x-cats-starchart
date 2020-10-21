const { StarChartModel } = require('../models/chart');
const { PermitModel } = require('../models/permit');


// POST to the Database Collections

const createData = (req, res) => 
{
    const resource = req.params.resource;

    
    if (resource == 'StarChart')
    {
      console.log("resource == StarChart: ..."/*, req.body*/);
      dataModel = new StarChartModel(req.body);
    }
    else    //Certify
    {
      console.log("resource == Certify: ..."/*, req.body*/);
      dataModel = new PermitModel(req.body);
    }

    //dataModel = new StarChartModel(req.body);

    console.log("POSTING DATA: ..."/*, req.body*/);

    //      dataModel.create(req.body).then(result => 
    dataModel.save().then(result => 
          {
              res.status(200).json({data: result});
          });
};

// export the function so other modules can use it
module.exports = { createData };
