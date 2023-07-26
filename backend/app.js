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

  
const cuidadorRouter = require ("./routes/cuidador");
app.use("/cuidador", cuidadorRouter);


const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS



mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.xa5gkyg.mongodb.net/?retryWrites=true&w=majority`)
    .then(()=>{
        app.listen(3000)
        console.log('conectou no banco')
    })
    .catch((err)=> console.log(err))

