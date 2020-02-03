exports.parameterMissingResponse = (res) => {
    let response = {
        "message": "Some parameter missing.",
        "response": {}
    };
    res.status(422).json(response);
};

exports.authenticationErrorResponse = (res) => {
    var response = {
        "message": "Invalid access token.",
        "response": {}
    };
    res.status(401).json(response);
};

exports.sendError = (error, res) => {
    res.status(400).json({ error })
};
