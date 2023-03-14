const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Dog, Temperaments} = require('../db');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async()=>{
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds');
    const apiInfo = await apiUrl.data.map(el =>{
        return{
            id: el.id,
            image: el.image.url,
            name: el.name,
            temperaments: el.temperament,
            weight: el.weight.metric
        }
    });
    return apiInfo;
};

const getDbInfo = async ()=>{
    return await Dog.findAll({
        include:{
            model: Temperaments,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });
}

const getAllDogs = async ()=>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

router.get('/dogs', async (req, res)=>{
    const name = req.query.name;
    let dogsTotal = await getAllDogs();

    if(name){
        let dogName = await dogsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
            dogName.length ?
            res.status(200).send(dogName):
            res.status(404).send('The Dog does not exist')
    }else{
        res.status(200).send(dogsTotal);
    }

});

router.get('/temperaments', async(req, res)=>{
    const temperamentsApi = await axios.get('https://api.thedogapi.com/v1/breeds');
    const temperaments = temperamentsApi.data.map(el=> {
        if (el.temperament) {
            return (el.temperament.split(', '));
            
        } else {
            return ['Unknow Temperament'];
        }
    });

    const eachTemperaments= temperaments.map(el => {
        for (let i = 0; i < el.length; i++) {
            return el[i];
            
        }
    })
    console.log(eachTemperaments);
    eachTemperaments.forEach(el => {
        Temperaments.findOrCreate({
            where: {name: el}
        })
        
    });

    const allTemperaments = await Temperaments.findAll();
    res.send(allTemperaments); 


    
});

router.post('/dogs', async (req, res) =>{
    let {
        image,
        name,
        height,
        weight,
        yearsoflife,
        createdInDb,
        temperament
    } = req.body;

    let newDog = await Dog.create({
        image,
        name,
        height,
        weight,
        yearsoflife,
        createdInDb,
    })

    let temperamentDb = await Temperaments.findAll({
        where: {name: temperament}
    });

    newDog.addTemperaments(temperamentDb);
    res.send("Dog add");


});

router.get('/dogs/:id', async (req, res)=>{
    const id = req.params.id;
    const allDogs = await getAllDogs();
    if (id){
        let dogId = await allDogs.filter(el => el.id ===Number(id));
        dogId.length?
        res.status(200).json(dogId):
        res.status(404).send('Id does not exist')
    } 

});

module.exports = router;
