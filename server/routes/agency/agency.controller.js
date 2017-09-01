let Agency = require('../../database/models/agency');

exports.getAgencies = (req, res) => {
    Agency.find({}).populate(["holes","_admin"])
        .then((agencies) => {
            res.status(200).json(agencies);
        })
        .catch((err) => {
            res.status(500).json({
                "message": err.message
            });
        })
}