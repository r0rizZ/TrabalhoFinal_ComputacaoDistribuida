# CineLink

CineLink é uma solução inovadora desenvolvida no âmbito da Computação Distribuída, que utiliza duas APIs externas (OMDb API e TMDb API) para facilitar a pesquisa e visualização de informações sobre filmes, enquanto armazena dados relevantes numa base de dados Supabase. Este protótipo explora o potencial de integração com cinemas e utilizadores, permitindo a utilização de cartazes digitais e a análise de tendências cinematográficas com base no histórico de pesquisas. 

# Tecnologias Utilizadas

- **Node.js** - Plataforma para execução de JavaScript no backend.
- **Express.js** - Framework para Node.js utilizado para criar o servidor.
- **Axios** - Biblioteca para requisições HTTP.
- **Supabase** - Base de dados baseada em PostgreSQL para armazenar dados de filmes e o histórico de pesquisas.
- **OMDb API** - API para obter informações detalhadas sobre filmes.
- **TMDb API** - API utilizada para obter cartazes de filmes.
- **HTML/CSS/JavaScript** - Tecnologias para a criação da interface do utilizador.

# Funcionalidades do Protótipo

- **Pesquisa de Filmes**: Os utilizadores podem pesquisar por filmes pelo título. Exibe informações detalhadas do filme, incluindo: Título Ano de lançamento Diretor Elenco Géneros Classificação no IMDb Cartaz (poster)
- **Exibição de Cartazes**: O cartaz correspondente ao filme pesquisado é carregado através da TMDb API e exibido junto das informações do filme.
- **Histórico de Pesquisas**:  Todas as pesquisas realizadas são armazenadas no Supabase, incluindo:
  ```bash
      - ID: Identificador único do registo.
      - Título: Nome do filme pesquisado.
      - Ano: Ano de lançamento do filme.
      - Diretor: Nome do diretor do filme.
      - Elenco: Principais atores do filme.
      - Género: Géneros associados ao filme.
      - IMDb Rating: Classificação do filme no IMDb.
      - Cartaz: URL para o cartaz do filme.
      - IP do Utilizador: Endereço IP de onde foi feita a pesquisa.
      - Timestamp: Data e hora exatas da pesquisa.
  ```

# Vantagens do Projeto para os Cinemas

- **Redução de Custos**: Substituição de cartazes físicos por exibição digital.
- **Atualizações Automáticas**: Ecrãs digitais atualizados sem intervenção manual.
- **Decisões Baseadas em Dados**: Análise do histórico de pesquisas para identificar tendências.

# Vantagens do Projeto para os Cinemas

- **Informações Centralizadas**: Acesso rápido a detalhes sobre filmes em exibição.
- **Possibilidade de Votação**: Futura implementação de sistemas para votação de reexibições.
- **Sugestões Personalizadas**: Planeamento para recomendações baseadas em localização e histórico.
  
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

## 3. Configurar as credenciais das APIs e da Supabase num ficheiro .env

```bash
omdbApiKey = 'colocar_omdb_api_key';
tmdbApiKey = 'colocar_tmdb_api_key';
supabaseUrl = 'colocar_supabase_url'
supabaseKey = 'colocar_supabase_key';
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
|-- Dockerfile              # Definição da imagem Docker
```

# APIs Utilizadas

```bash
-OMDb API: Proporciona informações detalhadas sobre filmes, incluindo título, elenco, diretor, entre outros.
-TMDb API: Fornece cartazes de alta qualidade para os filmes.
```

## Realizado por:
  **- Ricardo Faria**
  **- Ricardo Rocha**
  **- João Moreira**
  **- Vítor Cunha**
