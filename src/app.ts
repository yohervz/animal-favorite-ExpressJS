import Handlebars from "handlebars";
import path from "path"
import express from 'express'
import bodyParser from 'body-parser';
import util from 'util';

const app = express();
const port: number = 3000;

//Enlaces externos utilizados para mostrar la foto de los animales en el sitio
const link_animals = {
  perro: "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_1280.jpg",
  gato: "https://cdn.pixabay.com/photo/2016/03/28/12/35/cat-1285634_1280.png",
  loro: "https://cdn.pixabay.com/photo/2021/01/26/21/16/macaw-5952965_1280.jpg",
  hamster: "https://cdn.pixabay.com/photo/2018/02/17/17/50/cute-3160464_1280.jpg",
}

//Se activa el motor Handlebars
app.set('view engine', 'hbs');

//Se activa la carpeta de vistas
app.set('views', path.join(__dirname, 'views'));

//Se activa la carpeta de archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//Se configura express para tomar peticiones de los formularios y retonarlos como un JSON
app.use(bodyParser.urlencoded({extended: true}));


//Pagina principal
app.get('/', (req, res) => {
  res.render('index', link_animals)
})

//En caso de recargar la pagina se retorna al index
app.get('/show', (req, res) => {
  res.redirect('/')
})

//Se procesa el formulario y retorna el animal preferido
app.post('/show', (req, res) => {

  //Se crea una constante string, en caso de ocurrir un erro en el request se forza a crear un string vacio
  const animal: string = req.body.animal || '';

  //Se verifica el animal elegido
  switch (animal) {
    case 'perro':
      //Se envia la vista con el animal y el enlace de la foto
      res.render('show', { animal: animal, link: link_animals.perro });
      break;
    case 'gato':
      res.render('show', { animal: animal, link: link_animals.gato });
      break;
    case 'loro':
      res.render('show', { animal: animal, link: link_animals.loro });
      break;
    case 'hamster':
      res.render('show', { animal: animal, link: link_animals.hamster });
      break;
    }
  
})

//Arranca el servidor
app.listen(port, () => {
  console.log(`Working in ${port}`)
})