/* =========================================================
   1. BIẾN TOÀN CỤC CHUNG
   ========================================================= */
// Dùng cho trang Trả Sách
var phieuHienTai_TS = null;
var tongPhatGlobal_TS = 0;
var maSachHienTai = '';
var docGiaHienTai = null;
var sachDaChon = [];
// Dùng cho trang Danh Sách Đặt Chỗ
var danhSachHienThi = [];
var danhSachGoc = [];


/* =========================================================
   3. NGHIỆP VỤ TRANG "DASHBOARD" (TRANG CHỦ)
   ========================================================= */
function taiDuLieu() {
    var homNay = new Date();
    var yyyy = homNay.getFullYear();
    var mm = dem2(homNay.getMonth() + 1);
    var dd = dem2(homNay.getDate());
    var chuoiHN = yyyy + '-' + mm + '-' + dd;
    var tenThu = ['Chủ nhật','Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy'];
    document.getElementById('ngayHienTai').textContent = tenThu[homNay.getDay()] + ', ngày ' + dd + '/' + mm + '/' + yyyy;
    
    var dsPhieuMuon = JSON.parse(localStorage.getItem('danhSachPhieuMuon') || '[]');
    var dsPhat = JSON.parse(localStorage.getItem('danhSachPhat') || '[]');
    var dsSach = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    
    var soSachDangMuon = 0, soTraHomNay = 0, soQuaHan = 0, i, p;
    for (i = 0; i < dsPhieuMuon.length; i++) {
        p = dsPhieuMuon[i];
        if (p.trangThai === 'Đang mượn' || p.trangThai === 'Quá hạn') {
            soSachDangMuon += p.danhSachSach.length;
        }
        if (p.trangThai === 'Quá hạn') soQuaHan++;
        if (p.trangThai === 'Đã trả') {
            if (p.ngayTra === chuoiHN || p.ngayTraThucTe === chuoiHN) {
                soTraHomNay++;
            } 
            else if (!p.ngayTra && !p.ngayTraThucTe && p.hanTra === chuoiHN) {
               soTraHomNay++; 
            }
        }
    }
    
   var tongTienPhat = 0;
    for (i = 0; i < dsPhat.length; i++) {
        if (dsPhat[i].trangThai === 'Chưa thu') {
            tongTienPhat += parseFloat(dsPhat[i].soTien || 0);
        }
    }
    
    document.getElementById('soSachDangMuon').textContent = soSachDangMuon;
    document.getElementById('soTraHomNay').textContent = soTraHomNay;
    document.getElementById('soQuaHan').textContent = soQuaHan;
    document.getElementById('tongTienPhat').textContent = formatTien(tongTienPhat);
    
    var bangPhieuMuon = document.getElementById('bangPhieuMuon');
    var phieuCanXuLy = [];
    var html = '';
    
    for (i = 0; i < dsPhieuMuon.length; i++) {
        p = dsPhieuMuon[i];
        if (p.trangThai === 'Quá hạn' || (p.trangThai === 'Đang mượn' && p.hanTra === chuoiHN)) {
            phieuCanXuLy.push(p);
        }
    }
    
    if (phieuCanXuLy.length === 0) {
        bangPhieuMuon.innerHTML = '<tr><td colspan="7" class="trong-rong">✅ Không có phiếu mượn nào cần xử lý ngay lúc này</td></tr>';
    } else {
        var soNgay, ttClass, ttText, soNgayText;
        for (i = 0; i < phieuCanXuLy.length; i++) {
            p = phieuCanXuLy[i];
            soNgay = soNgayQuaHan(p.hanTra);
            if (p.trangThai === 'Quá hạn') {
                ttClass = 'tt-qua-han'; ttText = 'Quá hạn';
                soNgayText = soNgay > 0 ? (soNgay + ' ngày') : 'Hôm nay';
            } else {
                ttClass = 'tt-den-han'; ttText = 'Đến hạn hôm nay'; soNgayText = '—';
            }
            html += '<tr><td><strong>' + p.maPhieu + '</strong></td><td>' + p.tenDG + '</td>';
            html += '<td>' + formatNgay(p.ngayMuon) + '</td><td>' + formatNgay(p.hanTra) + '</td>';
            html += '<td>' + soNgayText + '</td><td>' + p.danhSachSach.length + ' cuốn</td>';
            html += '<td><span class="trang-thai ' + ttClass + '">' + ttText + '</span></td></tr>';
        }
        bangPhieuMuon.innerHTML = html;
    }
    
    var bangSachSapHet = document.getElementById('bangSachSapHet');
    var sachSapHet = [];
    for (i = 0; i < dsSach.length; i++) {
        if (dsSach[i].soLuongCon < 3) sachSapHet.push(dsSach[i]);
    }
    sachSapHet.sort(function(a,b){ return a.soLuongCon - b.soLuongCon; });
    
    if (sachSapHet.length === 0) {
        bangSachSapHet.innerHTML = '<tr><td colspan="7" class="trong-rong">✅ Tất cả đầu sách đều còn đủ số lượng</td></tr>';
    } else {
        var html2 = '', s, slClass, slText;
        for (i = 0; i < sachSapHet.length; i++) {
            s = sachSapHet[i];
            if (s.soLuongCon === 0) { slClass = 'sl-het'; slText = '0 (Hết sách)'; }
            else if (s.soLuongCon === 1) { slClass = 'sl-mot'; slText = '1 (Rất ít)'; }
            else { slClass = 'sl-hai'; slText = String(s.soLuongCon); }
            html2 += '<tr><td><strong>' + s.maSach + '</strong></td><td>' + s.tenSach + '</td>';
            html2 += '<td>' + s.theLoai + '</td><td>' + s.tacGia + '</td><td>' + s.soLuongTong + '</td>';
            html2 += '<td><span class="' + slClass + '">' + slText + '</span></td><td>' + s.viTri + '</td></tr>';
        }
        bangSachSapHet.innerHTML = html2;
    }
}

/* =========================================================
   4. NGHIỆP VỤ TRANG "CHO MƯỢN SÁCH"
   ========================================================= */
function loadDanhSachDocGiaNhanh() {
    var dsDocGia = JSON.parse(localStorage.getItem('danhSachDocGia') || '[]');
    var html = '';
    for (var i = 0; i < dsDocGia.length; i++) {
        var dg = dsDocGia[i];
        if(dg.trangThai === 'Khóa') continue;
        html += '<tr><td><strong>' + dg.maDG + '</strong></td><td>' + dg.hoTen + '</td><td>' + (dg.email || '-') + '</td><td style="text-align:center"><button class="btn-select-dg" onclick="chonDocGia(\'' + dg.maDG + '\')">Chọn</button></td></tr>';
    }
    document.getElementById('dsDocGiaNhanh').innerHTML = html || '<tr><td colspan="4" style="text-align:center">Chưa có dữ liệu độc giả</td></tr>';
}

function loadDanhSachSachNhanh() {
    var dsSach = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    var dsPhieuMuon = JSON.parse(localStorage.getItem('danhSachPhieuMuon') || '[]');
    var html = '';
    for (var i = 0; i < dsSach.length; i++) {
        var s = dsSach[i];
        var sl = parseInt(s.soLuongCon || 0);
        var actionHtml = '';
        if (sl > 0) {
            actionHtml = '<button class="btn-select-sach" onclick="chonSach(\'' + s.maSach + '\')">➕ Chọn mượn</button>';
        } else {
            var nguoiMuon = [];
            dsPhieuMuon.forEach(p => {
                if (p.trangThai === 'Đang mượn' && p.danhSachSach && Array.isArray(p.danhSachSach)) {
                    if (p.danhSachSach.some(item => item.maSach === s.maSach && !item.daTra)) nguoiMuon.push("- " + p.tenDG + " (" + p.maDG + ")");
                }
            });
            var textTooltip = nguoiMuon.length > 0 ? "Đang được mượn bởi:\n" + nguoiMuon.join("\n") : "Hết sách (Chưa rõ người mượn)";
            actionHtml = '<span class="badge-het" data-borrowers="' + textTooltip + '">Hết sách ℹ️</span>';
        }
        html += '<tr><td><strong>' + s.maSach + '</strong></td><td>' + s.tenSach + '</td><td>' + (s.tacGia || '-') + '</td><td>' + sl + '</td><td style="text-align:center">' + actionHtml + '</td></tr>';
    }
    document.getElementById('dsSachNhanh').innerHTML = html || '<tr><td colspan="5" style="text-align:center">Chưa có dữ liệu sách</td></tr>';
}

function chonDocGia(ma) { document.getElementById('maDGInput').value = ma; timDocGia(); }

function chonSach(maSach) {
    document.getElementById('loiSach').innerHTML = '';
    var dsSach = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    var sach = dsSach.find(s => s.maSach === maSach);
    if (!sach) return;
    if (sachDaChon.some(s => s.maSach === maSach)) { hienThiLoi('loiSach', 'Sách này đã có trong danh sách chuẩn bị mượn!'); return; }
    
    var dsPhieuMuon = JSON.parse(localStorage.getItem('danhSachPhieuMuon') || '[]');
    var daMuonChuaTra = false;
    dsPhieuMuon.forEach(p => {
        if (p.maDG === docGiaHienTai.maDG && p.trangThai === 'Đang mượn') {
            if (p.danhSachSach.some(item => item.maSach === maSach)) daMuonChuaTra = true;
        }
    });
    if (daMuonChuaTra) { hienThiLoi('loiSach', 'Độc giả đang mượn cuốn này và chưa trả!'); return; }
    
    var soSachDangGiu = 0;
    dsPhieuMuon.forEach(p => {
        if (p.maDG === docGiaHienTai.maDG && p.trangThai === 'Đang mượn' && p.danhSachSach && Array.isArray(p.danhSachSach)) {
            soSachDangGiu += p.danhSachSach.filter(s => !s.daTra).length;
        }
    });
    if (soSachDangGiu + sachDaChon.length >= 5) { hienThiLoi('loiSach', 'Vượt quá giới hạn mượn (Tối đa 5 cuốn)!'); return; }
    
    sachDaChon.push({ maSach: sach.maSach, tenSach: sach.tenSach, tacGia: sach.tacGia || '---' });
    capNhatBangSachChon();
    document.getElementById('buoc3').className = 'card';
}

function timDocGia() {
    var maDG = document.getElementById('maDGInput').value.trim();
    var elKetQua = document.getElementById('ketQuaDocGia');
    elKetQua.innerHTML = '';
    anCacBuocTiep();
    if (!maDG) { hienThiLoi('ketQuaDocGia', 'Vui lòng nhập mã độc giả!'); return; }
    
    var dsDocGia = JSON.parse(localStorage.getItem('danhSachDocGia') || '[]');
    var docGia = dsDocGia.find(dg => dg.maDG === maDG);
    if (!docGia) { hienThiLoi('ketQuaDocGia', 'Không tìm thấy độc giả!'); return; }
    if (docGia.trangThai === 'Khóa') { hienThiLoi('ketQuaDocGia', 'Tài khoản độc giả đã bị khóa!'); return; }
    
    var dsPhieuMuon = JSON.parse(localStorage.getItem('danhSachPhieuMuon') || '[]');
    var danhSachTenSachDangMuon = [];
    dsPhieuMuon.forEach(p => {
        if (p.maDG === maDG && p.trangThai === 'Đang mượn' && p.danhSachSach && Array.isArray(p.danhSachSach)) {
            p.danhSachSach.forEach(s => { if (!s.daTra) danhSachTenSachDangMuon.push(s.tenSach); });
        }
    });
    
    var soSachDangMuon = danhSachTenSachDangMuon.length;
    if (soSachDangMuon >= 5) { hienThiLoi('ketQuaDocGia', 'Độc giả đã mượn tối đa 5 cuốn!'); return; }
    docGiaHienTai = docGia;
    var chuoiSachDangMuon = soSachDangMuon > 0 ? '<div style="margin-top:5px; padding-top:5px; border-top:1px dashed #F9A825; color:#555;"><strong>Các sách đang giữ:</strong> ' + danhSachTenSachDangMuon.join(', ') + '</div>' : '';
    elKetQua.innerHTML = '<div class="info-box"><p>✅ <strong>' + docGia.hoTen + '</strong> (' + docGia.maDG + ')</p><p>Đang mượn: <strong>' + soSachDangMuon + '/5</strong> sách</p>' + chuoiSachDangMuon + '</div>';
    document.getElementById('buoc2').className = 'card';
    loadDanhSachSachNhanh();
}

function capNhatBangSachChon() {
    var container = document.getElementById('bangSachChon');
    if (sachDaChon.length === 0) {
        container.innerHTML = '<p class="note">Chưa có sách nào được chọn.</p>';
        document.getElementById('buoc3').className = 'card hidden'; return;
    }
    var html = '<table><tr><th>STT</th><th>Mã sách</th><th>Tên sách</th><th style="text-align:center;">Xóa</th></tr>';
    for (var i = 0; i < sachDaChon.length; i++) {
        html += '<tr><td>' + (i + 1) + '</td><td>' + sachDaChon[i].maSach + '</td><td>' + sachDaChon[i].tenSach + '</td><td style="text-align:center;"><button class="btn btn-danger" onclick="xoaSach(' + i + ')">✕ Xóa</button></td></tr>';
    }
    container.innerHTML = html;
}

function xoaSach(viTri) { sachDaChon.splice(viTri, 1); capNhatBangSachChon(); }
function anCacBuocTiep() { docGiaHienTai = null; sachDaChon = []; document.getElementById('buoc2').className = 'card hidden'; document.getElementById('buoc3').className = 'card hidden'; }

function xacNhanChoMuon() {
    if (!docGiaHienTai || sachDaChon.length === 0) return;
    var ngayMuon = layNgayHomNay();
    var hanTra = document.getElementById('hanTraInput').value;
    if (!hanTra || hanTra <= ngayMuon) { alert('Hạn trả không hợp lệ!'); return; }
    
    var maPhieu = 'PM' + Date.now();
    var dsPhieuMuon = JSON.parse(localStorage.getItem('danhSachPhieuMuon') || '[]');
    dsPhieuMuon.push({
        maPhieu: maPhieu, maDG: docGiaHienTai.maDG, tenDG: docGiaHienTai.hoTen,
        ngayMuon: ngayMuon, hanTra: hanTra, danhSachSach: JSON.parse(JSON.stringify(sachDaChon)),
        trangThai: 'Đang mượn', createdAtMuon: Date.now()
    });
    
    var dsSach = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    sachDaChon.forEach(sdc => {
        var sInKho = dsSach.find(s => s.maSach === sdc.maSach);
        if(sInKho) sInKho.soLuongCon = Math.max(0, parseInt(sInKho.soLuongCon) - 1);
    });
    localStorage.setItem('danhSachPhieuMuon', JSON.stringify(dsPhieuMuon));
    localStorage.setItem('danhSachSach', JSON.stringify(dsSach));
    alert('✅ Cho mượn thành công! Mã phiếu: ' + maPhieu);
    resetTrang();
}

function resetTrang() {
    docGiaHienTai = null; sachDaChon = [];
    document.getElementById('maDGInput').value = '';
    document.getElementById('ketQuaDocGia').innerHTML = '';
    document.getElementById('bangSachChon').innerHTML = '';
    document.getElementById('buoc2').className = 'card hidden';
    document.getElementById('buoc3').className = 'card hidden';
    loadDanhSachDocGiaNhanh();
}

/* =========================================================
   5. NGHIỆP VỤ TRANG "DANH SÁCH ĐẶT CHỖ"
   ========================================================= */
function kiemTraQuaHan() {
    var danhSach = JSON.parse(localStorage.getItem('danhSachDatCho') || '[]');
    var homNay = new Date(); homNay.setHours(0, 0, 0, 0);
    var coThayDoi = false;
    danhSach.forEach(function(dc) {
        if (dc.trangThai === 'Chờ lấy' && dc.hanLaySach) {
            var ngayHan = new Date(dc.hanLaySach); ngayHan.setHours(0, 0, 0, 0);
            if (ngayHan < homNay) {
                dc.trangThai = 'Đã hủy'; dc.ghiChu = 'Tự động hủy do quá hạn lấy sách'; coThayDoi = true;
            }
        }
    });
    if (coThayDoi) localStorage.setItem('danhSachDatCho', JSON.stringify(danhSach));
}

function locDanhSach() {
    var filter = document.getElementById('filterTrangThai').value;
    var searchText = document.getElementById('searchInput').value.toLowerCase().trim();
    danhSachGoc = JSON.parse(localStorage.getItem('danhSachDatCho') || '[]');
    danhSachHienThi = [];
    for (var i = 0; i < danhSachGoc.length; i++) {
        var dc = danhSachGoc[i];
        if (filter && dc.trangThai !== filter) continue;
        if (searchText) {
            var timThay = false;
            var fields = [ dc.maDatCho || '', dc.maDG || '', dc.tenDG || '', dc.maSach || '', dc.tenSach || '' ];
            for (var j = 0; j < fields.length; j++) {
                if (fields[j].toLowerCase().indexOf(searchText) !== -1) { timThay = true; break; }
            }
            if (!timThay) continue;
        }
        danhSachHienThi.push(dc);
    }
    danhSachHienThi.sort(function(a, b) { return (b.ngayDat || '').localeCompare(a.ngayDat || ''); });
    capNhatThongKe();
    hienThiBang();
}

