const { StarChartModel } = require('../models/chart');


// PUT to the Database Collections

const updateData = (req, res) => 
{
    dataModel = StarChartModel;

    console.log("UPDATING DATA: ...", req.body);

    //dataModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
    dataModel.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
                    .then(result => 
                        {
                           res.status(200).json({data: result});
                        });
};

// export the function so other modules can use it
module.exports = { updateData };