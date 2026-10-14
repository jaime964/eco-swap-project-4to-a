/**
 * EcoSwap 🌱 - Interactive Client Logic & Reactive State
 */

// Datos iniciales ampliados con los dos originales del usuario
const DEFAULT_ITEMS = [
  {
    id: '1',
    title: 'Libro de Programación en React',
    category: 'Libros',
    points: 50,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=500&q=80',
    user: 'Ana G.',
    distance: '0.8 km',
    condition: 'Excelente estado',
    co2: '2.5 kg',
    description: 'Manual práctico de desarrollo en React y React Native. Excelente para iniciarse en proyectos modernos y buenas prácticas.'
  },
  {
    id: '2',
    title: 'Cafetera de émbolo (Vidrio)',
    category: 'Electrodomésticos',
    points: 120,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80',
    user: 'Carlos M.',
    distance: '1.4 km',
    condition: 'Como nueva',
    co2: '4.8 kg',
    description: 'Prensa francesa de vidrio borosilicato y émbolo de acero inoxidable. Capacidad para 3 tazas de café o infusiones.'
  },
  {
    id: '3',
    title: 'Monstera Deliciosa en maceta artesanal',
    category: 'Plantas & Jardín',
    points: 40,
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=500&q=80',
    user: 'Lucía R.',
    distance: '0.5 km',
    condition: 'Sana y con brotes',
    co2: '3.1 kg',
    description: 'Hermosa planta purificadora de ambiente. Incluye maceta de terracota sellada y sustrato orgánico.'
  },
  {
    id: '4',
    title: 'Auriculares Bluetooth Cancelación Ruido',
    category: 'Tecnología',
    points: 180,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80',
    user: 'Martín D.',
    distance: '2.1 km',
    condition: 'Muy buen estado',
    co2: '9.2 kg',
    description: 'Almohadillas confortables, conector USB-C y autonomía de 22 horas continuas. Funciona perfecto.'
  },
  {
    id: '5',
    title: 'Chaqueta Denim Vintage Upcycled',
    category: 'Moda Sostenible',
    points: 90,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=500&q=80',
    user: 'Sofía P.',
    distance: '1.2 km',
    condition: 'Impecable',
    co2: '14.5 kg',
    description: 'Campera de mezclilla recuperada con apliques botánicos bordados a mano. Talle M unisex.'
  },
  {
    id: '6',
    title: 'Set de Botellas Térmicas de Acero',
    category: 'Hogar & Deco',
    points: 60,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80',
    user: 'Diego F.',
    distance: '3.0 km',
    condition: 'Nuevo sin uso',
    co2: '6.0 kg',
    description: 'Doble capa térmica libre de BPA. Mantiene agua fría 24 horas y caliente 12 horas. Reemplaza cientos de descartables.'
  }
];

