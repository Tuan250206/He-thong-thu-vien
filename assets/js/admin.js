/**
 * admin.js – Admin portal initializations
 * Hệ thống Thư viện
 *
 * Load order: data.js → storage.js → main.js → admin.js
 */

'use strict';

/* ── Auth guard ─────────────────────────────────────────────── */

/**
 * Ensure the current user is logged in with the 'admin' role.
 * Call this on every protected admin page.
 * @returns {{ id, username, role, name }|null}
 */
function requireAdmin() {
  return checkAuth('admin');
}

/* ── Sidebar active nav ─────────────────────────────────────── */

/**
 * Highlight the active nav item based on the current page filename.
 * Also handles data-page attributes.
 */
function initAdminNav() {
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-item').forEach(link => {
    link.classList.remove('active');

    const href     = (link.getAttribute('href') || '').split('/').pop();
    const dataPage = link.dataset.page;

    if (href === currentFile || dataPage === currentFile) {
      link.classList.add('active');
      const parentGroup = link.closest('.nav-group');
      if (parentGroup) parentGroup.classList.add('open');
    }
  });
}

/* ── Dashboard statistics ────────────────────────────────────── */

/**
 * Compute and render all dashboard KPI cards.
 */
function initAdminDashboard() {
  const sach        = Storage.getAll('sach');
  const docGia      = Storage.getAll('docGia');
  const phieuMuon   = Storage.getAll('phieuMuon');
  const phieuPhat   = Storage.getAll('phieuPhat');
  const phieuDatCho = Storage.getAll('phieuDatCho');
  const nhaCungCap  = Storage.getAll('nhaCungCap');

  // Book stats
  const tongSach      = sach.length;
  const sachCoSan     = sach.filter(s => s.soLuongCon > 0).length;
  const sachHetHang   = sach.filter(s => s.soLuongCon === 0).length;
  const tongBanSach   = sach.reduce((acc, s) => acc + s.soLuongTong, 0);

  // Reader stats
  const tongDocGia    = docGia.length;
  const docGiaActive  = docGia.filter(d => d.trangThai === 'active').length;
  const docGiaSuspend = docGia.filter(d => d.trangThai === 'suspended').length;

  // Borrow stats
  const tongMuon      = phieuMuon.length;
  const dangMuon      = phieuMuon.filter(p => p.trangThai === 'dangMuon').length;
  const quaHan        = phieuMuon.filter(p => p.trangThai === 'quaHan').length;
  const daTra         = phieuMuon.filter(p => p.trangThai === 'daTra').length;

  // Fine stats
  const chuaTT        = phieuPhat.filter(p => p.trangThai === 'chuaThanhToan').length;
  const tongTienPhat  = phieuPhat.filter(p => p.trangThai === 'chuaThanhToan')
                                 .reduce((acc, p) => acc + p.soTien, 0);
  const daThanhToan   = phieuPhat.filter(p => p.trangThai === 'daThanhToan')
                                 .reduce((acc, p) => acc + p.soTien, 0);

  // Reservation stats
  const dangCho       = phieuDatCho.filter(p => p.trangThai === 'dangCho').length;

  // Map of stat element id → computed value
  const stats = {
    statTongSach:      tongSach,
    statSachCoSan:     sachCoSan,
    statSachHetHang:   sachHetHang,
    statTongBanSach:   tongBanSach,
    statTongDocGia:    tongDocGia,
    statDocGiaActive:  docGiaActive,
    statDocGiaSuspend: docGiaSuspend,
    statTongMuon:      tongMuon,
    statDangMuon:      dangMuon,
    statQuaHan:        quaHan,
    statDaTra:         daTra,
    statChuaTT:        chuaTT,
    statTongTienPhat:  formatCurrency(tongTienPhat),
    statDaThanhToan:   formatCurrency(daThanhToan),
    statDangCho:       dangCho,
    statTongNCC:       nhaCungCap.length
  };

  Object.entries(stats).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  });

  // Render recent overdue list if present
  _renderOverdueStrip(quaHan);
}

