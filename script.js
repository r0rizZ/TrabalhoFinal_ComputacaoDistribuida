// Chaves API
const omdbApiKey = '906ec909';
const tmdbApiKey = 'a48940ef464f8b07829cf8332f4e595f';

// Procurar Filme - Função
function searchMovie(titulo) {
  const urlOmdb = `http://www.omdbapi.com/?t=${titulo}&apikey=${omdbApiKey}`;
  
  axios.get(urlOmdb)
    .then(response => {
      const filme = response.data;
      let informacoesFilme = '';

      console.log(`Título: ${filme.Title}`);
      informacoesFilme += `Título: ${filme.Title}<br>`;
      
      console.log(`Ano: ${filme.Year}`);
      informacoesFilme += `Ano: ${filme.Year}<br>`;

      console.log(`Diretor: ${filme.Director}`);
      informacoesFilme += `Diretor: ${filme.Director}<br>`;
      
      console.log(`Elenco: ${filme.Actors}`);
      informacoesFilme += `Elenco: ${filme.Actors}<br>`;

      console.log(`Gêneros: ${filme.Genre}`);
      informacoesFilme += `Gêneros: ${filme.Genre}<br>`;

      console.log(`IMDB Rating: ${filme.imdbRating}`);
      informacoesFilme += `IMDB Rating: ${filme.imdbRating}<br>`;

      document.getElementById('informacoes-filme').innerHTML += informacoesFilme + '<br>';
      
      console.log(getMovieImage(filme.Title));
    })
    .catch(error => {
      console.error('Erro ao buscar filme no OMDb:', error);
    });
}

// Procurar Imagem - Função
async function getMovieImage(titulo) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${titulo}`;
    
    try {
        const response = await axios.get(url);
        const movieId = response.data.results[0].id;
        
        const imageUrl = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${tmdbApiKey}`;
        const imageResponse = await axios.get(imageUrl);

        if (imageResponse.data.posters.length > 0) {
            // Obtém a URL da imagem
            const imageSrc = `https://image.tmdb.org/t/p/w500${imageResponse.data.posters[0].file_path}`;
            
            // Cria um elemento <img>
            const imgElement = document.createElement('img');
            imgElement.src = imageSrc;  // Define a URL da imagem no src
            
            // Adiciona a imagem no HTML
            document.getElementById('informacoes-filme').appendChild(imgElement);
            document.getElementById('informacoes-filme').innerHTML += "<br><br>--------------------------<br><br>";
        } else {
            console.log("Imagem não encontrada.");
        }
    } catch (error) {
        console.error("Erro ao buscar imagem:", error);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('form-btn').addEventListener('click', function() {
        const nomeFilme = document.getElementById("form-input").value;
        console.log(nomeFilme);
        searchMovie(nomeFilme);
    });
});