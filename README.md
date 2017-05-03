## Blue Bank

O sistema foi desenvolvido utilizando Vagrant como máquina virtual.
Sistema operacional CentOS 6.5

Para desenvolvimento do back-end foi escolhido NodeJS. 
Foi utilizado o framework MVC SailsJS (http://sailsjs.com/) para o desenvolvimento do sistema web.
Este framework foi escolhido pois, além de utilizar arquitetura MVC, cria automaticamente a API para consumo de acordo com a estruturação do model e do controller. O SailsJS utiliza como base o framework Express.
Além disto inclui o ORM Waterline como padrão para consulta ao banco de dados.

Foi escolhido MongoDB para persistência dos dados, seguindo a seguinte estrutura:

- Collection: bluebank
- Documentos: agencia, contacorrente, cliente e movimentacaofinanceira

Para o desenvolvimento do front-end foi utilizado EJS como linguagem de template no SailsJS, HTML5, AngularJS, Bootstrap e jQuery.

## Links

- Projeto 
https://apv-bluebank.herokuapp.com/#!/home

- Git do projeto:
https://github.com/alexpviana/bluebank

- Git da preparação do projeto (layout, protótipo e Vagrant)
https://github.com/alexpviana/devbluebank

- API 
(ligado manualmente no Heroku para visualização e análise. O default é desligado em produção)
Link para o postman: https://www.getpostman.com/collections/ca7f79404ef9888dfae6

## Instruções para deploy

### Deploy manual
- Instalar NodeJS
https://nodejs.org/en/download/

- Instalar MongoDB
https://docs.mongodb.com/manual/installation/

- Clonar o git do projeto
`$ git clone https://github.com/alexpviana/bluebank bluebank`

- Instalar o framework sailsjs
`$ npm install sails -g`

- Entrar na pasta do projeto 
`$ cd bluebank`

- Instalar todas as dependências
`$ npm install`

- Subir o servidor do SailsJS
`$ sails lift`

Acessar o projeto através do link: http://localhost:1337

### Deploy via Vagrant

Se for utilizado o Vagrant para desenvolvimento, subir o serviço com o Vagrantfile do git da preparação do projeto, acessado através do link https://github.com/alexpviana/devbluebank

Foi criada uma máquina no Vagrant pronta para o desenvolvimento, e pode ser baixada em:
https://programador.co/bluebank/bluebank.box

## Informações para teste no servidor (API e acesso)

As informações abaixo foram inseridas para uso no teste da aplicação. As informações de login estão na última tabela.

### Agência
<table>
<thead><tr class="tableizer-firstrow"><th>Nome</th><th>Código</th><th>ID Mongo</th></tr></thead><tbody>
 <tr><td>Jardim Paulista</td><td>123-4</td><td>590884bc0a6dc5ac0b7a5565</td></tr>
 <tr><td>Alto da Boa Vista</td><td>3315-0</td><td>5907d72919f55e3132b68c94</td></tr>
 <tr><td>Ipiranga</td><td>234-5</td><td>590884cd0a6dc5ac0b7a5566</td></tr>
</tbody></table>

### Cliente
<table class="tableizer-table">
<thead><tr class="tableizer-firstrow"><th>Nome</th><th>CPF</th><th>ID Mongo</th><th>Senha</th></tr></thead><tbody>
 <tr><td>Cláudio Santana</td><td>86750474284</td><td>590885650a6dc5ac0b7a5567</td><td>123456</td></tr>
 <tr><td>José Alvarez</td><td>56125232700</td><td>5908857f0a6dc5ac0b7a5568</td><td>123456</td></tr>
 <tr><td>Cleiton Silva</td><td>57298154761</td><td>590885900a6dc5ac0b7a5569</td><td>123456</td></tr>
 <tr><td>Adriana Souza</td><td>31787321282</td><td>590885a00a6dc5ac0b7a556a</td><td>123456</td></tr>
 <tr><td>Paula Ferreira</td><td>26668168507</td><td>590885bf0a6dc5ac0b7a556b</td><td>123456</td></tr>
 <tr><td>Michel Nunes</td><td>72355620482</td><td>590885d10a6dc5ac0b7a556c</td><td>123456</td></tr>
</tbody></table>

### Conta Corrente
<table class="tableizer-table">
<thead><tr class="tableizer-firstrow"><th>Nome</th><th>Numero</th><th>ID</th></tr></thead><tbody>
 <tr><td>Cláudio Santana</td><td>406784-2</td><td>590886e00a6dc5ac0b7a556d</td></tr>
 <tr><td>José Alvarez</td><td>1234-5</td><td>590886fe0a6dc5ac0b7a556e</td></tr>
 <tr><td>Cleiton Silva</td><td>9876-5</td><td>590887400a6dc5ac0b7a556f</td></tr>
 <tr><td>Adriana Souza</td><td>1357-2</td><td>590887580a6dc5ac0b7a5570</td></tr>
 <tr><td>Paula Ferreira</td><td>7896-2</td><td>590887860a6dc5ac0b7a5571</td></tr>
 <tr><td>Michel Nunes</td><td>90900-2</td><td>5908879a0a6dc5ac0b7a5572</td></tr>
</tbody></table>

### Login
<table class="tableizer-table">
<thead><tr class="tableizer-firstrow"><th>Nome</th><th>Agência</th><th>Conta Corrente</th><th>Senha</th></tr></thead><tbody>
 <tr><td>Cláudio Santana</td><td>123-4</td><td>406784-2</td><td>123456</td></tr>
 <tr><td>José Alvarez</td><td>123-4</td><td>1234-5</td><td>123456</td></tr>
 <tr><td>Cleiton Silva</td><td>3315-0</td><td>9876-5</td><td>123456</td></tr>
 <tr><td>Adriana Souza</td><td>3315-0</td><td>1357-2</td><td>123456</td></tr>
 <tr><td>Paula Ferreira</td><td>234-5</td><td>7896-2</td><td>123456</td></tr>
 <tr><td>Michel Nunes</td><td>234-5</td><td>90900-2</td><td>123456</td></tr>
</tbody></table>

### Informações para transação financeira
<table class="tableizer-table">
<thead><tr class="tableizer-firstrow"><th>Nome</th><th>CPF</th><th>Agência</th><th>Conta Corrente</th></tr></thead><tbody>
 <tr><td>Cláudio Santana</td><td>86750474284</td><td>123-4</td><td>406784-2</td></tr>
 <tr><td>José Alvarez</td><td>56125232700</td><td>123-4</td><td>1234-5</td></tr>
 <tr><td>Cleiton Silva</td><td>57298154761</td><td>3315-0</td><td>9876-5</td></tr>
 <tr><td>Adriana Souza</td><td>31787321282</td><td>3315-0</td><td>1357-2</td></tr>
 <tr><td>Paula Ferreira</td><td>26668168507</td><td>234-5</td><td>7896-2</td></tr>
 <tr><td>Michel Nunes</td><td>72355620482</td><td>234-5</td><td>90900-2</td></tr>
</tbody></table>