function capNhatThongKe() {
    var thongKe = { choLay: 0, daLay: 0, daHuy: 0, tongCong: danhSachGoc.length };
    danhSachGoc.forEach(function(dc) {
        if (dc.trangThai === 'Chờ lấy') thongKe.choLay++;
        else if (dc.trangThai === 'Đã lấy') thongKe.daLay++;
        else if (dc.trangThai === 'Đã hủy') thongKe.daHuy++;
    });
    document.getElementById('statChoLay').textContent = thongKe.choLay;
    document.getElementById('statDaLay').textContent = thongKe.daLay;
    document.getElementById('statDaHuy').textContent = thongKe.daHuy;
    document.getElementById('statTongCong').textContent = thongKe.tongCong;
}

function hienThiBang() {
    var tbody = document.getElementById('tableDatCho');
    if (danhSachHienThi.length === 0) {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="8">Không có dữ liệu đặt chỗ</td></tr>'; return;
    }
    var homNay = new Date(); homNay.setHours(0, 0, 0, 0);
    var html = '';
    for (var i = 0; i < danhSachHienThi.length; i++) {
        var dc = danhSachHienThi[i];
        var tagClass = 'tag-cho';
        if (dc.trangThai === 'Đã lấy') tagClass = 'tag-lay';
        if (dc.trangThai === 'Đã hủy') tagClass = 'tag-huy';
        
        var ngayHan = new Date(dc.hanLaySach || ''); ngayHan.setHours(0, 0, 0, 0);
        var quaHan = dc.trangThai === 'Chờ lấy' && ngayHan < homNay;
        var soNgayConLai = Math.ceil((ngayHan - homNay) / (1000 * 60 * 60 * 24));
        var tooltipHanLay = '';
        if (dc.trangThai === 'Chờ lấy') {
            if (quaHan) tooltipHanLay = 'data-tooltip="Đã quá hạn ' + Math.abs(soNgayConLai) + ' ngày"';
            else if (soNgayConLai === 0) tooltipHanLay = 'data-tooltip="Hôm nay là hạn cuối!"';
            else if (soNgayConLai > 0) tooltipHanLay = 'data-tooltip="Còn ' + soNgayConLai + ' ngày"';
        }
        
        var hanhDong = '';
        if (dc.trangThai === 'Chờ lấy') {
            hanhDong += '<div class="btn-action-group"><button class="btn btn-success btn-sm" onclick="xacNhanLaySach(\'' + dc.maDatCho + '\')">✅ Xác nhận</button><button class="btn btn-danger btn-sm" onclick="huyDatCho(\'' + dc.maDatCho + '\')">❌ Hủy</button></div>';
        } else if (dc.ghiChu) {
            hanhDong = '<span style="color:#999; font-size:11px; font-style:italic;">' + dc.ghiChu + '</span>';
        } else hanhDong = '<span style="color:#999">--</span>';
        
        html += '<tr><td>' + (i + 1) + '</td><td><strong>' + (dc.maDatCho || '--') + '</strong></td>';
        html += '<td><div class="info-cell"><span class="info-main">' + (dc.maDG || '--') + '</span><span class="info-sub">' + (dc.tenDG || '') + '</span></div></td>';
        html += '<td><div class="info-cell"><span class="info-main">' + (dc.maSach || '--') + '</span><span class="info-sub">' + (dc.tenSach || '') + '</span></div></td>';
        html += '<td>' + formatNgay(dc.ngayDat) + '</td><td class="date-info">';
        if (quaHan) html += '<span class="tooltip-trigger date-warning" ' + tooltipHanLay + '>⚠️ ' + formatNgay(dc.hanLaySach) + '</span>';
        else if (dc.trangThai === 'Chờ lấy' && soNgayConLai <= 2) html += '<span class="tooltip-trigger" style="color:#f57c00; font-weight:500;" ' + tooltipHanLay + '>' + formatNgay(dc.hanLaySach) + '</span>';
        else html += '<span class="tooltip-trigger" ' + tooltipHanLay + '>' + formatNgay(dc.hanLaySach) + '</span>';
        html += '</td><td>';
        if (quaHan) html += '<span class="tag tag-qua-han">Quá hạn</span>';
        else html += '<span class="tag ' + tagClass + '">' + (dc.trangThai || '--') + '</span>';
        html += '</td><td>' + hanhDong + '</td></tr>';
    }
    tbody.innerHTML = html;
}

function xacNhanLaySach(maDatCho) {
    if (!confirm('Xác nhận độc giả đã lấy sách?')) return;
    var danhSach = JSON.parse(localStorage.getItem('danhSachDatCho') || '[]');
    var datCho = null;
    for (var i = 0; i < danhSach.length; i++) {
        if (danhSach[i].maDatCho === maDatCho) {
            danhSach[i].trangThai = 'Đã lấy'; danhSach[i].ngayLay = layNgayHomNay(); datCho = danhSach[i]; break;
        }
    }
    if (datCho) {
        var dsSach = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
        var sach = dsSach.find(s => s.maSach === datCho.maSach);
        var dsPhieuMuon = JSON.parse(localStorage.getItem('danhSachPhieuMuon') || '[]');
        var maPhieu = 'PM' + Date.now();
        var hanTra = tinhNgaySau(new Date(), 14);
        
        dsPhieuMuon.push({
            maPhieu: maPhieu, maDG: datCho.maDG, tenDG: datCho.tenDG, ngayMuon: layNgayHomNay(), hanTra: hanTra,
            danhSachSach: [{ maSach: datCho.maSach, tenSach: datCho.tenSach, tacGia: sach ? (sach.tacGia || '---') : '---' }],
            trangThai: 'Đang mượn', soLanGiaHan: 0, ghiChu: 'Từ đặt chỗ ' + maDatCho, createdAtMuon: Date.now()
        });
        
        if (sach) sach.soLuongCon = Math.max(0, parseInt(sach.soLuongCon || 0) - 1);
        localStorage.setItem('danhSachDatCho', JSON.stringify(danhSach));
        localStorage.setItem('danhSachPhieuMuon', JSON.stringify(dsPhieuMuon));
        localStorage.setItem('danhSachSach', JSON.stringify(dsSach));
        alert('✅ Đã xác nhận lấy sách!\n\nĐã tạo phiếu mượn: ' + maPhieu + '\nHạn trả: ' + formatNgay(hanTra));
        locDanhSach();
    }
}

function huyDatCho(maDatCho) {
    if (!confirm('Bạn có chắc muốn hủy đặt chỗ này không?')) return;
    var danhSach = JSON.parse(localStorage.getItem('danhSachDatCho') || '[]');
    var found = false;
    for (var i = 0; i < danhSach.length; i++) {
        if (danhSach[i].maDatCho === maDatCho) {
            danhSach[i].trangThai = 'Đã hủy'; danhSach[i].ngayHuy = layNgayHomNay(); danhSach[i].ghiChu = 'Hủy bởi nhân viên'; found = true; break;
        }
    }
    if (found) {
        localStorage.setItem('danhSachDatCho', JSON.stringify(danhSach));
        alert('Đã hủy đặt chỗ ' + maDatCho); locDanhSach();
    }
}
/* =========================================================
   6. NGHIỆP VỤ TRANG "TẠO ĐẶT CHỖ MỚI" (ĐÃ ĐỔI TÊN HÀM)
   ========================================================= */
function loadDocGia_DatCho() {
    var dsDocGia = JSON.parse(localStorage.getItem('danhSachDocGia') || '[]');
    var html = '';
    for (var i = 0; i < dsDocGia.length; i++) {
        var dg = dsDocGia[i];
        if(dg.trangThai === 'Khóa' || dg.trangThai === 'Ngừng hoạt động') continue;
        html += '<tr><td><strong>' + dg.maDG + '</strong></td><td>' + dg.hoTen + '</td><td style="text-align:center"><button class="btn-select-dg" onclick="chonDocGia_DatCho(\'' + dg.maDG + '\')">Chọn</button></td></tr>';
    }
    document.getElementById('dsDocGiaNhanh').innerHTML = html || '<tr><td colspan="3" style="text-align:center">Chưa có dữ liệu độc giả</td></tr>';
}

function loadSach_DatCho() {
    var dsSach = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    var dsPhieuMuon = JSON.parse(localStorage.getItem('danhSachPhieuMuon') || '[]');
    var dsDatCho = JSON.parse(localStorage.getItem('danhSachDatCho') || '[]');
    var html = '';

    for (var i = 0; i < dsSach.length; i++) {
        var s = dsSach[i];
        var sl = parseInt(s.soLuongCon || 0);
        var actionHtml = '';

        var daDatCho = dsDatCho.some(function(dc) {
            return dc.maDG === docGiaHienTai.maDG && dc.maSach === s.maSach && dc.trangThai === 'Chờ lấy';
        });

        if (daDatCho) {
            actionHtml = '<span class="badge-dat-cho" data-info="Bạn đã đặt chỗ sách này rồi!">Đã đặt ✓</span>';
        } else if (sl > 0) {
            actionHtml = '<button class="btn-select-sach" onclick="chonSach_DatCho(\'' + s.maSach + '\')">🔖 Đặt chỗ</button>';
        } else {
            var nguoiMuon = [];
            dsPhieuMuon.forEach(function(p) {
                if (p.trangThai === 'Đang mượn') {
                    if (p.danhSachSach.some(item => item.maSach === s.maSach)) nguoiMuon.push("- " + p.tenDG + " (" + p.maDG + ")");
                }
            });
            var textTooltip = nguoiMuon.length > 0 ? "Đang được mượn bởi:\n" + nguoiMuon.join("\n") : "Hết sách (Chưa rõ người mượn)";
            actionHtml = '<button class="btn-select-sach" onclick="chonSach_DatCho(\'' + s.maSach + '\')">🔖 Đặt chỗ</button> <span class="badge-het" data-info="' + textTooltip + '">Hết sách ℹ️</span>';
        }
        html += '<tr><td><strong>' + s.maSach + '</strong></td><td>' + s.tenSach + '</td><td>' + (s.tacGia || '-') + '</td><td>' + sl + '</td><td style="text-align:center">' + actionHtml + '</td></tr>';
    }
    document.getElementById('dsSachNhanh').innerHTML = html || '<tr><td colspan="5" style="text-align:center">Chưa có dữ liệu sách</td></tr>';
}

function chonDocGia_DatCho(ma) {
    document.getElementById('maDGInput').value = ma;
    timDocGia_DatCho();
}

function chonSach_DatCho(maSach) {
    document.getElementById('loiSach').innerHTML = '';
    var dsSach = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    var sach = dsSach.find(s => s.maSach === maSach);
    if (!sach) return;

    var dsDatCho = JSON.parse(localStorage.getItem('danhSachDatCho') || '[]');
    var daDatCho = dsDatCho.some(dc => dc.maDG === docGiaHienTai.maDG && dc.maSach === maSach && dc.trangThai === 'Chờ lấy');
    if (daDatCho) { hienThiLoi('loiSach', 'Bạn đã đặt chỗ sách này rồi!'); return; }

    var sl = parseInt(sach.soLuongCon || 0);
    if (sl > 0 && sl < 15) {
        if (!confirm('⚠️ Sách này hiện còn ' + sl + ' cuốn trên kệ.\n\nBạn có thể mượn trực tiếp thay vì đặt chỗ.\n\nBạn có chắc muốn đặt chỗ không?')) return;
    }

    sachDaChon = { maSach: sach.maSach, tenSach: sach.tenSach, tacGia: sach.tacGia || '---' };
    capNhatThongTinXacNhan();
    document.getElementById('buoc3').className = 'card';
}

function timDocGia_DatCho() {
    var maDG = document.getElementById('maDGInput').value.trim();
    var elKetQua = document.getElementById('ketQuaDocGia');
    elKetQua.innerHTML = '';
    anCacBuocTiep_DatCho();

    if (!maDG) { hienThiLoi('ketQuaDocGia', 'Vui lòng nhập mã độc giả!'); return; }
    var dsDocGia = JSON.parse(localStorage.getItem('danhSachDocGia') || '[]');
    var docGia = dsDocGia.find(dg => dg.maDG === maDG);
    if (!docGia) { hienThiLoi('ketQuaDocGia', 'Không tìm thấy độc giả!'); return; }
    if (docGia.trangThai === 'Khóa' || docGia.trangThai === 'Ngừng hoạt động') { hienThiLoi('ketQuaDocGia', 'Tài khoản độc giả đã bị khóa!'); return; }

    var dsDatCho = JSON.parse(localStorage.getItem('danhSachDatCho') || '[]');
    var sachDangDatCho = [];
    dsDatCho.forEach(dc => { if (dc.maDG === maDG && dc.trangThai === 'Chờ lấy') sachDangDatCho.push(dc.tenSach); });

    docGiaHienTai = docGia;
    var chuoiSachDangDatCho = sachDangDatCho.length > 0 ? '<div style="margin-top:5px; padding-top:5px; border-top:1px dashed #F9A825; color:#555;"><strong>Sách đang đặt chỗ:</strong> ' + sachDangDatCho.join(', ') + '</div>' : '';
    elKetQua.innerHTML = '<div class="info-box"><p>✅ <strong>' + docGia.hoTen + '</strong> (' + docGia.maDG + ')</p><p>Số sách đang đặt chỗ: <strong>' + sachDangDatCho.length + '</strong></p>' + chuoiSachDangDatCho + '</div>';
    
    document.getElementById('buoc2').className = 'card';
    loadSach_DatCho();
}

function anCacBuocTiep_DatCho() {
    docGiaHienTai = null; sachDaChon = null;
    document.getElementById('buoc2').className = 'card hidden';
    document.getElementById('buoc3').className = 'card hidden';
}

function capNhatThongTinXacNhan() {
    if (docGiaHienTai && sachDaChon) {
        document.getElementById('confirm-docGia').innerText = docGiaHienTai.maDG + ' - ' + docGiaHienTai.hoTen;
        document.getElementById('confirm-sach').innerText = sachDaChon.maSach + ' - ' + sachDaChon.tenSach;
    }
}

function xacNhanDatCho() {
    if (!docGiaHienTai || !sachDaChon) return;
    var ngayDat = layNgayHomNay();
    var hanLay = document.getElementById('hanLayInput').value;
    if (!hanLay || hanLay <= ngayDat) { alert('Hạn lấy sách không hợp lệ!'); return; }

    var maDatCho = 'DC' + Date.now();
    var dsDatCho = JSON.parse(localStorage.getItem('danhSachDatCho') || '[]');
    dsDatCho.push({ maDatCho: maDatCho, maDG: docGiaHienTai.maDG, tenDG: docGiaHienTai.hoTen, maSach: sachDaChon.maSach, tenSach: sachDaChon.tenSach, ngayDat: ngayDat, hanLaySach: hanLay, trangThai: 'Chờ lấy' });
    localStorage.setItem('danhSachDatCho', JSON.stringify(dsDatCho));

    alert('✅ Đặt chỗ thành công!\n\nMã đặt chỗ: ' + maDatCho + '\nĐộc giả: ' + docGiaHienTai.hoTen + '\nSách: ' + sachDaChon.tenSach + '\nHạn lấy: ' + formatNgay(hanLay));
    resetTrangDatCho();
}

function resetTrangDatCho() {
    docGiaHienTai = null; sachDaChon = null;
    if(document.getElementById('maDGInput')) document.getElementById('maDGInput').value = '';
    if(document.getElementById('ketQuaDocGia')) document.getElementById('ketQuaDocGia').innerHTML = '';
    if(document.getElementById('buoc2')) document.getElementById('buoc2').className = 'card hidden';
    if(document.getElementById('buoc3')) document.getElementById('buoc3').className = 'card hidden';
    if(document.getElementById('hanLayInput')) document.getElementById('hanLayInput').value = tinhNgaySau(new Date(), 7);
    loadDocGia_DatCho();
}
/* =========================================================
   8. NGHIỆP VỤ TRANG "CHI TIẾT ĐỘC GIẢ"
   ========================================================= */
var BANG_GIA_THE = {
    3:  { phi: 40000,  ten: '3 tháng' },
    6:  { phi: 70000,  ten: '6 tháng' },
    12: { phi: 120000, ten: '1 năm' },
    24: { phi: 200000, ten: '2 năm' }
};

function khoiTao_ChiTietDocGia() {
    maDGHienTai = layThamSoURL('ma');
    if (!maDGHienTai) { document.getElementById('khongTimThay').style.display = 'block'; return; }

    var danhSach = JSON.parse(localStorage.getItem('danhSachDocGia') || '[]');
    var docGia = danhSach.find(dg => dg.maDG === maDGHienTai);

    if (!docGia) { document.getElementById('khongTimThay').style.display = 'block'; return; }

    document.getElementById('tieuDeTrang').innerHTML = '👤 Chi Tiết Độc Giả: ' + docGia.hoTen;
    document.getElementById('vungChiTiet').style.display = 'block';
    hienThiThongTin_CTDG(docGia);
    hienThiThongTinThe_CTDG(docGia);
    taiLichSuMuon_CTDG();
}

