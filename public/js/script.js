document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('form-btn').addEventListener('click', async function() {
        const nomeFilme = document.getElementById("form-input").value.trim();

        if (!nomeFilme) {
            alert("Por favor, insira o nome de um filme.");
            return;
        }

        try {
            // Fazer a requisição para o backend
            const response = await fetch(`/api/search?titulo=${nomeFilme}`);
            const filmeData = await response.json();

            if (filmeData.error) {
                alert(filmeData.error);
                return;
            }

            // Exibir informações do filme
            const informacoesFilme = `
                <strong>Título:</strong> ${filmeData.titulo}<br>
                <strong>Ano:</strong> ${filmeData.ano}<br>
                <strong>Diretor:</strong> ${filmeData.diretor}<br>
                <strong>Elenco:</strong> ${filmeData.elenco}<br>
                <strong>Gêneros:</strong> ${filmeData.generos}<br>
                <strong>IMDB Rating:</strong> ${filmeData.imdbRating}<br>
            `;

            const filmeDiv = document.createElement('div');
            filmeDiv.classList.add('filme-card');
            filmeDiv.innerHTML = informacoesFilme;

            // Adicionar o cartaz
            if (filmeData.cartaz) {
                const imgElement = document.createElement('img');
                imgElement.src = filmeData.cartaz;
                imgElement.style.maxWidth = '100%';
                imgElement.style.borderRadius = '10px';
                imgElement.style.marginTop = '10px';
                filmeDiv.appendChild(imgElement);
            }

            document.getElementById('informacoes-filme').appendChild(filmeDiv);
            
        } catch (error) {
            console.error('Erro ao buscar filme:', error);
            alert("Erro ao buscar informações do filme.");
        }
    });
});