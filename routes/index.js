
const express = require('express');
const router = express.Router();


// controller
const controller = require('../controllers/index');

router.post('/register-student', controller.registerStudent);
router.post('/register-professor',controller.registerProfesor);
router.post('/register-class',controller.registerClass);
router.post('/addtoclass',controller.addStudentToClass);
router.post('/register-office', controller.addOffice);
router.post('/addofficeto',controller.addOfficeTo);
router.get('/offices-proffessors',controller.getProffessorOfficess);
router.get('/students',controller.getStudents);
router.get('/professors',controller.getProfessors);

module.exports = router;