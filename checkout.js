document.addEventListener('DOMContentLoaded', () => {
    // 1. Encontrar os elementos na tela
    const summaryItemsContainer = document.getElementById('summary-items');
    const summaryTotalElement = document.getElementById('summary-total');
    const checkoutForm = document.getElementById('checkout-form');

    // 2. Tentar pegar o carrinho do "bolso mágico"
    let cart = JSON.parse(sessionStorage.getItem('shoppingCart') || '[]');

    // NOVO: Bloco para criar itens de exemplo (igual fizemos no carrinho)
    // Se o carrinho real estiver vazio, a gente cria um de mentira para visualização.
    if (cart.length === 0) {
        console.log("Carrinho real vazio. Criando itens de exemplo para o checkout.");
        cart = [
            { name: 'Açaí Tradicional 500ml', price: 16.00 },
            { name: 'Adicional: Banana', price: 2.00 },
            { name: 'Adicional: Leite em Pó', price: 2.00 },
            { name: 'Adicional: Granola', price: 2.00 }
        ];
    }

    // O resto do código agora funciona com o carrinho real ou o de exemplo
    let totalPrice = 0;
    summaryItemsContainer.innerHTML = ''; // Limpa a área

    const groupedCart = cart.reduce((acc, item) => {
        if (!acc[item.name]) {
            acc[item.name] = { ...item, quantity: 0 };
        }
        acc[item.name].quantity++;
        return acc;
    }, {});

    for (const itemName in groupedCart) {
        const item = groupedCart[itemName];
        const itemElement = document.createElement('div');
        itemElement.classList.add('summary-item');
        
        const itemSubtotal = item.price * item.quantity;
        totalPrice += itemSubtotal;

        itemElement.innerHTML = `
            <span class="name">${item.name} (x${item.quantity})</span>
            <span class="price">R$ ${itemSubtotal.toFixed(2).replace('.', ',')}</span>
        `;
        summaryItemsContainer.appendChild(itemElement);
    }

    summaryTotalElement.textContent = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;

    // Lógica para o botão "Confirmar Pedido"
    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        sessionStorage.removeItem('shoppingCart');
        window.location.href = 'confirmacao.html';
    });
});