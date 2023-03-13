Primeiro criei uma parte do front end da página para saber mais ou menos como o site vai ficar.

Agora que estou com o node instalado vou intalar o nodemon:

    npm install nodemon -g 
    *Serve para agilizar no processo de ficar reinicializando o servidor*

Express:

    npm install --save express
    *Ajuda a trabalhar com alguns Frameworks*

Handlebars:

    npm install --save express-handlebars
    *Tipo de view engine, basicamente um html com variaveis, condições, etc*


Body Parser:

    npm install body-parser --save
    *Ajuda na requisição de método POST*

Mongoose:

    npm install --save mongoose
    *Ajuda a trabalhar com banco de dados*

Agora vamos configura-los no arquivo app.js que irá servir como estrutura básica do site:

app.js:

    const express = require('express');
    const handlebars = require('express-handlebars');
    const bodyParser = require('body-parser');
    const app = expres();
    // const mongoose = require('mongoose');

    //Settings
        //Body Parser
            app.use(express.urlencoded({extended:true}));
            app.use(express.json());
        
        //Handlebars
            app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
            app.set('view engine', 'handlebars');

        // Mongoose
            //Em breve

    // Routes

    //Others

    const PORT = 8081;
    app.listen(PORT, () => {
        console.log("Servidor rodando!");
    });

Estrutura do arquivo main.handlebars:

    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Blog Filmes</title>
    </head>
    <body>
        {{{body}}}
    </body>
    </html>

### Criar rotas para ADM

Agora vou criar um novo arquivo chamado admin.js para separar as rotas do admin.

E também vou criar uma pasta chamada routes e colocar o arquivo admin.js lá dentro.

Precisamos usar a biblioteca Router, pois como vamos usar arquivos diferentes para organizar as rotas do projeto, precisamos de uma biblioteca para nos ajudar a utilizar determinadas rotas em arquivos diferentes.

Então no arquivo admin.js digitamos:

    const express = require('express');
    const router = express.Router();

    module.exports = router;

Requisitamos o express para o arquivo e requisitamos o router.

Agora se nós fomos rodamos o app.js no nodemon ele ainda não vai reconhecer as rotas do admin.js, pois não imortamos ela ainda no arquivo app.js.

Para isso no arquivo app.js acrescentamos umas constante

    const admin = require('./routes/admin');

E na configuração de rotas digitamos:

    app.use('/admin', admin);

O arquivo app.js tem como código completo até agora:

    const express = require('express');
    const handlebars = require('express-handlebars');
    const bodyParser = require('body-parser');
    const app = express();
    const admin = require('./routes/admin');
    // const mongoose = require('mongoose');

    //Settings
        //Body Parser
            app.use(express.urlencoded({extended:true}));
            app.use(express.json());
        
        //Handlebars
            app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
            app.set('view engine', 'handlebars');

        // Mongoose
            //Em breve

    // Routes
        app.use('/admin', admin);

    //Others

    app.get("/", (req, res) => {
        res.send("Seja Bem-Vindo ao site!!!");
    })

    const PORT = 8081;
    app.listen(PORT, () => {
        console.log("Servidor rodando!");
    });

Lembrando que agora para adicionarmos alguma rota no arquivo admin.js devemos usar a biblioteca router, exemplo:

    const express = require('express');
    const router = express.Router();

    router.get("/", (req,res) => [
        res.send("Essa é apágina do ADMIN!!")
    ])

    module.exports = router;

### Adicionando o CSS

Agora vou mostrar para o arquivo app.js onde está os arquivos de estilização o CSS.

Para isso vamos utilizar o módulo path que serve para trabalhar com diretórios, minipular pastas.

Antes vamos criar uma pasta views e colocar o arquivo main.handlebars lá.

Vamos criar também uma pasta chamada public e transferir nossos arquivos CSS e JS que estão na pasta assets e colocar nele.

Agora assim vamos usar o path no arquivo app.js:

    //Public
        app.use(express.static(path.join(__dirname, 'public')));

Com esse código estamos avisando o express que os nosso arquivos estáticos estão na pasta public.

Agora devemos carregar os arquivos CSS no arquivo main.handlebars.

E vamos carregar os arquivos JS também.

Agora vamos criar uam partial, para isso devemos criar a pasta partials e dentro dela vamos criar o header da página e vamos nomear o arquivo que contém o header como _navbar.handlebars e dentro do arquivos main.handlebars vamos chama-lo ficando:

    <body>
        {{>_navbar}}
        {{{body}}}
    </body>

Quando colocamos o sinal de > dentro das chaves no handlebars ele automaticamente entende que eu quero pegar um arquivo dentro da pasta partials.

Lembrando que temos que requisitar o mkódulo path com a constante:

    const path = require('path');

Bom, fiz alguns testes aqui no projeto e vou comentar as alterações:

- Primeiro criei a pasta layouts e coloquei o arquivo main.handlebars lá.

- Depois criei outra pasta chamada partial e fiz um arquivo único para o header com o nome _navbar.handlebars, pois o header provavelmente vamos utiliza-lo em pasginas diferentes.

- Apaguei o arquivo index.html, pois criei um novo arquivo chamado index.handlebars e nele chamei a partial do header e acrescentei os sliders e tals.

Lembrando que não precisamos mais chamar os arquivos css e js nos arquivos handlebars, pois já configuramos tudo isso no arquivo main.handlebars.

Também lembrando que caso quisermos uma configuração padrõa em todos as páginas do projeto é só chamar esse partial no arquivo main.handlebars.

- Criei também uma nova rota no arquivo app.js chamando o arquivo index.handlebars, ficando a parte de rotas assim:

    // Routes

        app.get("/", (req, res) => {
            res.render("index");
        })

        app.use('/admin', admin);