function layThamSoURL(ten) {
    var search = window.location.search;
    if (!search) return '';
    var thamSo = search.substring(1).split('&');
    for (var i = 0; i < thamSo.length; i++) {
        var cap = thamSo[i].split('=');
        if (cap[0] === ten) return decodeURIComponent(cap[1] || '');
    }
    return '';
}

function layTrangThaiThe_CTDG(docGia) {
   if (docGia.trangThai === 'Khóa') return { ten: '🔒 Khóa', class: 'badge-locked', canhBao: false };
    if (!docGia.ngayHetHan) return { ten: '⚠️ Chưa có thẻ', class: 'badge-pending', canhBao: true, textCanhBao: 'chưa có thông tin thẻ' };
    if (!docGia.ngayHetHan) return { ten: '⚠️ Chưa có thẻ', class: 'badge-pending', canhBao: true, textCanhBao: 'chưa có thông tin thẻ' };

    var ngayHienTai = new Date(); var ngayHetHan = new Date(docGia.ngayHetHan);
    var soNgayConLai = Math.floor((ngayHetHan - ngayHienTai) / (1000*60*60*24));

    if (soNgayConLai < 0) return { ten: '🔴 Hết hạn (' + Math.abs(soNgayConLai) + ' ngày)', class: 'badge-locked', canhBao: true, textCanhBao: 'đã hết hạn ' + Math.abs(soNgayConLai) + ' ngày' };
    if (soNgayConLai <= 30) return { ten: '🟡 Sắp hết hạn (còn ' + soNgayConLai + ' ngày)', class: 'badge-pending', canhBao: true, textCanhBao: 'sắp hết hạn (còn ' + soNgayConLai + ' ngày)' };
    return { ten: '🟢 Hoạt động', class: 'badge-active', canhBao: false };
}

function hienThiThongTin_CTDG(dg) {
    var html = `
        <tr><th>Mã độc giả</th><td><strong>${dg.maDG || '—'}</strong></td></tr>
        <tr><th>Họ và tên</th><td>${dg.hoTen || '—'}</td></tr>
        <tr><th>Ngày sinh</th><td>${formatNgay(dg.ngaySinh)}</td></tr>
        <tr><th>Giới tính</th><td>${dg.gioiTinh || '—'}</td></tr>
        <tr><th>CMND/CCCD</th><td>${dg.cccd || '—'}</td></tr>
        <tr><th>Email</th><td>${dg.email || '—'}</td></tr>
        <tr><th>Số điện thoại</th><td>${dg.sdt || '—'}</td></tr>
        <tr><th>Địa chỉ</th><td>${dg.diaChi || '—'}</td></tr>
        <tr><th>Nghề nghiệp</th><td>${dg.ngheNghiep || '—'}</td></tr>
        <tr><th>Nơi làm việc</th><td>${dg.noiLamViec || '—'}</td></tr>`;
    document.getElementById('bangThongTin').innerHTML = html;
}

function hienThiThongTinThe_CTDG(dg) {
    var trangThai = layTrangThaiThe_CTDG(dg);
    var tenGoiThe = dg.thoiHan ? (BANG_GIA_THE[dg.thoiHan] ? BANG_GIA_THE[dg.thoiHan].ten : dg.thoiHan + ' tháng') : '—';
    var html = `
        <tr><th>Mã thẻ</th><td><strong>${dg.maThe || '—'}</strong></td></tr>
        <tr><th>Ngày cấp thẻ</th><td>${formatNgay(dg.ngayCapThe)}</td></tr>
        <tr><th>Gói thẻ</th><td>${tenGoiThe}</td></tr>
        <tr><th>Ngày hết hạn</th><td>${formatNgay(dg.ngayHetHan)}</td></tr>
        <tr><th>Phí thẻ đã đóng</th><td>${dg.phiThe ? dg.phiThe.toLocaleString('vi-VN') + ' đ' : '—'}</td></tr>
        <tr><th>Trạng thái</th><td><span class="badge ${trangThai.class}">${trangThai.ten}</span></td></tr>`;

    if (dg.trangThai === 'Khóa' && dg.lyDoKhoa) {
        html += `<tr><th>Lý do khóa</th><td style="color:#c62828;"><strong>${dg.lyDoKhoa}</strong></td></tr>
                 <tr><th>Ngày khóa</th><td>${formatNgay(dg.ngayKhoa)}</td></tr>`;
    }
    document.getElementById('bangThongTinThe').innerHTML = html;

    var btn = document.getElementById('btnKhoaMoThe');
    if (dg.trangThai === 'Khóa') {
        btn.innerHTML = '🔓 Mở khóa thẻ'; btn.style.background = '#4caf50';
    } else {
        btn.innerHTML = '🔒 Khóa thẻ'; btn.style.background = '#f44336';
    }

    if (trangThai.canhBao) {
        document.getElementById('textCanhBao').textContent = trangThai.textCanhBao;
        document.getElementById('canhBaoHetHan').style.display = 'block';
    } else {
        document.getElementById('canhBaoHetHan').style.display = 'none';
    }
}

function batDauSua_CTDG() {
    var danhSach = JSON.parse(localStorage.getItem('danhSachDocGia') || '[]');
    var dg = danhSach.find(d => d.maDG === maDGHienTai);
    if (!dg) return;
    document.getElementById('sua_maDG').value = dg.maDG || '';
    document.getElementById('sua_hoTen').value = dg.hoTen || '';
    document.getElementById('sua_ngaySinh').value = dg.ngaySinh || '';
    document.getElementById('sua_gioiTinh').value = dg.gioiTinh || 'Nam';
    document.getElementById('sua_cccd').value = dg.cccd || '';
    document.getElementById('sua_email').value = dg.email || '';
    document.getElementById('sua_sdt').value = dg.sdt || '';
    document.getElementById('sua_diaChi').value = dg.diaChi || '';
    document.getElementById('sua_ngheNghiep').value = dg.ngheNghiep || '';
    document.getElementById('sua_noiLamViec').value = dg.noiLamViec || '';
    document.getElementById('sua_trangThaiThe').value = dg.trangThai || 'Hoạt động';
    document.getElementById('modalSuaInfo').style.display = 'block';
}


function huyChinhSua_CTDG() {
    document.getElementById('modalSuaInfo').style.display = 'none';

    var danhSach = JSON.parse(localStorage.getItem('danhSachDocGia') || '[]');
    var dg = danhSach.find(d => d.maDG === maDGHienTai);
    
    if (dg) {
        document.getElementById('sua_hoTen').value = dg.hoTen || '';
        document.getElementById('sua_ngaySinh').value = dg.ngaySinh || '';
        document.getElementById('sua_gioiTinh').value = dg.gioiTinh || 'Nam';
        document.getElementById('sua_cccd').value = dg.cccd || '';
        document.getElementById('sua_email').value = dg.email || '';
        document.getElementById('sua_sdt').value = dg.sdt || '';
        document.getElementById('sua_diaChi').value = dg.diaChi || '';
        document.getElementById('sua_ngheNghiep').value = dg.ngheNghiep || '';
        document.getElementById('sua_noiLamViec').value = dg.noiLamViec || '';
        document.getElementById('sua_trangThaiThe').value = dg.trangThai || 'Hoạt động';
    }
}

function luuThayDoi_CTDG() {
    var hoTen = document.getElementById('sua_hoTen').value.trim();
    if (!hoTen) { alert('⚠ Vui lòng nhập họ và tên!'); return; }

    var danhSach = JSON.parse(localStorage.getItem('danhSachDocGia') || '[]');
    var i = danhSach.findIndex(d => d.maDG === maDGHienTai);
    if (i > -1) {
        danhSach[i].hoTen = hoTen;
        danhSach[i].ngaySinh = document.getElementById('sua_ngaySinh').value;
        danhSach[i].gioiTinh = document.getElementById('sua_gioiTinh').value;
        danhSach[i].cccd = document.getElementById('sua_cccd').value.trim();
        danhSach[i].email = document.getElementById('sua_email').value.trim();
        danhSach[i].sdt = document.getElementById('sua_sdt').value.trim();
        danhSach[i].diaChi = document.getElementById('sua_diaChi').value.trim();
        danhSach[i].ngheNghiep = document.getElementById('sua_ngheNghiep').value.trim();
        danhSach[i].noiLamViec = document.getElementById('sua_noiLamViec').value.trim();
        danhSach[i].trangThai = document.getElementById('sua_trangThaiThe').value;

        localStorage.setItem('danhSachDocGia', JSON.stringify(danhSach));
        alert('✅ Đã lưu thay đổi thành công!');
        hienThiThongTin_CTDG(danhSach[i]);
        hienThiThongTinThe_CTDG(danhSach[i]);
        huyChinhSua_CTDG();
    }
}

function taiLichSuMuon_CTDG() {
    var dsPhieuMuon = JSON.parse(localStorage.getItem('danhSachPhieuMuon') || '[]');
    var phieuCuaDG = dsPhieuMuon.filter(p => p.maDG === maDGHienTai).sort((a,b) => (b.ngayMuon || '').localeCompare(a.ngayMuon || ''));
    var bang = document.getElementById('bangLichSuMuon');

    if (phieuCuaDG.length === 0) {
        bang.innerHTML = '<tr><td colspan="5" class="no-data">Độc giả này chưa có lịch sử mượn sách nào</td></tr>'; return;
    }

    var html = '';
    phieuCuaDG.forEach(pm => {
        var tenSachArr = (pm.danhSachSach || []).map(s => s.tenSach || s.maSach || '?');
        var tenSach = tenSachArr.length > 0 ? tenSachArr.join(', ') : '—';
        var trangThai = pm.trangThai || 'Đang mượn';
        var badgeClass = trangThai === 'Đã trả' ? 'badge-returned' : (trangThai === 'Quá hạn' ? 'badge-overdue' : 'badge-pending');
        
        html += `<tr><td><strong>${pm.maPhieu}</strong></td><td>${formatNgay(pm.ngayMuon)}</td><td>${formatNgay(pm.hanTra)}</td><td>${tenSach}</td><td><span class="badge ${badgeClass}">${trangThai}</span></td></tr>`;
    });
    bang.innerHTML = html;
}

function moModalGiaHanThe_CTDG() {
    var danhSach = JSON.parse(localStorage.getItem('danhSachDocGia') || '[]');
    var docGia = danhSach.find(d => d.maDG === maDGHienTai);
    if (!docGia) return;

    document.getElementById('hanTheCu').textContent = formatNgay(docGia.ngayHetHan);
    document.getElementById('ngayGiaHan').textContent = formatNgay(layNgayHomNay());
    document.getElementById('goiGiaHan').value = '12';
    capNhatThongTinGiaHan_CTDG();
    document.getElementById('modalGiaHanThe').style.display = 'block';
}

function dongModalGiaHanThe_CTDG() { document.getElementById('modalGiaHanThe').style.display = 'none'; }

function capNhatThongTinGiaHan_CTDG() {
    var thoiHan = parseInt(document.getElementById('goiGiaHan').value);

    if (!thoiHan) {
        document.getElementById('hanTheMoi').textContent = '--';
        document.getElementById('phiGiaHan').textContent = '--';
        return;
    }

    var danhSach = JSON.parse(localStorage.getItem('danhSachDocGia') || '[]');
    var docGia = danhSach.find(d => d.maDG === maDGHienTai);

    // 👉 FIX: lấy ngày gốc (ưu tiên ngày hết hạn cũ)
    var ngayGoc = docGia && docGia.ngayHetHan 
        ? new Date(docGia.ngayHetHan) 
        : new Date();

    ngayGoc.setMonth(ngayGoc.getMonth() + thoiHan);

    function fNgay(d) {
        return d.getFullYear() + '-' +
            String(d.getMonth() + 1).padStart(2, '0') + '-' +
            String(d.getDate()).padStart(2, '0');
    }

    document.getElementById('hanTheMoi').textContent = formatNgay(fNgay(ngayGoc));
    document.getElementById('phiGiaHan').textContent =
        BANG_GIA_THE[thoiHan].phi.toLocaleString('vi-VN') + 'đ';
}
function xacNhanGiaHanThe_CTDG() {
    var thoiHan = parseInt(document.getElementById('goiGiaHan').value);
    if (!thoiHan) return;

    if (!confirm('Bạn có chắc muốn cấp / gia hạn thẻ không?')) return;

    var danhSach = JSON.parse(localStorage.getItem('danhSachDocGia') || '[]');
    var i = danhSach.findIndex(d => d.maDG === maDGHienTai);

    if (i === -1) return;

    var docGia = danhSach[i];

    function fNgay(d) {
        return d.getFullYear() + '-' +
            String(d.getMonth() + 1).padStart(2, '0') + '-' +
            String(d.getDate()).padStart(2, '0');
    }
    var ngayGoc = docGia.ngayHetHan 
        ? new Date(docGia.ngayHetHan) 
        : new Date();

    ngayGoc.setMonth(ngayGoc.getMonth() + thoiHan);

   if (!docGia.maThe) {
    docGia.maThe = 'THE_' + docGia.maDG;
}

    if (!docGia.ngayCapThe) {
        docGia.ngayCapThe = fNgay(new Date());
    }
    docGia.thoiHan = thoiHan;
    docGia.ngayHetHan = fNgay(ngayGoc);
    docGia.phiThe = BANG_GIA_THE[thoiHan].phi;
    docGia.trangThai = 'Hoạt động';

    localStorage.setItem('danhSachDocGia', JSON.stringify(danhSach));

    alert('✅ Gia hạn thẻ thành công!\n\nMã thẻ: ' + docGia.maThe);

    dongModalGiaHanThe_CTDG();
    hienThiThongTin_CTDG(docGia);
    hienThiThongTinThe_CTDG(docGia);
    taiLichSuMuon_CTDG();
}

function khoaMoThe_CTDG() {
    var danhSach = JSON.parse(localStorage.getItem('danhSachDocGia') || '[]');
    var i = danhSach.findIndex(d => d.maDG === maDGHienTai);
    if (i === -1) return;
    
    var docGia = danhSach[i];
    var trangThaiHienTai = docGia.trangThai || 'Hoạt động';
    var hanhDong = trangThaiHienTai === 'Khóa' ? 'mở khóa' : 'khóa';
    
    var lyDo = '';
    if (hanhDong === 'khóa') {
        lyDo = prompt('📝 Vui lòng nhập lý do khóa thẻ:');
        if (lyDo === null) return;
        if (!lyDo.trim()) { alert('⚠ Vui lòng nhập lý do khóa thẻ!'); return; }
    }
    
    if (!confirm('Bạn có chắc muốn ' + hanhDong + ' thẻ này không?')) return;
    
    danhSach[i].trangThai = trangThaiHienTai === 'Khóa' ? 'Hoạt động' : 'Khóa';
    if (hanhDong === 'khóa') {
        danhSach[i].lyDoKhoa = lyDo.trim();
        danhSach[i].ngayKhoa = layNgayHomNay();
    } else {
        delete danhSach[i].lyDoKhoa; delete danhSach[i].ngayKhoa;
    }
    
    localStorage.setItem('danhSachDocGia', JSON.stringify(danhSach));
    alert('Đã ' + hanhDong + ' thẻ thành công!');
    location.reload();
}
/* =========================================================
   8. NGHIỆP VỤ TRANG "DANH SÁCH ĐỘC GIẢ"
   ========================================================= */

// BẬT CÔNG TẮC: Tự động chạy hàm vẽ bảng khi mở trang
window.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('bangDocGia')) {
        taiDanhSach_DSDG();
    }
});

