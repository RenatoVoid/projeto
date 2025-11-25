document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos da página
    const modal = document.getElementById('item-modal');
    const addItemBtn = document.getElementById('add-item-btn');
    const closeModalBtn = document.getElementById('close-item-modal-btn');
    const editItemBtns = document.querySelectorAll('.edit-btn');
    const modalTitle = document.getElementById('modal-title');
    const itemForm = document.getElementById('item-form');
    
    // Campos do formulário
    const itemNameInput = document.getElementById('item-name');
    const itemCategoryInput = document.getElementById('item-category');
    const itemPriceInput = document.getElementById('item-price');

    // Função para abrir o modal
    const showModal = () => {
        modal.style.display = 'flex';
    };

    // Função para fechar o modal
    const hideModal = () => {
        modal.style.display = 'none';
    };

    // --- ABRIR O MODAL ---
    
    // 1. Ao clicar em "Adicionar Novo Item"
    addItemBtn.addEventListener('click', () => {
        modalTitle.textContent = 'Adicionar Novo Item';
        itemForm.reset(); // Limpa o formulário
        showModal();
    });

    // 2. Ao clicar em "Editar"
    editItemBtns.forEach(button => {
        button.addEventListener('click', (event) => {
            // Pega a linha da tabela (tr) mais próxima do botão clicado
            const row = event.target.closest('tr');
            
            // Pega os dados que colocamos no HTML (data- attributes)
            const name = row.dataset.name;
            const category = row.dataset.category;
            const price = row.dataset.price;

            // Preenche o formulário com os dados do item
            modalTitle.textContent = 'Editar Item';
            itemNameInput.value = name;
            itemCategoryInput.value = category;
            itemPriceInput.value = price;
            
            showModal();
        });
    });

    // --- FECHAR O MODAL ---

    // 1. Ao clicar no 'X'
    closeModalBtn.addEventListener('click', hideModal);

    // 2. Ao clicar fora do modal (no overlay)
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            hideModal();
        }
    });

    // 3. Ao "Salvar" (apenas fecha o modal, como pedido)
    itemForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio real do formulário
        alert('Item salvo com sucesso! (Simulação)');
        hideModal();
    });
});