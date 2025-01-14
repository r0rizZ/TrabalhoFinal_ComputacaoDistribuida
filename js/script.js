// Chaves API
const omdbApiKey = '906ec909';
const tmdbApiKey = 'a48940ef464f8b07829cf8332f4e595f';

// Procurar Filme - Função
function searchMovie(titulo) {
    const urlOmdb = `http://www.omdbapi.com/?t=${titulo}&apikey=${omdbApiKey}`;
    
    axios.get(urlOmdb)
        .then(response => {
            const filme = response.data;

            if (filme.Response === "False") {
                document.getElementById('informacoes-filme').innerHTML += `<p style="color: red;">Filme não encontrado: ${titulo}</p><div class="divider"></div>`;
                return;
            }

            let informacoesFilme = '';

            // Adicionando informações do filme
            informacoesFilme += `<strong>Título:</strong> ${filme.Title}<br>`;
            informacoesFilme += `<strong>Ano:</strong> ${filme.Year}<br>`;
            informacoesFilme += `<strong>Diretor:</strong> ${filme.Director}<br>`;
            informacoesFilme += `<strong>Elenco:</strong> ${filme.Actors}<br>`;
            informacoesFilme += `<strong>Gêneros:</strong> ${filme.Genre}<br>`;
            informacoesFilme += `<strong>IMDB Rating:</strong> ${filme.imdbRating}<br>`;

            // Adiciona as informações no contêiner
            const filmeDiv = document.createElement('div');
            filmeDiv.classList.add('filme-card');
            filmeDiv.innerHTML = informacoesFilme;

            document.getElementById('informacoes-filme').appendChild(filmeDiv);

            // Buscar e adicionar a imagem do filme
            getMovieImage(filme.Title);
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

        if (response.data.results.length === 0) {
            console.log("Imagem não encontrada.");
            return;
        }

        const movieId = response.data.results[0].id;
        const imageUrl = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${tmdbApiKey}`;
        const imageResponse = await axios.get(imageUrl);

        if (imageResponse.data.posters.length > 0) {
            // Obtém a URL da imagem
            const imageSrc = `https://image.tmdb.org/t/p/w500${imageResponse.data.posters[0].file_path}`;

            // Cria um elemento <img>
            const imgElement = document.createElement('img');
            imgElement.src = imageSrc;
            imgElement.style.maxWidth = '100%'; // Ajusta o tamanho da imagem
            imgElement.style.borderRadius = '10px';
            imgElement.style.marginTop = '10px';

            // Adiciona a imagem no último filme
            const lastFilmCard = document.querySelector('.filme-card:last-child');
            lastFilmCard.appendChild(imgElement);
        }
    } catch (error) {
        console.error("Erro ao buscar imagem:", error);
    }

    // Adiciona uma linha divisória após o filme
    const divider = document.createElement('div');
    divider.classList.add('divider');
    document.getElementById('informacoes-filme').appendChild(divider);
}

// Configurar botão de pesquisa
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('form-btn').addEventListener('click', function() {
        const nomeFilme = document.getElementById("form-input").value.trim();

        if (!nomeFilme) {
            alert("Por favor, insira o nome de um filme.");
            return;
        }

        searchMovie(nomeFilme);
    });
});