function taiDanhSach_DSDG() {
    var tuKhoaInput = document.getElementById('tuKhoa');
    var tuKhoa = (tuKhoaInput ? tuKhoaInput.value : '').trim().toLowerCase();
    var danhSach = JSON.parse(localStorage.getItem('danhSachDocGia') || '[]');

    var ketQua = danhSach.filter(dg => {
        return !tuKhoa || 
               (dg.hoTen && dg.hoTen.toLowerCase().includes(tuKhoa)) ||
               (dg.maDG && dg.maDG.toLowerCase().includes(tuKhoa)) ||
               (dg.email && dg.email.toLowerCase().includes(tuKhoa)) ||
               (dg.sdt && dg.sdt.includes(tuKhoa));
    });

    var lbl = document.getElementById('lblSoLuong');
    if (lbl) {
        lbl.innerHTML = tuKhoa 
            ? `Tìm thấy <strong>${ketQua.length}</strong> / ${danhSach.length} độc giả`
            : `Tổng số: <strong>${danhSach.length}</strong> độc giả`;
    }

    var bang = document.getElementById('bangDocGia');
    if (!bang) return;

    if (ketQua.length === 0) {
        bang.innerHTML = '<tr><td colspan="11" style="text-align:center;padding:20px;color:#777;">Không tìm thấy độc giả nào</td></tr>';
        return;
    }

    var html = '';
    ketQua.forEach((dg, index) => {
        var tenGoi = dg.thoiHan ? (dg.thoiHan + ' tháng') : '—';
        
        // Fix tạm hàm formatNgay nếu file chung chưa có
        var fNgay = dStr => {
            if (!dStr) return '—';
            var p = dStr.split('-');
            return p.length === 3 ? `${p[2]}/${p[1]}/${p[0]}` : dStr;
        };
        var hanThe = dg.ngayHetHan ? fNgay(dg.ngayHetHan) : '—';

        var trangThai = 'Chưa có thẻ';
        var badgeClass = 'badge-pending';

        if (dg.maThe && dg.maThe !== '—') {
            // SỬA LỖI LỆCH BIẾN: Đổi dg.trangThaiThe thành dg.trangThai
            if (dg.trangThai === 'Hoạt động') {
                trangThai = '🟢 Hoạt động';
                badgeClass = 'badge-active';
            } else if (dg.trangThai === 'Khóa') {
                trangThai = '🔴 Khóa';
                badgeClass = 'badge-locked';
            } else {
                trangThai = '⚪ ' + (dg.trangThai || 'Không xác định');
            }
        }

        html += '<tr>';
        html += `<td>${index + 1}</td>`;
        html += `<td><strong>${dg.maDG || '—'}</strong></td>`;
        html += `<td>${dg.maThe || '—'}</td>`;
        html += `<td>${dg.hoTen || '—'}</td>`;
        html += `<td>${dg.cccd || '—'}</td>`;
        html += `<td>${dg.email || '—'}</td>`;
        html += `<td>${dg.sdt || '—'}</td>`;
        html += `<td>${tenGoi}</td>`;
        html += `<td>${hanThe}</td>`;
        html += `<td><span style="font-weight: bold; padding: 4px 8px; border-radius: 4px; background: #f0f0f0;" class="badge ${badgeClass}">${trangThai}</span></td>`;
        
        // Nút xem chi tiết truyền tham số ?ma=...
        html += `<td><a href="doc-gia-chi-tiet.html?ma=${encodeURIComponent(dg.maDG)}" style="text-decoration:none; padding:4px 8px; border-radius:3px; background:#00BCD4; color:white; font-size:13px;">👁 Xem</a></td>`;
        html += '</tr>';
    });

    bang.innerHTML = html;
}

function timKiemDocGia_DSDG() {
    taiDanhSach_DSDG();
}

function xuLyEnter_DSDG(event) {
    if (event.keyCode === 13) timKiemDocGia_DSDG();
}
/* =========================================================
   9. NGHIỆP VỤ TRANG "THÊM ĐỘC GIẢ MỚI"
   ========================================================= */
function taoMaDG_Them() {
    var danhSach = JSON.parse(localStorage.getItem('danhSachDocGia') || '[]');
    var soLonNhat = 0;
    danhSach.forEach(dg => {
        var ma = dg.maDG || '';
        if (ma.startsWith('DG')) {
            var so = parseInt(ma.substring(2), 10);
            if (!isNaN(so) && so > soLonNhat) soLonNhat = so;
        }
    });
    return 'DG' + String(soLonNhat + 1).padStart(3, '0');
}

function capNhatThongTinThe_Them() {
    var thoiHan = parseInt(document.getElementById('thoiHan').value);
    if (!thoiHan) {
        document.getElementById('ngayCapThe').value = '';
        document.getElementById('ngayHetHan').value = '';
        document.getElementById('phiThe').value = '';
        return;
    }
    var ngayCap = new Date();
    var ngayHet = new Date(); ngayHet.setMonth(ngayHet.getMonth() + thoiHan);
    
    document.getElementById('ngayCapThe').value = formatNgay(ngayCap.toISOString().split('T')[0]);
    document.getElementById('ngayHetHan').value = formatNgay(ngayHet.toISOString().split('T')[0]);
    document.getElementById('phiThe').value = (thoiHan === 3 ? 40000 : thoiHan === 6 ? 70000 : thoiHan === 12 ? 120000 : 200000).toLocaleString('vi-VN') + 'đ';
}

function luuDocGia_Them() {
    var hoTen = document.getElementById('hoTen').value.trim();
    var cccd = document.getElementById('cccd').value.trim();
    var email = document.getElementById('email').value.trim();
    var sdt = document.getElementById('sdt').value.trim();
    var thoiHan = parseInt(document.getElementById('thoiHan').value);

    if (!hoTen || !cccd || !email || !sdt || !thoiHan) { 
        alert('⚠ Vui lòng điền đầy đủ thông tin bắt buộc!'); 
        return; 
    }

    var danhSach = JSON.parse(localStorage.getItem('danhSachDocGia') || '[]');

    if (danhSach.some(d => d.cccd === cccd)) { 
        alert('⚠ CMND/CCCD này đã được sử dụng!'); 
        return; 
    }

    var maDGInput = document.getElementById('maDG');
var maDG = maDGInput && maDGInput.value 
    ? maDGInput.value 
    : taoMaDG_Them();

    var ngayCap = new Date();
    var ngayHet = new Date(); 
    ngayHet.setMonth(ngayHet.getMonth() + thoiHan);

    var fNgay = d => d.getFullYear() + '-' + 
        String(d.getMonth() + 1).padStart(2, '0') + '-' + 
        String(d.getDate()).padStart(2, '0');

    var docGiaMoi = {
        maDG: maDG,
        hoTen: hoTen,
        ngaySinh: document.getElementById('ngaySinh').value,
        gioiTinh: document.getElementById('gioiTinh').value,
        cccd: cccd,
        email: email,
        sdt: sdt,
        diaChi: document.getElementById('diaChi').value,
        ngheNghiep: document.getElementById('ngheNghiep').value,
        noiLamViec: document.getElementById('noiLamViec').value,
        maThe: 'THE_' + maDG,

        ngayCapThe: fNgay(ngayCap),
        thoiHan: thoiHan,
        ngayHetHan: fNgay(ngayHet),
        phiThe: parseInt(document.getElementById('phiThe').value.replace(/\D/g,'')),
        trangThai: 'Hoạt động'
    };

    danhSach.push(docGiaMoi);
    localStorage.setItem('danhSachDocGia', JSON.stringify(danhSach));

    alert('✅ Đã thêm độc giả thành công!\nMã thẻ: ' + docGiaMoi.maThe);
    window.location.href = 'doc-gia-danh-sach.html';
}
/* =========================================================
   10. NGHIỆP VỤ TRANG "GIA HẠN"
   ========================================================= */
function loadDanhSachPhieuHienHanh_GH() {
    var dsPhieuMuon = JSON.parse(localStorage.getItem('danhSachPhieuMuon') || '[]');
    var html = '';
    var homNay = layNgayHomNay();

    for (var i = 0; i < dsPhieuMuon.length; i++) {
        var p = dsPhieuMuon[i];
        if (p.trangThai === 'Đang mượn' || p.trangThai === 'Quá hạn') {
            var soNgayQuaHan = tinhSoNgay_GH(p.hanTra, homNay);
            var isQuaHan = soNgayQuaHan > 0;
            var statusText = isQuaHan ? '<span class="qua-han-text">Quá hạn (' + soNgayQuaHan + ' ngày)</span>' : '<span style="color:#4CAF50;">Còn hạn</span>';
            
            html += '<tr>';
            html += '<td><strong>' + p.maPhieu + '</strong></td>';
            html += '<td>' + p.tenDG + '</td>';
            html += '<td>' + dinhDangNgay_GH(p.hanTra) + '</td>';
            html += '<td>' + statusText + '</td>';
            html += '<td style="text-align:center"><button class="btn-select" onclick="chonPhieuTuBang_GH(\'' + p.maPhieu + '\')">Chọn</button></td>';
            html += '</tr>';
        }
    }
    document.getElementById('dsPhieuHienHanh').innerHTML = html || '<tr><td colspan="5" style="text-align:center;">Trống.</td></tr>';
}

function chonPhieuTuBang_GH(maPhieu) {
    document.getElementById('maPhieuInput').value = maPhieu;
    timPhieuGiaHan_GH();
}

function locPhieu_GH() {
    var input = document.getElementById("filterInput").value.toUpperCase();
    var tr = document.getElementById("dsPhieuHienHanh").getElementsByTagName("tr");
    for (var i = 0; i < tr.length; i++) {
        tr[i].style.display = tr[i].innerText.toUpperCase().indexOf(input) > -1 ? "" : "none";
    }
}

function dinhDangNgay_GH(str) {
    if (!str) return '---'; var p = str.split('-'); return p[2] + '/' + p[1] + '/' + p[0];
}
function dinhDangTien_GH(so) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(so);
}
function tinhSoNgay_GH(ngay1Str, ngay2Str) {
    var d1 = new Date(ngay1Str + 'T00:00:00');
    var d2 = new Date(ngay2Str + 'T00:00:00');
    return Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
}

function timPhieuGiaHan_GH() {
    var maPhieu = document.getElementById('maPhieuInput').value.trim();
    var elKetQua = document.getElementById('ketQuaTim');
    elKetQua.innerHTML = '';
    document.getElementById('cardGiaHan').className = 'card hidden';
    phieuHienTai_GH = null;

    if (!maPhieu) { hienThiLoi('ketQuaTim', 'Vui lòng nhập mã phiếu mượn!'); return; }

    var dsPhieuMuon = JSON.parse(localStorage.getItem('danhSachPhieuMuon') || '[]');
    var phieu = dsPhieuMuon.find(p => p.maPhieu === maPhieu);

    if (!phieu) { hienThiLoi('ketQuaTim', 'Không tìm thấy phiếu mượn với mã: <strong>' + maPhieu + '</strong>'); return; }
    if (phieu.trangThai === 'Đã trả') { hienThiLoi('ketQuaTim', 'Phiếu <strong>' + maPhieu + '</strong> đã được trả, không thể gia hạn!'); return; }

    phieuHienTai_GH = phieu;
    hienThiCardGiaHan_GH(phieu);
    document.getElementById('cardGiaHan').className = 'card';
}

function hienThiCardGiaHan_GH(phieu) {
    var homNay = layNgayHomNay();
    var soNgayQuaHan = tinhSoNgay_GH(phieu.hanTra, homNay);
    var quaHan = soNgayQuaHan > 0;
    var soLanGiaHan = parseInt(phieu.soLanGiaHan) || 0;

    var badgeClass = soLanGiaHan === 0 ? 'badge-ok' : (soLanGiaHan === 1 ? 'badge-warn' : 'badge-danger');
    var soLanHtml = '<span class="badge ' + badgeClass + '">' + soLanGiaHan + '/2 lần gia hạn</span>';

    var hanTraHtml = quaHan ? dinhDangNgay_GH(phieu.hanTra) + ' <span class="qua-han-text">(Quá hạn ' + soNgayQuaHan + ' ngày)</span>' : dinhDangNgay_GH(phieu.hanTra) + ' <span style="color:#388E3C;">(Còn hạn)</span>';

    document.getElementById('thongTinPhieu').innerHTML = '<div class="info-box">'
        + '<p><strong>Mã phiếu:</strong> ' + phieu.maPhieu + '</p>'
        + '<p><strong>Độc giả:</strong> ' + phieu.tenDG + ' (' + phieu.maDG + ')</p>'
        + '<p><strong>Ngày mượn:</strong> ' + dinhDangNgay_GH(phieu.ngayMuon) + ' &nbsp;|&nbsp; <strong>Hạn trả hiện tại:</strong> ' + hanTraHtml + '</p>'
        + '<p><strong>Số lần đã gia hạn:</strong> ' + soLanHtml + '</p>'
        + '<p><strong>Số sách:</strong> ' + phieu.danhSachSach.length + ' cuốn</p></div>';

    var khuGiaHan = document.getElementById('khuGiaHan');
    var khuNut = document.getElementById('khuNutGiaHan');

    if (soLanGiaHan >= 2) {
        khuGiaHan.innerHTML = '<div class="error-box">🚫 Phiếu này đã được gia hạn <strong>' + soLanGiaHan + ' lần</strong>. Không thể gia hạn thêm!</div>';
        khuNut.innerHTML = '<button class="btn btn-gray" onclick="resetTrang_GH()">🔄 Tìm phiếu khác</button>';
        return;
    }

    if (quaHan) {
        tienPhatHienTai_GH = soNgayQuaHan * 2000;
        khuGiaHan.innerHTML = '<div class="error-box">⚠️ Phiếu mượn đã <strong>quá hạn ' + soNgayQuaHan + ' ngày</strong>. Cần nộp phạt <strong>' + dinhDangTien_GH(tienPhatHienTai_GH) + '</strong> và trả sách cũ trước khi mượn mới.</div>';
        khuNut.innerHTML = '<button class="btn btn-primary" onclick="moModalThanhToan_GH()">💰 Nộp phạt & Trả sách</button> <button class="btn btn-gray" onclick="resetTrang_GH()" style="margin-left:10px;">🔄 Hủy</button>';
        return;
    }

    khuGiaHan.innerHTML = '<div class="gian-han-box">'
        + '<div class="row-info"><div class="label-col">Hạn trả hiện tại:</div><div class="value-col"><strong>' + dinhDangNgay_GH(phieu.hanTra) + '</strong></div></div>'
        + '<div class="row-info"><div class="label-col">Số ngày gia hạn thêm:</div><div class="value-col">'
        + '<select id="soNgayGiaHan" onchange="capNhatNgayMoi_GH()" style="width:180px;padding:6px;border:1px solid #90CAF9;border-radius:4px;">'
        + '<option value="7">7 ngày</option><option value="14" selected>14 ngày</option></select></div></div>'
        + '<div class="row-info"><div class="label-col">Hạn trả mới:</div><div class="value-col ngay-moi" id="hienThiNgayMoi">---</div></div></div>';

    khuNut.innerHTML = '<button class="btn btn-success" onclick="xacNhanGiaHan_GH()">✅ Xác nhận gia hạn</button> <button class="btn btn-gray" onclick="resetTrang_GH()" style="margin-left:10px;">🔄 Hủy</button>';
    capNhatNgayMoi_GH();
}

function capNhatNgayMoi_GH() {
    if (!phieuHienTai_GH) return;
    var soNgay = parseInt(document.getElementById('soNgayGiaHan').value) || 14;
    var ngayMoi = tinhNgaySau(phieuHienTai_GH.hanTra, soNgay);
    document.getElementById('hienThiNgayMoi').textContent = dinhDangNgay_GH(ngayMoi) + ' (+' + soNgay + ' ngày)';
}

function moModalThanhToan_GH() {
    document.getElementById('txtSoTienModal').innerText = "Số tiền phạt: " + dinhDangTien_GH(tienPhatHienTai_GH);
    document.getElementById('modalThanhToanPhat').style.display = 'block';
}

function dongModal_GH() {
    document.getElementById('modalThanhToanPhat').style.display = 'none';
}

function xacNhanNopPhat_GH() {
    if (!phieuHienTai_GH || tienPhatHienTai_GH <= 0) return;
    
    var dsPhieuMuon = JSON.parse(localStorage.getItem('danhSachPhieuMuon') || '[]');
    var index = dsPhieuMuon.findIndex(p => p.maPhieu === phieuHienTai_GH.maPhieu);
    
    if (index !== -1) {
        dsPhieuMuon[index].daNopPhatQuaHan = true;
        dsPhieuMuon[index].ngayNopPhatQuaHan = layNgayHomNay();
        dsPhieuMuon[index].soTienPhatQuaHan = tienPhatHienTai_GH;
        localStorage.setItem('danhSachPhieuMuon', JSON.stringify(dsPhieuMuon));
    }
    
    var dsPhat = JSON.parse(localStorage.getItem('danhSachPhat') || '[]');
    var maPhat = 'PT' + Date.now();
    var homNay = layNgayHomNay();
    var soNgayQuaHan = tinhSoNgay_GH(phieuHienTai_GH.hanTra, homNay);
    
    dsPhat.push({
        maPhat: maPhat, maDG: phieuHienTai_GH.maDG, tenDG: phieuHienTai_GH.tenDG,
        loaiVP: 'Quá hạn', soTien: tienPhatHienTai_GH, ngayPhat: homNay,
        trangThai: 'Đã thanh toán', ngayThanhToan: homNay,
        ghiChu: 'Phiếu ' + phieuHienTai_GH.maPhieu + ' quá hạn ' + soNgayQuaHan + ' ngày',
        createdAt: Date.now()
    });
    
    localStorage.setItem('danhSachPhat', JSON.stringify(dsPhat));
    
    alert('✅ Đã xác nhận thu tiền phạt ' + dinhDangTien_GH(tienPhatHienTai_GH) + '.\n\nMã phiếu phạt: ' + maPhat + '\n\nĐang chuyển đến trang Trả sách để hoàn tất thủ tục.');
    dongModal_GH();
    window.location.href = 'tra-sach.html';
}