const PRESET_IMAGES = [
  { label: 'Planta', url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=500&q=80' },
  { label: 'Libros', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=500&q=80' },
  { label: 'Taza / Deco', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80' },
  { label: 'Ropa', url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=500&q=80' }
];

const INITIAL_MISSIONS = [
  { id: 'm1', title: 'Dona un libro o artículo infantil', pointsReward: 40, icon: '📖', completed: false },
  { id: 'm2', title: 'Completar tu primer canje comunitario', pointsReward: 35, icon: '🤝', completed: false },
  { id: 'm3', title: 'Trae tu propia bolsa reutilizable', pointsReward: 15, icon: '🛍️', completed: false },
  { id: 'm4', title: 'Comparte EcoSwap con un vecino', pointsReward: 20, icon: '🌱', completed: false }
];

// Estado de la Aplicación con persistencia en localStorage
class EcoSwapState {
  constructor() {
    this.userPoints = parseInt(localStorage.getItem('ecoswap_points')) || 250;
    
    const savedItems = localStorage.getItem('ecoswap_items');
    this.items = savedItems ? JSON.parse(savedItems) : DEFAULT_ITEMS;

    const savedClaimed = localStorage.getItem('ecoswap_claimed');
    this.claimedItems = savedClaimed ? JSON.parse(savedClaimed) : [];

    const savedHistory = localStorage.getItem('ecoswap_history');
    this.history = savedHistory ? JSON.parse(savedHistory) : [
      { id: 'h1', desc: 'Bono de bienvenida a EcoSwap', amount: '+250 Pts', date: 'Hoy' }
    ];

    const savedMissions = localStorage.getItem('ecoswap_missions');
    this.missions = savedMissions ? JSON.parse(savedMissions) : INITIAL_MISSIONS;

    this.selectedCategory = 'all';
    this.searchQuery = '';
    this.currentTab = 'feed';
  }

  save() {
    localStorage.setItem('ecoswap_points', this.userPoints);
    localStorage.setItem('ecoswap_items', JSON.stringify(this.items));
    localStorage.setItem('ecoswap_claimed', JSON.stringify(this.claimedItems));
    localStorage.setItem('ecoswap_history', JSON.stringify(this.history));
    localStorage.setItem('ecoswap_missions', JSON.stringify(this.missions));
  }

  addPoints(amount, reason) {
    this.userPoints += amount;
    this.history.unshift({
      id: 'h_' + Date.now(),
      desc: reason,
      amount: `+${amount} Pts`,
      date: 'Hace un instante'
    });
    this.save();
  }

  deductPoints(amount, reason) {
    this.userPoints -= amount;
    this.history.unshift({
      id: 'h_' + Date.now(),
      desc: reason,
      amount: `-${amount} Pts`,
      date: 'Hace un instante'
    });
    this.save();
  }
}

const state = new EcoSwapState();

// ==========================================
// Toast & Feedback System
// ==========================================
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'toast-error' : type === 'warning' ? 'toast-warning' : ''}`;
  
  const icon = type === 'error' ? '❌' : type === 'warning' ? '⚠️' : '✅';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3800);
}

// ==========================================
// Confetti Animation Engine
// ==========================================
function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const colors = ['#10b981', '#34d399', '#059669', '#f59e0b', '#fbbf24', '#60a5fa'];

  for (let i = 0; i < 70; i++) {
    pieces.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height / 3 + (Math.random() - 0.5) * 100,
      w: Math.random() * 9 + 4,
      h: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 12,
      vy: Math.random() * -12 - 4,
      gravity: 0.38,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      opacity: 1
    });
  }

  let animationFrame;
  function updateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.012;

      if (p.opacity > 0) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
    });

    if (alive) {
      animationFrame = requestAnimationFrame(updateConfetti);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  updateConfetti();
}

// ==========================================
// UI Rendering
// ==========================================
function updatePointsDisplay() {
  const headerPoints = document.getElementById('header-points-val');
  const walletBig = document.getElementById('wallet-balance-big');
  if (headerPoints) headerPoints.textContent = `${state.userPoints} Pts`;
  if (walletBig) walletBig.textContent = `${state.userPoints} Pts`;

  // Render Wallet history list
  const historyList = document.getElementById('wallet-history-list');
  if (historyList) {
    historyList.innerHTML = state.history.map(item => `
      <div style="display:flex; justify-content:space-between; align-items:center; padding: 0.5rem 0.75rem; background: var(--bg-surface); border-radius: var(--radius-sm); border: 1px solid var(--border-light); font-size: 0.85rem;">
        <div>
          <div style="font-weight: 600;">${item.desc}</div>
          <div style="font-size: 0.75rem; color: var(--text-subtle);">${item.date}</div>
        </div>
        <div style="font-weight: 700; color: ${item.amount.startsWith('+') ? 'var(--color-primary-dark)' : 'var(--color-danger)'};">
          ${item.amount}
        </div>
      </div>
    `).join('');
  }
}

function renderFeed() {
  const grid = document.getElementById('items-grid');
  const counter = document.getElementById('items-counter');
  if (!grid) return;

  // Filtrado por categoría y búsqueda
  const filtered = state.items.filter(item => {
    const matchCategory = state.selectedCategory === 'all' || item.category.toLowerCase() === state.selectedCategory.toLowerCase();
    const matchSearch = item.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                        item.category.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                        (item.user && item.user.toLowerCase().includes(state.searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  if (counter) {
    counter.textContent = `${filtered.length} disponible${filtered.length === 1 ? '' : 's'}`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🍃</div>
        <h4 class="empty-title">No hay objetos en esta búsqueda</h4>
        <p class="empty-desc">Prueba cambiando los filtros o sé el primero en donar algo de esta categoría a tu vecindario.</p>
        <button class="btn-primary" onclick="openPublishModal()">
          <span>➕</span> Publicar un Objeto
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const canAfford = state.userPoints >= item.points;
    return `
      <article class="card" data-id="${item.id}">
        <div class="card-image-wrap" onclick="openDetailModal('${item.id}')" style="cursor: pointer;" title="Ver detalles ecológicos">
          <img src="${item.image}" alt="${item.title}" class="card-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=500&q=80'">
          <div class="card-badge-top">
            <span>🌿</span> ${item.condition || 'Buen estado'}
          </div>
          <div class="card-distance">
            📍 ${item.distance || 'Cerca de ti'}
          </div>
        </div>

        <div class="card-body">
          <div class="card-top-info" onclick="openDetailModal('${item.id}')" style="cursor: pointer;">
            <div class="card-category">
              <span>🏷️</span> ${item.category}
            </div>
            <h4 class="card-title">${item.title}</h4>
            <div class="card-user">
              <span>👤</span> Por ${item.user || 'Vecino solidario'}
            </div>
          </div>

          <div class="card-footer">
            <div class="card-points">
              <span class="points-val">⭐ ${item.points} Pts</span>
              <span class="points-hint">Evita ~${item.co2 || '2.0 kg'} CO₂</span>
            </div>

            <button 
              class="btn-claim ${!canAfford ? 'disabled' : ''}" 
              onclick="handleClaim('${item.id}')"
              title="${canAfford ? 'Reclamar con tus puntos' : 'Puntos insuficientes'}"
            >
              <span>🤝</span> Reclamar
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function renderClaimed() {
  const grid = document.getElementById('claimed-grid');
  if (!grid) return;

  if (state.claimedItems.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📦</div>
        <h4 class="empty-title">Aún no has reclamado ningún objeto</h4>
        <p class="empty-desc">Explora los artículos disponibles en tu comunidad y dales una segunda oportunidad usando tus EcoPoints.</p>
        <button class="btn-primary" onclick="switchTab('feed')">
          <span>🔍</span> Explorar Feed
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = state.claimedItems.map(item => `
    <article class="card">
      <div class="card-image-wrap">
        <img src="${item.image}" alt="${item.title}" class="card-img">
        <div class="card-badge-top" style="background: rgba(16, 185, 129, 0.9);">
          <span>✅</span> Canje Exitoso
        </div>
      </div>
      <div class="card-body">
        <div class="card-top-info">
          <div class="card-category"><span>🏷️</span> ${item.category}</div>
          <h4 class="card-title">${item.title}</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.3rem;">
            Donado originalmente por <strong>${item.user}</strong>.
          </p>
        </div>
        <div class="card-footer">
          <span style="font-size: 0.85rem; color: var(--color-primary-dark); font-weight: 700;">
            🌱 ${item.co2 || '3.5 kg'} CO₂ ahorrado
          </span>
          <span style="font-size: 0.8rem; color: var(--text-subtle);">Listo para retiro</span>
        </div>
      </div>
    </article>
  `).join('');
}

function renderMissions() {
  const grid = document.getElementById('missions-grid');
  if (!grid) return;

  grid.innerHTML = state.missions.map(m => `
    <div class="impact-card" style="align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <div class="impact-icon-circle">${m.icon}</div>
        <div>
          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.2rem;">${m.title}</h4>
          <span style="font-size: 0.82rem; color: var(--color-primary-dark); font-weight: 700;">+${m.pointsReward} EcoPoints</span>
        </div>
      </div>
      <button 
        class="btn-claim ${m.completed ? 'disabled' : ''}" 
        onclick="completeMission('${m.id}')"
        ${m.completed ? 'disabled' : ''}
      >
        ${m.completed ? '✅ Completada' : 'Cumplir'}
      </button>
    </div>
  `).join('');
}

// ==========================================
// Handlers & Actions
// ==========================================
function handleClaim(itemId) {
  const item = state.items.find(i => i.id === itemId);
  if (!item) return;

  if (state.userPoints >= item.points) {
    state.deductPoints(item.points, `Canje de "${item.title}"`);
    state.items = state.items.filter(i => i.id !== item.id);
    state.claimedItems.unshift({ ...item, claimedAt: new Date().toLocaleDateString() });
    state.save();

    // Actualizar UI y celebrar
    updatePointsDisplay();
    renderFeed();
    renderClaimed();
    triggerConfetti();

    showToast(`¡Felicidades! Has adquirido: ${item.title} (-${item.points} Pts)`);
  } else {
    showToast('No tienes suficientes puntos ecológicos. ¡Dona o cumple misiones para ganar más!', 'warning');
  }
}

function completeMission(missionId) {
  const mission = state.missions.find(m => m.id === missionId);
  if (!mission || mission.completed) return;

  mission.completed = true;
  state.addPoints(mission.pointsReward, `Misión verde: ${mission.title}`);
  updatePointsDisplay();
  renderMissions();
  triggerConfetti();
  showToast(`¡Misión cumplida! Ganaste +${mission.pointsReward} EcoPoints ⭐`);
}

function claimDailyBonus() {
  const lastBonus = localStorage.getItem('ecoswap_last_bonus');
  const today = new Date().toDateString();

  if (lastBonus === today) {
    showToast('Ya has reclamado tu bono diario ecológico de hoy. ¡Vuelve mañana!', 'warning');
    return;
  }

  localStorage.setItem('ecoswap_last_bonus', today);
  state.addPoints(25, 'Bono diario por compromiso ecológico');
  updatePointsDisplay();
  triggerConfetti();
  showToast('¡Has reclamado tu bono diario de +25 EcoPoints! 🎁');
}

// ==========================================
// Modals
// ==========================================
function openPublishModal() {
  const modal = document.getElementById('modal-publish');
  if (modal) modal.classList.add('active');

  // Render presets
  const container = document.getElementById('preset-images-container');
  if (container) {
    container.innerHTML = PRESET_IMAGES.map(p => `
      <img src="${p.url}" alt="${p.label}" class="preset-thumb" onclick="selectPresetImage('${p.url}', this)" title="${p.label}">
    `).join('');
  }
}

function closePublishModal() {
  const modal = document.getElementById('modal-publish');
  if (modal) modal.classList.remove('active');
}

function selectPresetImage(url, element) {
  const input = document.getElementById('pub-image');
  if (input) input.value = url;
  document.querySelectorAll('.preset-thumb').forEach(el => el.classList.remove('selected'));
  if (element) element.classList.add('selected');
}

function openWalletModal() {
  updatePointsDisplay();
  const modal = document.getElementById('modal-wallet');
  if (modal) modal.classList.add('active');
}

function closeWalletModal() {
  const modal = document.getElementById('modal-wallet');
  if (modal) modal.classList.remove('active');
}

function openDetailModal(itemId) {
  const item = state.items.find(i => i.id === itemId);
  if (!item) return;

  const modal = document.getElementById('modal-detail');
  const content = document.getElementById('detail-modal-content');
  if (!modal || !content) return;

  const canAfford = state.userPoints >= item.points;

  content.innerHTML = `
    <div class="modal-header">
      <h3 class="modal-title"><span>🌱</span> Detalle del Artículo</h3>
      <button class="btn-close" onclick="closeDetailModal()">&times;</button>
    </div>
    
    <div style="border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1rem; max-height: 240px;">
      <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover;">
    </div>

    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
      <div>
        <div class="card-category"><span>🏷️</span> ${item.category}</div>
        <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-main);">${item.title}</h3>
      </div>
      <div style="text-align: right;">
        <span style="font-size: 1.3rem; font-weight: 800; color: var(--color-primary-dark);">⭐ ${item.points} Pts</span>
      </div>
    </div>

    <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.25rem;">
      ${item.description || 'Artículo en excelente estado listo para ser reutilizado en la comunidad.'}
    </p>

    <div style="background: var(--color-primary-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.85rem; margin-bottom: 1.25rem; display: flex; justify-content: space-around; text-align: center;">
      <div>
        <div style="font-size: 0.75rem; color: var(--text-subtle); text-transform: uppercase;">Estado</div>
        <div style="font-weight: 700; font-size: 0.9rem; color: var(--color-primary-darker);">${item.condition || 'Óptimo'}</div>
      </div>
      <div>
        <div style="font-size: 0.75rem; color: var(--text-subtle); text-transform: uppercase;">Distancia</div>
        <div style="font-weight: 700; font-size: 0.9rem; color: var(--color-primary-darker);">${item.distance || '0.9 km'}</div>
      </div>
      <div>
        <div style="font-size: 0.75rem; color: var(--text-subtle); text-transform: uppercase;">Impacto Positivo</div>
        <div style="font-weight: 700; font-size: 0.9rem; color: var(--color-primary-darker);">${item.co2 || '3.0 kg'} CO₂</div>
      </div>
    </div>

    <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
      <button class="chip-btn" onclick="closeDetailModal()">Cerrar</button>
      <button 
        class="btn-primary ${!canAfford ? 'disabled' : ''}" 
        onclick="handleClaim('${item.id}'); closeDetailModal();"
      >
        <span>🤝</span> ${canAfford ? 'Confirmar Reclamo' : 'Puntos Insuficientes'}
      </button>
    </div>
  `;

  modal.classList.add('active');
}

function closeDetailModal() {
  const modal = document.getElementById('modal-detail');
  if (modal) modal.classList.remove('active');
}

// ==========================================
// Tabs & Navigation
// ==========================================
function switchTab(tabName) {
  state.currentTab = tabName;
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });

  const views = {
    'feed': document.getElementById('view-feed'),
    'my-swaps': document.getElementById('view-my-swaps'),
    'impact': document.getElementById('view-impact'),
    'missions': document.getElementById('view-missions')
  };

  Object.entries(views).forEach(([name, el]) => {
    if (el) el.style.display = name === tabName ? 'block' : 'none';
  });

  if (tabName === 'feed') renderFeed();
  if (tabName === 'my-swaps') renderClaimed();
  if (tabName === 'missions') renderMissions();
}

// ==========================================
// Theme Toggle (Light / Dark)
// ==========================================
function initTheme() {
  const savedTheme = localStorage.getItem('ecoswap_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  const themeBtn = document.getElementById('btn-toggle-theme');
  if (themeBtn) themeBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('ecoswap_theme', next);
  const themeBtn = document.getElementById('btn-toggle-theme');
  if (themeBtn) themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
}

// ==========================================
// Init & Event Listeners
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updatePointsDisplay();
  renderFeed();
  renderMissions();

  // Theme toggle
  document.getElementById('btn-toggle-theme')?.addEventListener('click', toggleTheme);

  // Home logo click
  document.getElementById('btn-brand-home')?.addEventListener('click', () => switchTab('feed'));

  // Wallet
  document.getElementById('btn-open-wallet')?.addEventListener('click', openWalletModal);
  document.getElementById('btn-close-wallet')?.addEventListener('click', closeWalletModal);
  document.getElementById('btn-daily-bonus')?.addEventListener('click', claimDailyBonus);

  // Publish Modal
  document.getElementById('btn-open-publish')?.addEventListener('click', openPublishModal);
  document.getElementById('btn-close-publish')?.addEventListener('click', closePublishModal);
  document.getElementById('btn-cancel-publish')?.addEventListener('click', closePublishModal);

  // Publish Form submit
  document.getElementById('form-publish')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('pub-title').value.trim();
    const category = document.getElementById('pub-category').value;
    const points = parseInt(document.getElementById('pub-points').value) || 50;
    const image = document.getElementById('pub-image').value.trim() || 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=500&q=80';
    const desc = document.getElementById('pub-desc').value.trim();

    const newItem = {
      id: 'item_' + Date.now(),
      title,
      category,
      points,
      image,
      user: 'Tú (EcoVecino)',
      distance: '0.1 km',
      condition: 'Muy bueno',
      co2: `${(points * 0.08).toFixed(1)} kg`,
      description: desc || 'Objeto donado por un miembro activo de EcoSwap para darle una segunda vida.'
    };

    state.items.unshift(newItem);
    state.addPoints(30, `Donación de objeto: "${title}"`);
    state.save();

    closePublishModal();
    e.target.reset();
    updatePointsDisplay();
    renderFeed();
    triggerConfetti();
    showToast(`¡Objeto publicado con éxito! Ganaste +30 EcoPoints 🌱`);
  });

  // Search input
  document.getElementById('search-input')?.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderFeed();
  });

  // Category chips
  document.querySelectorAll('.chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.selectedCategory = btn.dataset.category || 'all';
      renderFeed();
    });
  });

  // Tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });

  // Close modals on overlay click
  ['modal-publish', 'modal-wallet', 'modal-detail'].forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener('click', (e) => {
      if (e.target === el) {
        el.classList.remove('active');
      }
    });
  });
});
