document.addEventListener('DOMContentLoaded', () => {
    const ordersContainer = document.getElementById('orders-container');

    // Pedidos de exemplo (simulando o que viria do sistema)
    let fakeOrders = [ // Mudamos para 'let' para poder modificar a lista
        {
            id: '001',
            customerName: 'Renato Almeida',
            time: '14:32',
            items: [
                { name: 'Açaí 500ml', price: 16.00 },
                { name: 'Ad: Banana', price: 2.00 },
                { name: 'Ad: Leite em Pó', price: 2.00 }
            ]
        },
        {
            id: '002',
            customerName: 'Ana Julia',
            time: '14:35',
            items: [
                { name: 'Açaí 700ml', price: 20.00 },
                { name: 'Ad: Morango', price: 3.00 },
                { name: 'Ad: Granola', price: 2.00 },
                { name: 'Ad: Leite Condensado', price: 2.00 }
            ]
        },
        {
            id: '003',
            customerName: 'Carlos Pereira',
            time: '14:38',
            items: [
                { name: 'Açaí 300ml', price: 12.00 }
            ]
        }
    ];

    // Função para mostrar os pedidos na tela
    function renderOrders() {
        ordersContainer.innerHTML = ''; // Limpa a tela
        fakeOrders.forEach(order => {
            const orderCard = document.createElement('div');
            orderCard.classList.add('order-card');
            orderCard.dataset.orderId = order.id; // Adiciona o ID ao card
            
            let itemsHtml = '';
            let total = 0;
            order.items.forEach(item => {
                itemsHtml += `<li><span>${item.name}</span><span>R$ ${item.price.toFixed(2)}</span></li>`;
                total += item.price;
            });

            orderCard.innerHTML = `
                <div class="order-card-header">
                    <h3>Pedido #${order.id}</h3>
                    <span class="order-time">${order.time}</span>
                </div>
                <div class="order-card-body">
                    <p><strong>Cliente:</strong> ${order.customerName}</p>
                    <ul>${itemsHtml}</ul>
                </div>
                <div class="order-card-footer">
                    <span class="order-total">Total: R$ ${total.toFixed(2)}</span>
                    <div> <button class="complete-btn">Concluir</button>
                        <button class="delete-btn">Excluir</button> </div>
                </div>
            `;
            ordersContainer.appendChild(orderCard);
        });

        // Adiciona funcionalidade a TODOS os botões da tela
        addEventListenersToButtons();
    }

    function addEventListenersToButtons() {
        // Para os botões de "Concluir"
        document.querySelectorAll('.complete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.order-card');
                card.style.opacity = '0.5';
                e.target.textContent = 'Concluído';
                e.target.disabled = true;
                card.querySelector('.delete-btn').disabled = true; // Desabilita o excluir também
            });
        });

        // NOVO: Para os botões de "Excluir"
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.order-card');
                const orderId = card.dataset.orderId;
                
                // Pede uma confirmação antes de excluir
                if (confirm(`Tem certeza que deseja excluir o Pedido #${orderId}?`)) {
                    card.remove(); // Remove o card da tela
                    
                    // Opcional: Remove o pedido da nossa lista de dados
                    fakeOrders = fakeOrders.filter(order => order.id !== orderId);
                    console.log('Pedidos restantes:', fakeOrders);
                }
            });
        });
    }

    // Carrega os pedidos de exemplo quando a página abre
    renderOrders();
});