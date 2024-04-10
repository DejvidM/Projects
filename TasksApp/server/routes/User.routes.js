const Users = require('../controllers/User.controller');
const Schedule = require('../controllers/Schedule.controller')
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post("/api/register", Users.Register);
    app.post("/api/login", Users.Login); 
    app.get('/api/logout' ,authenticate , Users.Logout)
    app.get('/api/users' , authenticate , Users.getAll)
    app.get('/api/oneUser/:email' , authenticate , Users.getOne)
    
    app.post('/api/createSchedule' , authenticate , Schedule.CreateSchedule)
    app.get('/api/findSchedules' , authenticate , Schedule.findAllPlans)
    app.delete('/api/delete/:_id' , authenticate , Schedule.deletePlan)
    app.get('/api/oneschedule/:_id' , authenticate , Schedule.findOnePlan)
}