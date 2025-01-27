document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('form-btn').addEventListener('click', function () {
        const nomeFilme = document.getElementById("form-input").value.trim();

        if (!nomeFilme) {
            alert("Escreva o nome de um filme.");
            return;
        }

        // API Express
        fetch(`/api/search?titulo=${encodeURIComponent(nomeFilme)}`)
            .then(response => response.json())
            .then(data => {
                // Limpar pesquisas anteriores
                document.getElementById('informacoes-filme').innerHTML = '';

                if (data.error) {
                    document.getElementById('informacoes-filme').innerHTML = `<p style="color: red;">${data.error}</p>`;
                    return;
                }

                // Fazer a pesquisa
                let informacoesFilme = '';
                informacoesFilme += `<strong>Título:</strong> ${data.titulo}<br>`;
                informacoesFilme += `<strong>Ano:</strong> ${data.ano}<br>`;
                informacoesFilme += `<strong>Diretor:</strong> ${data.diretor}<br>`;
                informacoesFilme += `<strong>Elenco:</strong> ${data.elenco}<br>`;
                informacoesFilme += `<strong>Géneros:</strong> ${data.generos}<br>`;
                informacoesFilme += `<strong>IMDB Rating:</strong> ${data.imdbRating}<br>`;

                const filmeDiv = document.createElement('div');
                filmeDiv.classList.add('filme-card');
                filmeDiv.innerHTML = informacoesFilme;

                if (data.imagem) {
                    const imgElement = document.createElement('img');
                    imgElement.src = data.imagem;
                    imgElement.style.maxWidth = '100%';
                    imgElement.style.borderRadius = '10px';
                    imgElement.style.marginTop = '10px';
                    filmeDiv.appendChild(imgElement);
                }

                // Mostrar informações
                document.getElementById('informacoes-filme').appendChild(filmeDiv);
            })
            .catch(error => {
                console.error('Erro ao procurar o filme:', error);
                alert('Erro ao procurar o filme. Tente novamente.');
            });
    });
});