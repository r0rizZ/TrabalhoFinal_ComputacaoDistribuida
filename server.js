// Inicialização
const express = require('express');
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');
const app = express();
const PORT = 3000;

// APIs
const omdbApiKey = '906ec909';
const tmdbApiKey = 'a48940ef464f8b07829cf8332f4e595f';

// Supabase
const supabaseUrl = 'https://hawxsfoeqdrvlvxncqsj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhhd3hzZm9lcWRydmx2eG5jcXNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5OTUzMTIsImV4cCI6MjA1MzU3MTMxMn0.Ydwrl_tcaY-SgK8Wfw9dAx1rCPYdI1H_E41f-orB4XY';
const supabase = createClient(supabaseUrl, supabaseKey);

// Utilizar ficheiros da pasta public (HTML, CSS, JS)
app.use(express.static('public'));

// Rota para realizar a pesquisa
app.get('/api/search', async (req, res) => {
    const { titulo } = req.query;

    if (!titulo) {
        return res.status(400).json({ error: 'Por favor, forneça o nome de um filme.' });
    }

    try {
        // OMDb API - Buscar informações básicas do filme
        const urlOmdb = `http://www.omdbapi.com/?t=${titulo}&apikey=${omdbApiKey}`;
        const responseOmdb = await axios.get(urlOmdb);
        const filme = responseOmdb.data;

        if (filme.Response === "False") {
            return res.status(404).json({ error: `Filme não encontrado: ${titulo}` });
        }

        // Obter o IP do utilizador
        const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        // Criar o objeto com as informações do filme
        const informacoesFilme = {
            titulo: filme.Title,
            ano: filme.Year,
            diretor: filme.Director,
            elenco: filme.Actors,
            generos: filme.Genre,
            imdbRating: filme.imdbRating,
            ip_utilizador: ipAddress
        };

        // TMDb API - Buscar imagem do filme
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
        
        // Inserir no Supabase
        const { error } = await supabase.from('filmes').insert([informacoesFilme]);
        if (error) {
            console.error('Erro ao salvar no Supabase:', error);
            return res.status(500).json({ error: 'Erro ao salvar filme no banco de dados.' });
        }

        // Resposta final
        return res.json(informacoesFilme);

    } catch (error) {
        console.error('Erro ao buscar informações do filme:', error);
        return res.status(500).json({ error: 'Erro ao buscar informações do filme.' });
    }
});

// Rota para obter o histórico de requisições
app.get('/api/history', async (req, res) => {
    try {
        // Buscar todos os filmes da tabela
        const { data, error } = await supabase.from('filmes').select('*');

        console.log('Dados retornados:', data);  // Verifique o que está retornando
        console.log('Erro:', error);  // Se houver erro, ele será mostrado aqui

        if (error) {
            console.error('Erro ao buscar histórico de filmes:', error);
            return res.status(500).json({ error: 'Erro ao carregar histórico de filmes.' });
        }

        return res.json(data); // Retorna os dados para o front-end


    } catch (error) {
        console.error('Erro ao buscar histórico de filmes:', error);
        return res.status(500).json({ error: 'Erro ao carregar histórico de filmes.' });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});