/**
 * Show an overdue alert strip on dashboard if there are overdue loans.
 * @param {number} count
 */
function _renderOverdueStrip(count) {
  const strip = document.getElementById('overdueStrip');
  if (!strip) return;
  if (count === 0) {
    strip.style.display = 'none';
  } else {
    strip.style.display = 'flex';
    const msgEl = strip.querySelector('.overdue-strip-msg');
    if (msgEl) {
      msgEl.textContent = `Có ${count} phiếu mượn quá hạn cần xử lý.`;
    }
  }
}

/* ── Readers management ──────────────────────────────────────── */

/**
 * Render the readers table with optional search and status filter.
 * @param {string}  [searchTerm]
 * @param {string}  [statusFilter]  – 'active'|'inactive'|'suspended'|''
 * @param {number}  [page=1]
 * @param {number}  [perPage=15]
 */
function renderDocGiaTable(searchTerm, statusFilter, page, perPage) {
  const tbody = document.getElementById('docGiaTableBody');
  if (!tbody) return;

  page    = page    || 1;
  perPage = perPage || 15;

  let items = Storage.getAll('docGia');

  if (searchTerm) {
    items = filterByTerm(items, searchTerm, ['maDG', 'hoTen', 'email', 'sdt', 'lop', 'khoa']);
  }

  if (statusFilter) {
    items = items.filter(d => d.trangThai === statusFilter);
  }

  const paged = initPagination(items, page, perPage);

  if (paged.items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" class="table-empty"><div class="table-empty-icon">👤</div><div class="table-empty-text">Không tìm thấy độc giả</div></td></tr>`;
  } else {
    tbody.innerHTML = paged.items.map((d, i) => `
      <tr>
        <td>${paged.from + i}</td>
        <td>${escapeHtml(d.maDG)}</td>
        <td>${escapeHtml(d.hoTen)}</td>
        <td>${escapeHtml(d.lop)}</td>
        <td>${escapeHtml(d.email)}</td>
        <td>${escapeHtml(d.sdt)}</td>
        <td>${formatDate(d.ngayHetHan)}</td>
        <td>${renderBadge(d.trangThai)}</td>
        <td class="td-actions">
          <button class="btn btn-sm btn-secondary" onclick="adminViewDocGia('${escapeHtml(d.maDG)}')">Chi tiết</button>
          <button class="btn btn-sm btn-primary"   onclick="adminEditDocGia('${escapeHtml(d.maDG)}')">Sửa</button>
          <button class="btn btn-sm btn-danger"    onclick="adminDeleteDocGia('${escapeHtml(d.maDG)}')">Xóa</button>
        </td>
      </tr>
    `).join('');
  }

  // Render pagination
  const paginationWrapper = document.getElementById('docGiaPagination');
  if (paginationWrapper) {
    renderPagination(paged, paginationWrapper, newPage => {
      renderDocGiaTable(searchTerm, statusFilter, newPage, perPage);
    });
  }
}

/* ── Books management ────────────────────────────────────────── */

/**
 * Render books table with search, genre filter, and pagination.
 */
