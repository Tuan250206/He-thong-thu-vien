/**
 * user.js – User portal initializations
 * Hệ thống Thư viện
 *
 * Load order: data.js → storage.js → main.js → user.js
 */

'use strict';

/* ── Auth guard ─────────────────────────────────────────────── */

/**
 * Ensure the current user is logged in with the 'user' role.
 * Call this on every protected user page.
 * @returns {{ id, username, role, name }|null}
 */
function requireUser() {
  return checkAuth('user');
}

/* ── Sidebar active nav ─────────────────────────────────────── */

/**
 * Highlight the active nav item based on the current page filename.
 * Works alongside highlightActiveNav() in main.js, but also handles
 * data-page attributes for more explicit mapping.
 */
function initUserNav() {
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-item').forEach(link => {
    link.classList.remove('active');

    const href     = (link.getAttribute('href') || '').split('/').pop();
    const dataPage = link.dataset.page;

    if (href === currentFile || dataPage === currentFile) {
      link.classList.add('active');
      // Expand parent group if nested
      const parentGroup = link.closest('.nav-group');
      if (parentGroup) parentGroup.classList.add('open');
    }
  });
}

/* ── Dashboard stats ────────────────────────────────────────── */

/**
 * Render quick statistics on the user dashboard.
 * Reads from localStorage via Storage helpers.
 */
function initUserDashboard() {
  const user = getCurrentUser();
  if (!user) return;

  const phieuMuon   = Storage.getAll('phieuMuon');
  const phieuPhat   = Storage.getAll('phieuPhat');
  const phieuDatCho = Storage.getAll('phieuDatCho');
  const sach        = Storage.getAll('sach');

  // Count user-specific records if docGia ID is stored in session
  // (For thủ thư/nhân viên, show library-wide stats)
  const dangMuon   = phieuMuon.filter(p => p.trangThai === 'dangMuon').length;
  const quaHan     = phieuMuon.filter(p => p.trangThai === 'quaHan').length;
  const chuaThanhToan = phieuPhat.filter(p => p.trangThai === 'chuaThanhToan').length;
  const dangCho    = phieuDatCho.filter(p => p.trangThai === 'dangCho').length;
  const sachCoSan  = sach.filter(s => s.soLuongCon > 0).length;

  _setStatValue('statDangMuon',       dangMuon);
  _setStatValue('statQuaHan',         quaHan);
  _setStatValue('statChuaThanhToan',  chuaThanhToan);
  _setStatValue('statDangCho',        dangCho);
  _setStatValue('statSachCoSan',      sachCoSan);
  _setStatValue('statTongSach',       sach.length);
}

/**
 * Helper to safely set text content of a stat element
 */
