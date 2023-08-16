require('dotenv').config();
const express = require('express')
const mongoose = require ('mongoose')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path');
const app = express()
const cors = require('cors');
//Cinfig JSON response
app.use(express.json())
app.use(cors());


//Models
const Cuidador = require ('./models/Cuidador')

const User = require('./models/User')


app.get('/', (req, res) => {
    res.status(200).json({ msg: "teste rota get"})
})


// Private Route 
app.get('/user/:id', checkToken, async (req, res)=>{

    try {
        const id = req.params.id;

        //check if user exists
        const user = await User.findById(id, '-password')

        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }

        res.status(200).json({user})
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Erro ao buscar usuário' });
    }
})

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ msg: 'Acesso negado' });
    }
  
    try {
      const secret = process.env.SECRET;
      jwt.verify(token, secret);
      next();
    } catch (error) {
      res.status(400).json({ msg: 'Token inválido' });
    }
  }
  


app.post(`/auth/register`, async( req, res ) =>{
    
    const{name, email, password, confirmPassword, cpf, dateOfBirth, phone}= req.body

    //validacoes
    if(!name){
        return res.status(422).json({ msg: 'o nome é obrigatorio'})
    }
    if(!email){
        return res.status(422).json({ msg: 'o email é obrigatorio'})
    }
    if(!password){
        return res.status(422).json({ msg: 'o senha é obrigatorio'})
    }

    if(password != confirmPassword){
        return res.status(422).json({msg: 'As senhas não conferem'})
    }

    if(!cpf ){
        return res.status(422).json({ msg: 'o CPF é obrigatorio'})
    }
    if(!dateOfBirth){
        return res.status(422).json({ msg: 'a data de nascimento é obrigatoria'})
    }
    if(!phone){
        return res.status(422).json({ msg: 'o telefone é obrigatorio'})
    }

    //check if user exists 
    const userExists = await User.findOne({ email: email})
    if(userExists){
        return res.status(422).json({msg: 'Por favor use outro e-mail'})
    }

    //create password 
    const salt = await bcrypt.genSalt(12)
    const passowrdHash = await bcrypt.hash(password, salt)

    //creat user 
    const user = new User({
        name, 
        email, 
        password: passowrdHash,
        cpf,
        dateOfBirth,
        phone,
    })

    try{

        await user.save()
        res
            .status(201)
            .json({
                msg: 'Usuario criado com sucesso'
            })

    }catch(error){
        console.log(error)
        res
            .status(500)
            .json({
                msg: 'Aconteceu um erro no servidor'
            })
    }
})




app.post("/auth/login", async (req, res) =>{

    const {email, password} = req.body

    console.log(email, password)

     //validacoes
    if(!email){
        return res.status(422).json({ msg: 'o email é obrigatorio'})
    }
    if(!password){
        return res.status(422).json({ msg: 'o senha é obrigatorio'})
    }

   // Check if user exists in "User" model
   const user = await User.findOne({ email: email });
   // Check if user exists in "Cuidador" model
   const cuidador = await Cuidador.findOne({ email: email });
    console.log(user, cuidador)
   if (!user && !cuidador) {
     return res.status(404).json({ msg: 'email não encontrado' });
   }

   // Check if password matches for the corresponding user/cuidador
   const model = user || cuidador;
   const checkPassword = await bcrypt.compare(password, model.password);

   if (!checkPassword) {
     return res.status(422).json({ msg: 'A senha é inválida' });
   }

   console.log(model)

    try{

        const secret = process.env.SECRET 
        const token = jwt.sign(
            {
                id: model._id,
            },

            secret, 
        )
        console.log('autenticacao com sucesso console')


        res.status(200).json({ msg : "Autenticacao efetuada com sucesso", token})

    }catch(error){
        console.log(error)
        res
            .status(500)
            .json({
                msg: 'Aconteceu um erro no servidor'
            })
    }
    

})
app.use('/backend/uploads', express.static(path.join(__dirname, 'uploads')));
const CuidadorHome = require('./models/Cuidador'); 

app.get('/home', async (req, res) => {
    try {
      const cuidadores = await CuidadorHome.aggregate([{ $sample: { size: 6 } }]);
      const cuidadoresFormatados = cuidadores.map(cuidador => {
        return {
            _id: cuidador._id,
            src: cuidador.src.map(imageUrl => `http://localhost:3000/backend/${imageUrl}`), // Corrija a URL das imagens    
            nameOrganization: cuidador.nameOrganization,
            address: cuidador.address,
            numberHome : cuidador.numberHome,
            city: cuidador.city, 
            state: cuidador.state,
            phone: cuidador.phone,
            animalTypes: cuidador.animalTypes,
            servicesIncluded: cuidador.servicesIncluded
        };
      });
      
      res.json(cuidadoresFormatados);
    } catch (error) {
      console.error('Erro ao buscar cuidadores aleatórios:', error);
      res.status(500).json({ error: 'Erro ao buscar cuidadores aleatórios' });
    }
  });
  



  
const cuidadorRouter = require ("./routes/cuidador");
app.use("/cuidador", cuidadorRouter);

app.get('/search/:query', async (req, res) => {
    const { query } = req.params;
    console.log(query)
    try {
      const cuidadoresDisponiveis = await Cuidador.aggregate([
        {
          $match: {
            $or: [
              { city: query },
              {
                city: {
                  $regex: `^${query}$`,
                  $options: 'i'
                }
              },
              {
                city: {
                  $regex: `^${query.slice(0, -1)}[a-z]?$`,
                  $options: 'i'
                }
              },
              {
                city: {
                  $regex: `^${query.slice(0, -2)}[a-z]{0,2}?$`,
                  $options: 'i'
                }
              },
              {
                nameOrganization: {
                  $regex: `^${query}`,
                  $options: 'i'
                }
              },
              {
                nameOrganization: {
                  $regex: `^${query.slice(0, -1)}[a-z]?$`,
                  $options: 'i'
                }
              },
              {
                nameOrganization: {
                  $regex: `^${query.slice(0, -2)}[a-z]{0,2}?$`,
                  $options: 'i'
                }
              }
            ]
          }
        }
      ]);

  
      const cuidadoresFormatados = await Promise.all(
        cuidadoresDisponiveis.map(async (cuidador) => {
            console.log(cuidadoresDisponiveis)

          const imagens = await Promise.all(
            cuidador.src.map((imageUrl) => {
              const imageSrc = `http://localhost:3000/backend/${imageUrl}`;
              return imageSrc;
            })
          );
  
          return {
            ...cuidador,
            src: imagens
          };
        })
      );

  
      res.json(cuidadoresFormatados);
    } catch (error) {
      console.error('Erro ao buscar cuidadores:', error);
      res.status(500).json({ error: 'Erro ao buscar cuidadores' });
    }
  });
  
  
  


  




const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS



mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.xa5gkyg.mongodb.net/?retryWrites=true&w=majority`)
    .then(()=>{
        app.listen(3000)
        console.log('conectou no banco')
    })
    .catch((err)=> console.log(err))