function xacNhanGiaHan_GH() {
    if (!phieuHienTai_GH) return;
    var soNgay = parseInt(document.getElementById('soNgayGiaHan').value);
    var hanTraMoi = tinhNgaySau(phieuHienTai_GH.hanTra, soNgay);
    var soLanGiaHan = (parseInt(phieuHienTai_GH.soLanGiaHan) || 0) + 1;

    if (!confirm('Xác nhận gia hạn phiếu ' + phieuHienTai_GH.maPhieu + ' đến ngày ' + dinhDangNgay_GH(hanTraMoi) + '?')) return;

    var dsPhieuMuon = JSON.parse(localStorage.getItem('danhSachPhieuMuon') || '[]');
    var index = dsPhieuMuon.findIndex(p => p.maPhieu === phieuHienTai_GH.maPhieu);
    
    if (index !== -1) {
        dsPhieuMuon[index].hanTra = hanTraMoi;
        dsPhieuMuon[index].soLanGiaHan = soLanGiaHan;
        dsPhieuMuon[index].loaiGiaHan = true;
        dsPhieuMuon[index].ngayGiaHan = layNgayHomNay();
        dsPhieuMuon[index].createdAtGiaHan = Date.now();
        localStorage.setItem('danhSachPhieuMuon', JSON.stringify(dsPhieuMuon));
        alert('✅ Gia hạn thành công!');
        resetTrang_GH();
    }
}

function resetTrang_GH() {
    phieuHienTai_GH = null;
    document.getElementById('maPhieuInput').value = '';
    document.getElementById('ketQuaTim').innerHTML = '';
    document.getElementById('cardGiaHan').className = 'card hidden';
    loadDanhSachPhieuHienHanh_GH();
}
/* =========================================================
   11. NGHIỆP VỤ TRANG "LỊCH SỬ GIAO DỊCH"
   ========================================================= */
function xayDungGiaoDich_LS() {
    var dsPhieuMuon = JSON.parse(localStorage.getItem('danhSachPhieuMuon') || '[]');
    var dsPhat = JSON.parse(localStorage.getItem('danhSachPhat') || '[]');
    // Fix dữ liệu phạt cũ chưa có createdAt
    var needUpdate = false;
    dsPhat.forEach(p => {
        if (!p.createdAt) {
            // Ưu tiên lấy từ ngày phạt, nếu không có thì lấy Date.now()
            p.createdAt = p.ngayPhat ? Date.parse(p.ngayPhat) || Date.now() : Date.now();
            needUpdate = true;
        }
    });
    if (needUpdate) {
        localStorage.setItem('danhSachPhat', JSON.stringify(dsPhat));
    }
    var tatCa = [];

    for (var i = 0; i < dsPhieuMuon.length; i++) {
        var pm = dsPhieuMuon[i];
        var chiTiet = '';
        if (pm.danhSachSach && pm.danhSachSach.length > 0) {
            // Mặc định không thêm '(Mất sách)'.
            var tenSach = pm.danhSachSach.map(s => s.tenSach || s.maSach);
            chiTiet = tenSach.join(', ');
        }
        
        // Mượn
        tatCa.push({ ngay: pm.ngayMuon || '', loai: 'Mượn', maGD: pm.maPhieu || '--', maDG: pm.maDG || '--', tenDG: pm.tenDG || '--', chiTiet: chiTiet || 'Phiếu mượn', soTien: null, createdAt: pm.createdAtMuon || Date.now() });

        // Trả
        if (pm.danhSachSach && pm.danhSachSach.length > 0) {
    var tatCaSachDaTra = pm.danhSachSach.every(s => s.daTra === true);
    if (tatCaSachDaTra && pm.ngayTraThucTe) {
        // Lấy createdAtTra mới nhất trong các sách
        var maxCreatedAtTra = Math.max(...pm.danhSachSach.map(s => s.createdAtTra || 0));
        // Bổ sung '(Mất sách)' vào tên sách nếu có
        var chiTietTra = pm.danhSachSach.map(s => {
            let label = s.tenSach || s.maSach;
            if (s.tinhTrangKhiTra === 'Mất') label += ' <b style="color:#d8000c">(Mất sách)</b>';
            return label;
        }).join(', ');
        tatCa.push({ 
            ngay: pm.ngayTraThucTe, 
            loai: 'Trả', 
            maGD: pm.maPhieu || '--', 
            maDG: pm.maDG || '--', 
            tenDG: pm.tenDG || '--', 
            chiTiet: chiTietTra || 'Phiếu trả', 
            soTien: null, 
            createdAt: maxCreatedAtTra || pm.createdAtTra || Date.now() 
        });
    }
}

        // Gia hạn
        if (pm.loaiGiaHan && pm.ngayGiaHan) {
            tatCa.push({ ngay: pm.ngayGiaHan, loai: 'Gia hạn', maGD: pm.maPhieu || '--', maDG: pm.maDG || '--', tenDG: pm.tenDG || '--', chiTiet: chiTiet || 'Gia hạn phiếu', soTien: null, createdAt: pm.createdAtGiaHan || Date.now() });
        }
    }

    // Phạt
    for (var k = 0; k < dsPhat.length; k++) {
        var p = dsPhat[k];
        var soTienThucTe = p.soTien || 0;
        var trangThaiText = (p.trangThai === 'Chưa thu') ? ' (chưa thanh toán hết)' : '';
        tatCa.push({ ngay: p.ngayPhat || '', loai: 'Phạt', maGD: p.maPhat || '--', maDG: p.maDG || '--', tenDG: p.tenDG || '--', chiTiet: (p.loaiVP || 'Vi phạm') + ' - Phiếu: ' + (p.maPhieu || '--'), soTien: soTienThucTe, trangThaiPhat: trangThaiText, createdAt: p.createdAt || Date.now() });
    }

    tatCa.forEach(item => { if (!item.createdAt) item.createdAt = item.ngay ? Date.parse(item.ngay) : Date.now(); });
    tatCa.sort((a, b) => {
        // Chỉ sort giảm dần theo createdAt, giao dịch mới nhất luôn lên đầu
        return b.createdAt - a.createdAt;
    });

    return tatCa;
}

function locLichSu_LS() {
    var tuNgay = document.getElementById('tuNgay').value;
    var denNgay = document.getElementById('denNgay').value;
    var loai = document.getElementById('loaiGD').value;

    var tatCa = xayDungGiaoDich_LS();
    var ketQua = tatCa.filter(gd => {
        var ngayLichSu = gd.ngay ? gd.ngay.substring(0, 10) : '';
        if (tuNgay && ngayLichSu && ngayLichSu < tuNgay) return false;
        if (denNgay && ngayLichSu && ngayLichSu > denNgay) return false;
        if (loai && gd.loai !== loai) return false;
        return true;
    });

    hienThiBang_LS(ketQua);
}

function hienThiBang_LS(ds) {
    var tbody = document.getElementById('tableLichSu');
    document.getElementById('soLuongHienThi').innerText = 'Hiển thị ' + ds.length + ' giao dịch';

    if (ds.length === 0) {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="7">Không có giao dịch nào trong khoảng thời gian này</td></tr>';
        return;
    }

    var html = '';
    ds.forEach((gd, i) => {
        var tagClass = gd.loai === 'Trả' ? 'tag-tra' : (gd.loai === 'Gia hạn' ? 'tag-giahan' : (gd.loai === 'Phạt' ? 'tag-phat' : 'tag-muon'));
        var soTienHtml = '--';
        if (gd.soTien !== null && gd.soTien !== undefined) {
            soTienHtml = '<span class="tien">' + formatTien(gd.soTien) + (gd.trangThaiPhat || '') + '</span>';
        }

        html += `<tr>
            <td>${i + 1}</td>
            <td>${formatNgay(gd.ngay)}</td>
            <td><span class="tag ${tagClass}">${gd.loai}</span></td>
            <td>${gd.maGD}</td>
            <td>${gd.maDG}<br><small style="color:#666">${gd.tenDG}</small></td>
            <td style="max-width:250px;">${gd.chiTiet}</td>
            <td>${soTienHtml}</td>
        </tr>`;
    });
    tbody.innerHTML = html;
}

function xuatDuLieu_LS() {
    var bang = document.getElementById('bangLichSu');
    if (window.getSelection && document.createRange) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(bang);
        selection.removeAllRanges();
        selection.addRange(range);
        alert('Đã bôi đen toàn bộ bảng. Hãy nhấn Ctrl+C để copy và dán vào Excel!');
    } else {
        alert('Trình duyệt không hỗ trợ chọn văn bản tự động.');
    }
}
/* =========================================================
   12. NGHIỆP VỤ TRANG "DANH SÁCH PHIẾU MƯỢN"
   ========================================================= */
function capNhatTrangThaiPhieu_DSPM() {
    var danhSach = JSON.parse(localStorage.getItem('danhSachPhieuMuon') || '[]');
    var homNay = layNgayHomNay();
    var daCapNhat = false;

    for (var i = 0; i < danhSach.length; i++) {
        if (danhSach[i].danhSachSach && danhSach[i].danhSachSach.length > 0) {
            var tatCaSachDaTra = danhSach[i].danhSachSach.every(s => s.daTra === true);
            
            if (tatCaSachDaTra && danhSach[i].trangThai !== 'Đã trả') {
                danhSach[i].trangThai = 'Đã trả';
                daCapNhat = true;
            }
            else if (!tatCaSachDaTra && danhSach[i].trangThai === 'Đang mượn' && danhSach[i].hanTra < homNay) {
                danhSach[i].trangThai = 'Quá hạn';
                daCapNhat = true;
            }
        }
        else if (danhSach[i].trangThai === 'Đang mượn' && danhSach[i].hanTra < homNay) {
            danhSach[i].trangThai = 'Quá hạn';
            daCapNhat = true;
        }
    }

    if (daCapNhat) localStorage.setItem('danhSachPhieuMuon', JSON.stringify(danhSach));
}

function taiDanhSach_DSPM() {
    capNhatTrangThaiPhieu_DSPM();

    var danhSach = JSON.parse(localStorage.getItem('danhSachPhieuMuon') || '[]');
    var tuKhoa = document.getElementById('tuKhoa_DSPM').value.trim().toLowerCase();
    var trangThaiLoc = document.getElementById('locTrangThai_DSPM').value;

    var ketQua = danhSach.filter(pm => {
        var tuKhoaKhop = true;
        if (tuKhoa) {
            tuKhoaKhop = (pm.maPhieu && pm.maPhieu.toLowerCase().includes(tuKhoa)) ||
                         (pm.maDG && pm.maDG.toLowerCase().includes(tuKhoa)) ||
                         (pm.tenDG && pm.tenDG.toLowerCase().includes(tuKhoa));
        }
        var trangThaiKhop = !trangThaiLoc || (pm.trangThai === trangThaiLoc);
        return tuKhoaKhop && trangThaiKhop;
    });

    ketQua.sort(function(a, b) {
        if (a.trangThai === 'Quá hạn' && b.trangThai !== 'Quá hạn') return -1;
        if (a.trangThai !== 'Quá hạn' && b.trangThai === 'Quá hạn') return 1;
        if (a.trangThai === 'Đang mượn' && b.trangThai === 'Đã trả') return -1;
        if (a.trangThai === 'Đã trả' && b.trangThai === 'Đang mượn') return 1;
        return (b.ngayMuon || '').localeCompare(a.ngayMuon || '');
    });

    var lblSoLuong = document.getElementById('lblSoLuong_DSPM');
    if (tuKhoa || trangThaiLoc) {
        lblSoLuong.innerHTML = '📊 Tìm thấy <strong>' + ketQua.length + '</strong> phiếu / Tổng <strong>' + danhSach.length + '</strong> phiếu';
    } else {
        lblSoLuong.innerHTML = '📊 Tổng số: <strong>' + danhSach.length + '</strong> phiếu mượn';
    }

    var bang = document.getElementById('bangPhieuMuon');
    if (ketQua.length === 0) {
        bang.innerHTML = '<tr><td colspan="9" class="no-data">⚠️ Không tìm thấy phiếu mượn nào</td></tr>';
        return;
    }

    var homNay = layNgayHomNay();
    var html = '';
    
    // Hàm format và tính ngày dùng chung hoặc tự viết nhanh
    var fNgay = function(str) { if (!str) return '—'; var p = str.split('-'); return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : str; };
    var tNgay = function(d1, d2) { return Math.round((new Date(d2) - new Date(d1)) / 86400000); };

    for (var j = 0; j < ketQua.length; j++) {
        var pm = ketQua[j];
        var trangThai = pm.trangThai || 'Đang mượn';
        var badgeClass = 'badge-pending';
        if (trangThai === 'Quá hạn') badgeClass = 'badge-overdue';
        else if (trangThai === 'Đã trả') badgeClass = 'badge-returned';

        var soNgayQuaHan = tNgay(pm.hanTra, homNay);
        var trangThaiText = trangThai;
        
        if (trangThai === 'Quá hạn') {
            trangThaiText = '⚠️ Quá hạn ' + soNgayQuaHan + ' ngày';
        } else if (trangThai === 'Đã trả') {
            trangThaiText = '✅ Đã trả';
        } else if (trangThai === 'Đang mượn') {
            var soNgayConLai = tNgay(homNay, pm.hanTra);
            if (soNgayConLai <= 2 && soNgayConLai >= 0) {
                trangThaiText = '🔔 Sắp đến hạn (' + soNgayConLai + ' ngày)';
                badgeClass = 'badge-overdue';
            } else {
                trangThaiText = '📖 Đang mượn';
            }
        }

        var hanhDong = '';
        if (trangThai === 'Đang mượn' || trangThai === 'Quá hạn') {
            hanhDong = '<div class="action-buttons">';
            hanhDong += '<a href="tra-sach.html?ma=' + encodeURIComponent(pm.maPhieu) + '" class="btn btn-sm btn-teal">↩️Trả Sách</a>';
            if (trangThai !== 'Quá hạn') {
                hanhDong += '<a href="gia-han.html?ma=' + encodeURIComponent(pm.maPhieu) + '" class="btn btn-sm btn-orange">⏰ Gia hạn</a>';
            }
            hanhDong += '</div>';
        } else {
            hanhDong = '<span class="status-done">✓ Đã hoàn tất</span>';
        }

        var danhSachSachHtml = '';
        if (pm.danhSachSach && pm.danhSachSach.length > 0) {
            danhSachSachHtml = pm.danhSachSach.map(sach => `<div style="margin-bottom:2px;"><strong>${sach.maSach || ''}</strong>: ${sach.tenSach || ''}</div>`).join('');
        }

        html += `<tr>
            <td>${j + 1}</td>
            <td><strong>${pm.maPhieu || ''}</strong></td>
            <td><strong>${pm.maDG || ''}</strong></td>
            <td>${pm.tenDG || ''}</td>
            <td>${danhSachSachHtml}</td>
            <td>${fNgay(pm.ngayMuon)}</td>
            <td>${fNgay(pm.hanTra)}</td>
            <td><span class="badge ${badgeClass}">${trangThaiText}</span></td>
            <td style="text-align:center;">${hanhDong}</td>
        </tr>`;
    }
    bang.innerHTML = html;
}

function timKiemPhieu_DSPM() {
    taiDanhSach_DSPM();
}
/* =========================================================
   13. NGHIỆP VỤ TRANG "CHI TIẾT SÁCH"
   ========================================================= */
function khoiTao_CTS() {
    maSachHienTai = layThamSoURL('ma');
    if (!maSachHienTai) { document.getElementById('khongTimThay').style.display = 'block'; return; }

    var danhSach = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    var sach = danhSach.find(s => s.maSach === maSachHienTai);

    if (!sach) { document.getElementById('khongTimThay').style.display = 'block'; return; }

    document.getElementById('tieuDeTrang').innerHTML = '📖 Chi Tiết: ' + sach.tenSach;
    document.getElementById('vungChiTiet').style.display = 'block';

    hienThiThongTinSach_CTS(sach);
    hienThiThongKe_CTS(sach);
    taiLichSuMuon_CTS();
}

function hienThiThongTinSach_CTS(sach) {
    var html = `
        <tr><th>Mã sách</th><td><strong>${sach.maSach || '—'}</strong></td></tr>
        <tr><th>Tên sách</th><td><strong style="font-size:15px">${sach.tenSach || '—'}</strong></td></tr>
        <tr><th>Tác giả</th><td>${sach.tacGia || '—'}</td></tr>
        <tr><th>Nhà xuất bản</th><td>${sach.nxb || '—'}</td></tr>
        <tr><th>Năm xuất bản</th><td>${sach.namXB || '—'}</td></tr>
        <tr><th>Thể loại</th><td>${sach.theLoai || '—'}</td></tr>
        <tr><th>ISBN</th><td>${sach.isbn || '—'}</td></tr>
        <tr><th>Vị trí kệ sách</th><td>${sach.viTri || '—'}</td></tr>
        <tr><th>Giá nhập</th><td>${sach.giaNhap ? formatTien(sach.giaNhap) : '—'}</td></tr>
        <tr><th>Giá bồi thường</th><td>${sach.giaBT ? formatTien(sach.giaBT) : '—'}</td></tr>
        <tr><th>Mô tả</th><td>${sach.moTa || '—'}</td></tr>`;
    document.getElementById('bangThongTinSach').innerHTML = html;
}

