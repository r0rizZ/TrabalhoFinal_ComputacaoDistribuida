const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

// API Keys
const omdbApiKey = '906ec909';
const tmdbApiKey = 'a48940ef464f8b07829cf8332f4e595f';

// Rota para procurar filmes
app.get('/api/search', async (req, res) => {
    const { titulo } = req.query;

    if (!titulo) {
        return res.status(400).json({ error: 'Escreva o nome de um filme.' });
    }

    try {
        // OMDb API
        const urlOmdb = `http://www.omdbapi.com/?t=${titulo}&apikey=${omdbApiKey}`;
        const responseOmdb = await axios.get(urlOmdb);

        const filme = responseOmdb.data;

        if (filme.Response === "False") {
            return res.status(404).json({ error: `Filme não encontrado: ${titulo}` });
        }

        const informacoesFilme = {
            titulo: filme.Title,
            ano: filme.Year,
            diretor: filme.Director,
            elenco: filme.Actors,
            generos: filme.Genre,
            imdbRating: filme.imdbRating,
        };

        // TMDb API 
        const urlTmdbSearch = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${titulo}`;
        const responseTmdb = await axios.get(urlTmdbSearch);

        if (responseTmdb.data.results.length > 0) {
            const movieId = responseTmdb.data.results[0].id;
            const urlTmdbImage = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${tmdbApiKey}`;
            const responseTmdbImage = await axios.get(urlTmdbImage);

            if (responseTmdbImage.data.posters.length > 0) {
                informacoesFilme.imagem = `https://image.tmdb.org/t/p/w500${responseTmdbImage.data.posters[0].file_path}`;
            }
        }

        // Pesquisa Final
        return res.json(informacoesFilme);

    } catch (error) {
        console.error('Erro ao procurar informações do filme:', error);
        return res.status(500).json({ error: 'Erro ao procurar informações do filme.' });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor a funcionar em http://localhost:${PORT}`);
});