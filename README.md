# Projeto de Pesquisa de Filmes

Este é um projeto simples que utiliza duas APIs externas (OMDb API e TMDb API).
A OMDb API procurar informações sobre filmes enquanto que a TMDb API procura o carta que corresponde a esse filme.
Juntando as informações obtidas das duas APIs, os dados da pesquisa são armazenados numa base de dados Supabase.

# Tecnologias Utilizadas

- **Node.js** - Para o servidor backend.
- **Express.js** - Framework para Node.js para criação do servidor.
- **Axios** - Biblioteca para fazer requisições HTTP.
- **Supabase** - Serviço de base de dados baseado em PostgreSQL para armazenar os dados dos filmes e o histórico de buscas.
- **OMDb API** - API para obter informações sobre filmes.
- **TMDb API** - API para obter cartazes de filmes.
- **HTML/CSS/JavaScript** - Para criar a interface do utilizador.

# Funcionalidades

- **Pesquisa de Filmes**: Através do campo de pesquisa de filmes, o utilizador pode procurar filmes e ver informações desse filme, como título, ano de lançamento, diretor, elenco, géneros e classificação do IMDB.
- **Exibição de Cartazes**: O cartaz do filme é carregado através da API TMDb e é exibido junto das informações sobre o filme.

# Configuração do Projeto

## 1. Clonar o repositório

```bash
git clone https://github.com/r0rizZ/TrabalhoFinal_ComputacaoDistribuida.git
cd TrabalhoFinal_ComputacaoDistribuida
```

## 2. Instalar as dependências

```bash
npm install
npm install express axios @supabase/supabase-js dotenv
```

## 3. Configurar as credenciais das APIs e da Supabase

```bash
omdbApiKey = '906ec909';
tmdbApiKey = 'a48940ef464f8b07829cf8332f4e595f';
supabaseUrl = 'https://hawxsfoeqdrvlvxncqsj.supabase.co'
supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhhd3hzZm9lcWRydmx2eG5jcXNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5OTUzMTIsImV4cCI6MjA1MzU3MTMxMn0.Ydwrl_tcaYSgK8Wfw9dAx1rCPYdI1H_E41f-orB4XY';
```

## 4. Iniciar o servidor

```bash
node server.js
```

# Estrutura do Projeto

```bash
/TrabalhoFinal_ComputacaoDistribuida
|-- /public
|   |-- index.html          # Página principal
|   |-- /css
|   |   |-- style.css       # Estilos da página
|   |-- /js
|   |   |-- script.js       # Lógica JavaScript da página
|-- server.js               # Servidor Node.js que interage com as APIs e o Supabase
|-- package.json            # Dependências e scripts do projeto
```
