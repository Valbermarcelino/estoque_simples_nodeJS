const apiUrl = 'http://localhost:3000/produtos';

// Carregar todos os produtos ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

// Selecionar elementos
const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');

// Função para buscar e listar produtos
async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        const products = await response.json();
        renderProductList(products);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

// Função para renderizar a lista de produtos
function renderProductList(products) {
    productList.innerHTML = '';
    products.forEach(product => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${product.ref}</td>
            <td>${product.nome}</td>
            <td>${product.quantidade}</td>
            <td>${product.preco}</td>
            <td class="actions">
                <button onclick="editProduct('${product.id}')">Editar</button>
                <button onclick="deleteProduct('${product.id}')">Deletar</button>
            </td>
        `;
        productList.appendChild(row);
    });
}

// Função para adicionar ou editar um produto
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const productId = document.getElementById('productId').value;
    const ref = document.getElementById('ref').value;
    const nome = document.getElementById('nome').value;
    const quantidade = document.getElementById('quantidade').value;
    const preco = document.getElementById('preco').value;

    const productData = { ref, nome, quantidade, preco };

    try {
        if (productId) {
            // Atualizar produto existente
            await fetch(`${apiUrl}/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });
        } else {
            // Adicionar novo produto
            await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });
        }

        fetchProducts();
        productForm.reset();
    } catch (error) {
        console.error('Erro ao salvar o produto:', error);
    }
});

// Função para preencher o formulário com dados do produto a ser editado
async function editProduct(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`);
        const product = await response.json();

        document.getElementById('productId').value = product.id;
        document.getElementById('ref').value = product.ref;
        document.getElementById('nome').value = product.nome;
        document.getElementById('quantidade').value = product.quantidade;
        document.getElementById('preco').value = product.preco;
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
    }
}

// Função para deletar um produto
async function deleteProduct(id) {
    try {
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        fetchProducts();
    } catch (error) {
        console.error('Erro ao deletar o produto:', error);
    }
}