function renderSachTable(searchTerm, genreFilter, page, perPage) {
  const tbody = document.getElementById('sachTableBody');
  if (!tbody) return;

  page    = page    || 1;
  perPage = perPage || 15;

  let items = Storage.getAll('sach');

  if (searchTerm) {
    items = filterByTerm(items, searchTerm, ['maSach', 'tenSach', 'tacGia', 'isbn', 'nxb']);
  }

  if (genreFilter) {
    items = items.filter(s => s.theLoai === genreFilter);
  }

  const paged = initPagination(items, page, perPage);

  if (paged.items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" class="table-empty"><div class="table-empty-icon">📚</div><div class="table-empty-text">Không tìm thấy sách</div></td></tr>`;
  } else {
    tbody.innerHTML = paged.items.map((s, i) => `
      <tr>
        <td>${paged.from + i}</td>
        <td>${escapeHtml(s.maSach)}</td>
        <td class="text-break">${escapeHtml(s.tenSach)}</td>
        <td>${escapeHtml(s.tacGia)}</td>
        <td><span class="badge badge-primary">${escapeHtml(s.theLoai)}</span></td>
        <td>${escapeHtml(s.nxb)}</td>
        <td>${s.namXB}</td>
        <td>${s.soLuongCon} / ${s.soLuongTong}</td>
        <td>
          ${s.soLuongCon > 0
            ? `<span class="badge badge-success">Có sẵn</span>`
            : `<span class="badge badge-danger">Hết sách</span>`}
        </td>
        <td class="td-actions">
          <button class="btn btn-sm btn-secondary" onclick="adminViewSach('${escapeHtml(s.maSach)}')">Chi tiết</button>
          <button class="btn btn-sm btn-primary"   onclick="adminEditSach('${escapeHtml(s.maSach)}')">Sửa</button>
          <button class="btn btn-sm btn-danger"    onclick="adminDeleteSach('${escapeHtml(s.maSach)}')">Xóa</button>
        </td>
      </tr>
    `).join('');
  }

  const paginationWrapper = document.getElementById('sachPagination');
  if (paginationWrapper) {
    renderPagination(paged, paginationWrapper, newPage => {
      renderSachTable(searchTerm, genreFilter, newPage, perPage);
    });
  }
}

/* ── Borrow slips management ─────────────────────────────────── */

/**
 * Render phieuMuon table with filters and pagination.
 */
function renderPhieuMuonTable(searchTerm, statusFilter, page, perPage) {
  const tbody = document.getElementById('phieuMuonTableBody');
  if (!tbody) return;

  page    = page    || 1;
  perPage = perPage || 15;

  let items = Storage.getAll('phieuMuon');

  if (searchTerm) {
    items = filterByTerm(items, searchTerm, ['maPhieu', 'maDG']);
  }

  if (statusFilter) {
    items = items.filter(p => p.trangThai === statusFilter);
  }

  const docGia = Storage.getAll('docGia');
  const paged  = initPagination(items, page, perPage);

  if (paged.items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="table-empty"><div class="table-empty-icon">📋</div><div class="table-empty-text">Không tìm thấy phiếu mượn</div></td></tr>`;
  } else {
    tbody.innerHTML = paged.items.map((p, i) => {
      const dg     = docGia.find(d => d.maDG === p.maDG) || {};
      const today  = new Date();
      const hanTra = new Date(p.hanTra);
      const isLate = p.trangThai === 'dangMuon' && today > hanTra;

      return `
        <tr ${isLate ? 'style="background:#fff5f5"' : ''}>
          <td>${paged.from + i}</td>
          <td>${escapeHtml(p.maPhieu)}</td>
          <td>${escapeHtml(p.maDG)} – ${escapeHtml(dg.hoTen || '')}</td>
          <td>${formatDate(p.ngayMuon)}</td>
          <td class="${isLate ? 'text-danger font-bold' : ''}">${formatDate(p.hanTra)}</td>
          <td>${p.danhSachSach.length} cuốn</td>
          <td>${renderBadge(p.trangThai)}</td>
          <td class="td-actions">
            <button class="btn btn-sm btn-secondary" onclick="adminViewPhieuMuon('${escapeHtml(p.maPhieu)}')">Chi tiết</button>
            ${p.trangThai === 'dangMuon' || p.trangThai === 'quaHan'
              ? `<button class="btn btn-sm btn-success" onclick="adminTraSach('${escapeHtml(p.maPhieu)}')">Trả sách</button>`
              : ''}
          </td>
        </tr>
      `;
    }).join('');
  }

  const paginationWrapper = document.getElementById('phieuMuonPagination');
  if (paginationWrapper) {
    renderPagination(paged, paginationWrapper, newPage => {
      renderPhieuMuonTable(searchTerm, statusFilter, newPage, perPage);
    });
  }
}

/* ── Fines management ────────────────────────────────────────── */

/**
 * Render phieuPhat table.
 */
function renderPhieuPhatTable(searchTerm, statusFilter, page, perPage) {
  const tbody = document.getElementById('phieuPhatTableBody');
  if (!tbody) return;

  page    = page    || 1;
  perPage = perPage || 15;

  let items = Storage.getAll('phieuPhat');

  if (searchTerm) {
    items = filterByTerm(items, searchTerm, ['maPhieuPhat', 'maPhieuMuon', 'maDG']);
  }

  if (statusFilter) {
    items = items.filter(p => p.trangThai === statusFilter);
  }

  const docGia = Storage.getAll('docGia');
  const paged  = initPagination(items, page, perPage);

  if (paged.items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" class="table-empty"><div class="table-empty-icon">💰</div><div class="table-empty-text">Không tìm thấy phiếu phạt</div></td></tr>`;
  } else {
    tbody.innerHTML = paged.items.map((p, i) => {
      const dg = docGia.find(d => d.maDG === p.maDG) || {};
      return `
        <tr>
          <td>${paged.from + i}</td>
          <td>${escapeHtml(p.maPhieuPhat)}</td>
          <td>${escapeHtml(p.maPhieuMuon)}</td>
          <td>${escapeHtml(p.maDG)} – ${escapeHtml(dg.hoTen || '')}</td>
          <td>${renderBadge(p.loaiViPham)}</td>
          <td>${p.soNgayTre > 0 ? p.soNgayTre + ' ngày' : '—'}</td>
          <td class="font-bold text-danger">${formatCurrency(p.soTien)}</td>
          <td>${renderBadge(p.trangThai)}</td>
          <td class="td-actions">
            ${p.trangThai === 'chuaThanhToan'
              ? `<button class="btn btn-sm btn-success" onclick="adminThanhToanPhat('${escapeHtml(p.maPhieuPhat)}')">Thanh toán</button>`
              : ''}
            <button class="btn btn-sm btn-secondary" onclick="adminViewPhieuPhat('${escapeHtml(p.maPhieuPhat)}')">Chi tiết</button>
          </td>
        </tr>
      `;
    }).join('');
  }

  const paginationWrapper = document.getElementById('phieuPhatPagination');
  if (paginationWrapper) {
    renderPagination(paged, paginationWrapper, newPage => {
      renderPhieuPhatTable(searchTerm, statusFilter, newPage, perPage);
    });
  }
}

