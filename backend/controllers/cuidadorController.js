const Cuidador = require("../models/Cuidador")
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')

exports.create = async (req, res) => {
    try {
        const{
            image1Path = req.files['image1'][0].path,
            image2Path = req.files['image2'][0].path,
            image3Path = req.files['image3'][0].path,

            email,
            password,
            confirmPassword,
            cpf,
            dateOfBirth,
            fullName,
            phone,

            capabilitiesHistory,
            dailyServicePrice,
            weeklyServicePrice,
            nameOrganization,
            animalTypes,
            servicesIncluded,
        } = req.body


        const animalTypesObj = JSON.parse(animalTypes);
        const servicesIncludedObj = JSON.parse(servicesIncluded);
        console.log(servicesIncludedObj, animalTypesObj)
            
        // Verificar se pelo menos um animal está selecionado
        if (!(animalTypesObj.dogs || animalTypesObj.cats || animalTypesObj.birds)) {
            return res.status(400).json({ message: "Selecione pelo menos um tipo de animal." });
        }

        // Verificar se pelo menos um serviço está selecionado
        if (!(servicesIncludedObj.passeio || servicesIncludedObj.banho || servicesIncludedObj.alimentacao)) {
            return res.status(400).json({ message: "Selecione pelo menos um serviço incluído." });
        }

        if (!fullName || !email || !password || !cpf || !dateOfBirth || !phone) {
            return res.status(422).json({ msg: 'Preencha todos os campos obrigatórios' });
          }
      
        if (!capabilitiesHistory) {
            return res.status(422).json({ msg: 'A história do cuidador é obrigatória' });
        }
        if (!dailyServicePrice) {
            return res.status(422).json({ msg: 'O valor do serviço (diária) é obrigatório' });
        }
        if (!weeklyServicePrice) {
            return res.status(422).json({ msg: 'O valor do serviço (semanal) é obrigatório' });
        }
        if (!nameOrganization) {
            return res.status(422).json({ msg: 'O nome da organização ou cuidador é obrigatório' });
        }
        
        if (password !== confirmPassword) {
            return res.status(422).json({ msg: 'As senhas não conferem' });
        }

        const cuidadorExists = await Cuidador.findOne({ email: email });
        if (cuidadorExists) {
            return res.status(422).json({ msg: 'Por favor, use outro e-mail' });
        } 
  
      // Cria o hash da senha
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);



        // Criando o objeto Cuidador com os caminhos das imagens
        const cuidador = new Cuidador({
            src: [image1Path, image2Path, image3Path], // Armazenando os caminhos em um array


            email,
            password: passwordHash,
            cpf,
            dateOfBirth,
            fullName,
            phone,
            capabilitiesHistory,
            dailyServicePrice,
            weeklyServicePrice,
            nameOrganization,

            animalTypes: animalTypesObj,
            servicesIncluded:servicesIncludedObj
        
        });

        await cuidador.save();
        res
        .status(201)
        .json({
            msg: 'Usuario criado com sucesso'
        })
    } catch (error) {
        console.error(error); // Adicionado para imprimir o erro no console
        res.status(500).json({ message: "Erro ao salvar" });
    }
};