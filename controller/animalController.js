const pool = require("../utils/database");
const AnimalModel = require("../model/animal");


module.exports.getAnimals = async(req, res) =>{
    const client = await pool.connect();
    const userId = req.session.userId;

    try{
        const animals = await AnimalModel.getAnimals(client,userId);
        res.json(animals);
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
    finally{
        client.release();  
    }
};

module.exports.postAnimal = async(req, res) =>{
    const client = await pool.connect();
    const userId = req.session.userId;
    const animal = req.body;

    try {
        await AnimalModel.createAnimal(client, animal, userId);
        res.sendStatus(201);
        
    } catch (error) {
        console.log(e);
        res.sendStatus(201);
        
    }finally{
        client.release(); 
    }
};

module.exports.deleteAnimal = async(req, res) =>{
    const client = await pool.connect();
    const animalId = req.params.id;
    const userId = req.session.userId;

    try{
        const rowCount = await AnimalModel.deleteAnimal(client, animalId,userId);
        if(rowCount != 0){
            res.sendStatus(200);
        }
        else{
            res.sendStatus(403);
        }
       
    }
    catch(e){
        console.log(e);
        res.sendStatus(500);
    }
    finally{
        client.release();  
    }

};