function hienThiThongKe_CTS(sach) {
    var soLuongTong = parseInt(sach.soLuongTong, 10) || 0;
    var soLuongCon = parseInt(sach.soLuongCon, 10) || 0;
    var dangMuon = Math.max(0, soLuongTong - soLuongCon);

    var classConLai = soLuongCon === 0 ? 'stat-con-lai-do' : (soLuongCon <= 2 ? 'stat-con-lai-cam' : 'stat-con-lai-xanh');

    var html = `
        <div class="stat-box stat-tong"><span class="stat-num">${soLuongTong}</span><span class="stat-label">📚 Tổng số</span></div>
        <div class="stat-box stat-dang-muon"><span class="stat-num">${dangMuon}</span><span class="stat-label">📤 Đang mượn</span></div>
        <div class="stat-box ${classConLai}"><span class="stat-num">${soLuongCon}</span><span class="stat-label">✅ Còn lại</span></div>`;

    document.getElementById('vungThongKe').innerHTML = html;

    if (soLuongCon < 3) {
        document.getElementById('soLuongConHienThi').textContent = soLuongCon;
        document.getElementById('canhBaoSoLuong').style.display = 'block';
    }
}

function taiLichSuMuon_CTS() {
    var dsPhieuMuon = JSON.parse(localStorage.getItem('danhSachPhieuMuon') || '[]');
    var lichSu = [];

    dsPhieuMuon.forEach(pm => {
        if (!pm.danhSachSach || !Array.isArray(pm.danhSachSach)) return;
        pm.danhSachSach.forEach(sachTrongPhieu => {
            if ((sachTrongPhieu.maSach || sachTrongPhieu.maSach) === maSachHienTai) {
                lichSu.push({
                    maPhieu: pm.maPhieu, tenDG: pm.tenDG, maDG: pm.maDG,
                    ngayMuon: pm.ngayMuon, hanTra: pm.hanTra,
                    ngayTra: sachTrongPhieu.ngayTra || pm.ngayTra || '',
                    trangThai: sachTrongPhieu.daTra ? 'Đã trả' : (pm.trangThai || 'Đang mượn')
                });
            }
        });
    });

    var bang = document.getElementById('bangLichSuMuon');
    if (lichSu.length === 0) {
        bang.innerHTML = '<tr><td colspan="5" class="no-data">Sách này chưa có lịch sử được mượn</td></tr>'; return;
    }

    lichSu.sort((a, b) => (b.ngayMuon || '').localeCompare(a.ngayMuon || ''));

    var html = '';
    lichSu.forEach(ls => {
        var trangThai = ls.trangThai || 'Đang mượn';
        var badgeClass = trangThai === 'Đã trả' ? 'badge-returned' : (trangThai === 'Quá hạn' ? 'badge-overdue' : 'badge-pending');
        var ngayTraHienThi = trangThai === 'Đã trả' && ls.ngayTra ? 'Trả: ' + formatNgay(ls.ngayTra) : 'Hạn: ' + formatNgay(ls.hanTra);

        html += `<tr>
            <td><strong>${ls.maPhieu || ''}</strong></td>
            <td>${ls.tenDG || ls.maDG || '—'}</td>
            <td>${formatNgay(ls.ngayMuon)}</td>
            <td>${ngayTraHienThi}</td>
            <td><span class="badge ${badgeClass}">${trangThai}</span></td>
        </tr>`;
    });
    bang.innerHTML = html;
}
/* =========================================================
   14. NGHIỆP VỤ TRANG "TÌM KIẾM SÁCH NÂNG CAO"
   ========================================================= */
function taiDuLieuCombobox_TK() {
    var danhSach = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    
    // Dùng Set để lọc các giá trị trùng lặp siêu nhanh
    var dsTacGia = new Set();
    var dsNXB = new Set();
    var dsTheLoai = new Set();
    
    danhSach.forEach(s => {
        if (s.tacGia) dsTacGia.add(s.tacGia);
        if (s.nxb) dsNXB.add(s.nxb);
        if (s.theLoai) dsTheLoai.add(s.theLoai);
    });
    
    var fillSelect = function(id, textMacDinh, dataSet) {
        var el = document.getElementById(id);
        var html = '<option value="">-- ' + textMacDinh + ' --</option>';
        Array.from(dataSet).sort().forEach(item => html += `<option value="${item}">${item}</option>`);
        el.innerHTML = html;
    };

    fillSelect('tacGia', 'Tất cả tác giả', dsTacGia);
    fillSelect('nxb', 'Tất cả NXB', dsNXB);
    fillSelect('theLoai', 'Tất cả thể loại', dsTheLoai);
}

function timKiem_TK() {
    var tacGia = document.getElementById('tacGia').value;
    var nxb = document.getElementById('nxb').value;
    var theLoai = document.getElementById('theLoai').value;
    var namTu = parseInt(document.getElementById('namTu').value) || 0;
    var namDen = parseInt(document.getElementById('namDen').value) || 9999;
    
    var danhSach = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    var ketQua = danhSach.filter(s => {
        if (tacGia && s.tacGia !== tacGia) return false;
        if (nxb && s.nxb !== nxb) return false;
        if (theLoai && s.theLoai !== theLoai) return false;
        var nam = parseInt(s.namXB) || 0;
        if (namTu > 0 && nam < namTu) return false;
        if (namDen < 9999 && nam > namDen) return false;
        return true;
    });
    
    hienThiKetQua_TK(ketQua);
}

function hienThiKetQua_TK(ketQua) {
    var lblSoLuong = document.getElementById('lblSoLuong_TK');
    var bang = document.getElementById('bangKetQua_TK');
    
    if (ketQua.length === 0) {
        lblSoLuong.innerHTML = '⚠️ Không tìm thấy sách nào phù hợp với điều kiện';
        bang.innerHTML = '<tr><td colspan="10" class="no-data">Không có kết quả phù hợp</td></tr>';
        return;
    }
    
    lblSoLuong.innerHTML = '✅ Tìm thấy <strong>' + ketQua.length + '</strong> cuốn sách';
    
    var html = '';
    ketQua.forEach((s, i) => {
        var soLuongCon = parseInt(s.soLuongCon) || 0;
        var soLuongTong = parseInt(s.soLuongTong) || 0;
        
        var trangThai = soLuongCon > 0 ? '✅ Còn sách' : '❌ Hết sách';
        var badgeClass = soLuongCon > 0 ? 'badge-co-sach' : 'badge-het-sach';
        
        html += `<tr>
            <td>${i + 1}</td>
            <td><strong>${s.maSach || ''}</strong></td>
            <td>${s.tenSach || ''}</td>
            <td>${s.tacGia || ''}</td>
            <td>${s.nxb || ''}</td>
            <td>${s.theLoai || ''}</td>
            <td>${s.namXB || ''}</td>
            <td style="text-align:center;">${soLuongCon}/${soLuongTong}</td>
            <td><span class="badge ${badgeClass}">${trangThai}</span></td>
            <td><a href="sach-chi-tiet.html?ma=${encodeURIComponent(s.maSach)}" class="btn btn-sm btn-teal">👁 Xem</a></td>
        </tr>`;
    });
    bang.innerHTML = html;
}

function datLai_TK() {
    document.getElementById('tacGia').value = '';
    document.getElementById('nxb').value = '';
    document.getElementById('theLoai').value = '';
    document.getElementById('namTu').value = '';
    document.getElementById('namDen').value = '';
    
    document.getElementById('lblSoLuong_TK').innerHTML = 'Chưa có kết quả. Vui lòng chọn điều kiện và nhấn Tìm kiếm.';
    document.getElementById('bangKetQua_TK').innerHTML = '<tr><td colspan="10" class="no-data">Chưa có kết quả tìm kiếm</td></tr>';
}
/* =========================================================
   15. NGHIỆP VỤ TRANG "THỐNG KÊ"
   ========================================================= */
function formatNgayKey_TK(ngay) {
    if (!ngay) return '';
    var part = ngay.split(' ')[0];
    var p = part.split('-');
    return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : part;
}

function parseDateKey_TK(str) {
    var p = str.split('/');
    return p.length === 3 ? new Date(p[2], p[1]-1, p[0]) : new Date(str);
}

function toISODate_TK(str) {
    if (!str) return '';
    if (str.indexOf('-') > 0) return str.split(' ')[0];
    var p = str.split('/'); 
    return p.length === 3 ? p[2] + '-' + p[1] + '-' + p[0] : str;
}

function tinhThongKe_TK(tuNgay, denNgay) {
    var dsPhieuMuon = JSON.parse(localStorage.getItem('danhSachPhieuMuon') || '[]');
    var dsPhat = JSON.parse(localStorage.getItem('danhSachPhat') || '[]');
    var dsDocGia = JSON.parse(localStorage.getItem('danhSachDocGia') || '[]');
    var dsSach = JSON.parse(localStorage.getItem('danhSachSach') || '[]');

    var mapDocGia = {}; dsDocGia.forEach(d => mapDocGia[d.maDG] = d);
    var mapSach = {}; dsSach.forEach(s => mapSach[s.maSach] = s);

    var phieuMuonLoc = dsPhieuMuon.filter(pm => {
        var ngay = pm.ngayMuon || '';
        return !(tuNgay && ngay < tuNgay) && !(denNgay && ngay > denNgay);
    });

    var phieuTraLoc = phieuMuonLoc.filter(pm => pm.danhSachSach && pm.danhSachSach.length > 0 && pm.danhSachSach.every(s => s.daTra === true));

    var phatLoc = dsPhat.filter(p => {
        var ngay = toISODate_TK(p.ngayPhat || '');
        return !(tuNgay && ngay < tuNgay) && !(denNgay && ngay > denNgay);
    });

    var theoNgay = {};
    phieuMuonLoc.forEach(pm => {
        var ngay = formatNgayKey_TK(pm.ngayMuon);
        if (!theoNgay[ngay]) theoNgay[ngay] = {muon: 0, tra: 0, phi: 0};
        theoNgay[ngay].muon++;
    });

    phieuTraLoc.forEach(pm => {
        var ngay = formatNgayKey_TK(pm.ngayMuon);
        if (!theoNgay[ngay]) theoNgay[ngay] = {muon: 0, tra: 0, phi: 0};
        theoNgay[ngay].tra++;
    });

    phatLoc.forEach(p => {
        if (p.trangThai !== 'Đã thanh toán') return;
        var ngay = formatNgayKey_TK(p.ngayPhat);
        if (!theoNgay[ngay]) theoNgay[ngay] = {muon: 0, tra: 0, phi: 0};
        theoNgay[ngay].phi += Number(p.soTien || 0);
    });

    var dsNgay = Object.keys(theoNgay).map(k => ({ngay: k, muon: theoNgay[k].muon, tra: theoNgay[k].tra, phi: theoNgay[k].phi})).filter(r => r.muon > 0 || r.tra > 0 || r.phi > 0);
    dsNgay.sort((a, b) => parseDateKey_TK(a.ngay) - parseDateKey_TK(b.ngay));

    var demSach = {};
    phieuMuonLoc.forEach(pm => {
        if (!pm.danhSachSach) return;
        pm.danhSachSach.forEach(s => {
            var ms = s.maSach;
            if (!ms) return;
            if (!demSach[ms]) demSach[ms] = { maSach: ms, tenSach: s.tenSach || ms, soLan: 0, tacGia: (mapSach[ms] && mapSach[ms].tacGia) || '--' };
            demSach[ms].soLan++;
        });
    });
    var topSach = Object.values(demSach).sort((a, b) => b.soLan - a.soLan).slice(0, 10);

    var demDG = {};
    phieuMuonLoc.forEach(pm => {
        var maDG = pm.maDG;
        if (!maDG) return;
        if (!demDG[maDG]) demDG[maDG] = { maDG: maDG, tenDG: pm.tenDG || maDG, ngheNghiep: (mapDocGia[maDG] && mapDocGia[maDG].ngheNghiep) || '--', soLan: 0 };
        demDG[maDG].soLan++;
    });
    var topDG = Object.values(demDG).sort((a, b) => b.soLan - a.soLan).slice(0, 10);

    var tongPhi = phatLoc.filter(p => p.trangThai === 'Đã thanh toán').reduce((sum, p) => sum + Number(p.soTien || 0), 0);
    var tongSach = phieuMuonLoc.reduce((sum, pm) => sum + (pm.danhSachSach ? pm.danhSachSach.length : 0), 0);
    var tbSach = phieuMuonLoc.length > 0 ? (tongSach / phieuMuonLoc.length).toFixed(2) : '0';

    return { theoNgay: dsNgay, topSach: topSach, topDG: topDG, tongQuan: { tongMuon: phieuMuonLoc.length, tongTra: phieuTraLoc.length, tongVP: phatLoc.length, tongPhi: tongPhi, tbSach: tbSach } };
}

function hienThiThongKe_TK() {
    var tuNgay = document.getElementById('tuNgay_TK').value;
    var denNgay = document.getElementById('denNgay_TK').value;

    if (!tuNgay || !denNgay) { alert('Vui lòng chọn khoảng thời gian!'); return; }
    if (tuNgay > denNgay) { alert('Từ ngày không được lớn hơn đến ngày!'); return; }

    var kq = tinhThongKe_TK(tuNgay, denNgay);

    var bodyNgay = document.getElementById('bodyTheoNgay');
    var footNgay = document.getElementById('footTheoNgay');
    
    if (kq.theoNgay.length === 0) {
        bodyNgay.innerHTML = '<tr class="empty-row"><td colspan="4">Không có dữ liệu trong khoảng thời gian này</td></tr>';
        footNgay.innerHTML = '';
    } else {
        var html = '';
        var tMuon = 0, tTra = 0, tPhi = 0;
        kq.theoNgay.forEach(row => {
            tMuon += row.muon; tTra += row.tra; tPhi += row.phi;
            html += `<tr>
                <td><strong>${formatNgay(toISODate_TK(row.ngay))}</strong></td>
                <td><span class="so-xanh">${row.muon}</span></td>
                <td>${row.tra}</td>
                <td>${row.phi > 0 ? '<span class="so-do">' + formatTien(row.phi) + '</span>' : '0 đ'}</td>
            </tr>`;
        });
        bodyNgay.innerHTML = html;
        footNgay.innerHTML = `<tr><td><strong>Tổng cộng</strong></td><td><strong class="so-xanh">${tMuon}</strong></td><td><strong>${tTra}</strong></td><td><strong class="so-do">${formatTien(tPhi)}</strong></td></tr>`;
    }

    document.getElementById('bodyTopSach').innerHTML = kq.topSach.length === 0 ? '<tr class="empty-row"><td colspan="5">Không có dữ liệu</td></tr>' : kq.topSach.map((s, i) => `<tr><td>${i + 1}</td><td>${s.maSach}</td><td>${s.tenSach}</td><td><strong class="so-xanh">${s.soLan}</strong></td><td>${s.tacGia}</td></tr>`).join('');
    
    document.getElementById('bodyTopDocGia').innerHTML = kq.topDG.length === 0 ? '<tr class="empty-row"><td colspan="5">Không có dữ liệu</td></tr>' : kq.topDG.map((dg, i) => `<tr><td>${i + 1}</td><td>${dg.maDG}</td><td>${dg.tenDG}</td><td>${dg.ngheNghiep}</td><td><strong class="so-xanh">${dg.soLan}</strong></td></tr>`).join('');

    var tq = kq.tongQuan;
    document.getElementById('tk-tongMuon').innerText = tq.tongMuon + ' phiếu';
    document.getElementById('tk-tongTra').innerText = tq.tongTra + ' phiếu';
    document.getElementById('tk-tongVP').innerText = tq.tongVP + ' trường hợp';
    document.getElementById('tk-tongPhi').innerText = formatTien(tq.tongPhi);
    document.getElementById('tk-tbSach').innerText = tq.tbSach + ' cuốn/phiếu';
}
/* =========================================================
   16. NGHIỆP VỤ TRANG "TRẢ SÁCH"
   ========================================================= */
function loadDanhSachPhieuActive_TS() {
    var dsPhieuMuon = JSON.parse(localStorage.getItem('danhSachPhieuMuon') || '[]');
    var html = '';
    
    dsPhieuMuon.forEach(p => {
        if ((p.trangThai === 'Đang mượn' || p.trangThai === 'Quá hạn') && p.danhSachSach && Array.isArray(p.danhSachSach)) {
            var soSachChuaTra = p.danhSachSach.filter(s => !s.daTra).length;
            
            if (soSachChuaTra > 0) {
                var isQuaHan = (new Date(layNgayHomNay()) - new Date(p.hanTra)) > 0;
                var alertClass = isQuaHan ? 'class="qua-han-text"' : '';
                html += `<tr>
                    <td><strong>${p.maPhieu}</strong></td>
                    <td>${p.tenDG}</td>
                    <td>${formatNgay(p.ngayMuon)}</td>
                    <td ${alertClass}>${formatNgay(p.hanTra)}</td>
                    <td>${soSachChuaTra} cuốn</td>
                    <td style="text-align:center"><button class="btn-select" onclick="chonPhieu_TS('${p.maPhieu}')">Chọn trả</button></td>
                </tr>`;
            }
        }
    });
    document.getElementById('dsPhieuMuonActive').innerHTML = html || '<tr><td colspan="6" style="text-align:center;">Trống.</td></tr>';
}