function _setStatValue(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

/* ── Book catalogue search ──────────────────────────────────── */

/**
 * Initialize live search for the book catalogue page.
 * Assumes a search input with id="searchSach" and a results
 * container with id="sachGrid" or "sachTableBody".
 */
function initCatalogueSearch() {
  const searchInput = document.getElementById('searchSach');
  const filterTheLoai = document.getElementById('filterTheLoai');

  if (!searchInput) return;

  const doSearch = debounce(() => {
    const term     = searchInput.value.trim().toLowerCase();
    const theLoai  = filterTheLoai ? filterTheLoai.value : '';
    let   books    = Storage.getAll('sach');

    if (term) {
      books = books.filter(s =>
        s.tenSach.toLowerCase().includes(term) ||
        s.tacGia.toLowerCase().includes(term)  ||
        s.maSach.toLowerCase().includes(term)  ||
        s.theLoai.toLowerCase().includes(term)
      );
    }

    if (theLoai) {
      books = books.filter(s => s.theLoai === theLoai);
    }

    renderCatalogueResults(books);
  }, 300);

  searchInput.addEventListener('input', doSearch);
  if (filterTheLoai) filterTheLoai.addEventListener('change', doSearch);
}

/**
 * Render book catalogue results into grid or table.
 * Override / extend in specific page scripts as needed.
 * @param {Array} books
 */
function renderCatalogueResults(books) {
  const grid  = document.getElementById('sachGrid');
  const tbody = document.getElementById('sachTableBody');

  if (grid) {
    if (books.length === 0) {
      grid.innerHTML = '<p class="text-muted text-center p-4">Không tìm thấy sách phù hợp.</p>';
      return;
    }
    grid.innerHTML = books.map(s => `
      <div class="book-card" onclick="window.location.href='chi-tiet-sach.html?ma=${encodeURIComponent(s.maSach)}'">
        <div class="book-cover">📖</div>
        <div class="book-info">
          <div class="book-title">${escapeHtml(s.tenSach)}</div>
          <div class="book-author">${escapeHtml(s.tacGia)}</div>
          <div class="${s.soLuongCon > 0 ? 'book-status-available' : 'book-status-unavailable'}">
            ${s.soLuongCon > 0 ? `Còn ${s.soLuongCon} cuốn` : 'Hết sách'}
          </div>
        </div>
      </div>
    `).join('');
  }

  if (tbody) {
    if (books.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" class="table-empty"><div class="table-empty-icon">📚</div><div class="table-empty-text">Không tìm thấy sách</div></td></tr>`;
      return;
    }
    tbody.innerHTML = books.map(s => `
      <tr>
        <td>${escapeHtml(s.maSach)}</td>
        <td class="text-break">${escapeHtml(s.tenSach)}</td>
        <td>${escapeHtml(s.tacGia)}</td>
        <td>${escapeHtml(s.theLoai)}</td>
        <td>${escapeHtml(s.nxb)}</td>
        <td>${s.namXB}</td>
        <td>${s.soLuongCon} / ${s.soLuongTong}</td>
        <td>
          ${s.soLuongCon > 0
            ? `<span class="badge badge-success">Có sẵn</span>`
            : `<span class="badge badge-danger">Hết sách</span>`
          }
        </td>
      </tr>
    `).join('');
  }
}

/* ── Borrow history table ────────────────────────────────────── */

/**
 * Populate borrow history table on lich-su-muon.html (or similar).
 * @param {string} maDG – reader code (optional, shows all if omitted)
 */
function initBorrowHistory(maDG) {
  const tbody = document.getElementById('phieuMuonTableBody');
  if (!tbody) return;

  let records = Storage.getAll('phieuMuon');
  if (maDG) records = records.filter(r => r.maDG === maDG);

  if (records.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="table-empty"><div class="table-empty-icon">📋</div><div class="table-empty-text">Chưa có lịch sử mượn sách</div></td></tr>`;
    return;
  }

  tbody.innerHTML = records.map(r => `
    <tr>
      <td>${escapeHtml(r.maPhieu)}</td>
      <td>${escapeHtml(r.maDG)}</td>
      <td>${formatDate(r.ngayMuon)}</td>
      <td>${formatDate(r.hanTra)}</td>
      <td>${r.danhSachSach.map(s => escapeHtml(s.tenSach)).join(', ')}</td>
      <td>${renderBadge(r.trangThai)}</td>
      <td class="td-actions">
        <button class="btn btn-sm btn-secondary" onclick="viewPhieuMuon('${escapeHtml(r.maPhieu)}')">Chi tiết</button>
      </td>
    </tr>
  `).join('');
}

/* ── Fine list ───────────────────────────────────────────────── */

/**
 * Populate fines table on phieu-phat.html or similar.
 * @param {string} maDG – reader code (optional)
 */
function initFinesList(maDG) {
  const tbody = document.getElementById('phieuPhatTableBody');
  if (!tbody) return;

  let records = Storage.getAll('phieuPhat');
  if (maDG) records = records.filter(r => r.maDG === maDG);

  if (records.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="table-empty"><div class="table-empty-icon">💰</div><div class="table-empty-text">Không có phiếu phạt nào</div></td></tr>`;
    return;
  }

  tbody.innerHTML = records.map(r => `
    <tr>
      <td>${escapeHtml(r.maPhieuPhat)}</td>
      <td>${escapeHtml(r.maPhieuMuon)}</td>
      <td>${escapeHtml(r.maDG)}</td>
      <td>${renderBadge(r.loaiViPham)}</td>
      <td>${r.soNgayTre > 0 ? r.soNgayTre + ' ngày' : '—'}</td>
      <td class="font-bold text-danger">${formatCurrency(r.soTien)}</td>
      <td>${renderBadge(r.trangThai)}</td>
    </tr>
  `).join('');
}

/* ── Reservation list ────────────────────────────────────────── */

/**
 * Populate reservations table.
 * @param {string} maDG – reader code (optional)
 */
function initReservationsList(maDG) {
  const tbody = document.getElementById('datChoTableBody');
  if (!tbody) return;

  let records = Storage.getAll('phieuDatCho');
  if (maDG) records = records.filter(r => r.maDG === maDG);

  if (records.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="table-empty"><div class="table-empty-icon">📌</div><div class="table-empty-text">Chưa có đặt chỗ nào</div></td></tr>`;
    return;
  }

  const sach = Storage.getAll('sach');

  tbody.innerHTML = records.map(r => {
    const book = sach.find(s => s.maSach === r.maSach) || {};
    return `
      <tr>
        <td>${escapeHtml(r.maDatCho)}</td>
        <td>${escapeHtml(r.maDG)}</td>
        <td>${escapeHtml(book.tenSach || r.maSach)}</td>
        <td>${formatDate(r.ngayDat)}</td>
        <td>${formatDate(r.hanLaySach)}</td>
        <td>${renderBadge(r.trangThai)}</td>
        <td>${escapeHtml(r.ghiChu || '—')}</td>
      </tr>
    `;
  }).join('');
}

/* ── Profile page ────────────────────────────────────────────── */

/**
 * Populate the user profile page with current session data.
 */
function initProfilePage() {
  const user = getCurrentUser();
  if (!user) return;

  const nameEl = document.getElementById('profileName');
  const userEl = document.getElementById('profileUsername');
  const roleEl = document.getElementById('profileRole');

  if (nameEl) nameEl.textContent = user.name || user.username;
  if (userEl) userEl.textContent = user.username;
  if (roleEl) roleEl.textContent = user.role === 'admin' ? 'Quản trị viên' : 'Nhân viên thư viện';

  // Avatar initials
  const avatarEl = document.getElementById('profileAvatar');
  if (avatarEl) {
    avatarEl.textContent = (user.name || user.username)
      .split(' ')
      .map(w => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
}

/* ── Genre filter population ────────────────────────────────── */

/**
 * Populate a <select> with distinct book genres from storage.
 * @param {string} selectId – element id of the <select>
 */
function populateGenreFilter(selectId) {
  const el = document.getElementById(selectId);
  if (!el) return;

  const sach    = Storage.getAll('sach');
  const genres  = [...new Set(sach.map(s => s.theLoai))].sort();

  // Keep first "all" option if present
  const firstOpt = el.options[0];
  el.innerHTML   = firstOpt ? firstOpt.outerHTML : '<option value="">Tất cả thể loại</option>';

  genres.forEach(g => {
    const opt   = document.createElement('option');
    opt.value   = g;
    opt.textContent = g;
    el.appendChild(opt);
  });
}

/* ── Reader ID dropdown ─────────────────────────────────────── */

/**
 * Populate a <select> with all active readers.
 * @param {string} selectId
 */
function populateDocGiaSelect(selectId) {
  const el = document.getElementById(selectId);
  if (!el) return;

  const docGia = Storage.getAll('docGia').filter(d => d.trangThai === 'active');

  const firstOpt = el.options[0];
  el.innerHTML   = firstOpt ? firstOpt.outerHTML : '<option value="">-- Chọn độc giả --</option>';

  docGia.forEach(d => {
    const opt       = document.createElement('option');
    opt.value       = d.maDG;
    opt.textContent = `${d.maDG} – ${d.hoTen}`;
    el.appendChild(opt);
  });
}

/* ── Book ID dropdown ───────────────────────────────────────── */

/**
 * Populate a <select> with available books (soLuongCon > 0).
 * @param {string} selectId
 */
function populateSachSelect(selectId) {
  const el = document.getElementById(selectId);
  if (!el) return;

  const sach = Storage.getAll('sach').filter(s => s.soLuongCon > 0);

  const firstOpt = el.options[0];
  el.innerHTML   = firstOpt ? firstOpt.outerHTML : '<option value="">-- Chọn sách --</option>';

  sach.forEach(s => {
    const opt       = document.createElement('option');
    opt.value       = s.maSach;
    opt.textContent = `${s.maSach} – ${s.tenSach} (Còn: ${s.soLuongCon})`;
    el.appendChild(opt);
  });
}

/* ── Auto-initialize ─────────────────────────────────────────── */

(function initUser() {
  const run = () => {
    initUserNav();

    const page = window.location.pathname.split('/').pop();

    if (page === 'dashboard.html' || page === 'index.html' || page === '') {
      initUserDashboard();
    }

    if (page === 'danh-muc-sach.html' || page === 'catalogue.html') {
      populateGenreFilter('filterTheLoai');
      initCatalogueSearch();
    }

    if (page === 'lich-su-muon.html') {
      initBorrowHistory();
    }

    if (page === 'phieu-phat.html') {
      initFinesList();
    }

    if (page === 'dat-cho.html') {
      initReservationsList();
    }

    if (page === 'profile.html' || page === 'thong-tin.html') {
      initProfilePage();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
