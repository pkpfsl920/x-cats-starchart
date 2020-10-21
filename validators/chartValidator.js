

exports.modelValidator = (req, res, next) => {
    const resource = req.params.resource;

    if ((resource == 'StarChart'))
    {
        // firstname
        req.check('firstname', "firstname Missing!!! Fill in a Name").notEmpty();
        req.check('firstname', "firstname must be between 1 & 150 characters").isLength({
            min: 1,
            max: 150 });

        // lastname
        req.check('lastname', "lastname Missing!!! Fill in a lastname").notEmpty();
        req.check('lastname', "lastname must be between 1 & 150 characters").isLength({
            min: 1,
            max: 150 });

        // hours
        req.check('hours', "hours Missing!!! Fill in the hours").notEmpty();
        req.check('hours', "hours must be between 1 & 5 characters").isLength({
            min: 1,
            max: 5 });
        
        // targetVarsityHours
        req.check('targetVarsityHours', "targetVarsityHours Missing!!! Fill in the hours").notEmpty();
        req.check('targetVarsityHours', "targetVarsityHours must be between 1 & 5 characters").isLength({
            min: 1,
            max: 5 });
    
    }


    // check for errors
    const errors = req.validationErrors();
    // if error then show the first one as they happen
    if (errors) 
    {
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({ error: firstError });
    };

    // proceed to next middleware
    next();
}