function locPhieu_TS() {
    var input = document.getElementById("filterInput_TS").value.toUpperCase();
    var tr = document.getElementById("dsPhieuMuonActive").getElementsByTagName("tr");
    for (var i = 0; i < tr.length; i++) {
        tr[i].style.display = tr[i].innerText.toUpperCase().indexOf(input) > -1 ? "" : "none";
    }
}

function chonPhieu_TS(maPhieu) {
    var dsPhieuMuon = JSON.parse(localStorage.getItem('danhSachPhieuMuon') || '[]');
    phieuHienTai_TS = dsPhieuMuon.find(p => p.maPhieu === maPhieu);
    if (phieuHienTai_TS) {
        document.getElementById('cardChonPhieu').className = 'card hidden';
        document.getElementById('cardThongTinPhieu').className = 'card';
        document.getElementById('chiTietPhieu').innerHTML = '<div class="info-box"><p><strong>Độc giả:</strong> ' + phieuHienTai_TS.tenDG + '</p></div>';
        
        var soNgayQuaHan = Math.round((new Date(layNgayHomNay()) - new Date(phieuHienTai_TS.hanTra)) / 86400000);
        hienThiBangSachTra_TS(phieuHienTai_TS, soNgayQuaHan);
        document.getElementById('cardTraSach').className = 'card';
    }
}

function hienThiBangSachTra_TS(phieu, soNgayQuaHan) {
    var html = '<table><tr><th>Trả</th><th>Mã sách</th><th>Tên sách</th><th>Tình trạng</th><th style="text-align:right;">Phạt</th></tr>';
    phieu.danhSachSach.forEach((s, i) => {
        if (!s.daTra) {
            html += `<tr>
                <td><input type="checkbox" id="cb_${i}" checked onchange="capNhatTienPhat_TS()"></td>
                <td>${s.maSach}</td><td>${s.tenSach}</td>
                <td><select id="tt_${i}" onchange="capNhatTienPhat_TS()"><option value="Tốt">Tốt</option><option value="Rách">Rách</option><option value="Mất">Mất</option></select></td>
                <td style="text-align:right;" id="phat_${i}">0 đ</td>
            </tr>`;
        }
    });
    html += '</table>';
    document.getElementById('bangSachTra').innerHTML = html;
    capNhatTienPhat_TS();
}

function capNhatTienPhat_TS() {
    var homNay = layNgayHomNay();
    var soNgayQuaHan = Math.max(0, Math.round((new Date(homNay) - new Date(phieuHienTai_TS.hanTra)) / 86400000));
    var dsSachGoc = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    var tongPhat = 0;

    phieuHienTai_TS.danhSachSach.forEach((s, i) => {
        if (s.daTra) return;

        var cbEl = document.getElementById('cb_' + i);
        var ttEl = document.getElementById('tt_' + i);
        
        if (!cbEl || !cbEl.checked) {
            if (document.getElementById('phat_' + i)) document.getElementById('phat_' + i).textContent = '---';
            return;
        }

        var phatCuonNay = soNgayQuaHan * 2000;
        if (ttEl.value === 'Rách') phatCuonNay += 15000;
        else if (ttEl.value === 'Mất') {
            var thongTinSach = dsSachGoc.find(sg => sg.maSach === s.maSach);
            phatCuonNay += thongTinSach && thongTinSach.giaBT ? parseFloat(thongTinSach.giaBT) : 0;
        }

        tongPhat += phatCuonNay;
        document.getElementById('phat_' + i).textContent = formatTien(phatCuonNay);
    });

    tongPhatGlobal_TS = tongPhat;
    document.getElementById('khuTongPhat').innerHTML = tongPhat > 0 ? 
        '<div class="tong-tien">💰 Tổng tiền phạt: ' + formatTien(tongPhat) + '</div>' : 
        '<div class="tong-tien no-fine">✅ Không có tiền phạt</div>';
}

function kiemTraTruocKhiTra_TS() {
    if (tongPhatGlobal_TS > 0) {
        document.getElementById('txtSoTienModal').innerText = "Số tiền cần thanh toán: " + formatTien(tongPhatGlobal_TS);
        document.getElementById('modalThanhToan').style.display = 'block';
    } else {
        if (confirm("Xác nhận trả những cuốn sách đã chọn?")) xacNhanTra_TS(false);
    }
}

function dongModal_TS() { document.getElementById('modalThanhToan').style.display = 'none'; }

function nhanMotPhan_TS() {
    var nhapStr = prompt(`💵 NHẬN TIỀN MỘT PHẦN\n━━━━━━━━━━━━━━━━━━━━\nTổng tiền phạt: ${formatTien(tongPhatGlobal_TS)}\n━━━━━━━━━━━━━━━━━━━━\n\nNhập số tiền đã nhận được:`);
    if (nhapStr === null) return;
    
    var soTienNhan = parseFloat(nhapStr.replace(/[,\s\.]/g, ''));
    if (isNaN(soTienNhan) || nhapStr.trim() === '') { alert('⚠️ Số tiền không hợp lệ! Vui lòng nhập số.'); return; }
    if (soTienNhan < 0) { alert('⚠️ Số tiền không được âm!'); return; }
    if (soTienNhan >= tongPhatGlobal_TS) { alert('⚠️ Số tiền đã nhận lớn hơn hoặc bằng tổng tiền phạt!\nVui lòng chọn "✅ Đã nhận đủ tiền".'); return; }
    
    var tienConThieu = tongPhatGlobal_TS - soTienNhan;
    if (confirm(`💵 XÁC NHẬN NHẬN TIỀN MỘT PHẦN\n━━━━━━━━━━━━━━━━━━━━\nTổng tiền phạt: ${formatTien(tongPhatGlobal_TS)}\nSố tiền đã nhận: ${formatTien(soTienNhan)}\nSố tiền còn thiếu: ${formatTien(tienConThieu)}\n━━━━━━━━━━━━━━━━━━━━\n\nPhiếu phạt sẽ được tạo với trạng thái "Chưa thu" để thu tiếp.\nXác nhận?`)) {
        xacNhanTraMotPhan_TS(soTienNhan, tienConThieu);
    }
}

function xacNhanTraMotPhan_TS(soTienDaNhan, tienConThieu) {
    if (!phieuHienTai_TS) return;
    
    var dsPhieuMuon = JSON.parse(localStorage.getItem('danhSachPhieuMuon') || '[]');
    var dsSach = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    var dsPhat = JSON.parse(localStorage.getItem('danhSachPhat') || '[]');
    var indexPhieu = dsPhieuMuon.findIndex(p => p.maPhieu === phieuHienTai_TS.maPhieu);

    if (indexPhieu !== -1) {
        var phieuTrongStore = dsPhieuMuon[indexPhieu];
        var tatCaSachDaDuocTra = true;
        var homNay = layNgayHomNay();
        var soNgayQuaHan = Math.max(0, Math.round((new Date(homNay) - new Date(phieuTrongStore.hanTra)) / 86400000));
        
        var dsSachBiPhat = [];
        var tongTienPhatGoc = 0;

        phieuTrongStore.danhSachSach.forEach((s, idx) => {
            if (s.daTra) return;
            var cbEl = document.getElementById('cb_' + idx);
            var ttEl = document.getElementById('tt_' + idx);

            if (cbEl && cbEl.checked) {
                s.daTra = true; s.ngayTraThucTe = homNay; s.tinhTrangKhiTra = ttEl.value; s.createdAtTra = Date.now();

                var soTienPhat = 0; var loaiViPham = '';
                if (ttEl.value === 'Rách') { soTienPhat = soNgayQuaHan * 2000 + 15000; loaiViPham = 'Hư hỏng'; }
                else if (ttEl.value === 'Mất') {
                    var dsSachGoc = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
                    var info = dsSachGoc.find(sg => sg.maSach === s.maSach);
                    soTienPhat = soNgayQuaHan * 2000 + (info && info.giaBT ? parseFloat(info.giaBT) : 0);
                    loaiViPham = 'Mất sách';
                } else if (soNgayQuaHan > 0) { soTienPhat = soNgayQuaHan * 2000; loaiViPham = 'Quá hạn'; }

                if (soTienPhat > 0) {
                    dsSachBiPhat.push({ maSach: s.maSach, tenSach: s.tenSach, loaiVP: loaiViPham, soTien: soTienPhat, tinhTrang: ttEl.value });
                    tongTienPhatGoc += soTienPhat;
                }

                if (ttEl.value !== 'Mất') {
                    var sachTrongKho = dsSach.find(sk => sk.maSach === s.maSach);
                    if (sachTrongKho) sachTrongKho.soLuongCon = (parseInt(sachTrongKho.soLuongCon) || 0) + 1;
                }
            } else { tatCaSachDaDuocTra = false; }
        });

        if (dsSachBiPhat.length > 0) {
            var chiTiet = dsSachBiPhat.map(s => `${s.maSach}: ${s.tenSach} - ${s.tinhTrang} (${formatTien(s.soTien)})`).join(' | ');
            dsPhat.push({
                maPhat: 'PF' + Date.now(), maDG: phieuTrongStore.maDG, tenDG: phieuTrongStore.tenDG, maPhieu: phieuTrongStore.maPhieu,
                maSach: dsSachBiPhat[0].maSach, tenSach: dsSachBiPhat.length > 1 ? `Nhiều cuốn (${dsSachBiPhat.length} sách)` : dsSachBiPhat[0].tenSach,
                loaiVP: dsSachBiPhat.length > 1 ? 'Nhiều loại' : dsSachBiPhat[0].loaiVP,
                soTien: tienConThieu, tongTienGoc: tongTienPhatGoc, soTienDaNhan: soTienDaNhan, soTienConThieu: tienConThieu,
                ngayPhat: homNay + ' ' + new Date().toTimeString().split(' ')[0], trangThai: 'Chưa thu', ngayThanhToan: null,
                ghiChu: `Thanh toán một phần khi trả sách ${soNgayQuaHan > 0 ? `(Quá hạn ${soNgayQuaHan} ngày)` : ''} | ${chiTiet} | Đã nhận: ${formatTien(soTienDaNhan)} | Còn thiếu: ${formatTien(tienConThieu)}`,
                danhSachSachBiPhat: dsSachBiPhat
            });
        }

        if (tatCaSachDaDuocTra) { phieuTrongStore.trangThai = 'Đã trả'; phieuTrongStore.ngayTraThucTe = homNay; }
        phieuTrongStore.ghiChuPhat = (phieuTrongStore.ghiChuPhat || "") + ` | Nhận một phần: ${formatTien(soTienDaNhan)} | Còn thiếu: ${formatTien(tienConThieu)}`;
    }

    localStorage.setItem('danhSachPhieuMuon', JSON.stringify(dsPhieuMuon));
    localStorage.setItem('danhSachSach', JSON.stringify(dsSach));
    localStorage.setItem('danhSachPhat', JSON.stringify(dsPhat));

    dongModal_TS();
    alert(`✅ ĐÃ CẬP NHẬT TRẠNG THÁI!\n━━━━━━━━━━━━━━━━━━━━\nĐã tạo phiếu phạt với trạng thái "Chưa thu"\nSố tiền đã nhận: ${formatTien(soTienDaNhan)}\nSố tiền còn thiếu: ${formatTien(tienConThieu)}\n━━━━━━━━━━━━━━━━━━━━\nVui lòng thu tiếp phần còn thiếu tại "Xử lý phạt"`);
    resetTrang_TS(); 
}

function xacNhanTra_TS(daThuTien) {
    if (!phieuHienTai_TS) return;
    
    var dsPhieuMuon = JSON.parse(localStorage.getItem('danhSachPhieuMuon') || '[]');
    var dsSach = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    var dsPhat = JSON.parse(localStorage.getItem('danhSachPhat') || '[]');
    var indexPhieu = dsPhieuMuon.findIndex(p => p.maPhieu === phieuHienTai_TS.maPhieu);

    if (indexPhieu !== -1) {
        var phieuTrongStore = dsPhieuMuon[indexPhieu];
        var tatCaSachDaDuocTra = true;
        var homNay = layNgayHomNay();
        var soNgayQuaHan = Math.max(0, Math.round((new Date(homNay) - new Date(phieuTrongStore.hanTra)) / 86400000));

        phieuTrongStore.danhSachSach.forEach((s, idx) => {
            if (s.daTra) return;
            var cbEl = document.getElementById('cb_' + idx);
            var ttEl = document.getElementById('tt_' + idx);

            if (cbEl && cbEl.checked) {
                s.daTra = true; s.ngayTraThucTe = homNay; s.tinhTrangKhiTra = ttEl.value; s.createdAtTra = Date.now();

                var soTienPhat = 0; var loaiViPham = '';
                if (ttEl.value === 'Rách') { soTienPhat = soNgayQuaHan * 2000 + 15000; loaiViPham = 'Hư hỏng'; }
                else if (ttEl.value === 'Mất') {
                    var dsSachGoc = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
                    var info = dsSachGoc.find(sg => sg.maSach === s.maSach);
                    soTienPhat = soNgayQuaHan * 2000 + (info && info.giaBT ? parseFloat(info.giaBT) : 0);
                    loaiViPham = 'Mất sách';
                } else if (soNgayQuaHan > 0) { soTienPhat = soNgayQuaHan * 2000; loaiViPham = 'Quá hạn'; }

                if (soTienPhat > 0) {
                    dsPhat.push({
                        maPhat: 'PF' + Date.now() + Math.floor(Math.random() * 1000),
                        maDG: phieuTrongStore.maDG, tenDG: phieuTrongStore.tenDG, maPhieu: phieuTrongStore.maPhieu,
                        maSach: s.maSach, tenSach: s.tenSach, loaiVP: loaiViPham, soTien: soTienPhat,
                        ngayPhat: homNay + ' ' + new Date().toTimeString().split(' ')[0],
                        trangThai: daThuTien ? 'Đã thanh toán' : 'Chưa thu', ngayThanhToan: daThuTien ? homNay : null,
                        ghiChu: `Phạt khi trả sách - ${ttEl.value} ${soNgayQuaHan > 0 ? `(quá hạn ${soNgayQuaHan} ngày)` : ''}`
                    });
                }

                if (ttEl.value !== 'Mất') {
                    var sachTrongKho = dsSach.find(sk => sk.maSach === s.maSach);
                    if (sachTrongKho) sachTrongKho.soLuongCon = (parseInt(sachTrongKho.soLuongCon) || 0) + 1;
                }
            } else { tatCaSachDaDuocTra = false; }
        });

        if (tatCaSachDaDuocTra) { phieuTrongStore.trangThai = 'Đã trả'; phieuTrongStore.ngayTraThucTe = homNay; }
        if (daThuTien && tongPhatGlobal_TS > 0) phieuTrongStore.ghiChuPhat = (phieuTrongStore.ghiChuPhat || "") + " | Đã thu: " + formatTien(tongPhatGlobal_TS);
    }

    localStorage.setItem('danhSachPhieuMuon', JSON.stringify(dsPhieuMuon));
    localStorage.setItem('danhSachSach', JSON.stringify(dsSach));
    localStorage.setItem('danhSachPhat', JSON.stringify(dsPhat));

    dongModal_TS();
    alert('✅ Đã cập nhật trạng thái trả sách' + (tongPhatGlobal_TS > 0 ? ' và tạo phiếu phạt!' : '!'));
    resetTrang_TS(); 
}

function resetTrang_TS() {
    phieuHienTai_TS = null; tongPhatGlobal_TS = 0;
    document.getElementById('cardChonPhieu').className = 'card';
    document.getElementById('cardThongTinPhieu').className = 'card hidden';
    document.getElementById('cardTraSach').className = 'card hidden';
    loadDanhSachPhieuActive_TS();
}
/* =========================================================
   17. NGHIỆP VỤ TRANG "XỬ LÝ PHẠT"
   ========================================================= */
function layClassLoaiVP_XLP(loaiVP) {
    if (loaiVP === 'Quá hạn') return 'loai-vp vp-qua-han';
    if (loaiVP === 'Hư hỏng') return 'loai-vp vp-hu-hong';
    if (loaiVP === 'Mất sách') return 'loai-vp vp-mat-sach';
    return 'loai-vp vp-qua-han';
}

function layIconLoaiVP_XLP(loaiVP) {
    if (loaiVP === 'Quá hạn') return '⏰';
    if (loaiVP === 'Hư hỏng') return '📕';
    if (loaiVP === 'Mất sách') return '❌';
    return '⚠️';
}

