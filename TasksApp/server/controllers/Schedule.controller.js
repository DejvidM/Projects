const Schedule = require('../models/Schedule.model')
const User = require('../models/User.model')

module.exports.CreateSchedule = (req , res ) => {
    User.findOne({_id : req.body.creator})
        .then( user => {
            Schedule.create(req.body)
                .then(  newPlan => { 
                        user.agenda.push(newPlan._id) ; 
                        res.json(newPlan) ; 
                        user.save({validateBeforeSave : false}) 
                    })
                .catch(err => res.status(400).json(err))
        })
        .catch(err => res.json(err))
}

module.exports.findAllPlans = (req , res) => {
    Schedule.find()
        .then( allPlans => res.json(allPlans))
        .catch(err => res.json(err))
}

module.exports.deletePlan = (req , res ) => {
    Schedule.deleteOne({_id : req.params._id})
        .then( deletedOne => res.json(deletedOne))
        .catch(err => res.json(err))
}

module.exports.findOnePlan =async (req , res ) => {
    await Schedule.findOne({_id : req.params._id})
        .then( one => res.json(one))
        .catch(err => res.json(err))
}
