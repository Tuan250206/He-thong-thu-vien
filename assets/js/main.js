/**
 * main.js – Utility functions & common initializations
 * Hệ thống Thư viện
 *
 * Load order: data.js → storage.js → main.js → user.js / admin.js
 */

'use strict';

/* ── Date utilities ────────────────────────────────────────── */

/**
 * Format a date value to dd/mm/yyyy
 * @param {string|Date} date
 * @returns {string}
 */
function formatDate(date) {
  if (!date) return '—';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '—';
  const dd   = String(d.getDate()).padStart(2, '0');
  const mm   = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

/**
 * Format a date value to yyyy-mm-dd (for <input type="date">)
 * @param {string|Date} date
 * @returns {string}
 */
function formatDateInput(date) {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  const dd   = String(d.getDate()).padStart(2, '0');
  const mm   = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Parse dd/mm/yyyy string to Date
 * @param {string} str
 * @returns {Date|null}
 */
function parseDateVN(str) {
  if (!str) return null;
  const parts = str.split('/');
  if (parts.length === 3) {
    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
  }
  const d = new Date(str);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Get today's date as yyyy-mm-dd string
 * @returns {string}
 */
function todayInput() {
  return formatDateInput(new Date());
}

/**
 * Get today's date as dd/mm/yyyy string
 * @returns {string}
 */
function todayVN() {
  return formatDate(new Date());
}

/**
 * Add days to a date and return yyyy-mm-dd
 * @param {string|Date} date
 * @param {number} days
 * @returns {string}
 */
function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return formatDateInput(d);
}

/**
 * Calculate difference in days between two dates (d2 - d1)
 * @param {string|Date} d1
 * @param {string|Date} d2
 * @returns {number} positive = d2 is later
 */
function diffDays(d1, d2) {
  const t1 = new Date(d1).setHours(0, 0, 0, 0);
  const t2 = new Date(d2).setHours(0, 0, 0, 0);
  return Math.round((t2 - t1) / 86400000);
}

/* ── Currency ──────────────────────────────────────────────── */

/**
 * Format a number as Vietnamese dong
 * @param {number} amount
 * @returns {string}  e.g. "120,000 đ"
 */
function formatCurrency(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return '0 đ';
  return Number(amount).toLocaleString('vi-VN') + ' đ';
}

/**
 * Parse a Vietnamese currency string back to number
 * @param {string} str
 * @returns {number}
 */
function parseCurrency(str) {
  if (!str) return 0;
  return parseInt(String(str).replace(/[^0-9]/g, ''), 10) || 0;
}

/* ── Fine calculation ──────────────────────────────────────── */

/**
 * Calculate late fine
 * Rate: 5,000 đ/day/book
 * @param {string} ngayHanTra   – due date (yyyy-mm-dd or dd/mm/yyyy)
 * @param {string} ngayTra      – actual return date (defaults to today)
 * @param {number} soSach       – number of books
 * @returns {{ soNgayTre: number, soTien: number }}
 */
function calculateFine(ngayHanTra, ngayTra, soSach) {
  const RATE_PER_DAY_PER_BOOK = 5000;
  const returnDate = ngayTra ? new Date(ngayTra) : new Date();
  const dueDate    = new Date(ngayHanTra);

  if (isNaN(dueDate.getTime())) return { soNgayTre: 0, soTien: 0 };

  returnDate.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  const soNgayTre = Math.max(0, Math.round((returnDate - dueDate) / 86400000));
  const soTien    = soNgayTre * (soSach || 1) * RATE_PER_DAY_PER_BOOK;

  return { soNgayTre, soTien };
}

/* ── ID generation ─────────────────────────────────────────── */

/**
 * Generate the next sequential ID
 * @param {string} prefix        – e.g. 'SV', 'S', 'PM'
 * @param {Array}  existingItems – current collection
 * @param {string} field         – the ID field name, e.g. 'maDG'
 * @param {number} [padLength=3] – zero-pad length (SV001 = 3, PM0001 = 4)
 * @returns {string}
 */
function generateId(prefix, existingItems, field, padLength) {
  padLength = padLength || 3;
  if (!existingItems || existingItems.length === 0) {
    return prefix + '001'.slice(-padLength).padStart(padLength, '0');
  }
  const nums = existingItems
    .map(item => {
      const raw = String(item[field] || '').replace(prefix, '');
      return parseInt(raw, 10) || 0;
    })
    .filter(n => !isNaN(n));
  const max = nums.length > 0 ? Math.max(...nums) : 0;
  return prefix + String(max + 1).padStart(padLength, '0');
}

/* ── Toast notifications ───────────────────────────────────── */

let _toastContainer = null;

function _getToastContainer() {
  if (!_toastContainer) {
    _toastContainer = document.getElementById('toastContainer');
    if (!_toastContainer) {
      _toastContainer = document.createElement('div');
      _toastContainer.id = 'toastContainer';
      _toastContainer.className = 'toast-container';
      document.body.appendChild(_toastContainer);
    }
  }
  return _toastContainer;
}

const TOAST_ICONS = {
  success: '✅',
  error:   '❌',
  warning: '⚠️',
  info:    'ℹ️'
};

const TOAST_TITLES = {
  success: 'Thành công',
  error:   'Lỗi',
  warning: 'Cảnh báo',
  info:    'Thông tin'
};

/**
 * Show a toast notification
 * @param {string} message
 * @param {'success'|'error'|'warning'|'info'} [type='info']
 * @param {number} [duration=3500] – ms before auto-dismiss
 */
function showAlert(message, type, duration) {
  type     = type     || 'info';
  duration = duration || 3500;

  const container = _getToastContainer();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${TOAST_ICONS[type] || 'ℹ️'}</span>
    <div class="toast-body">
      <div class="toast-title">${TOAST_TITLES[type] || type}</div>
      <div class="toast-text">${message}</div>
    </div>
    <button class="toast-close" aria-label="Đóng">✕</button>
  `;

  container.appendChild(toast);

  const close = toast.querySelector('.toast-close');
  let timer;

  const dismiss = () => {
    clearTimeout(timer);
    toast.classList.add('hiding');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
    setTimeout(() => { if (toast.parentNode) toast.remove(); }, 400);
  };

  close.addEventListener('click', dismiss);
  timer = setTimeout(dismiss, duration);
}

/* ── Confirm modal ─────────────────────────────────────────── */

let _modalOverlay   = null;
let _confirmCallback = null;

function _ensureModal() {
  if (!document.getElementById('confirmModal')) {
    const overlay = document.createElement('div');
    overlay.id        = 'confirmModal';
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal modal-sm" role="dialog" aria-modal="true">
        <div class="modal-header">
          <h3 class="modal-title" id="confirmModalTitle">Xác nhận</h3>
          <button class="modal-close" id="confirmModalClose" aria-label="Đóng">✕</button>
        </div>
        <div class="modal-body" style="text-align:center; padding: 2rem 1.5rem;">
          <div class="confirm-modal-icon danger" id="confirmModalIcon">⚠️</div>
          <div class="confirm-modal-title" id="confirmModalHeading"></div>
          <div class="confirm-modal-message" id="confirmModalMessage"></div>
        </div>
        <div class="modal-footer" style="justify-content:center;">
          <button class="btn btn-secondary" id="confirmModalCancel">Hủy</button>
          <button class="btn btn-danger"    id="confirmModalOk">Xác nhận</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.querySelector('#confirmModalClose').addEventListener('click', hideModal);
    overlay.querySelector('#confirmModalCancel').addEventListener('click', hideModal);
    overlay.querySelector('#confirmModalOk').addEventListener('click', () => {
      if (typeof _confirmCallback === 'function') _confirmCallback();
      hideModal();
    });
    overlay.addEventListener('click', e => {
      if (e.target === overlay) hideModal();
    });
  }
  return document.getElementById('confirmModal');
}

/**
 * Show a confirmation modal
 * @param {string}   title      – modal heading
 * @param {string}   message    – body message
 * @param {Function} onConfirm  – callback when user confirms
 * @param {'danger'|'warning'|'success'|'info'} [iconType='danger']
 */
function showModal(title, message, onConfirm, iconType) {
  iconType = iconType || 'danger';
  const icons = { danger: '⚠️', warning: '⚠️', success: '✅', info: 'ℹ️' };

  _confirmCallback = onConfirm;
  const overlay = _ensureModal();

  overlay.querySelector('#confirmModalTitle').textContent   = title;
  overlay.querySelector('#confirmModalHeading').textContent = title;
  overlay.querySelector('#confirmModalMessage').textContent = message;
  overlay.querySelector('#confirmModalIcon').textContent    = icons[iconType] || '⚠️';
  overlay.querySelector('#confirmModalIcon').className      = `confirm-modal-icon ${iconType}`;

  const okBtn = overlay.querySelector('#confirmModalOk');
  okBtn.className = `btn btn-${iconType === 'success' ? 'success' : iconType === 'info' ? 'info' : 'danger'}`;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/** Hide the confirm modal */
function hideModal() {
  const overlay = document.getElementById('confirmModal');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  _confirmCallback = null;
}

/* ── Pagination ────────────────────────────────────────────── */

/**
 * Paginate an array of items
 * @param {Array}  items    – full dataset
 * @param {number} page     – 1-based current page
 * @param {number} perPage  – items per page
 * @returns {{ items: Array, total: number, totalPages: number, page: number, perPage: number, from: number, to: number }}
 */
function initPagination(items, page, perPage) {
  page    = Math.max(1, parseInt(page, 10)    || 1);
  perPage = Math.max(1, parseInt(perPage, 10) || 10);

  const total      = items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  page             = Math.min(page, totalPages);

  const from  = (page - 1) * perPage;
  const to    = Math.min(from + perPage, total);
  const paged = items.slice(from, to);

  return {
    items:      paged,
    total,
    totalPages,
    page,
    perPage,
    from: from + 1,
    to
  };
}

/**
 * Render pagination HTML into a container element
 * @param {Object}   paged       – result of initPagination
 * @param {Element}  container   – wrapper element for pagination controls
 * @param {Function} onChange    – (newPage) => void
 */
function renderPagination(paged, container, onChange) {
  if (!container) return;

  const { total, totalPages, page, perPage, from, to } = paged;

  const infoEl = container.querySelector('.pagination-info');
  if (infoEl) {
    infoEl.textContent = total === 0
      ? 'Không có kết quả'
      : `Hiển thị ${from}–${to} trong số ${total} kết quả`;
  }

  const paginationEl = container.querySelector('.pagination');
  if (!paginationEl) return;

  const buttons = [];

  // Prev
  buttons.push(`<button class="page-btn" data-page="${page - 1}" ${page === 1 ? 'disabled' : ''}>‹</button>`);

  // Page numbers (window of 5)
  const WINDOW = 2;
  let startP = Math.max(1, page - WINDOW);
  let endP   = Math.min(totalPages, page + WINDOW);

  if (startP > 1) {
    buttons.push(`<button class="page-btn" data-page="1">1</button>`);
    if (startP > 2) buttons.push(`<span class="page-btn" style="pointer-events:none">…</span>`);
  }

  for (let p = startP; p <= endP; p++) {
    buttons.push(`<button class="page-btn ${p === page ? 'active' : ''}" data-page="${p}">${p}</button>`);
  }

  if (endP < totalPages) {
    if (endP < totalPages - 1) buttons.push(`<span class="page-btn" style="pointer-events:none">…</span>`);
    buttons.push(`<button class="page-btn" data-page="${totalPages}">${totalPages}</button>`);
  }

  // Next
  buttons.push(`<button class="page-btn" data-page="${page + 1}" ${page === totalPages ? 'disabled' : ''}>›</button>`);

  paginationEl.innerHTML = buttons.join('');

  paginationEl.querySelectorAll('.page-btn[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      const newPage = parseInt(btn.dataset.page, 10);
      if (!isNaN(newPage) && newPage >= 1 && newPage <= totalPages) {
        onChange(newPage);
      }
    });
  });
}

/* ── Debounce ──────────────────────────────────────────────── */

/**
 * Returns a debounced version of the function
 * @param {Function} fn
 * @param {number}   delay – ms
 * @returns {Function}
 */
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/* ── Session management ────────────────────────────────────── */

const SESSION_KEY = 'currentUser';

/**
 * Get the currently logged-in user from sessionStorage
 * @returns {{ id, username, role, name }|null}
 */
function getCurrentUser() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Save a user session to sessionStorage
 * @param {{ id, username, role, name }} user
 */
function setCurrentUser(user) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } catch (e) {
    console.error('[setCurrentUser]', e);
  }
}

/**
 * Check authentication; redirect to login page if not authenticated
 * or if the role doesn't match.
 * @param {'user'|'admin'|null} requiredRole – pass null to allow any role
 * @returns {{ id, username, role, name }|null} the current user
 */
function checkAuth(requiredRole) {
  const user = getCurrentUser();

  if (!user) {
    // Determine correct login page based on required role
    const loginPage = (requiredRole === 'admin')
      ? '../admin/login.html'
      : '../user/login.html';

    // Try relative path first, then absolute fallback
    const path = window.location.pathname;
    if (path.includes('/admin/')) {
      window.location.href = 'login.html';
    } else if (path.includes('/user/')) {
      window.location.href = 'login.html';
    } else {
      window.location.href = loginPage;
    }
    return null;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Logged in but wrong role
    if (user.role === 'admin') {
      window.location.href = '../admin/dashboard.html';
    } else {
      window.location.href = '../user/dashboard.html';
    }
    return null;
  }

  return user;
}

/**
 * Log the user out and redirect to the appropriate login page
 */
function logout() {
  const user = getCurrentUser();
  const isAdmin = user && user.role === 'admin';

  sessionStorage.removeItem(SESSION_KEY);

  const path = window.location.pathname;
  if (path.includes('/admin/')) {
    window.location.href = 'login.html';
  } else if (path.includes('/user/')) {
    window.location.href = 'login.html';
  } else {
    window.location.href = isAdmin ? '../admin/login.html' : '../user/login.html';
  }
}

/* ── Sidebar toggle (mobile) ───────────────────────────────── */

function initSidebarToggle() {
  const toggleBtn = document.getElementById('sidebarToggle');
  const sidebar   = document.querySelector('.sidebar');
  const overlay   = document.getElementById('sidebarOverlay');

  if (!toggleBtn || !sidebar) return;

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
  });

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
}

/* ── Active nav link ───────────────────────────────────────── */

/**
 * Highlight the sidebar nav item matching the current page
 */
function highlightActiveNav() {
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-item[href]').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentFile) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ── User info in header / sidebar ────────────────────────── */

function renderCurrentUserInfo() {
  const user = getCurrentUser();
  if (!user) return;

  // Header name
  document.querySelectorAll('[data-user-name]').forEach(el => {
    el.textContent = user.name || user.username;
  });

  // Header avatar initials
  document.querySelectorAll('[data-user-avatar]').forEach(el => {
    const initials = (user.name || user.username)
      .split(' ')
      .map(w => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
    el.textContent = initials;
  });

  // Role badge
  document.querySelectorAll('[data-user-role]').forEach(el => {
    el.textContent = user.role === 'admin' ? 'Quản trị viên' : 'Nhân viên thư viện';
  });

  // Sidebar footer user
  const sbName   = document.getElementById('sidebarUserName');
  const sbRole   = document.getElementById('sidebarUserRole');
  const sbAvatar = document.getElementById('sidebarUserAvatar');

  if (sbName)   sbName.textContent   = user.name || user.username;
  if (sbRole)   sbRole.textContent   = user.role === 'admin' ? 'Quản trị viên' : 'Nhân viên';
  if (sbAvatar) sbAvatar.textContent = (user.name || user.username)
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/* ── Logout button wiring ──────────────────────────────────── */

function initLogoutButtons() {
  document.querySelectorAll('[data-action="logout"], #logoutBtn, .logout-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      showModal(
        'Đăng xuất',
        'Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?',
        logout,
        'warning'
      );
    });
  });
}

/* ── Table sort helper ─────────────────────────────────────── */

/**
 * Sort an array of objects by a key
 * @param {Array}   arr
 * @param {string}  key
 * @param {'asc'|'desc'} dir
 * @returns {Array}
 */
function sortBy(arr, key, dir) {
  return [...arr].sort((a, b) => {
    let va = a[key], vb = b[key];
    if (va === undefined || va === null) va = '';
    if (vb === undefined || vb === null) vb = '';
    // Numeric?
    if (!isNaN(Number(va)) && !isNaN(Number(vb))) {
      va = Number(va); vb = Number(vb);
    } else {
      va = String(va).toLowerCase();
      vb = String(vb).toLowerCase();
    }
    if (va < vb) return dir === 'asc' ? -1 : 1;
    if (va > vb) return dir === 'asc' ?  1 : -1;
    return 0;
  });
}

/* ── Text search / filter ──────────────────────────────────── */

/**
 * Filter an array of objects by a search term across multiple fields
 * @param {Array}    items
 * @param {string}   term
 * @param {string[]} fields – field names to search
 * @returns {Array}
 */
function filterByTerm(items, term, fields) {
  if (!term || !term.trim()) return items;
  const q = term.trim().toLowerCase();
  return items.filter(item =>
    fields.some(f => String(item[f] || '').toLowerCase().includes(q))
  );
}

/* ── Status label helpers ──────────────────────────────────── */

const STATUS_LABELS = {
  // Độc giả
  active:          { label: 'Đang hoạt động',  badge: 'badge-active' },
  inactive:        { label: 'Hết hạn thẻ',     badge: 'badge-inactive' },
  suspended:       { label: 'Đình chỉ',         badge: 'badge-suspended' },
  // Phiếu mượn
  dangMuon:        { label: 'Đang mượn',        badge: 'badge-borrowing' },
  daTra:           { label: 'Đã trả',           badge: 'badge-returned' },
  quaHan:          { label: 'Quá hạn',          badge: 'badge-overdue' },
  // Phiếu phạt
  chuaThanhToan:   { label: 'Chưa thanh toán',  badge: 'badge-unpaid' },
  daThanhToan:     { label: 'Đã thanh toán',    badge: 'badge-paid' },
  // Đặt chỗ
  dangCho:         { label: 'Đang chờ',         badge: 'badge-reserved' },
  daNhan:          { label: 'Đã nhận',          badge: 'badge-returned' },
  huy:             { label: 'Đã hủy',           badge: 'badge-inactive' },
  hetHan:          { label: 'Hết hạn',          badge: 'badge-overdue' },
  // Vi phạm loại
  treHan:          { label: 'Trả trễ',          badge: 'badge-warning' },
  matSach:         { label: 'Mất sách',         badge: 'badge-danger' },
  huHong:          { label: 'Hư hỏng',          badge: 'badge-warning' },
  // Xuất kho
  thanhLy:         { label: 'Thanh lý',         badge: 'badge-gray' },
  mat:             { label: 'Mất',              badge: 'badge-danger' }
};

/**
 * Render a status badge HTML string
 * @param {string} status
 * @returns {string}
 */
function renderBadge(status) {
  const info = STATUS_LABELS[status];
  if (!info) return `<span class="badge badge-gray">${status}</span>`;
  return `<span class="badge ${info.badge}">${info.label}</span>`;
}

/* ── Number utilities ──────────────────────────────────────── */

/**
 * Clamp a number between min and max
 * @param {number} val
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

/* ── Escape HTML ───────────────────────────────────────────── */

/**
 * Escape special HTML characters to prevent XSS
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ── Common page initializer ───────────────────────────────── */

/**
 * Called from DOMContentLoaded in every page.
 * - Initializes localStorage with mock data
 * - Wires sidebar toggle
 * - Highlights active nav
 * - Renders current user info
 * - Wires logout buttons
 */
function initCommon() {
  // Ensure data is seeded
  Storage.init();

  // UI helpers
  initSidebarToggle();
  highlightActiveNav();
  renderCurrentUserInfo();
  initLogoutButtons();
}

/* ── Auto-init on DOMContentLoaded ────────────────────────── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCommon);
} else {
  initCommon();
}
