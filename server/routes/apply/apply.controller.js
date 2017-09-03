let Apply = require('../../database/models/apply');
let Open = require('../../database/models/open');
let Accepted = require('../../database/models/accepted');

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


exports.acceptApply = (req, res) => {

    const apply = req.params.apply;

    Apply.findById(apply)
        .then((apply) => {
            return Accepted.create(apply._user, apply._hole, apply.startAt, apply.endAt)
        })
        .then(() => {
            res.status(200).end();
        })
        .catch((err) => {
            res.status(500).json({
                "message": err.message
            });
        });

}


exports.apply = (req, res) => {
    const purpose = req.body.purpose;
    const startAt = req.body.startAt;
    const endAt = req.body.endAt;
    const _hole = req.body.hole;

    Open.findOne({
            _hole,
            "openAt": {
                "$lte": startAt, // lower than
            },
            "closeAt": {
                "$gte": endAt // greater than or equal
            }
        })
        .then((open) => {
            if (!open) throw new Error('400'); // 그런 오픈 없다.

            return Apply.create(req.decoded._id, _hole, purpose, startAt, endAt);
        })
        .then((apply) => {
            let timeOut = new Date(apply.endAt) - new Date(apply.startAt);

            setTimeout(function () {
                Apply.findByIdAndRemove(apply._id);
            }, timeOut);

            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(err.message);
            if (err.message === '400') res.sendStatus(400);
            else res.sendStatus(500);
        })
}

exports.getApplyHistory = (req, res) => {
    const _id = req.decoded._id;

    Apply.find({
            "_user": _id
        })
        .then((applies) => {
            res.status(200).json(applies);
        })
        .catch((err) => {
            res.status(500).json({
                "message": err.message
            });
        })
}