/* ── Suppliers management ────────────────────────────────────── */

/**
 * Render nhaCungCap table.
 */
function renderNhaCungCapTable(searchTerm, page, perPage) {
  const tbody = document.getElementById('nccTableBody');
  if (!tbody) return;

  page    = page    || 1;
  perPage = perPage || 15;

  let items = Storage.getAll('nhaCungCap');

  if (searchTerm) {
    items = filterByTerm(items, searchTerm, ['maNCC', 'tenNCC', 'nguoiLienHe', 'email', 'dienThoai']);
  }

  const paged = initPagination(items, page, perPage);

  if (paged.items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" class="table-empty"><div class="table-empty-icon">🏢</div><div class="table-empty-text">Không tìm thấy nhà cung cấp</div></td></tr>`;
  } else {
    tbody.innerHTML = paged.items.map((n, i) => `
      <tr>
        <td>${paged.from + i}</td>
        <td>${escapeHtml(n.maNCC)}</td>
        <td class="text-break">${escapeHtml(n.tenNCC)}</td>
        <td>${escapeHtml(n.loai)}</td>
        <td>${escapeHtml(n.nguoiLienHe)}</td>
        <td>${escapeHtml(n.dienThoai)}</td>
        <td>${escapeHtml(n.email)}</td>
        <td>${renderBadge(n.trangThai)}</td>
        <td class="td-actions">
          <button class="btn btn-sm btn-secondary" onclick="adminViewNCC('${escapeHtml(n.maNCC)}')">Chi tiết</button>
          <button class="btn btn-sm btn-primary"   onclick="adminEditNCC('${escapeHtml(n.maNCC)}')">Sửa</button>
          <button class="btn btn-sm btn-danger"    onclick="adminDeleteNCC('${escapeHtml(n.maNCC)}')">Xóa</button>
        </td>
      </tr>
    `).join('');
  }

  const paginationWrapper = document.getElementById('nccPagination');
  if (paginationWrapper) {
    renderPagination(paged, paginationWrapper, newPage => {
      renderNhaCungCapTable(searchTerm, newPage, perPage);
    });
  }
}

