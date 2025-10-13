document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartCountElement = document.getElementById('cart-count');
    
    let cart = [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.dataset.name;
            const productPrice = parseFloat(button.dataset.price);

            const product = {
                name: productName,
                price: productPrice
            };
            
            cart.push(product);
            
            console.log('Carrinho atualizado:', cart);
            
            updateCartUI();
        });
    });

    function updateCartUI() {
        cartCountElement.textContent = cart.length;
    }
});

/////

// ... (todo o código anterior continua igual)

// 3. FUNÇÃO PARA ATUALIZAR A INTERFACE
function updateCartUI() {
    // Atualiza o número no ícone do carrinho
    cartCountElement.textContent = cart.length;
    
    // NOVO: Guarda a lista completa do carrinho no "bolso mágico" do navegador
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
}