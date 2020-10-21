const { StarChartModel } = require('../models/chart');
const { PermitModel } = require('../models/permit');


// GET from the Database Collections

const readAllData = (req, res) =>
{
    const resource = req.params.resource;

    console.log("get.js - readAllData : resource =  " + resource);
    console.log("get.js - readAllData");
    console.log("req.params.id =  " + req.params.id);

    if (req.params.id === "StarChart")
    {
      console.log("req.params.id = NULL " )
    }
    else
    {
      console.log("req.params.id =  " + req.params.id)
    }
    
    if (resource == 'StarChart')
    {
      console.log("resource == StarChart: ..."/*, req.body*/);
      dataModel = StarChartModel;
    }
    else    //Certify
    {
      console.log("resource == Certify: ..."/*, req.body*/);
      dataModel = PermitModel;
    }

    //dataModel = StarChartModel;

    // get all the group data from the database
    dataModel.find()
        // you can select the fields you want; 
        // if select is ommitted then you will get all fields
        //.select("id firstname lastname teamname conference") 
        //.then( groupData => { res.status(200).json({data: groupData}) })
        .then( groupData => { 
                               res.status(200).json({data: groupData});
                               console.log("Got ...  " + groupData) 
                            })

        .catch(err => console.log(err));
};


const readData = (req, res) =>
{
    const resource = req.params.resource;

    console.log("get.js - readData : resource =  " + resource);
    console.log("get.js - readData : req.params.id =  " + req.params.id);
    
    if ( (resource == 'StarChart') ||
          (req.params.id === "StarChart") )
    {
      console.log("get.js - readData : resource == StarChart: ..."/*, req.body*/);
      dataModel = StarChartModel;
    }
    else    //  == Certify
    {
      console.log("get.js - readData : resource == Certify: ..."/*, req.body*/);
      dataModel = PermitModel;
    }

    //dataModel = StarChartModel;

    if ( (req.params.id === "StarChart") || 
          (resource === "Certify") )
    {
      console.log("get.js - readData : req.params.id = NULL " )

          // get all the group data from the database
      dataModel.find()
      // you can select the fields you want; 
      // if select is ommitted then you will get all fields
      //.select("id firstname lastname teamname conference") 
      //.then( groupData => { res.status(200).json({data: groupData}) })
      .then( groupData => { 
                           res.status(200).json({data: groupData});
                           console.log("Got ...  " + groupData) 
                        })

      .catch(err => console.log(err));
    }
    else
    {
      console.log("get.js - readData : req.params.id =  " + req.params.id)
      
      // get all the group data from the database
      dataModel.findOne({_id: req.params.id})
      // you can select the fields you want; 
      // if select is ommitted then you will get all fields
      //.select("id firstname lastname teamname conference") 
      .then( groupData => { 
                          res.status(200).json({data: groupData});
                          console.log("Got One ...  " + groupData) 
                        })
      .catch(err => console.log(err));
    }

   /*
    // get all the group data from the database
    dataModel.findOne({_id: req.params.id})
        // you can select the fields you want; 
        // if select is ommitted then you will get all fields
        .select("id firstname lastname teamname conference") 
        .then( groupData => { 
                              res.status(200).json({data: groupData}) 
                            })
        .catch(err => console.log(err));
   */
};

// export the function so other modules can use it
module.exports = { readData, readAllData };


