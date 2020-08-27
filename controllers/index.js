const dbConnection = require("../config/db");
const Students = require('../models/Students');
const Professors = require("../models/Professor");
const Classes = require("../models/Classes");
const Offices = require("../models/Offices");
const controller = {};

dbConnection.sync();

controller.registerStudent = async(req,res)=>{
    const student = {
        uid : req.body.matricula,
        name : req.body.name,
        last_name : req.body.last_name,
    };

    Students.create(student)
    .then(std =>{
        console.log("Student created");
        res.json({success:true, data:std});
    })
    .catch(err =>{
        console.log("Error to create > ", err);
        res.json({success:false, message:err});
    });
};


controller.getStudents = async(req,res) =>{
    await Students.findAll()
    .then(students=>{
        res.json({sucess:true, data:students});
    })
    .catch(err =>{
        res.json({sucess:false, message:err});
    });
};


controller.getProfessors = async(req,res)=>{
    await Professors.findAll()
    .then(professors=>{
        res.json({sucess:true, data:professors});
    })
    .catch(err=>{
        res.json({sucess:false, message:err});
    })
};



controller.registerProfesor = async(req,res)=>{
    const professor = {
        name : req.body.name,
        last_name : req.body.last_name,
    };

    Professors.create(professor)
    .then(pro =>{
        console.log("Professor created");
        res.json({success:true, data:pro});
    })
    .catch(err =>{
        console.log("Error to create > ", err);
        res.json({success:true, message:err});
    });
};


controller.registerClass = async(req,res)=>{
    const _class = {
        uid : req.body.name_class,
        fk_professor: req.body.idProf
    };

    Classes.create(_class)
    .then(cla =>{
        console.log("Class created");
        res.json({success:true, data:cla});
    })
    .catch(err =>{
        console.log("Error to create > ", err);
        res.json({success:true, message:err});
    });
};


controller.addStudentToClass = async(req,res)=>{
    const _class = await Classes.findOne({where:{uid:req.body.idClass}});
    const _student = await Students.findOne({where:{uid:req.body.idStudent}});
    _student.addClasses(_class)
    .then(rel =>{
        console.log("Registered succesfully");
        res.json({success:true, data:rel});
    })
    .catch(err =>{
        console.log("Error to create > ", err);
        res.json({success:true, message:err});
    });
};

controller.addOffice = async (req,res) =>{
    const office = {
        description: req.body.desc,
        fk_professor : req.body.idProf,
    };

    Offices.create(office)
    .then(office =>{
        res.json({success:true, data:office});
    })
    .catch(err =>{
        res.json({success:true, message:err});
    });
};

/**
 * This mehod asociate an office with a Professor
 */
controller.addOfficeTo = async (req,res) =>{
    const professor = await Professors.findOne({where:{id:req.body.idProf}});
    const office = await Offices.findOne({where:{id:req.body.idOff}});
    //  Method definied in the relation
    professor.setBelong(office)
    .then(off =>{
        res.json({success:true, data:off});
    })
    .catch(err =>{
        res.json({success:false, message:err});
    });
};


controller.getProffessorOfficess = async (req,res) =>{
    // Relations is definied in Proffessors Model
    await Professors.findAll(
       {
           include: ['Belong'],
       }
    )
    .then(off =>{
        res.json({success:true, data:off});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    });
};



module.exports = controller;