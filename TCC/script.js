const menuData = {
    salgadas: [
        { id: 1, name: 'Margherita', description: 'Molho de tomate, mussarela e manjericão', prices: { pequena: 25.00, media: 35.00, grande: 45.00 }, image: 'pizza_margherita.jpg' },
        { id: 2, name: 'Calabresa', description: 'Calabresa, cebola, mussarela e azeitonas', prices: { pequena: 28.00, media: 38.00, grande: 48.00 }, image: 'pizza_calabresa.jpg' },
        { id: 3, name: 'Portuguesa', description: 'Presunto, ovos, cebola, azeitonas e mussarela', prices: { pequena: 32.00, media: 42.00, grande: 52.00 }, image: 'pizza_portuguesa.jpg' },
        { id: 4, name: 'Quatro Queijos', description: 'Mussarela, provolone, gorgonzola e parmesão', prices: { pequena: 35.00, media: 45.00, grande: 55.00 }, image: 'pizza_quatro_queijos.jpg' },
        { id: 5, name: 'Frango Catupiry', description: 'Frango desfiado, catupiry e mussarela', prices: { pequena: 30.00, media: 40.00, grande: 50.00 }, image: 'pizza_frango_catupiry.jpg' },
        { id: 6, name: 'Bacon', description: 'Bacon, mussarela, cebola e orégano', prices: { pequena: 33.00, media: 43.00, grande: 53.00 }, image: 'pizza_bacon.jpg' }
    ],
    doces: [
        { id: 7, name: 'Chocolate', description: 'Chocolate ao leite derretido e granulado', prices: { pequena: 22.00, media: 32.00, grande: 42.00 }, image: 'pizza_chocolate.jpg' },
        { id: 8, name: 'Romeu e Julieta', description: 'Goiabada cremosa e queijo mussarela', prices: { pequena: 25.00, media: 35.00, grande: 45.00 }, image: 'pizza_romeu_julieta.jpg' },
        { id: 9, name: 'Banana Nevada', description: 'Banana, canela, açúcar e leite condensado', prices: { pequena: 23.00, media: 33.00, grande: 43.00 }, image: 'pizza_banana_nevada.jpg' },
        { id: 10, name: 'Prestígio', description: 'Chocolate e coco ralado', prices: { pequena: 26.00, media: 36.00, grande: 46.00 }, image: 'pizza_prestigio.jpg' }
    ],
    bebidas: [
        { id: 11, name: 'Refrigerante 2L', description: 'Coca-Cola, Guaraná ou Fanta', price: 10.00, image: 'refrigerante_2l.jpg' },
        { id: 12, name: 'Suco Natural 1L', description: 'Laranja, limão ou maracujá', price: 12.00, image: 'suco_natural_1l.jpg' },
        { id: 13, name: 'Água Mineral', description: 'Garrafa 500ml', price: 4.00, image: 'agua_mineral.jpg' },
        { id: 14, name: 'Cerveja Lata', description: 'Diversas marcas disponíveis', price: 6.00, image: 'cerveja_lata.jpg' }
    ]
};
let cart = [];
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const menuItems = document.getElementById('menuItems');
const tabBtns = document.querySelectorAll('.tab-btn');
const cartCount = document.getElementById('cartCount');
const cartSection = document.getElementById('cart');
const cartItemsContainer = document.getElementById('cartItems');
const modal = document.getElementById('modal');
const checkoutBtn = document.getElementById('checkoutBtn');
const closeModal = document.querySelector('.close');
const contactForm = document.getElementById('contactForm');
const checkoutForm = document.getElementById('checkoutForm');
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
       
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
       
        if (targetId === 'cart') {
            cartSection.style.display = 'block';
            renderCart();
        }
        
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
        
       
        navLinks.classList.remove('active');
    });
});
function renderMenu(category) {
    menuItems.innerHTML = '';
    const items = menuData[category];
    
    items.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        
        
        if (item.prices) {
            menuItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="menu-item-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="size-options">
                        <button class="size-btn" data-id="${item.id}" data-size="pequena">Pequena<br>R$ ${item.prices.pequena.toFixed(2).replace('.', ',')}</button>
                        <button class="size-btn" data-id="${item.id}" data-size="media">Média<br>R$ ${item.prices.media.toFixed(2).replace('.', ',')}</button>
                        <button class="size-btn" data-id="${item.id}" data-size="grande">Grande<br>R$ ${item.prices.grande.toFixed(2).replace('.', ',')}</button>
                    </div>
                </div>
            `;
        } else {
            menuItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="menu-item-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="menu-item-footer">
                        <span class="price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                        <button class="btn-add" data-id="${item.id}">Adicionar</button>
                    </div>
                </div>
            `;
        }
        menuItems.appendChild(menuItem);
    });
    
   
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const itemId = parseInt(btn.getAttribute('data-id'));
            const size = btn.getAttribute('data-size');
            addToCart(itemId, size);
        });
    });
    
   
    document.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', () => {
            const itemId = parseInt(btn.getAttribute('data-id'));
            addToCart(itemId);
        });
    });
}
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.getAttribute('data-category');
        renderMenu(category);
    });
});
function addToCart(itemId, size = null) {
    const allItems = [...menuData.salgadas, ...menuData.doces, ...menuData.bebidas];
    const item = allItems.find(i => i.id === itemId);
    
    let cartItem;
    if (size) {
        
        const price = item.prices[size];
        const existingItem = cart.find(i => i.id === itemId && i.size === size);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItem = { ...item, size: size, price: price, quantity: 1 };
            cart.push(cartItem);
        }
    } else {
        
        const existingItem = cart.find(i => i.id === itemId && !i.size);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
    }
    
    updateCartCount();
    showNotification('Item adicionado ao carrinho!');
}
function updateCartCount() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = total;
}
function renderCart() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; padding: 2rem;">Seu carrinho está vazio</p>';
        const cartSummary = document.querySelector('.cart-summary');
        if (cartSummary) cartSummary.style.display = 'none';
        return;
    }
    
    const cartSummary = document.querySelector('.cart-summary');
    if (cartSummary) cartSummary.style.display = 'block';
    cartItemsContainer.innerHTML = '';
    
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        const sizeMap = { 'pequena': 'Pequena', 'media': 'Média', 'grande': 'Grande' };
        const sizeText = item.size ? ` (${sizeMap[item.size] || item.size})` : '';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h3>${item.name}${sizeText}</h3>
                <p>R$ ${item.price.toFixed(2).replace('.', ',')}</p>
            </div>
            <div class="cart-item-controls">
                <button class="qty-btn" data-index="${index}" data-action="decrease">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" data-index="${index}" data-action="increase">+</button>
                <button class="qty-btn" data-index="${index}" data-action="remove">🗑️</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    
    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const itemIndex = parseInt(btn.getAttribute('data-index'));
            const action = btn.getAttribute('data-action');
            updateCartItem(itemIndex, action);
        });
    });
    
    updateCartSummary();
}
function updateCartItem(itemIndex, action) {
    const item = cart[itemIndex];
    
    if (action === 'increase') {
        item.quantity++;
    } else if (action === 'decrease') {
        item.quantity--;
        if (item.quantity === 0) {
            cart.splice(itemIndex, 1);
        }
    } else if (action === 'remove') {
        cart.splice(itemIndex, 1);
    }
    
    updateCartCount();
    renderCart();
}
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = subtotal >= 50 ? 0 : 8;
    const total = subtotal + deliveryFee;
    
    const formatCurrency = (value) => value.toFixed(2).replace('.', ',');
    document.getElementById('subtotal').textContent = `R$ ${formatCurrency(subtotal)}`;
    document.getElementById('deliveryFee').textContent = deliveryFee === 0 ? 'GRÁTIS' : `R$ ${formatCurrency(deliveryFee)}`;
    document.getElementById('total').textContent = `R$ ${formatCurrency(total)}`;
}
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Adicione itens ao carrinho primeiro!');
        return;
    }
    modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Pedido confirmado! Entraremos em contato em breve.');
    modal.style.display = 'none';
    cart = [];
    updateCartCount();
    renderCart();
    checkoutForm.reset();
});
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Mensagem enviada com sucesso! Responderemos em breve.');
    contactForm.reset();
});
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #228B22;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);


renderMenu('salgadas');

