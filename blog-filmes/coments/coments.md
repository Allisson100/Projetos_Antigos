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


