### Criando a primeira parte do ADMIN, que será a parte de criar categorias

Vamos term uma página inicial onde ele poderá escolher qual parte do site ele quer mexer e ai ao clicar no botão ele será redicrecionado para uma parte específica.

Vamos começar pela parte de categorias.

No arquivo admin.js vamos criar as rotas:

    router.get('/add', (req, res) => {
        res.render('admin/add');
    })

    router.get('/add/category', (req, res) => {
        res.render('admin/addcategory')
    })

A primeira rota vai renderizar a página orincipla do ADMIN que por enquanto só vai ter o botão de categorias.

A segunda rota vai mostrar uma página mais completa para a parte de categorias.

Vamos criar uma pasta chamada admin dentro da pasta views e colocar nossos arquivos handlebars lá.

Vamos criar um html simples da página add:

    <h2 class="adm-title">Aqui você poderá editar seu website</h2>

    <section class="adm">
        
        <form class="adm-form" action="/admin/add/category" method="get">
            <label class="adm-lable" for="category">Add new category:</label>
            <input class="adm-button" type="submit" name="category" id="category" value="New Category">
        </form>
    </section>

Então na página add criamos apenas um formulário simples e linkamos o botão para a página addcategory.

Também adicionamos o link ADMIN la navbar.

Agora precisamos criar um banco de dados para cadastrar as cetegorias e para isso vamos utilizar o mongoose.

Vamos requista-lo e configura-lo no arquivo app.js:

    const mongoose = require('mongoose');

    // Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://127.0.0.1:27017/blog-filmes').then(() => {
        console.log("Connect to Mongo");
    }).catch((err) => {
        console.log("Failed to connect Mongo" + err);
    })

Agora vamos criar o model de categorias. Primeiro vamos criar uma pasta nova chamada models e dentro dessa pasta vamos criar o arquivo Categoria.js, no plural e primeira maiúscula por organização.

Dentro do arquivo Categoria.js digitamos:

    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const Categoria = new Schema ({
        name: {
            tyupe: String,
            required: true
        },

        slug: {
            type: String,
            required:true
        },

        date : {
            type: Date,
            default: Date.now()
        }
    })

    mongoose.model("categorias", Categoria);

Agora vamos cadastrar a categoria dentro do banco de dados.

Para isso dentro do arquivo admin.js digitamos:

    const mongoose = require('mongoose');
    require ('../models/Cateogry');
    const Category = mongoose.model('categories');

    router.post('category/newcategory', (req, res) => {
        const newCategory = {
            name: req.body.name,
            slug: req.body.slug
        }

        new Category(newCategory).save.then(() => {
            console.log("Category saved sucessfully");
        }).catch((err) => {
            console.log("Failed to save new category");
        })
    })

Basicamente requisitamos o mongoose e o model Category no arquivo e criamos uma nova rota do tipo post para que podemos enviar as informações da página para o banco de dados.

Agora vamos configurar sessões para páginas e um middleware que avisará o ADMIN se as categorias foram cadastradas com sucesso ou se teve algum erro.

Primeiro vamos instalar mais dois módulos:

    npm install --save express-session

    npm install --save connect-flash

Agora vamos carrega-lo no arquivo app.js:

    const session = require('express-session');
    const flash = require('connect-flash');

