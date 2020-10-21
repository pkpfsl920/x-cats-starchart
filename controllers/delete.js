const { StarChartModel } = require('../models/chart');


// delete the Database Collection

const deleteData = (req, res) => 
{
    const resource = req.params.resource;

    dataModel = StarChartModel;

    console.log("delete.js - deleteData ...");

    console.log("DELETING DATA: ...", req.body);

    dataModel.findOneAndDelete({_id: req.params.id})
    //dataModel.findOneAndDelete({"5f7e5a1d7fed2262981674c9": req.params.id})

    //dataModel.findByIdAndRemove(req.params.id)
    //dataModel.findByIdAndDelete(req.params.id)
                    .then(result => 
                        {
                           res.status(200).json({data: result});
                        })
                    .catch(err => console.log("error: in deletData"));
};

// export the function so other modules can use it
module.exports = { deleteData };