function locVaHienThi_XLP() {
    var dsPhat = JSON.parse(localStorage.getItem('danhSachPhat') || '[]');
    var tuKhoa = document.getElementById('tuKhoa_XLP').value.trim().toLowerCase();
    var locGiaTri = document.getElementById('locTrangThai_XLP').value;
    
    var dsLoc = dsPhat.filter(p => {
        var tuKhoaKhop = true;
        if (tuKhoa) {
            tuKhoaKhop = (p.maPhat && p.maPhat.toLowerCase().includes(tuKhoa)) || 
                         (p.maDG && p.maDG.toLowerCase().includes(tuKhoa)) || 
                         (p.tenDG && p.tenDG.toLowerCase().includes(tuKhoa));
        }
        var trangThaiKhop = !locGiaTri || p.trangThai === locGiaTri;
        return tuKhoaKhop && trangThaiKhop;
    });
    
    dsLoc.sort((a, b) => {
        if (a.trangThai === 'Chưa thu' && b.trangThai !== 'Chưa thu') return -1;
        if (a.trangThai !== 'Chưa thu' && b.trangThai === 'Chưa thu') return 1;
        return (b.ngayPhat || '').localeCompare(a.ngayPhat || '');
    });
    
    var lblSoLuong = document.getElementById('lblSoLuong_XLP');
    if (tuKhoa || locGiaTri) {
        lblSoLuong.innerHTML = '📊 Tìm thấy <strong>' + dsLoc.length + '</strong> phiếu / Tổng <strong>' + dsPhat.length + '</strong> phiếu';
    } else {
        lblSoLuong.innerHTML = '📊 Tổng số: <strong>' + dsPhat.length + '</strong> phiếu phạt';
    }
    
    hienThiBang_XLP(dsLoc);
    hienThiTongKet_XLP(dsPhat);
}

function hienThiBang_XLP(danhSach) {
    var container = document.getElementById('bangPhat');
    if (danhSach.length === 0) {
        container.innerHTML = '<div class="empty-state">📭 Không có phiếu phạt nào phù hợp với điều kiện lọc.</div>';
        return;
    }

    var html = `<table>
        <thead><tr>
            <th style="width:40px;">STT</th>
            <th style="width:110px;">Mã phạt</th>
            <th style="width:80px;">Mã ĐG</th>
            <th>Tên độc giả</th>
            <th style="width:120px;">Loại vi phạm</th>
            <th style="width:100px; text-align:right;">Số tiền</th>
            <th style="width:100px;">Ngày phạt</th>
            <th style="width:130px;">Trạng thái</th>
            <th style="width:130px; text-align:center;">Hành động</th>
        </tr></thead><tbody>`;

    danhSach.forEach((p, i) => {
        var chuaTT = p.trangThai === 'Chưa thu';
        var nutHanhDong = chuaTT ? `<button class="btn btn-success" onclick="thanhToan_XLP('${String(p.maPhat).replace(/'/g, "\\'")}')">💳 Thanh toán</button>` 
                                 : `<span style="color:#2E7D32;font-size:12px;font-weight:bold;">✓ Đã xong<br><small style="color:#666;">(${formatNgay(p.ngayThanhToan)})</small></span>`;

        var displaySoTien = formatTien(p.soTien);
        if (p.soTienDaNhan && p.soTienConThieu && chuaTT) {
            displaySoTien = `<div style="line-height:1.6;">
                <strong style="color:#1565C0;">Tổng: ${formatTien(p.tongTienGoc || p.soTien)}</strong><br>
                <small style="color:#2E7D32;">✓ Đã thu: ${formatTien(p.soTienDaNhan)}</small><br>
                <small style="color:#C62828;">⚠ Còn nợ: ${formatTien(p.soTienConThieu)}</small>
            </div>`;
        } else if (!chuaTT && p.tongTienGoc) {
            displaySoTien = `<strong style="color:#2E7D32;">${formatTien(p.tongTienGoc)}</strong>`;
        }

        var ngayPhatStr = '-';
        if (p.ngayPhat) {
            var d = p.ngayPhat.split(' ')[0]; var arr = d.split('-');
            ngayPhatStr = arr.length === 3 ? `${arr[2]}/${arr[1]}/${arr[0]}` : d;
        }

        html += `<tr>
            <td>${i + 1}</td>
            <td style="font-size:11px;font-family:monospace;"><strong>${p.maPhat}</strong></td>
            <td><strong>${p.maDG}</strong></td>
            <td>${p.tenDG}</td>
            <td><span class="${layClassLoaiVP_XLP(p.loaiVP)}">${layIconLoaiVP_XLP(p.loaiVP)} ${p.loaiVP}</span></td>
            <td style="text-align:right;" class="tien">${displaySoTien}</td>
            <td>${ngayPhatStr}</td>
            <td><span class="badge ${chuaTT ? 'badge-chua' : 'badge-da'}">${chuaTT ? '💳 Chưa thu' : '✅ Đã thanh toán'}</span></td>
            <td style="text-align:center;">${nutHanhDong}</td>
        </tr>`;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

function hienThiTongKet_XLP(danhSachTatCa) {
    var tongChuaTT = 0, demChuaTT = 0, tongDaTT = 0, demDaTT = 0;
    
    danhSachTatCa.forEach(p => {
        var soTien = parseFloat(p.soTien) || 0;
        if (p.trangThai === 'Chưa thu') { tongChuaTT += soTien; demChuaTT++; }
        else { tongDaTT += soTien; demDaTT++; }
    });
    
    document.getElementById('tongKet_XLP').innerHTML = `
        <div class="tong-ket-item tong-chua">
            <div class="nhan">💳 CHƯA THANH TOÁN (${demChuaTT} phiếu)</div>
            <div class="so-tien">${formatTien(tongChuaTT)}</div>
        </div>
        <div class="tong-ket-item tong-da">
            <div class="nhan">✅ ĐÃ THANH TOÁN (${demDaTT} phiếu)</div>
            <div class="so-tien">${formatTien(tongDaTT)}</div>
        </div>`;
}

function thanhToan_XLP(maPhat) {
    var dsPhat = JSON.parse(localStorage.getItem('danhSachPhat') || '[]');
    var viTri = dsPhat.findIndex(p => p.maPhat === maPhat);
    
    if (viTri === -1) { alert('⚠️ Lỗi: Không tìm thấy phiếu phạt!'); return; }
    var phieuPhat = dsPhat[viTri];
    if (phieuPhat.trangThai === 'Đã thanh toán' || phieuPhat.trangThai === 'Đã xong') { alert('⚠️ Phiếu phạt này đã được thanh toán rồi!'); return; }

    var soTienPhat = parseFloat(phieuPhat.soTien) || 0;
    var tongTienGoc = phieuPhat.tongTienGoc || soTienPhat;
    
    var tt = `💳 THANH TOÁN PHIẾU PHẠT\n━━━━━━━━━━━━━━━━━━━━\nMã phạt: ${phieuPhat.maPhat}\nĐộc giả: ${phieuPhat.tenDG} (${phieuPhat.maDG})\nLoại vi phạm: ${phieuPhat.loaiVP}\nNgày phạt: ${formatNgay(phieuPhat.ngayPhat)}\n━━━━━━━━━━━━━━━━━━━━\n`;
    if (phieuPhat.soTienDaNhan && phieuPhat.soTienConThieu) {
        tt += `Tổng tiền phạt: ${formatTien(tongTienGoc)}\nĐã nhận trước: ${formatTien(phieuPhat.soTienDaNhan)}\nSố tiền còn thiếu: ${formatTien(soTienPhat)}\n`;
    } else {
        tt += `Số tiền phạt: ${formatTien(soTienPhat)}\n`;
    }
    tt += `━━━━━━━━━━━━━━━━━━━━\n\nNhập số tiền khách đưa:`;
    
    var nhapStr = prompt(tt);
    if (nhapStr === null) return;

    var soTienNhan = parseFloat(nhapStr.replace(/[,\s\.]/g, ''));
    if (isNaN(soTienNhan) || nhapStr.trim() === '') { alert('⚠️ Số tiền không hợp lệ! Vui lòng nhập số.'); return; }
    if (soTienNhan < 0) { alert('⚠️ Số tiền không được âm!'); return; }
    if (soTienNhan < soTienPhat) { alert(`⚠️ Số tiền đưa (${formatTien(soTienNhan)}) không đủ so với số tiền phạt (${formatTien(soTienPhat)})!`); return; }

    var tienThua = soTienNhan - soTienPhat;
    
    dsPhat[viTri].trangThai = 'Đã thanh toán';
    dsPhat[viTri].ngayThanhToan = layNgayHomNay();
    dsPhat[viTri].soTienNhan = soTienNhan;
    
    if (phieuPhat.tongTienGoc) {
        dsPhat[viTri].soTien = phieuPhat.tongTienGoc;
        delete dsPhat[viTri].soTienDaNhan;
        delete dsPhat[viTri].soTienConThieu;
    }
    
    localStorage.setItem('danhSachPhat', JSON.stringify(dsPhat));

    var tb = `✅ ĐÃ THANH TOÁN THÀNH CÔNG!\n━━━━━━━━━━━━━━━━━━━━\nPhiếu phạt: ${phieuPhat.maPhat}\nĐộc giả: ${phieuPhat.tenDG}\n━━━━━━━━━━━━━━━━━━━━\n`;
    if (phieuPhat.tongTienGoc) {
        tb += `Tổng tiền phạt: ${formatTien(tongTienGoc)}\nĐã nhận trước đó: ${formatTien(phieuPhat.soTienDaNhan)}\nSố tiền vừa nhận: ${formatTien(soTienNhan)}\n`;
    } else {
        tb += `Số tiền phạt: ${formatTien(soTienPhat)}\nSố tiền nhận: ${formatTien(soTienNhan)}\n`;
    }
    tb += `━━━━━━━━━━━━━━━━━━━━\nTiền thừa trả lại: ${formatTien(tienThua)}`;
    
    alert(tb);
    locVaHienThi_XLP(); 
}
/* =========================================================
   6. CÁC HÀM TIỆN ÍCH DÙNG CHUNG (UTILITIES)
   ========================================================= */
function checkLogin() {
    var currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert('Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.');
        window.location.href = '../index.html';
        return null;
    }
    return currentUser;
}
function dangXuat() {
    if (confirm('Bạn có chắc muốn đăng xuất không?')) { 
        localStorage.removeItem('currentUser'); 
        window.location.href = '../index.html'; 
    }
    return false;
}
function hienThiLoi(idEl, msg) { document.getElementById(idEl).innerHTML = '<div class="error-box">⚠️ ' + msg + '</div>'; }
function layNgayHomNay() {
    var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function tinhNgaySau(ngayGoc, soNgay) {
    var d = new Date(ngayGoc); d.setDate(d.getDate() + soNgay);
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function formatNgay(str) {
    if (!str) return '--'; var parts = str.split('-'); if (parts.length === 3) return parts[2] + '/' + parts[1] + '/' + parts[0]; return str;
}
function dem2(n) { return n < 10 ? '0' + n : '' + n; }
function formatTien(so) {
    var str = String(Math.round(so));
    var result = '', dem = 0, i;
    for (i = str.length - 1; i >= 0; i--) {
        if (dem > 0 && dem % 3 === 0) result = '.' + result;
        result = str.charAt(i) + result; dem++;
    }
    return result + ' đ';
}
function soNgayQuaHan(hanTra) {
    var ngayHT = new Date(hanTra), homNay = new Date();
    ngayHT.setHours(0,0,0,0); homNay.setHours(0,0,0,0);
    return Math.floor((homNay - ngayHT) / 86400000);
}
/* =========================================================
   2. KHỞI TẠO TỰ ĐỘNG KHI TẢI TRANG (ĐIỀU HƯỚNG)
   ========================================================= */
window.onload = function() {
    // 2.1. Kiểm tra đăng nhập và Tải tên User (Dành cho mọi trang)
    var currentUser = checkLogin();
    if (!currentUser) return;

    var userInfo = JSON.parse(localStorage.getItem('currentUserInfo') || '{}');
    var tenHienThi = userInfo.hoTen || currentUser;
    if(document.getElementById('tenNguoiDung')) {
        document.getElementById('tenNguoiDung').textContent = (document.getElementById('soSachDangMuon') ? '👤 ' : '') + tenHienThi;
    }

    // 2.2. Phân luồng cho trang DASHBOARD (TRANG CHỦ)
    if (document.getElementById('soSachDangMuon') && document.getElementById('bangPhieuMuon')) {
        taiDuLieu();
    }

    // 2.3. Phân luồng cho trang CHO MƯỢN SÁCH
    if (document.getElementById('maDGInput') && document.getElementById('dsDocGiaNhanh')) {
        var homNay = layNgayHomNay();
        if (document.getElementById('hienThiNgayMuon')) document.getElementById('hienThiNgayMuon').textContent = homNay;
        if (document.getElementById('hanTraInput')) {
            document.getElementById('hanTraInput').value = tinhNgaySau(new Date(), 14);
            document.getElementById('hanTraInput').min = homNay;
        }
        if (typeof loadDanhSachDocGiaNhanh === "function") loadDanhSachDocGiaNhanh();
    }

    // 2.4. Phân luồng cho trang DANH SÁCH ĐẶT CHỖ
    if (document.getElementById('tableDatCho') && document.getElementById('statChoLay')) {
        kiemTraQuaHan();
        locDanhSach();
    }
   // 2.5. Phân luồng cho trang ĐẶT CHỖ MỚI
    if (document.getElementById('confirm-docGia') && document.getElementById('hanLayInput')) {
        var homNay = layNgayHomNay();
        if (document.getElementById('hienThiNgayDat')) document.getElementById('hienThiNgayDat').textContent = homNay;
        document.getElementById('hanLayInput').value = tinhNgaySau(new Date(), 7);
        document.getElementById('hanLayInput').min = homNay;
        loadDocGia_DatCho(); 
    }
    // 2.6. Phân luồng cho trang CHI TIẾT ĐỘC GIẢ
    if (document.getElementById('tieuDeTrang') && document.getElementById('bangThongTin')) {
        khoiTao_ChiTietDocGia();
    }
    // 2.7. Phân luồng cho trang DANH SÁCH ĐỘC GIẢ
    if (document.getElementById('bangDocGia') && document.getElementById('tuKhoa')) {
        taiDanhSach_DSDG();
    }
    // 2.8. Phân luồng cho trang THÊM ĐỘC GIẢ
    if (document.getElementById('maDG') && document.getElementById('hoTen')) {
        document.getElementById('maDG').value = taoMaDG_Them();
        capNhatThongTinThe_Them();
    }
    // 2.9. Phân luồng cho trang GIA HẠN
    if (document.getElementById('cardDanhSachPhieu') && document.getElementById('dsPhieuHienHanh')) {
        loadDanhSachPhieuHienHanh_GH();
        var urlParams = new URLSearchParams(window.location.search);
        var maPhieuURL = urlParams.get('ma');
        if (maPhieuURL) {
            document.getElementById('maPhieuInput').value = maPhieuURL;
            timPhieuGiaHan_GH();
        }
    }
    // 2.10. Phân luồng cho trang LỊCH SỬ GIAO DỊCH
    if (document.getElementById('tableLichSu') && document.getElementById('tuNgay')) {
        var hom_nay_LS = new Date();
        var dauThang_LS = new Date(hom_nay_LS.getFullYear(), hom_nay_LS.getMonth(), 1);
    
        var fISO = function(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
        
        document.getElementById('tuNgay').value = fISO(dauThang_LS);
        document.getElementById('denNgay').value = fISO(hom_nay_LS);
        locLichSu_LS();
    }
    // 2.11. Phân luồng cho trang DANH SÁCH PHIẾU MƯỢN
    if (document.getElementById('bangPhieuMuon') && document.getElementById('tuKhoa_DSPM')) {
        taiDanhSach_DSPM();
    }
    // 2.12. Phân luồng cho trang CHI TIẾT SÁCH
    if (document.getElementById('bangThongTinSach') && document.getElementById('vungThongKe')) {
        khoiTao_CTS();
    }
    // 2.13. Phân luồng cho trang TÌM KIẾM SÁCH
    if (document.getElementById('tacGia') && document.getElementById('namTu')) {
        taiDuLieuCombobox_TK();
    }
    // 2.14. Phân luồng cho trang THỐNG KÊ
    if (document.getElementById('bodyTheoNgay') && document.getElementById('tuNgay_TK')) {
        var hom_nay_TK = new Date();
        var dauThang_TK = new Date(hom_nay_TK.getFullYear(), hom_nay_TK.getMonth(), 1);
        
        var fISO_TK = function(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
        
        document.getElementById('tuNgay_TK').value = fISO_TK(dauThang_TK);
        document.getElementById('denNgay_TK').value = fISO_TK(hom_nay_TK);
        hienThiThongKe_TK();
    }
    // 2.15. Phân luồng cho trang TRẢ SÁCH
    if (document.getElementById('cardChonPhieu') && document.getElementById('dsPhieuMuonActive')) {
        loadDanhSachPhieuActive_TS();
    }
    // 2.16. Phân luồng cho trang XỬ LÝ PHẠT
    if (document.getElementById('bangPhat') && document.getElementById('tuKhoa_XLP')) {
        locVaHienThi_XLP();
    }
};