A agora vamos configurar a sessão:

    //Session
        app.use(session({
            secret: 'blogfilmes',
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash());

E agora o middleware:

    // Middleware
        app.use((req, res, next) => {
            res.locals.sucess_msg = req.flash("sucess_msg");
            res.locals.error_msg = req.flash("error_msg");
            next();
        })

O middleware serve como um "observador", quando o adm tentar criar uma nova categoria, esse porcesso da rota chegar ao banco de dados no meio dela vai ter o middleware e com isso ele consegue saber se houve algum errou ou não com o cadastro e assim ele passa para as variáveis globais sucess_msg e error_msg ou valores que passaremos no futuro do projeto e com isso podemos utilizar essas variavéis em nossas páginas para avisar ao usuário se houve algum erro ou não.

Lembrando que quando utilizamos um middleware temos que utilizar o next().

Agora vou validar o formulário no express.

Temos que basicamoente criar algumas condições na rota post das categorias no arquivo admin.js:

    var erros = [];

    if(!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
        erros.push({texto: "Invalid name"});
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({texto: "Invlid slug"});
    }

    if (erros.length > 0) {
        res.render("addcategory", {erros: erros});
    } 

Aqui basicamente criamos uma array com o nome erros e abaixo tem as condições. Caso o usuário nã escreva o slug ou nome e caso algum dele stenha algum valor undefined ou null ele coloca no array erros a mensagem de erros o que faria com que o array tenha um length maior que zero. 
Se tiver array maior que zero ele vai rendenizar a página addcategory com a mensagem de erro.

E tomo como código na rota o seguinte:

    router.post('category/newcategory', (req, res) => {

        var error = [];

        if(!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
            error.push({texto: "Invalid name"});
        }

        if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
            error.push({texto: "Invlid slug"});
        }

        if (error.length > 0) {
            res.render("addcategory", {error: error});
        } else {
            const newCategory = {
                name: req.body.name,
                slug: req.body.slug
            }

            new Category(newCategory).save.then(() => {
                req.flash('sucess_msg', "Category created successfully");
                res.redirect('/admin/addcategory');
            }).catch((err) => {
                req.flash('error_msg', "Error to create a new category, try again");
                res.redirect('/admin/add');
            })
        }
    })

Adicionamos o req.flash para exibir as mensagens de sucesso ou erro.

Agora temos que passar essas mensagem de erros na página addcategory.handlebars. Para isso basta criar uma nova partial chamado _msg.handlebars.

No arquivos _msg.handlebars temos:

    {{#if success_msg}}
        <div class="alert-success">{{success_msg}}</div>
    {{/if}}

    {{#if error_msg}}
        <div class="alert-danger">{{error_msg}}</div>
    {{/if}}

E no arquivo addcategory fica:

    {{#each error}}
        <div class="alert-danger">{{texto}}</div>
    {{else}}

    {{/each}}

E no arquivo main.handlebars digitamos:
    
    <body>
        {{>_msg}}
        {{{body}}}
    </body>

Então agora vamos explicar o código passo a passo, pois está um pouco confuso.

Primeiro criamos a rota do tipo post para enviar a categoria para o banco de dados.

Depois instalamos a session para que junto com o middleware ela possa me retornar mensagens dizendo se está tudo ok com o cadastro da nova categoria ou se deu algum erro.

Ainda na rota do tipo post ('category/newcategory'), falamos que caso os campos do formulário(vamos fazer o formulário ainda de categorias) não estejam preenchidos corretamente ele vai colocar no array error um texto com as mensagens Invalid name ou Invalid slug. Já que sabemos que houve um erro com a expressão if (error.length > 0) então vamos rendenizar a página addcategory.handlebars mandando junto a variável error que contém as mensagens Invalid name ou Invalid slug. E para que o arquivo html/handlebars do addcategory interprete essa variável error temos que colocar a seguinte estrutura no arquivo:

    {{#each error}}
        <div class="alert-danger">{{texto}}</div>
    {{else}}

    {{/each}}

Beleza, então já entendemos como o usuário vai receber as mensagens de erro se ele colocar dados inválidos no formulario de cadastro das categorias.

Agora vamos entender caso aconteça ou não um erro na parte de cadastro dentro do banco de dados.

Vamos entender primeiro que o flash é um tipo de sessão que só aparece uma vez, quando a pessoa for recarregar a página ele desaparece.

Após o else significa que todos os IFs anteriores foram corretos, então no else pegamos o nome e o slug que o usuário digitou e salvamos no banco de dados com o new Category(newCategory).save, porém utilizamos um .then() e um .catch() para sabermos se nesse processo de salvamento houve algum erro ou não. Então no .then()(que significa que houve sucesso) colocamos req.flash('sucess_msg', "Category created successfully"), ou seja, se houve sucesso faça com que a variável sucess_msg passe a valer Category created successfully e depois redirecione o usuário para a rota req.redirect('/admin/addcategory').
Caso tenha algum erro no processo de salvamento utilizamos o .catch() onde ele está dizendo para que a variável 'error_msg' tenha o valor Error to create a new category, try again. E redirecione o usuário para a rota /admin/add.

Agora precisamos criar uma partial para essa mensagem, pois futuramente utilizaremos ela para exibir ao usuario qualquer mensagem de erro ou sucesso em futuros cadastros. Para isso temos que criarmos uma div simples na partial junto com uma estrutura de condição do handlebars:

    {{#if success_msg}}
        <div class="alert-success">{{success_msg}}</div>
    {{/if}}

    {{#if error_msg}}
        <div class="alert-danger">{{error_msg}}</div>
    {{/if}}

Aqui é um html simples onde com a classe alert-sucess e alert-danger personalizamos a mensagem como queremos.
Depois utilizamos a estrutura de condições do handlebars para dizer que, caso receber uma sucess_msg apareça da seguinte forma, se aparecer com o error_msg apareça de outra forma.

Aqui temos uma estrutura diferente, pois na parte de validação nós carregamos a página addcategory junto com as variáveis, aqui nós estamos apenas redirecionando o usuário para uma determinada rota, pois as variáveis sucess_msg e error_msg serão carregadas em uma partial e essa partial estará no arquivo main.handlebars, ou seja, essas variáveis serão utilizadas em todas as páginas do projeto, de maneira global.

Por isso que no arquivo main.handlebars adicionamos:

    <body>
        {{>_msg}}
        {{{body}}}
    </body>

E com isso entendemos um pouco como funciona essa parte de enviarmos variáveis para os arquivos html. Por isso utilizamos o handlebars, pois ele no permite essa função.

### Criando formulário de categorias

Devia ter feito o formulário antes de criar as rotas para ele, mas não tem problema vou criar-lo agora.

Para isso no arquivo addcategory digitamos:

{{#each error}}
    <div class="alert-danger">{{texto}}</div>
{{else}}
    
{{/each}}

    <section class="categoryForm">
        <h3 class="categoryForm-subtitle">New Category</h3>
        <form class="categoryForm-form" action="/admin/category/new" method="POST">
        
            <label class="categoryForm-label" for="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Category name" class="categoryForm-input">

            <label class="categoryForm-label" for="name">Slug:</label>
            <input type="text" id="name" name="slug" placeholder="Slug name" class="categoryForm-input">

            <button type="submit" class="adm-button">Create category</button>
        </form>
    </section>

Tive alguns problemas no código então fiz algumas mudanças.

A primeira foi que eu criei uma página nova. O ADMIN primeiro entra na página add.handlebars depois quando ele clica em adicionar nova categoria ele é direcionado para uma página onde ele vai poder ver as categorias já criadas, vai poder deletar e adiconar novas (porém essa parte vou adicionar mais para frente). 

E quando ele clicar no botão criar categoria ele vai para página do formulário em si.

Estava com problemas com a parte do flash para saber se foi registrado ou não a categoria mas já resolvi o problema, era apenas um problema de digitação no res.redirect, estava escrito req.redirect, mas agora está certo.

Agora vou colocar um css nas mensagens de erro ou sucesso no cadastro, para isso no arquivo msg.css digitamos:

    .alert-success {
        align-items: center;
        background-color: green;
        border-radius: 1rem;
        color: white;
        display: flex;
        font-family: 'Lobster', cursive,'Times New Roman', Times, serif;
        font-size: 2rem;
        height: 50px;
        justify-content: center;
        margin: 0 auto;
        padding: .5rem;
        width: 30%;
    }

    .alert-danger {
        align-items: center;
        animation: fadeInFadeOut 2s linear infinite;
        background-color: #b21515;
        border-radius: 1rem;
        color: white;
        display: flex;
        font-family: 'Lobster', cursive,'Times New Roman', Times, serif;
        font-size: 2rem;
        height: 50px;
        justify-content: center;
        margin: 0.5rem 0 .5rem .5rem;
        padding: .5rem;
        width: 15%;
    }

    @keyframes fadeInFadeOut {
        0% {opacity: 1;}
        50% {opacity: 0.3;}
        100% {opacity: 1;}
    }

Agora vou criar um arquivo JS para o slug, pois eu quero que o nome do slug que o usuário escolher seja o mesmo nome da categoria porém em letra minúscula.

O arquivo vai se chamar slug.js e temos que caregá-lo no arquivo addcategory.handlebars.

Depois no arquivo slug.js digitamos:

    const inputSlug = document.getElementById("slug")
    const inputName = document.getElementById("name");
    inputName.addEventListener("keyup", slugName);

    function slugName () {
        
        inputSlug.value = inputName.value.toLowerCase();
    }

Adicionamos também uma variação no arquivo addcategory.handlebars com o nome --gray, pois como queremos que o input slug seja apenas readonly então coloquei uma cor de font no input diferente.

### Listar as categorias existentes

Vamos na rota /categoiries e digitamos:

    router.get('/categories', (req, res) => {

        Category.find().lean().then((categories) => {
            res.render('admin/categories', {categories: categories});
        }).catch((err) => {
            req.flash('error_msg', "Error in categories list");
            res.redirect("/admin/add")
        })
    })

Basicamente eu peguei a constante Category que faz referencia ao model das categorias e falei para ele listar as categorias presentes no banco de dados naquela rota e com isso passamos tipo uma variável para a página com  aparte {categories: categories}, agora temos que modificar um pouco o arquivo categories.handlebars, ficando:

    <section class="adm">
        <div class="adm-div">
            <h3 class="adm-title --h3">Category list</h3>
            <a href="/admin/categories/add"><button class="adm-button">Create new category</button></a>
        </div>
    </section>


    {{#each categories}}
    <section class="admCategory">
        <div class="admCategory-div">
            <h4 class="admCategory-title">{{name}}</h4>
            <small class="admCategory-subtitle">Slug: {{slug}}</small>
            <small class="admCategory-subtitle">Creation date: {{date}}</small>
        </div>
    </section>
        
    {{else}}

    {{/each}}

Criamos também o css da página.

Vamos agora criar a parte de edição das categorias, para isso vamos criar uma nova rota e um novo arquivo handlebars chamado editcategories.handlebars:

    router.get('/categories/edit/:id', (req,res) => {
        res.render('admin/editcategories');
    })

Agora dentro do arquivo categories.handlebars vamos acrescentar um botão que vai nos direcionar para essa rota edit:

    <section class="adm">
        <div class="adm-div">
            <h3 class="adm-title --h3">Category list</h3>
            <a href="/admin/categories/add"><button class="adm-button">Create new category</button></a>
        </div>
    </section>


    {{#each categories}}
    <section class="admCategory">
        <div class="admCategory-div">
            <h4 class="admCategory-title">{{name}}</h4>
            <small class="admCategory-subtitle">Slug: {{slug}}</small>
            <small class="admCategory-subtitle">Creation date: {{date}}</small>
            <a href="/admin/categories/edit/{{_id}}"><button class="admCategory-button">Edit category</button></a>
        </div>
    </section>
        
    {{else}}

    {{/each}}

Agora no arquivo editcategories.handlebars vamos ter uma estrutura semelhante ao arquivo addcategory.handlebars:

    {{#each error}}
        <div class="alert-danger">{{texto}}</div>
    {{else}}
        
    {{/each}}

    <section class="categoryForm">
        <h3 class="categoryForm-subtitle">New Category</h3>
        <form class="categoryForm-form" action="/admin/category/new" method="POST">
        
            <label class="categoryForm-label" for="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Category name" class="categoryForm-input">

            <label class="categoryForm-label" for="name">Slug:</label>
            <input type="text" id="slug" name="slug" placeholder="Slug name" class="categoryForm-input --gray" readonly>

            <button type="submit" class="adm-button">Create category</button>
        </form>
    </section>

Agora dentro da rota de editcategories precisamos passar os valores dos campos nome e slug que está lá no banco de dados referentes ao id, para isso digitamos na rota /categories/edit/:id :

Agra no arquivo editcategories.handlebars precisamos adcionar um input do tipo hidden:

    <input type="hidden" name="id" value="{{category._id}}">

O arquivo completo fica:

    {{#each error}}
        <div class="alert-danger">{{texto}}</div>
    {{else}}
        
    {{/each}}

    <section class="categoryForm">
        <h3 class="categoryForm-subtitle">New Category</h3>
        <form class="categoryForm-form" action="/admin/category/new" method="POST">

            <input type="hidden" name="id" value="{{category._id}}">
            <label class="categoryForm-label" for="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Category name" class="categoryForm-input">

            <label class="categoryForm-label" for="name">Slug:</label>
            <input type="text" id="slug" name="slug" placeholder="Slug name" class="categoryForm-input --gray" readonly>

            <button type="submit" class="adm-button">Create category</button>
        </form>
    </section>

Esse input serve para pegar o id para utilizar no backend.

Agora com isso vamos criar uma nova rota do tipo post para pegarmos esses novos campos do editcategories.handlebars e atualizar lá no banco de dados:

    router.post('/categories/edit', (req, res) => {
        Category.findOne({_id: req.body.id}).then((category) => {

            category.name = req.body.name;
            category.slug = req.body.slug;

            category.save().then(() => {
                req.flash('success_msg', "Category edited successfully");
                res.redirect('/admin/categories');
            }).catch((err) => {
                req.flash('error_msg', "Internal error in saving category edit");
                res.redirect('/admin/categories');
            })
        }).catch((err) => {
            req.flash('error_msg', "Error editing category");
            req.redirect('/admin/categories');
        })
    })

Temos que lembrar também de editar o arquivo editcategories.handlebars para que tudo funcioane bem, então ele ficou da seguinte forma:

    {{#each error}}
        <div class="alert-danger">{{texto}}</div>
    {{else}}
        
    {{/each}}

    <section class="categoryForm">
        <h3 class="categoryForm-subtitle">Edit Category</h3>
        <form class="categoryForm-form" action="/admin/categories/edit" method="POST">

            <input type="hidden" name="id" value="{{category._id}}">
            <label class="categoryForm-label" for="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Category name" class="categoryForm-input" value="{{category.name}}">

            <label class="categoryForm-label" for="name">Slug:</label>
            <input type="text" id="slug" name="slug" placeholder="Slug name" class="categoryForm-input --gray" readonly value="{{category.slug}}">

            <button type="submit" class="adm-button">Edit category</button>
        </form>
    </section>

Vamos agora dar uma resumida nessa parte do código.

Primeiro temos que entender que no banco de dados o nome do campo id é _id que já vem como padrão.

Então sabnedo disso no arquivo categories.handlebars eu adicionei um botão onde ao clica-lo o usuário vai ser direcionado para a rota /admin/categories/edit/{{_id}}.

Esse {{_id}} vem de uma variavel *{categories: categories}* que foi passada ao arquivo categories.handlebars através da rota /categories.

Como no nosso arquivo categories.handlebars cada elemento do banco de dados tem seu botão de edit, então cada _id é único, por isso conseguimos acessar a página que queremos corretamente.

Então a rota que criamos /categories/edit/:id vai ser de cordo com o id passado da página anterior *categories.handlebars*.

Dentro da rota /categories/edit/:id pedimos para a constante Category (que se refere ao model Category) encontre um elemento no banco de dados que tenha o id passado e para isso utilizamos aquele comando Category.findOne({_id:req.params.id}).lean().

Então se ele encontrar algum elemento referente a aquele id ele vai rendenizar a página editcategories.handlebars com o objeto {category: category}, aqui basicamente ele está fazendo exatamente que nem antes, ele passar nesse objeto todos os dados do banco de dados referente a o id passado.

Isso é necessário, pois queremos que na página editcategories tenha os inputs com os nomes já cadstrados que no caso vai ser editável, não faria sentido nenhum você querer editar um dado sem saber que dado é esse.

Lembrado que também pode ocorrer algum erro, por isso utilizamos o .catch().

Beleza, com isso já temos nossa página editcategories.handlebars do jeito certo. Agora falta nós pegarmos os novos campos *pois os antigos foram editados* e salvar essa alteração lá no banco de dados. Lembrando que estamos dando um update no banco de dados e não criando uma nova categoria.

Então como enviamos dados com o método post, precisamos criar uma rota do tipo post e criamos a /categories/edit.

Dentro dessa rota precisamos dizer qual é o id que será atualizado, por isso criamos um input do tipo hidden no arquivo editcategories.handlebars, pois com isso temos acesso ao id.

Então pedimos para a constante encontrar um elemento no banco de dados com o determinado id, caso ele encontre *.then()* então precimos dizer quais serão os novos nomes e por isso digitamos category.name = req.body.name e category. slug = req.body.slug, pois os nome que eles estão requisitando do body é o novo nome e slug.

E agora basicamente temos que usar um comando para slvar esses novos dados no banco de dados que é category.save() e caso de certo ou errado somos direcionados para outras páginas.

Lembrando que esses nomes de category ou categories são apenas nomes para representar os elementos encontrados do banco de dados, esses nomes podem ser qualquer um.

### Deletando alguma categoria

Para deletarmos alguma categoria que criamos precisamos fazer uma alteração no arquivo categories.handlebars, vamos ter que adicionar um formulário ficando:

    <section class="adm">
        <div class="adm-div">
            <h3 class="adm-title --h3">Category list</h3>
            <a href="/admin/categories/add"><button class="adm-button">Create new category</button></a>
        </div>
    </section>


    {{#each categories}}
    <section class="admCategory">
        <div class="admCategory-div">
            <h4 class="admCategory-title">{{name}}</h4>
            <small class="admCategory-subtitle">Slug: {{slug}}</small>
            <small class="admCategory-subtitle">Creation date: {{date}}</small>
            <div class="admCategory-position">
            <a href="/admin/categories/edit/{{_id}}"><button class="admCategory-button">Edit category</button></a>
                <form action="" method="POST">
                    <input type="hidden" name="id" value="{{_id}}">
                    <button type="submit" class="admCategory-button">Delete category</button>
                </form>
            </div>
        </div>
    </section>

Criei também uma div apenas para posicionar os botões corretamente.

E de novo criamos um input do tipo hidden para pegar o valor do id.

Agora criamos uma nova rota para deletar:

    router.post('/categories/delete', (req, res) => {
        Category.deleteOne({_id: req.body.id}).then(() => {
            req.flash('success_msg', "Category deleted successfully");
            res.redirect('/admin/categories');
        }).catch((err) => {
            req.flash('error_msg', "Error deleting category");
            res.redirect('/admin/categories');
        })
    })

Basicamente ela requisita o id e com o comando .remove ela remove, depois fazemos os redirecionamentos e mensagens de acordo com os erros ou sucessos.

Agora é só mudar o action do formulário do arquivo categories.handlebars ficando:

    <section class="adm">
        <div class="adm-div">
            <h3 class="adm-title --h3">Category list</h3>
            <a href="/admin/categories/add"><button class="adm-button">Create new category</button></a>
        </div>
    </section>


    {{#each categories}}
    <section class="admCategory">
        <div class="admCategory-div">
            <h4 class="admCategory-title">{{name}}</h4>
            <small class="admCategory-subtitle">Slug: {{slug}}</small>
            <small class="admCategory-subtitle">Creation date: {{date}}</small>
            <div class="admCategory-position">
            <a href="/admin/categories/edit/{{_id}}"><button class="admCategory-button">Edit category</button></a>
                <form action="/admin/categories/delete" method="POST">
                    <input type="hidden" name="id" value="{{_id}}">
                    <button type="submit" class="admCategory-button">Delete category</button>
                </form>
            </div>
        </div>
    </section>
        
    {{else}}
        <h4 class="admCategory-title --noCategory">There is no registered category</h4>
    {{/each}}

Acrescentei apenas um h4 no else para caso não tenha nenhuma categoria cadastrada avisar o usuário.

### Postagens

Agora vou criar a parte de postagens.

Vamos criar um banco de dados para as postagens, nele deve conter um título, um slug, uma descrição, um conteúdo, uma categoria, uma data e também uma imagem onde vamos utiliza-la para colocar futuramente no nosso carrossel.

Lembrando que somente o nome da imagem será salva no banco de dados a imagem em si ficará em uma pasta chamada uploads que criamos dentro da pasta public.

Então para isso vamos criar o model de postagem. Vamos criar um arquivo chamado Post.js dentro da pasta de models e nele digitamos:

    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const Post = new Schema ({
        imageName: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'categories',
            required: true
        },
        data: {
            type: Date,
            defaut: Date.now()
        }
    })

    mongoose.model('posts', Post);

Aqui criamos um model padrão, porém na parte de categorias defino o type como Schema.Types.ObjectId. Isso significa que aquele campo de categoria vai ser um id referenciando a categoria e tmabém devemos passar uma referencia que no nosso caso é a collection com o nome categories(onde está armazenado as categorias).

Depois utilizamos o mongoose.model e dizemos a ele que a nova collection vai se chamar posts e tem como referencia a constante Post.

Agora vou criar o formulário de postagens.

Para isso vou criar uma nova rota no arquivo admin.js:

    router.get('/posts', (req,res) => {
        res.render('admin/posts');
    })

Vamos criar esse arquivo posts.handlebars dentro da pasta view/admin e é nesse arquivo que vai aparecer as postagens criadas e onde vai ter um botão para criar uma nova postagem.

Esse arquivo tem a mesma estrutura do arquivo categories.handlebars com pequenas alterações.

No arquivo add.handlebars vamos adiconar um novo botão que será da parte de postagens e nele vamos colocar o direcionamento para a rota que acabamos de criar ficando da seguinte forma:

    <h2 class="adm-title">Aqui você poderá editar seu website</h2>

    <section class="adm">
        <nav class="adm-nav">
            <a href="admin/categories"><button class="adm-button">Categories</button></a>
            <a href="admin/posts"><button class="adm-button">Posts</button></a>
        </nav>
    </section>

O arquivo posts.handlebars ficou da seguinte forma:

    <section class="admPost">
        <div class="admPost-create">
            <h3 class="admPost-title --h3Post">Posts list</h3>
            <a href=""><button class="admPost-buttonNew">Create new post</button></a>
        </div>
    </section>

    {{#each posts}}

    {{else}}
        <h4 class="admPost-title">There is no registered posts</h4>
    {{/each}}

Agora vamos criar uma nova rota para carregar o arquivo que vai conter o formulário das postagens:

    router.get('/posts/add', (req, res) => {
        res.render('admin/addpost');
    })

E também temos que criar esse arquivo addposts.handlebars na pasta views.

Dentro dele vamos criar o formulário:

    <section class="formPost">
        <h3 class="formPost-title">New post</h3>

        <div class="formPost-div">
            <h4 class="formPost-subtitle">Add Image</h4>
            <label class="formPost-label --imageLabel" for="file"> </label>
            <input class="formPost-input --imageInput" type="file" id="file" name="file" required>
            <h4 class="formPost-nameFile" id="formPost-text">No file selected ...</h4>
        </div>


        <form class="formPost-form" action="" method="POST">

            <label class="formPost-label --imageInput" for="fileName">fileName:</label>
            <input class="formPost-input --imageInput" type="text" id="formPost-fileName" name="imageName" placeholder="File name" required readonly>

            <label class="formPost-label" for="title">Title:</label>
            <input class="formPost-input" type="text" id="formPost-title" name="title" placeholder="Post title" required>

            <label class="formPost-label" for="name">Slug:</label>
            <input type="text" id="formPost-slug" name="slug" placeholder="Slug name" class="formPost-input --gray" readonly>

            <label class="formPost-label" for="description">Description:</label>
            <textarea rows="5" class="formPost-textarea" type="text" name="description" placeholder="Description" required></textarea>

            <label class="formPost-label" for="title">Content:</label>
            <textarea rows="10" class="formPost-textarea" type="text" name="content" placeholder="Content" required></textarea>

            <button type="submit" class="formPost-button">Create post</button>
        </form>
    </section>

Criei o fomulário e alguns campos diferente, pois é necessário a criação de um input com display none para fazer um css diferente e também outro input com display none para apenas obter o nome da foto para cadastrar no banco de dados e utilizarmos futuramente.

Agora precisamos fazer algum código para pegar a imagem e além de salvar seu nome no banco de dados vamos salvar a foto/imagem na pasta uploads.

Para isso eu vou mudar um pouco o HTML do formulário de postagens:

    <h4 class="formPost-subtitle">Add Image</h4>
    <form class="formPost-div">
        <label class="formPost-label --imageLabel" for="file"> </label>
        <input class="formPost-input --diplay-none" type="file" id="file" name="file" required>  
        <input id="formPost-enviarImagem" class="" type="submit"> 
    </form>
    <h4 class="formPost-nameFile" id="formPost-text">No file selected ...</h4>

Agora vou instalar uma biblioteca chamada multer, ela permite uploads de arquivos no express. Para isso digitamos no terminal:

    npm install multer --save

Para esse passo de enviar imagens na pasta uploads precisamos definir no formulário o tipo de encriptação então no form digitamos enctype="multipart/form-data". Ficanod da seguinte forma:

    <form class="formPost-div" method="post" enctype="multipart/form-data">
        <label class="formPost-label --imageLabel" for="file"> </label>
        <input class="formPost-input --diplay-none" type="file" id="file" name="file" required>  
        <input id="formPost-enviarImagem" class="" type="submit"> 
    </form>

Então assim o formulário para enviar arquivos já está preparado para enviar as imagens.

Agora vamos configurar as rotas e o multer no arquivo admin.js

Primeiro vamos importar o multer no arquivo:

    const multer = require('multer');

Lembrando que o multer é um middleware.

Agora vamos para a configuração do multer:

    const upload = multer({dest: "uploads/"});

Agora vou criar uma rota que vai receber o arquivo/imagem:

    router.post('/upload',upload.single('file') , (req, res) => {
        res.send("Arquivo recebido!!")
    })

Fiz também uma alteração no action do formulário:

    <form class="formPost-div" method="post" enctype="multipart/form-data" action="/admin/upload">
        <label class="formPost-label --imageLabel" for="file"> </label>
        <input class="formPost-input --diplay-none" type="file" id="file" name="file" required>  
        <input id="formPost-enviarImagem" class="" type="submit"> 
    </form>

Essa configuração que fiz no multer está salvando os arquivos sem nome e sem extensão. Para resolver esse problema precisamos criar uma função para o middlewre:

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null,'public/uploads/')
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname);
        }
    })

    const upload = multer({storage});

Dessa forma conseguimos salvar o arquivo na pasta uploads com o nome original da imagem. Com o código:

     filename: function(req, file, cb) {
            cb(null, file.originalname);
            }

Podemos manipular o nome da imagem, nesse caso utilizamos o file.originalname que como o próprio nome diz, salva o arquivo com seu nome original, mas pode acontecer de salvar o arquivo com o nome de um arquivo já existente. Então podemos mudar esse nome, por exemplo:

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null,'public/uploads/')
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname + Date.now() + path.extname(file.originalname));
        }
    })

Utilizamos cb(null, file.originalname + Date.now() + path.extname(file.originalname)); para nomear todas as imagens com nomes difenrentes. Nesse caso ele pega o nome original da imagem com a extensão soma com a data atual em milisegundos e soma com a extensão de arquivo sendo impossivel o usuário adicionar imagens com mesmo nome.

Essa questão do nome do rquivo em vou penasr mais para frente quando eu for colocar as imagens do banco de dados nos swipers.

Lembrando que como eu quero um nome de arquivo diferente do outro eu tive que requisitar o path no arquivo admin.js (const path = require('path');).

De momento vou utilizar somente o nome do arquivo original. Então temos como rota final desse processo de enviar foto para a pasta:

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null,'public/uploads/')
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname);
        }
    })

    const upload = multer({storage});

    router.post('/upload',upload.single('file') , (req, res) => {
        res.send("Arquivo recebido!!")
    })

Agora vou cadastrar as postagens no banco de dados.

Primeiro vou criar uma nova rota:

    router.post('/post/new', (req, res) {
        
    })

E vou colocar a rota no method lá no form:

    <form class="formPost-form" action="/admin/post/new" method="POST">

Adiciono o each também no arquivo addpost para exibir as possíveis mensagens de erro:

    {{#each error}}
        <div class="alert-danger">{{texto}}</div>
    {{else}}
        
    {{/each}}

Agora vamos requisitar o model de postagem no arquivo admin.js:

    require('../models/Post');
    const Post = mongoose.model('posts');

Eu esqueci de adicionar o campo categorias no fomulário de postagens. Então vamos lá.

Primeiro na rota /posts/add digitamos:

    router.get('/posts/add', (req, res) => {
        Category.find().lean().then((categories) => {
            res.render('admin/addpost', {categories: categories});
        }).catch((err) => {
            req.flash('erro_msg', "Error to load post form");
            res.redirect('/admin');
        }) 
    })

Ou seja, ele vai fazer uma busca no banco de dados Category. Se essa busca não tiver nenhum erro então ele vai pegar todos os elementos presentes em uma variável chamada categories e fazer com que essas variáveis carregue junto com a página addpost.handlebars.

Dentro do arquivo addpost.handlebars acrescentamos o input de categorias ficando:

    <label class="formPost-label" for="category">Category:</label>
    <select name="category" class="formPost-input">
        {{#each categories}}
            <option value="{{_id}}">{{name}}</option>
        {{else}}
            <option value="0">Nenhuma categoria registrada</option>
        {{/each}}
    </select> 

Ou seja, caso tenha alguma categoria cadastrada, na tag option ele vai conter o nome do name do id específico.

Agora com tudo adiconado, após a adicionar o model de postagem no arquivo admin.js vamos digitar no else da rota /post/new:

const newPost = {
            imageName: req.body.imageName,
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            content: req.body.content,
            category: req.body.category
        }

        new Post (newPost).save().then(() => {
            req.flash('success_msg', "Post create successfully");
            res.redirect('/admin/posts');
        }).catch((err) => {
            req.flash('error_msg', "Post save error");
            res.redirect('/admin/posts');
        })

Ficando como código finl da rota:

    router.post('/post/new', (req, res) => {
        var error = [];

        if(!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
            error.push({texto: "Invalid name"});
        }

        if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
            error.push({texto: "Invalid slug"});
        }

        if (req.body.categoria == "0") {
            erros.push({texto: "Categoria inválida, registre uma categoria"});
        }

        if (error.length > 0){
            res.render('admin/addpost', {error: error});
        } else {
            const newPost = {
                imageName: req.body.imageName,
                title: req.body.title,
                slug: req.body.slug,
                description: req.body.description,
                content: req.body.content,
                category: req.body.category
            }

            new Post (newPost).save().then(() => {
                req.flash('success_msg', "Post create successfully");
                res.redirect('/admin/posts');
            }).catch((err) => {
                req.flash('error_msg', "Post save error");
                res.redirect('/admin/posts');
            })
        }
    })

E com isso conseguimos cadastrar corretamente no banco de dados as postagens, porém ele ainda não enviar a imagem automaticamente para a pasta uploads e para isso vamos fazer outro script.

Depois de muito estudo consegui resolver essa parte, eu qeu sou iniciante tem algumas coias que ainda acho complicado.

Primeiro eu criei uma nova pasta chamada config e criei um arquivo chamado multer.js, nele fica a configuração do multer:

    const multer = require('multer');
    const path = require('path');

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null,'public/uploads/');
        },
        filename: function(req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    })

    const upload = multer({storage});

    module.exports = upload;

Aqui está a confiduração padrão de antes, porém eu decidi que as imagens agora vão ter o nome da data atual em milisegundos + a extensão da imagem.

Depois mudei a rota. Basicamente eu estou falando para a mesma rota enviar a imagem para a pasta uploads e após isso criar o banco de dados:

    router.post('/post/new', upload.single('file'), (req, res) => {
        var error = [];

        if(!req.body.title || typeof req.body.title == undefined || req.body.title == null) {
            error.push({texto: "Invalid name"});
        }

        if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
            error.push({texto: "Invalid slug"});
        }

        if (req.body.categoria == "0") {
            error.push({texto: "Categoria inválida, registre uma categoria"});
        }

        if (error.length > 0){
            res.render('admin/addpost', {error: error});
        } else {

            const newPost = {
                imageName: req.body.imageName,
                imageSrc: req.file.path,
                title: req.body.title,
                slug: req.body.slug,
                description: req.body.description,
                content: req.body.content,
                category: req.body.category
            }

            new Post (newPost).save().then(() => {
                req.flash('success_msg', "Post create successfully");
                res.redirect('/admin/posts');
            }).catch((err) => {
                req.flash('error_msg', "Post save error");
                res.redirect('/admin/posts');
            })
        }
    })

No banco de dados eu dei uma alterada. Agora temos tanto o nome original da imagem (nome que o usuário deu) e também temos o scr da imagem que contém o caminho da imagem e também o novo nome da imagem.

Aruumei também o campo da data porque estava escrito errado e agora está tudo certo deixando no banco de dados como padrão a data de publicação da imagem.

Agora vou arrumar o css do formulario de postagens e mostrar como ficou o código final:

    <form class="formPost-form" action="/admin/post/new" enctype="multipart/form-data" method="post" id="formPost-sendPost">

        <h4 class="formPost-subtitle">Add Image</h4>

        <label class="formPost-label --imageLabel" for="file"> </label>
        <input class="formPost-input --diplay-none" type="file" id="file" name="file" required>
        
        <h4 class="formPost-nameFile" id="formPost-text">No file selected ...</h4>

        <label class="formPost-label --diplay-none" for="fileName">fileName:</label>
        <input class="formPost-input --diplay-none" type="text" id="formPost-fileName" name="imageName" placeholder="File name" required readonly>

        <label class="formPost-label" for="formPost-title">Title:</label>
        <input class="formPost-input" type="text" id="formPost-title" name="title" placeholder="Post title" required>

        <label class="formPost-label" for="formPost-slug">Slug:</label>
        <input type="text" id="formPost-slug" name="slug" placeholder="Slug name" class="formPost-input --gray" readonly>

        <label class="formPost-label" for="description">Description:</label>
        <textarea rows="5" id="description" class="formPost-textarea" type="text" name="description" placeholder="Description" required></textarea>

        <label class="formPost-label" for="content">Content:</label>
        <textarea rows="10" id="content" class="formPost-textarea" type="text" name="content" placeholder="Content" required></textarea>

        <label class="formPost-label" for="category">Category:</label>
        <select name="category" class="formPost-input">
            {{#each categories}}
                <option value="{{_id}}">{{name}}</option>
            {{else}}
                <option value="0">Nenhuma categoria registrada</option>
            {{/each}}
        </select> 

        <button type="submit" id="formPost-sendForm" class="formPost-button">Create post</button>
    </form>

Agora no arquivo file.js eu vou dar uma estilizada melhor na parte do formulario dos posts, pois a única forma do usuário saber que ele adicionou uma imagem é atrvés do texto em baixo.

Então dentro do arquivo file.js fica:














