"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
//Enlaces externos utilizados para mostrar la foto de los animales en el sitio
const link_animals = {
    perro: "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_1280.jpg",
    gato: "https://cdn.pixabay.com/photo/2016/03/28/12/35/cat-1285634_1280.png",
    loro: "https://cdn.pixabay.com/photo/2021/01/26/21/16/macaw-5952965_1280.jpg",
    hamster: "https://cdn.pixabay.com/photo/2018/02/17/17/50/cute-3160464_1280.jpg",
};
//Se activa el motor Handlebars
app.set('view engine', 'hbs');
//Se activa la carpeta de vistas
app.set('views', path_1.default.join(__dirname, 'views'));
//Se activa la carpeta de archivos estaticos
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
//Se configura express para tomar peticiones de los formularios y retonarlos como un JSON
app.use(body_parser_1.default.urlencoded({ extended: true }));
//Pagina principal
app.get('/', (req, res) => {
    res.render('index', link_animals);
});
//En caso de recargar la pagina se retorna al index
app.get('/show', (req, res) => {
    res.redirect('/');
});
//Se procesa el formulario y retorna el animal preferido
app.post('/show', (req, res) => {
    //Se crea una constante string, en caso de ocurrir un erro en el request se forza a crear un string vacio
    const animal = req.body.animal || '';
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
});
//Arranca el servidor
app.listen(port, () => {
    console.log(`Working in ${port}`);
});
