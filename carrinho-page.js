// Arquivo: carrinho-page.js
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalElement = document.getElementById('cart-total');
    
    // 1. Pega os itens do "bolso mágico" (sessionStorage)
    let cart = JSON.parse(sessionStorage.getItem('shoppingCart') || '[]');

    // NOVO: Verificação para criar itens de exemplo
    // Se o carrinho real estiver vazio (comprimento é 0), a gente cria um de mentira.
    if (cart.length === 0) {
        console.log("Carrinho vazio. Criando itens de exemplo para visualização.");
        cart = [
            { name: 'Açaí Tradicional 500ml', price: 16.00 },
            { name: 'Adicional: Banana', price: 2.00 },
            { name: 'Adicional: Leite em Pó', price: 2.00 },
            { name: 'Adicional: Granola', price: 2.00 }
        ];
    }

    // A partir daqui, o resto do código funciona normalmente,
    // seja com o carrinho real ou com o nosso de mentirinha.

    let totalPrice = 0;
    
    // Agrupa itens iguais para mostrar a quantidade
    const groupedCart = cart.reduce((acc, item) => {
        if (!acc[item.name]) {
            acc[item.name] = { ...item, quantity: 0 };
        }
        acc[item.name].quantity++;
        return acc;
    }, {});

    // Limpa o container
    cartItemsContainer.innerHTML = '';

    // Cria e exibe cada item na tela
    for (const itemName in groupedCart) {
        const item = groupedCart[itemName];
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        
        const itemSubtotal = item.price * item.quantity;
        totalPrice += itemSubtotal;

        itemElement.innerHTML = `
            <span class="item-name">${item.name} (x${item.quantity})</span>
            <span class="item-price">R$ ${itemSubtotal.toFixed(2).replace('.', ',')}</span>
        `;
        cartItemsContainer.appendChild(itemElement);
    }

    // Atualiza o valor total na tela
    cartTotalElement.textContent = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
    
});