/* ── Import slips management ─────────────────────────────────── */

/**
 * Render phieuNhap table.
 */
function renderPhieuNhapTable(searchTerm, page, perPage) {
  const tbody = document.getElementById('phieuNhapTableBody');
  if (!tbody) return;

  page    = page    || 1;
  perPage = perPage || 15;

  let items = Storage.getAll('phieuNhap');

  if (searchTerm) {
    items = filterByTerm(items, searchTerm, ['maPhieuNhap', 'maNCC']);
  }

  const ncc   = Storage.getAll('nhaCungCap');
  const paged = initPagination(items, page, perPage);

  if (paged.items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="table-empty"><div class="table-empty-icon">📦</div><div class="table-empty-text">Không tìm thấy phiếu nhập</div></td></tr>`;
  } else {
    tbody.innerHTML = paged.items.map((p, i) => {
      const supplier = ncc.find(n => n.maNCC === p.maNCC) || {};
      return `
        <tr>
          <td>${paged.from + i}</td>
          <td>${escapeHtml(p.maPhieuNhap)}</td>
          <td>${formatDate(p.ngayNhap)}</td>
          <td>${escapeHtml(supplier.tenNCC || p.maNCC)}</td>
          <td>${p.danhSachSach.length} đầu sách</td>
          <td>${formatCurrency(p.tongTien)}</td>
          <td>${formatCurrency(p.tongThanhToan)}</td>
          <td class="td-actions">
            <button class="btn btn-sm btn-secondary" onclick="adminViewPhieuNhap('${escapeHtml(p.maPhieuNhap)}')">Chi tiết</button>
            <button class="btn btn-sm btn-primary"   onclick="adminPrintPhieuNhap('${escapeHtml(p.maPhieuNhap)}')">In</button>
          </td>
        </tr>
      `;
    }).join('');
  }

  const paginationWrapper = document.getElementById('phieuNhapPagination');
  if (paginationWrapper) {
    renderPagination(paged, paginationWrapper, newPage => {
      renderPhieuNhapTable(searchTerm, newPage, perPage);
    });
  }
}

/* ── Export slips management ─────────────────────────────────── */

/**
 * Render phieuXuat table.
 */
function renderPhieuXuatTable(searchTerm, page, perPage) {
  const tbody = document.getElementById('phieuXuatTableBody');
  if (!tbody) return;

  page    = page    || 1;
  perPage = perPage || 15;

  let items = Storage.getAll('phieuXuat');

  if (searchTerm) {
    items = filterByTerm(items, searchTerm, ['maPhieuXuat', 'lyDoXuat']);
  }

  const paged = initPagination(items, page, perPage);

  const LYDO_LABELS = { thanhLy: 'Thanh lý', huHong: 'Hư hỏng', mat: 'Mất sách' };

  if (paged.items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="table-empty"><div class="table-empty-icon">📤</div><div class="table-empty-text">Không tìm thấy phiếu xuất</div></td></tr>`;
  } else {
    tbody.innerHTML = paged.items.map((p, i) => `
      <tr>
        <td>${paged.from + i}</td>
        <td>${escapeHtml(p.maPhieuXuat)}</td>
        <td>${formatDate(p.ngayXuat)}</td>
        <td>${renderBadge(p.lyDoXuat)}</td>
        <td>${p.danhSachSach.length} đầu sách</td>
        <td>${formatCurrency(p.tongGiaTri)}</td>
        <td class="td-actions">
          <button class="btn btn-sm btn-secondary" onclick="adminViewPhieuXuat('${escapeHtml(p.maPhieuXuat)}')">Chi tiết</button>
        </td>
      </tr>
    `).join('');
  }

  const paginationWrapper = document.getElementById('phieuXuatPagination');
  if (paginationWrapper) {
    renderPagination(paged, paginationWrapper, newPage => {
      renderPhieuXuatTable(searchTerm, newPage, perPage);
    });
  }
}

