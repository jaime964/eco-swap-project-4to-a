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

    // Racha Diaria de Conexión (+10 EcoPts constantes por día)
    this.streak = parseInt(localStorage.getItem('ecoswap_streak')) || 0;
    this.bestStreak = parseInt(localStorage.getItem('ecoswap_best_streak')) || 0;
    this.lastStreakDate = localStorage.getItem('ecoswap_last_streak_date') || null;
    this.totalStreakPoints = parseInt(localStorage.getItem('ecoswap_total_streak_points')) || 0;
    this.testDayOffset = parseInt(localStorage.getItem('ecoswap_test_day_offset')) || 0;

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
    localStorage.setItem('ecoswap_streak', this.streak);
    localStorage.setItem('ecoswap_best_streak', this.bestStreak);
    if (this.lastStreakDate) {
      localStorage.setItem('ecoswap_last_streak_date', this.lastStreakDate);
    } else {
      localStorage.removeItem('ecoswap_last_streak_date');
    }
    localStorage.setItem('ecoswap_total_streak_points', this.totalStreakPoints);
    localStorage.setItem('ecoswap_test_day_offset', this.testDayOffset);
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

// Sanitización básica para inyección segura en HTML
function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ==========================================
// Toast & Feedback System
// ==========================================
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'toast-error' : type === 'warning' ? 'toast-warning' : ''}`;
  
  const icon = type === 'error' ? '❌' : type === 'warning' ? '⚠️' : '✅';
  toast.innerHTML = `<span>${icon}</span> <span>${escapeHTML(message)}</span>`;

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
          <div style="font-weight: 600;">${escapeHTML(item.desc)}</div>
          <div style="font-size: 0.75rem; color: var(--text-subtle);">${escapeHTML(item.date)}</div>
        </div>
        <div style="font-weight: 700; color: ${item.amount.startsWith('+') ? 'var(--color-primary-dark)' : 'var(--color-danger)'};">
          ${escapeHTML(item.amount)}
        </div>
      </div>
    `).join('');
  }
}

