let Apply = require('../../database/models/apply');

exports.getApplies = (req, res) => {
    const _hole = req.params.hole;


    Apply.find({
            _hole
        }).populate('_user')
        .then((applies) => {
            res.status(200).json(applies);
        })
        .catch((err) => {
            res.status(500).json({
                "message": err.message
            });
        })
}