/* ── Report helpers ──────────────────────────────────────────── */

/**
 * Compute summary statistics for reports.
 * @returns {Object}
 */
function getReportStats() {
  const sach       = Storage.getAll('sach');
  const phieuMuon  = Storage.getAll('phieuMuon');
  const phieuPhat  = Storage.getAll('phieuPhat');
  const phieuNhap  = Storage.getAll('phieuNhap');
  const phieuXuat  = Storage.getAll('phieuXuat');
  const docGia     = Storage.getAll('docGia');

  const tongTienNhap = phieuNhap.reduce((a, p) => a + (p.tongThanhToan || 0), 0);
  const tongTienXuat = phieuXuat.reduce((a, p) => a + (p.tongGiaTri || 0), 0);
  const tongTienPhat = phieuPhat.reduce((a, p) => a + (p.soTien || 0), 0);
  const tongTienThu  = phieuPhat
    .filter(p => p.trangThai === 'daThanhToan')
    .reduce((a, p) => a + (p.soTien || 0), 0);

  // Genre distribution
  const genreMap = {};
  sach.forEach(s => {
    genreMap[s.theLoai] = (genreMap[s.theLoai] || 0) + 1;
  });

  // Top borrowed books
  const borrowMap = {};
  phieuMuon.forEach(p => {
    (p.danhSachSach || []).forEach(s => {
      borrowMap[s.maSach] = (borrowMap[s.maSach] || 0) + 1;
    });
  });

  const topBorrowed = Object.entries(borrowMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([maSach, count]) => {
      const book = sach.find(s => s.maSach === maSach) || {};
      return { maSach, tenSach: book.tenSach || maSach, count };
    });

  return {
    tongSach:       sach.length,
    tongDocGia:     docGia.length,
    tongMuon:       phieuMuon.length,
    dangMuon:       phieuMuon.filter(p => p.trangThai === 'dangMuon').length,
    quaHan:         phieuMuon.filter(p => p.trangThai === 'quaHan').length,
    tongTienNhap,
    tongTienXuat,
    tongTienPhat,
    tongTienThu,
    genreMap,
    topBorrowed
  };
}

/**
 * Render report summary cards if the elements exist on page.
 */
function renderReportSummary() {
  const stats = getReportStats();

  const map = {
    reportTongSach:    stats.tongSach,
    reportTongDocGia:  stats.tongDocGia,
    reportTongMuon:    stats.tongMuon,
    reportQuaHan:      stats.quaHan,
    reportTienNhap:    formatCurrency(stats.tongTienNhap),
    reportTienThu:     formatCurrency(stats.tongTienThu)
  };

  Object.entries(map).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  });

  // Top borrowed list
  const topList = document.getElementById('topBorrowedList');
  if (topList && stats.topBorrowed.length > 0) {
    topList.innerHTML = stats.topBorrowed.map((b, i) => `
      <div class="d-flex items-center justify-between py-2 border-top">
        <span class="text-sm">${i + 1}. ${escapeHtml(b.tenSach)}</span>
        <span class="badge badge-primary">${b.count} lần</span>
      </div>
    `).join('');
  }
}

/* ── Reservation management ──────────────────────────────────── */

/**
 * Render phieuDatCho table.
 */
