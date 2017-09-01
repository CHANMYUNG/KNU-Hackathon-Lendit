let Hole = require('../../database/models/hole');
let Agency = require('../../database/models/agency');
let Open = require('../../database/models/open');
let Apply = require('../../database/models/apply');

exports.deleteHole = (req, res) => {
    const hole = req.body.hole;
    Hole.findByIdAndRemove(hole)
        .then((_hole) => {
            res.status(200).end();
        })
        .catch((err) => {
            res.status(400).json({
                "message": err.message
            });
        })
}
exports.openHole = (req, res) => {

    const hole = req.body.hole;
    const openAt = req.body.openAt;
    const closeAt = req.body.closeAt;
    Hole.findById(hole)
        .then((_hole) => {
            if (!_hole) throw new Error('ERROR');
            return Open.create(hole, openAt, closeAt);
        })
        .then((open) => {

            let timeOut = new Date(open.closeAt) - new Date(open.createdAt);

            setTimeout(function () {
                Open.findByIdAndRemove(open._id);
            }, timeOut);

            res.status(200).end();
        })
        .catch((err) => {
            res.status(400).json({
                "message": err.message
            });
        })
}

exports.regiterHole = (req, res) => {

    const name = req.body.name;
    const explain = req.body.explain;
    const _agency = req.decoded._agency;
    const hwKey = req.body.hwKey;
    Hole.create(name, explain, hwKey)
        .then((_hole) => {
            return Agency.findOneAndUpdate({
                "_id": _agency
            }, {
                $push: {
                    holes: _hole
                }
            })
        })
        .then((result) => {
            console.log(result);
            res.sendStatus(201);
        })
        .catch((err) => {
            res.status(400).json({
                "message": err.message
            });
        })

}

exports.getHoles = (req, res) => {
    Hole.find({})
        .then((holes) => {
            res.status(200).json(holes);
        })
        .catch((err) => {
            res.status(500).json({
                "message": err.message
            });
        })
}

exports.getKNUHoles = (req, res) => {
    Agency.findOne({
            "name": "경북대학교"
        }).populate('holes')
        .then((agency) => {
            res.status(200).json(agency.holes);
        })
        .catch((err) => {
            res.status(500).json({
                "message": err.message
            });
        })
}