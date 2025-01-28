require('dotenv').config();

const express = require('express');
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');
const app = express();
const PORT = 3000;

// APIs
const omdbApiKey = process.env.OMDB_API_KEY;
const tmdbApiKey = process.env.TMDB_API_KEY;

// Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.static('public'));

// Pesquisar Filmes
app.get('/api/search', async (req, res) => {
    const { titulo } = req.query;

    if (!titulo) {
        return res.status(400).json({ error: 'Por favor, forneça o nome de um filme.' });
    }

    try {
        // OMDb API
        const urlOmdb = `http://www.omdbapi.com/?t=${titulo}&apikey=${omdbApiKey}`;
        const responseOmdb = await axios.get(urlOmdb);
        const filme = responseOmdb.data;

        if (filme.Response === "False") {
            return res.status(404).json({ error: `Filme não encontrado: ${titulo}` });
        }

        const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        const informacoesFilme = {
            titulo: filme.Title,
            ano: filme.Year,
            diretor: filme.Director,
            elenco: filme.Actors,
            generos: filme.Genre,
            imdbRating: filme.imdbRating,
            ip_utilizador: ipAddress
        };

        // TMDb API 
        const urlTmdbSearch = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${titulo}`;
        const responseTmdb = await axios.get(urlTmdbSearch);

        if (responseTmdb.data.results.length > 0) {
            const movieId = responseTmdb.data.results[0].id;
            const urlTmdbImage = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${tmdbApiKey}`;
            const responseTmdbImage = await axios.get(urlTmdbImage);

            if (responseTmdbImage.data.posters.length > 0) {
                informacoesFilme.cartaz = `https://image.tmdb.org/t/p/w500${responseTmdbImage.data.posters[0].file_path}`;
            }
        }
        
        const { error } = await supabase.from('filmes').insert([informacoesFilme]);
        if (error) {
            console.error('Erro ao salvar no Supabase:', error);
            return res.status(500).json({ error: 'Erro ao salvar filme no banco de dados.' });
        }

        return res.json(informacoesFilme);

    } catch (error) {
        console.error('Erro ao buscar informações do filme:', error);
        return res.status(500).json({ error: 'Erro ao buscar informações do filme.' });
    }
});

// Histórico Pesquisas
app.get('/api/history', async (req, res) => {
    try {
        const { data, error } = await supabase.from('filmes').select('*').order('timestamp', { ascending: false });

        if (error) {
            console.error('Erro ao buscar histórico do Supabase:', error);
            return res.status(500).json({ error: 'Erro ao buscar histórico.' });
        }

        return res.json(data);
    } catch (error) {
        console.error('Erro ao processar a solicitação de histórico:', error);
        return res.status(500).json({ error: 'Erro ao processar a solicitação de histórico.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});