function renderDatChoTable(searchTerm, statusFilter, page, perPage) {
  const tbody = document.getElementById('datChoTableBody');
  if (!tbody) return;

  page    = page    || 1;
  perPage = perPage || 15;

  let items = Storage.getAll('phieuDatCho');

  if (searchTerm) {
    items = filterByTerm(items, searchTerm, ['maDatCho', 'maDG', 'maSach']);
  }

  if (statusFilter) {
    items = items.filter(p => p.trangThai === statusFilter);
  }

  const sach   = Storage.getAll('sach');
  const docGia = Storage.getAll('docGia');
  const paged  = initPagination(items, page, perPage);

  if (paged.items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="table-empty"><div class="table-empty-icon">📌</div><div class="table-empty-text">Không có đặt chỗ nào</div></td></tr>`;
  } else {
    tbody.innerHTML = paged.items.map((p, i) => {
      const book = sach.find(s => s.maSach === p.maSach) || {};
      const dg   = docGia.find(d => d.maDG === p.maDG) || {};
      return `
        <tr>
          <td>${paged.from + i}</td>
          <td>${escapeHtml(p.maDatCho)}</td>
          <td>${escapeHtml(p.maDG)} – ${escapeHtml(dg.hoTen || '')}</td>
          <td class="text-break">${escapeHtml(book.tenSach || p.maSach)}</td>
          <td>${formatDate(p.ngayDat)}</td>
          <td>${formatDate(p.hanLaySach)}</td>
          <td>${renderBadge(p.trangThai)}</td>
          <td class="td-actions">
            ${p.trangThai === 'dangCho'
              ? `<button class="btn btn-sm btn-success" onclick="adminXacNhanDatCho('${escapeHtml(p.maDatCho)}')">Xác nhận</button>
                 <button class="btn btn-sm btn-danger"  onclick="adminHuyDatCho('${escapeHtml(p.maDatCho)}')">Hủy</button>`
              : ''}
            <button class="btn btn-sm btn-secondary" onclick="adminViewDatCho('${escapeHtml(p.maDatCho)}')">Chi tiết</button>
          </td>
        </tr>
      `;
    }).join('');
  }

  const paginationWrapper = document.getElementById('datChoPagination');
  if (paginationWrapper) {
    renderPagination(paged, paginationWrapper, newPage => {
      renderDatChoTable(searchTerm, statusFilter, newPage, perPage);
    });
  }
}

/* ── Dropdown helpers ────────────────────────────────────────── */

/**
 * Populate a select with all active nhaCungCap entries.
 * @param {string} selectId
 */
function populateNCCSelect(selectId) {
  const el = document.getElementById(selectId);
  if (!el) return;

  const list     = Storage.getAll('nhaCungCap').filter(n => n.trangThai === 'active');
  const firstOpt = el.options[0];
  el.innerHTML   = firstOpt ? firstOpt.outerHTML : '<option value="">-- Chọn nhà cung cấp --</option>';

  list.forEach(n => {
    const opt       = document.createElement('option');
    opt.value       = n.maNCC;
    opt.textContent = `${n.maNCC} – ${n.tenNCC}`;
    el.appendChild(opt);
  });
}

/**
 * Populate a select with all readers.
 * @param {string} selectId
 */
function populateAdminDocGiaSelect(selectId) {
  const el = document.getElementById(selectId);
  if (!el) return;

  const list     = Storage.getAll('docGia');
  const firstOpt = el.options[0];
  el.innerHTML   = firstOpt ? firstOpt.outerHTML : '<option value="">-- Chọn độc giả --</option>';

  list.forEach(d => {
    const opt       = document.createElement('option');
    opt.value       = d.maDG;
    opt.textContent = `${d.maDG} – ${d.hoTen}`;
    el.appendChild(opt);
  });
}

/**
 * Populate genre <select> from book data.
 * @param {string} selectId
 */
function populateAdminGenreFilter(selectId) {
  const el = document.getElementById(selectId);
  if (!el) return;

  const sach    = Storage.getAll('sach');
  const genres  = [...new Set(sach.map(s => s.theLoai))].sort();
  const firstOpt = el.options[0];
  el.innerHTML   = firstOpt ? firstOpt.outerHTML : '<option value="">Tất cả thể loại</option>';

  genres.forEach(g => {
    const opt       = document.createElement('option');
    opt.value       = g;
    opt.textContent = g;
    el.appendChild(opt);
  });
}

/* ── Auto-initialize ─────────────────────────────────────────── */

(function initAdmin() {
  const run = () => {
    initAdminNav();

    const page = window.location.pathname.split('/').pop();

    if (page === 'dashboard.html' || page === 'index.html' || page === '') {
      initAdminDashboard();
    }

    if (page === 'doc-gia.html') {
      renderDocGiaTable();

      const searchInput = document.getElementById('searchDocGia');
      const statusSel   = document.getElementById('filterTrangThai');
      const doFilter    = debounce(() => {
        renderDocGiaTable(
          searchInput ? searchInput.value : '',
          statusSel   ? statusSel.value   : ''
        );
      }, 300);

      if (searchInput) searchInput.addEventListener('input', doFilter);
      if (statusSel)   statusSel.addEventListener('change', doFilter);
    }

    if (page === 'sach.html') {
      populateAdminGenreFilter('filterTheLoai');
      renderSachTable();

      const searchInput  = document.getElementById('searchSach');
      const genreFilter  = document.getElementById('filterTheLoai');
      const doFilter     = debounce(() => {
        renderSachTable(
          searchInput ? searchInput.value : '',
          genreFilter ? genreFilter.value : ''
        );
      }, 300);

      if (searchInput) searchInput.addEventListener('input', doFilter);
      if (genreFilter) genreFilter.addEventListener('change', doFilter);
    }

    if (page === 'phieu-muon.html') {
      renderPhieuMuonTable();

      const searchInput = document.getElementById('searchPhieuMuon');
      const statusSel   = document.getElementById('filterTrangThai');
      const doFilter    = debounce(() => {
        renderPhieuMuonTable(
          searchInput ? searchInput.value : '',
          statusSel   ? statusSel.value   : ''
        );
      }, 300);

      if (searchInput) searchInput.addEventListener('input', doFilter);
      if (statusSel)   statusSel.addEventListener('change', doFilter);
    }

    if (page === 'phieu-phat.html') {
      renderPhieuPhatTable();

      const searchInput = document.getElementById('searchPhieuPhat');
      const statusSel   = document.getElementById('filterTrangThai');
      const doFilter    = debounce(() => {
        renderPhieuPhatTable(
          searchInput ? searchInput.value : '',
          statusSel   ? statusSel.value   : ''
        );
      }, 300);

      if (searchInput) searchInput.addEventListener('input', doFilter);
      if (statusSel)   statusSel.addEventListener('change', doFilter);
    }

    if (page === 'nha-cung-cap.html') {
      renderNhaCungCapTable();

      const searchInput = document.getElementById('searchNCC');
      if (searchInput) {
        searchInput.addEventListener('input', debounce(() => {
          renderNhaCungCapTable(searchInput.value);
        }, 300));
      }
    }

    if (page === 'phieu-nhap.html') {
      populateNCCSelect('filterNCC');
      renderPhieuNhapTable();

      const searchInput = document.getElementById('searchPhieuNhap');
      if (searchInput) {
        searchInput.addEventListener('input', debounce(() => {
          renderPhieuNhapTable(searchInput.value);
        }, 300));
      }
    }

    if (page === 'phieu-xuat.html') {
      renderPhieuXuatTable();

      const searchInput = document.getElementById('searchPhieuXuat');
      if (searchInput) {
        searchInput.addEventListener('input', debounce(() => {
          renderPhieuXuatTable(searchInput.value);
        }, 300));
      }
    }

    if (page === 'dat-cho.html') {
      renderDatChoTable();

      const searchInput = document.getElementById('searchDatCho');
      const statusSel   = document.getElementById('filterTrangThai');
      const doFilter    = debounce(() => {
        renderDatChoTable(
          searchInput ? searchInput.value : '',
          statusSel   ? statusSel.value   : ''
        );
      }, 300);

      if (searchInput) searchInput.addEventListener('input', doFilter);
      if (statusSel)   statusSel.addEventListener('change', doFilter);
    }

    if (page === 'bao-cao.html' || page === 'thong-ke.html') {
      renderReportSummary();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