function updateImpactStats() {
  const statCo2Saved = document.getElementById('stat-co2-saved');
  const statItemsSwapped = document.getElementById('stat-items-swapped');
  const impactCo2Display = document.getElementById('impact-co2-display');
  const ecoLevelTitle = document.getElementById('eco-level-title');

  const userCo2Total = state.claimedItems.reduce((acc, item) => {
    const val = parseFloat(item.co2) || 3.0;
    return acc + val;
  }, 18.4);

  const totalSwapped = 89 + state.claimedItems.length;
  const communityCo2 = 142.5 + (state.claimedItems.length * 3.5);

  if (statCo2Saved) statCo2Saved.textContent = `${communityCo2.toFixed(1)} kg`;
  if (statItemsSwapped) statItemsSwapped.textContent = `${totalSwapped}`;
  if (impactCo2Display) impactCo2Display.textContent = `${userCo2Total.toFixed(1)} kg`;
  
  if (ecoLevelTitle) {
    if (state.userPoints >= 400) {
      ecoLevelTitle.textContent = 'Héroe de la Biosfera 🌳';
    } else if (state.userPoints >= 250) {
      ecoLevelTitle.textContent = 'Guardián Verde 🌿';
    } else {
      ecoLevelTitle.textContent = 'Brote Comunitario 🌱';
    }
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
          <img src="${item.image}" alt="${escapeHTML(item.title)}" class="card-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=500&q=80'">
          <div class="card-badge-top">
            <span>🌿</span> ${escapeHTML(item.condition || 'Buen estado')}
          </div>
          <div class="card-distance">
            📍 ${escapeHTML(item.distance || 'Cerca de ti')}
          </div>
        </div>

        <div class="card-body">
          <div class="card-top-info" onclick="openDetailModal('${item.id}')" style="cursor: pointer;">
            <div class="card-category">
              <span>🏷️</span> ${escapeHTML(item.category)}
            </div>
            <h4 class="card-title">${escapeHTML(item.title)}</h4>
            <div class="card-user">
              <span>👤</span> Por ${escapeHTML(item.user || 'Vecino solidario')}
            </div>
          </div>

          <div class="card-footer">
            <div class="card-points">
              <span class="points-val">⭐ ${item.points} Pts</span>
              <span class="points-hint">Evita ~${escapeHTML(item.co2 || '2.0 kg')} CO₂</span>
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
        <img src="${item.image}" alt="${escapeHTML(item.title)}" class="card-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=500&q=80'">
        <div class="card-badge-top" style="background: rgba(16, 185, 129, 0.9);">
          <span>✅</span> Canje Exitoso
        </div>
      </div>
      <div class="card-body">
        <div class="card-top-info">
          <div class="card-category"><span>🏷️</span> ${escapeHTML(item.category)}</div>
          <h4 class="card-title">${escapeHTML(item.title)}</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.3rem;">
            Donado originalmente por <strong>${escapeHTML(item.user)}</strong>.
          </p>
        </div>
        <div class="card-footer">
          <span style="font-size: 0.85rem; color: var(--color-primary-dark); font-weight: 700;">
            🌱 ${escapeHTML(item.co2 || '3.5 kg')} CO₂ ahorrado
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
    updateImpactStats();
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

// ==========================================
// Sistema de Racha Diaria (Daily Streak System) 🔥🌱
// Bono fijo de 10 EcoPts por login diario (no va incrementando)
// ==========================================
const DAILY_LOGIN_POINTS = 10;

function getEffectiveNow() {
  const now = new Date();
  if (state.testDayOffset) {
    now.setDate(now.getDate() + state.testDayOffset);
  }
  return now;
}

function formatDateToYMD(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getStreakStatus() {
  const now = getEffectiveNow();
  const todayStr = formatDateToYMD(now);
  const lastDate = state.lastStreakDate;

  if (!lastDate) {
    return {
      canClaim: true,
      claimedToday: false,
      streakBroken: false,
      currentStreak: state.streak,
      nextStreak: 1,
      todayStr
    };
  }

  const d1 = new Date(lastDate + 'T00:00:00');
  const d2 = new Date(todayStr + 'T00:00:00');
  const diffDays = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // Ya reclamó el bono de hoy
    return {
      canClaim: false,
      claimedToday: true,
      streakBroken: false,
      currentStreak: state.streak,
      nextStreak: state.streak + 1,
      todayStr
    };
  } else if (diffDays === 1) {
    // Reclamó ayer -> la racha continúa consecutivamente
    return {
      canClaim: true,
      claimedToday: false,
      streakBroken: false,
      currentStreak: state.streak,
      nextStreak: state.streak + 1,
      todayStr
    };
  } else {
    // Pasaron 2 o más días -> se rompió la racha anterior
    return {
      canClaim: true,
      claimedToday: false,
      streakBroken: state.streak > 0,
      currentStreak: 0,
      nextStreak: 1,
      todayStr
    };
  }
}

function getStreakRank(days) {
  if (days >= 30) {
    return { title: 'Leyenda EcoSwap 👑', icon: '👑', desc: '¡Constancia legendaria! Eres un pilar de la comunidad ecológica.' };
  } else if (days >= 14) {
    return { title: 'Guardián Diario 🛡️', icon: '🛡️', desc: '¡2 semanas seguidas! Un compromiso ambiental inquebrantable.' };
  } else if (days >= 7) {
    return { title: 'Semana Imparable ⚡', icon: '⚡', desc: '¡7 días consecutivos! Tu hábito de consumo consciente está consolidado.' };
  } else if (days >= 3) {
    return { title: 'Hábito Verde 🌿', icon: '🌿', desc: '¡3 días seguidos! Estás construyendo un impacto positivo diario.' };
  } else if (days >= 1) {
    return { title: 'Semilla Constante 🌱', icon: '🌱', desc: '¡Gran inicio! Conéctate mañana para mantener tu llama activa.' };
  }
  return { title: 'Comienza tu Racha 🌱', icon: '🍃', desc: 'Conéctate cada día para ganar +10 EcoPts y mantener tu racha activa.' };
}

function getMidnightCountdown() {
  const now = getEffectiveNow();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const diffMs = midnight - now;

  if (diffMs <= 0) return '00:00:00';

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function renderDaysTrack(container, status) {
  if (!container) return;

  const currentStreak = status.currentStreak;
  const cycleIndex = currentStreak > 0 ? ((currentStreak - 1) % 7) + 1 : 0;
  const cycleBase = currentStreak > 0 ? Math.floor((currentStreak - 1) / 7) * 7 : 0;

  let daysHtml = '';
  for (let i = 1; i <= 7; i++) {
    const dayNumber = cycleBase + i;
    let stateClass = 'locked';
    let icon = '🔒';

    if (status.claimedToday) {
      if (i < cycleIndex) {
        stateClass = 'completed';
        icon = '✅';
      } else if (i === cycleIndex) {
        stateClass = 'completed active-today';
        icon = '🔥';
      } else {
        stateClass = 'locked';
        icon = '🔒';
      }
    } else {
      // Aún no reclama hoy
      const targetDayInCycle = currentStreak === 0 ? 1 : cycleIndex + 1;
      if (i < targetDayInCycle) {
        stateClass = 'completed';
        icon = '✅';
      } else if (i === targetDayInCycle) {
        stateClass = 'active-today';
        icon = '🔥';
      } else {
        stateClass = 'locked';
        icon = '🔒';
      }
    }

    daysHtml += `
      <div class="streak-day-item ${stateClass}" title="Día ${dayNumber}: +10 EcoPts fijos">
        <span class="streak-day-name">Día ${dayNumber}</span>
        <span class="streak-day-icon">${icon}</span>
        <span class="streak-day-reward">+10 Pts</span>
      </div>
    `;
  }

  container.innerHTML = daysHtml;
}

function updateStreakUI() {
  const status = getStreakStatus();
  const rank = getStreakRank(status.currentStreak);

  // 1. Header Streak Badge
  const headerStreakVal = document.getElementById('header-streak-val');
  const streakBadgeBtn = document.getElementById('btn-open-streak');
  if (headerStreakVal) {
    headerStreakVal.textContent = `${status.currentStreak} Día${status.currentStreak === 1 ? '' : 's'}`;
  }
  if (streakBadgeBtn) {
    streakBadgeBtn.classList.toggle('has-claim', status.canClaim);
  }

  // 2. Main Dashboard Widget Card
  const widgetRank = document.getElementById('widget-streak-rank');
  const widgetTitle = document.getElementById('widget-streak-title');
  const widgetDesc = document.querySelector('.streak-widget-desc');
  const widgetClaimBtn = document.getElementById('btn-widget-claim');
  const widgetClaimText = document.getElementById('btn-widget-claim-text');
  const widgetCountdownBox = document.getElementById('widget-countdown-box');
  const widgetDaysTrack = document.getElementById('widget-days-track');
  const incentiveMsg = document.getElementById('streak-incentive-msg');

  if (widgetRank) widgetRank.textContent = rank.title;
  if (widgetTitle) {
    if (status.claimedToday) {
      widgetTitle.textContent = `¡Racha de hoy completada! (${status.currentStreak} Días 🔥)`;
    } else if (status.streakBroken) {
      widgetTitle.textContent = '¡Inicia una nueva racha ecológica hoy!';
    } else if (status.currentStreak > 0) {
      widgetTitle.textContent = `¡Mantén viva tu racha de ${status.currentStreak} días!`;
    } else {
      widgetTitle.textContent = '¡Comienza tu racha de login diario!';
    }
  }

  if (widgetDesc) {
    if (status.claimedToday) {
      widgetDesc.innerHTML = `Ya sumaste tus <strong>10 EcoPts</strong> de hoy. Vuelve mañana para alcanzar el <strong>Día ${status.nextStreak}</strong> y seguir acumulando beneficios comunitarios.`;
    } else {
      widgetDesc.innerHTML = `Conéctate a diario y recibe <strong>10 EcoPts fijos</strong> para canjear productos en tu comunidad sin gastar dinero.`;
    }
  }

  if (widgetClaimBtn && widgetClaimText) {
    if (status.canClaim) {
      widgetClaimBtn.classList.remove('claimed', 'disabled');
      widgetClaimBtn.disabled = false;
      widgetClaimText.textContent = `Reclamar Login (+10 EcoPts)`;
      if (widgetCountdownBox) widgetCountdownBox.style.display = 'none';
    } else {
      widgetClaimBtn.classList.add('claimed');
      widgetClaimBtn.disabled = true;
      widgetClaimText.textContent = `✅ Login de hoy reclamado`;
      if (widgetCountdownBox) widgetCountdownBox.style.display = 'flex';
    }
  }

  if (widgetDaysTrack) {
    renderDaysTrack(widgetDaysTrack, status);
  }

  if (incentiveMsg) {
    const points = state.userPoints;
    if (points < 40) {
      const needed = 40 - points;
      const daysNeeded = Math.ceil(needed / DAILY_LOGIN_POINTS);
      incentiveMsg.innerHTML = `Con solo <strong>${daysNeeded} día${daysNeeded === 1 ? '' : 's'} más</strong> de login podrás canjear una <strong>Monstera Deliciosa (40 Pts)</strong> completamente gratis.`;
    } else if (points < 60) {
      incentiveMsg.innerHTML = `¡Ya tienes saldo para canjear <strong>Plantas (40 Pts)</strong> o <strong>Libros (50 Pts)</strong>! Revisa el feed comunitario para no perderlos.`;
    } else {
      incentiveMsg.innerHTML = `Con tus <strong>${points} EcoPts</strong> acumulados puedes canjear múltiples productos en la comunidad. ¡Explora las novedades!`;
    }
  }

  // 3. Modal de Racha Diaria
  const modalStreakCount = document.getElementById('modal-streak-count');
  const modalStreakRank = document.getElementById('modal-streak-rank');
  const modalBestStreak = document.getElementById('modal-best-streak');
  const modalTotalStreakPts = document.getElementById('modal-total-streak-pts');
  const modalDaysTrack = document.getElementById('modal-days-track');
  const modalClaimBtn = document.getElementById('btn-modal-claim');
  const modalClaimText = document.getElementById('btn-modal-claim-text');
  const modalCountdownBox = document.getElementById('modal-countdown-box');
  const modalDesc = document.getElementById('modal-streak-desc');

  if (modalStreakCount) modalStreakCount.textContent = status.currentStreak;
  if (modalStreakRank) modalStreakRank.textContent = rank.title;
  if (modalBestStreak) modalBestStreak.textContent = `${state.bestStreak} Día${state.bestStreak === 1 ? '' : 's'}`;
  if (modalTotalStreakPts) modalTotalStreakPts.textContent = `${state.totalStreakPoints} Pts`;

  if (modalDesc) {
    modalDesc.innerHTML = rank.desc + `<br><small style="color:var(--text-subtle);">Bono garantizado: 10 EcoPts por día (recompensa constante).</small>`;
  }

  if (modalClaimBtn && modalClaimText) {
    if (status.canClaim) {
      modalClaimBtn.classList.remove('claimed', 'disabled');
      modalClaimBtn.disabled = false;
      modalClaimText.textContent = `Reclamar Recompensa (+10 EcoPts)`;
      if (modalCountdownBox) modalCountdownBox.style.display = 'none';
    } else {
      modalClaimBtn.classList.add('claimed');
      modalClaimBtn.disabled = true;
      modalClaimText.textContent = `✅ Recompensa de hoy completada`;
      if (modalCountdownBox) modalCountdownBox.style.display = 'block';
    }
  }

  if (modalDaysTrack) {
    renderDaysTrack(modalDaysTrack, status);
  }

  // 4. Modal Billetera (Sincronización)
  const walletStreakDays = document.getElementById('wallet-streak-count');
  const walletStreakSub = document.getElementById('wallet-streak-sub');
  const walletBonusBtn = document.getElementById('btn-daily-bonus');
  const walletBonusLabel = document.getElementById('wallet-bonus-btn-label');

  if (walletStreakDays) {
    walletStreakDays.textContent = `${status.currentStreak} Día${status.currentStreak === 1 ? '' : 's'}`;
  }
  if (walletStreakSub) {
    walletStreakSub.textContent = status.claimedToday 
      ? '¡Racha de hoy activa! Vuelve mañana para +10 Pts' 
      : 'Disponible para reclamar: +10 EcoPts fijos';
  }
  if (walletBonusBtn && walletBonusLabel) {
    if (status.canClaim) {
      walletBonusBtn.classList.remove('disabled');
      walletBonusBtn.disabled = false;
      walletBonusLabel.textContent = 'Reclamar Login Diario (+10 EcoPts)';
    } else {
      walletBonusBtn.classList.add('disabled');
      walletBonusBtn.disabled = true;
      walletBonusLabel.textContent = '✅ Login de hoy reclamado';
    }
  }

  // 5. Test Offset Indicator
  const offsetDisplay = document.getElementById('test-offset-display');
  if (offsetDisplay) {
    if (state.testDayOffset > 0) {
      offsetDisplay.textContent = `⚡ Modo simulación: +${state.testDayOffset} día(s) en el futuro (Fecha: ${status.todayStr})`;
    } else {
      offsetDisplay.textContent = `Fecha real: ${status.todayStr}`;
    }
  }
}

function claimDailyStreak() {
  const status = getStreakStatus();

  if (!status.canClaim) {
    showToast('¡Ya has reclamado tu recompensa de hoy! Vuelve mañana para continuar tu racha 🔥', 'warning');
    return;
  }

  const newStreak = status.nextStreak;
  state.streak = newStreak;
  if (state.streak > state.bestStreak) {
    state.bestStreak = state.streak;
  }
  state.lastStreakDate = status.todayStr;
  state.totalStreakPoints += DAILY_LOGIN_POINTS;

  // Añadir exactamente 10 EcoPts al saldo del usuario
  state.addPoints(DAILY_LOGIN_POINTS, `🔥 Racha Diaria (Día ${newStreak}) - Login diario`);
  state.save();

  // Actualizar UI y celebraciones
  updatePointsDisplay();
  updateStreakUI();
  triggerConfetti();

  const rank = getStreakRank(newStreak);
  showToast(`¡Día ${newStreak} de racha conseguido! Ganaste +10 EcoPts 🔥 (${rank.title})`);
}

// Simulador para pruebas rápidas
function simulateAdvanceDay(days = 1) {
  state.testDayOffset += days;
  state.save();
  updateStreakUI();
  const status = getStreakStatus();
  showToast(`⚡ Día avanzado en +${days}. Fecha simulada: ${status.todayStr}`);
}

function resetStreak() {
  state.streak = 0;
  state.lastStreakDate = null;
  state.testDayOffset = 0;
  state.totalStreakPoints = 0;
  state.save();
  updateStreakUI();
  showToast('🔄 Racha y simulación reiniciadas con éxito.');
}

function openStreakModal() {
  updateStreakUI();
  const modal = document.getElementById('modal-streak');
  if (modal) modal.classList.add('active');
}

function closeStreakModal() {
  const modal = document.getElementById('modal-streak');
  if (modal) modal.classList.remove('active');
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
      <img src="${item.image}" alt="${escapeHTML(item.title)}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=500&q=80'">
    </div>

    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
      <div>
        <div class="card-category"><span>🏷️</span> ${escapeHTML(item.category)}</div>
        <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-main);">${escapeHTML(item.title)}</h3>
      </div>
      <div style="text-align: right;">
        <span style="font-size: 1.3rem; font-weight: 800; color: var(--color-primary-dark);">⭐ ${item.points} Pts</span>
      </div>
    </div>

    <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.25rem;">
      ${escapeHTML(item.description || 'Artículo en excelente estado listo para ser reutilizado en la comunidad.')}
    </p>

    <div style="background: var(--color-primary-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.85rem; margin-bottom: 1.25rem; display: flex; justify-content: space-around; text-align: center;">
      <div>
        <div style="font-size: 0.75rem; color: var(--text-subtle); text-transform: uppercase;">Estado</div>
        <div style="font-weight: 700; font-size: 0.9rem; color: var(--color-primary-darker);">${escapeHTML(item.condition || 'Óptimo')}</div>
      </div>
      <div>
        <div style="font-size: 0.75rem; color: var(--text-subtle); text-transform: uppercase;">Distancia</div>
        <div style="font-weight: 700; font-size: 0.9rem; color: var(--color-primary-darker);">${escapeHTML(item.distance || '0.9 km')}</div>
      </div>
      <div>
        <div style="font-size: 0.75rem; color: var(--text-subtle); text-transform: uppercase;">Impacto Positivo</div>
        <div style="font-weight: 700; font-size: 0.9rem; color: var(--color-primary-darker);">${escapeHTML(item.co2 || '3.0 kg')} CO₂</div>
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
function tickStreakCountdown() {
  const countdownText = getMidnightCountdown();
  const widgetTimer = document.getElementById('widget-countdown-timer');
  const modalTimer = document.getElementById('modal-countdown-timer');
  if (widgetTimer) widgetTimer.textContent = countdownText;
  if (modalTimer) modalTimer.textContent = countdownText;
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updatePointsDisplay();
  renderFeed();
  renderMissions();
  updateStreakUI();

  // Iniciar reloj de cuenta regresiva para la racha diaria
  tickStreakCountdown();
  setInterval(tickStreakCountdown, 1000);

  // Theme toggle
  document.getElementById('btn-toggle-theme')?.addEventListener('click', toggleTheme);

  // Home logo click
  document.getElementById('btn-brand-home')?.addEventListener('click', () => switchTab('feed'));

  // Racha Diaria (Header, Widget, Modal & Wallet)
  document.getElementById('btn-open-streak')?.addEventListener('click', openStreakModal);
  document.getElementById('btn-close-streak')?.addEventListener('click', closeStreakModal);
  document.getElementById('btn-widget-claim')?.addEventListener('click', claimDailyStreak);
  document.getElementById('btn-modal-claim')?.addEventListener('click', claimDailyStreak);
  document.getElementById('btn-wallet-open-streak-details')?.addEventListener('click', () => {
    closeWalletModal();
    openStreakModal();
  });
  document.getElementById('btn-explore-swaps')?.addEventListener('click', () => {
    switchTab('feed');
    document.getElementById('items-grid')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Botones del Simulador de Racha (para pruebas del usuario)
  document.getElementById('btn-test-advance-day')?.addEventListener('click', () => simulateAdvanceDay(1));
  document.getElementById('btn-test-break-streak')?.addEventListener('click', () => simulateAdvanceDay(2));
  document.getElementById('btn-test-reset-streak')?.addEventListener('click', resetStreak);

  // Wallet
  document.getElementById('btn-open-wallet')?.addEventListener('click', openWalletModal);
  document.getElementById('btn-close-wallet')?.addEventListener('click', closeWalletModal);
  document.getElementById('btn-daily-bonus')?.addEventListener('click', claimDailyStreak);

  // Auto-prompt de bienvenida: si el usuario no ha reclamado su bono de 10 EcoPts de hoy, invitamos cordialmente
  const streakStatus = getStreakStatus();
  if (streakStatus.canClaim && !sessionStorage.getItem('ecoswap_streak_prompted')) {
    sessionStorage.setItem('ecoswap_streak_prompted', 'true');
    setTimeout(() => {
      openStreakModal();
    }, 850);
  }

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

  // Category chips (específico para el selector del feed)
  document.querySelectorAll('#category-chips .chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#category-chips .chip-btn').forEach(b => b.classList.remove('active'));
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
  ['modal-publish', 'modal-wallet', 'modal-detail', 'modal-streak'].forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener('click', (e) => {
      if (e.target === el) {
        el.classList.remove('active');
      }
    });
  });

  updateImpactStats();
  initPWA();
});

// ============================================================================
// PWA (Progressive Web App) Manager
// ============================================================================
let deferredInstallPrompt = null;

function initPWA() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  const headerInstallBtn = document.getElementById('btn-header-install');
  const installBanner = document.getElementById('pwa-install-banner');
  const bannerInstallBtn = document.getElementById('btn-pwa-banner-install');
  const bannerCloseBtn = document.getElementById('btn-pwa-banner-close');
  const offlineStatusBanner = document.getElementById('offline-status-banner');

  // 1. Registro del Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => {
          console.log('[PWA] Service Worker registrado con éxito. Ámbito:', reg.scope);

          // Notificar si hay nueva versión lista
          reg.addEventListener('updatefound', () => {
            const installingWorker = reg.installing;
            if (installingWorker) {
              installingWorker.addEventListener('statechange', () => {
                if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  showToast('🔄 ¡Nueva versión disponible! Recarga la app para disfrutar de las actualizaciones.');
                }
              });
            }
          });
        })
        .catch((err) => {
          console.warn('[PWA] Error en registro de Service Worker:', err);
        });
    });
  }

  // 2. Control de Instalación Nativa (beforeinstallprompt)
  window.addEventListener('beforeinstallprompt', (e) => {
    // Evitar mini-infobar automático para usar nuestra UI integrada
    e.preventDefault();
    deferredInstallPrompt = e;

    if (!isStandalone) {
      if (headerInstallBtn) {
        headerInstallBtn.style.display = 'inline-flex';
      }

      const dismissed = sessionStorage.getItem('ecoswap_pwa_dismissed');
      if (installBanner && !dismissed) {
        setTimeout(() => {
          if (deferredInstallPrompt && !isStandalone) {
            installBanner.style.display = 'block';
          }
        }, 2200);
      }
    }
  });

  // Manejador del botón de instalación
  const triggerInstall = async () => {
    if (!deferredInstallPrompt) {
      showToast('ℹ️ Para instalar en este navegador, abre el menú del explorador y selecciona "Instalar aplicación" o "Agregar a pantalla de inicio".');
      return;
    }

    try {
      deferredInstallPrompt.prompt();
      const choiceResult = await deferredInstallPrompt.userChoice;
      if (choiceResult && choiceResult.outcome === 'accepted') {
        console.log('[PWA] El usuario aceptó la instalación.');
        if (headerInstallBtn) headerInstallBtn.style.display = 'none';
        if (installBanner) installBanner.style.display = 'none';
      } else {
        console.log('[PWA] El usuario canceló la instalación.');
      }
    } catch (err) {
      console.warn('[PWA] Error en instalación:', err);
    } finally {
      deferredInstallPrompt = null;
    }
  };

  headerInstallBtn?.addEventListener('click', triggerInstall);
  bannerInstallBtn?.addEventListener('click', triggerInstall);

  bannerCloseBtn?.addEventListener('click', () => {
    if (installBanner) installBanner.style.display = 'none';
    sessionStorage.setItem('ecoswap_pwa_dismissed', 'true');
  });

  // App instalada con éxito
  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    if (headerInstallBtn) headerInstallBtn.style.display = 'none';
    if (installBanner) installBanner.style.display = 'none';
    triggerConfetti();
    showToast('🎉 ¡EcoSwap instalada exitosamente en tu dispositivo!');
  });

  // 3. Monitoreo de Conexión Online / Offline
  function updateNetworkStatus() {
    const isOnline = navigator.onLine;
    if (offlineStatusBanner) {
      offlineStatusBanner.style.display = isOnline ? 'none' : 'block';
    }
  }

  window.addEventListener('online', () => {
    updateNetworkStatus();
    showToast('🟢 Conexión a internet restablecida.');
  });

  window.addEventListener('offline', () => {
    updateNetworkStatus();
    showToast('📡 Modo Sin Conexión activo. Tus acciones se guardan localmente.');
  });

  updateNetworkStatus();

  // 4. Atajos de URL PWA (Shortcuts en el Manifest)
  const urlParams = new URLSearchParams(window.location.search);
  const action = urlParams.get('action');
  if (action === 'publish') {
    setTimeout(openPublishModal, 350);
  } else if (action === 'streak') {
    setTimeout(openStreakModal, 350);
  } else if (action === 'wallet') {
    setTimeout(openWalletModal, 350);
  }
}

// Exponer funciones globales para controladores de eventos inline en HTML
window.openPublishModal = openPublishModal;
window.closePublishModal = closePublishModal;
window.selectPresetImage = selectPresetImage;
window.openWalletModal = openWalletModal;
window.closeWalletModal = closeWalletModal;
window.openDetailModal = openDetailModal;
window.closeDetailModal = closeDetailModal;
window.handleClaim = handleClaim;
window.completeMission = completeMission;
window.switchTab = switchTab;
window.claimDailyBonus = claimDailyStreak;
window.claimDailyStreak = claimDailyStreak;
window.openStreakModal = openStreakModal;
window.closeStreakModal = closeStreakModal;
window.simulateAdvanceDay = simulateAdvanceDay;
window.resetStreak = resetStreak;
