
// ==========================================
// PHẦN 1: DÙNG CHUNG (Đăng nhập, Đăng xuất)
// ==========================================
function kiemTraDangNhapChung() {
    var user = localStorage.getItem('currentAdmin');
    var trangHienTai = window.location.pathname.toLowerCase();
    if (!user && !trangHienTai.includes('login.html')) { 
        window.location.href = 'login.html'; 
        return; 
    }
    if (!user) return; 
    var theTen = document.getElementById('adminName') || document.getElementById('tenAdmin');
    if (theTen) {
        var admins = JSON.parse(localStorage.getItem('admins') || '[]');
        var found = false;
        for (var i = 0; i < admins.length; i++) {
            if (admins[i].username === user) {
                theTen.textContent = admins[i].hoTen || user;
                found = true; break;
            }
        }
        if (!found) theTen.textContent = user; 
    }
}

function dangXuat() {
    localStorage.removeItem('currentAdmin');
    localStorage.removeItem('currentUserInfo');
    localStorage.removeItem('currentUserRole');
}

function formatTien(n) {
    return Number(n || 0).toLocaleString('vi-VN');
}


// ==========================================
// PHẦN 2: CHỨC NĂNG BIÊN MỤC
// ==========================================
var sachHienTai = null;

// Hàm mới: Giúp bốc mã sách từ bảng điền lên ô tìm kiếm
function chonSachTuBang(maSach) {
    document.getElementById('timMa').value = maSach;
    timSach(); // Gọi lại hàm tìm sách
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Tự động cuộn mượt lên trên cùng
}

function timSach() {
    var tim = document.getElementById('timMa').value.trim().toLowerCase();
    if (!tim) { alert('Vui lòng nhập mã hoặc tên sách!'); return; }
    var ds = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    sachHienTai = null;
    for (var i = 0; i < ds.length; i++) {
        if (ds[i].maSach.toLowerCase() === tim || ds[i].tenSach.toLowerCase().indexOf(tim) >= 0) {
            sachHienTai = ds[i]; break;
        }
    }
    if (!sachHienTai) { alert('Không tìm thấy sách!'); return; }
    document.getElementById('tenSachHienThi').innerText = sachHienTai.tenSach;
    document.getElementById('tacGiaHienThi').innerText = sachHienTai.tacGia;
    document.getElementById('maSachHienThi').innerText = sachHienTai.maSach;

    document.getElementById('danhMucChinh').value = sachHienTai.danhMucChinh || '';
    document.getElementById('danhMucPhu').value = sachHienTai.danhMucPhu || '';
    document.getElementById('tuKhoa').value = sachHienTai.tuKhoa || '';
    document.getElementById('ddc').value = sachHienTai.ddc || '';
    if (sachHienTai.viTri) {
        var parts = sachHienTai.viTri.split('-');
        document.getElementById('viTriKhu').value = parts[0] || '';
        document.getElementById('viTriKe').value = parts[1] || '';
        document.getElementById('viTriNgan').value = parts[2] || '';
    }
    document.getElementById('ghiChu').value = sachHienTai.ghiChu || '';
    document.getElementById('formBienMuc').style.display = 'block';
}

function luuBienMuc() {
    if (!sachHienTai) return;
    var khu = document.getElementById('viTriKhu').value.trim();
    var ke = document.getElementById('viTriKe').value.trim();
    var ngan = document.getElementById('viTriNgan').value.trim();
    var viTri = (khu && ke && ngan) ? khu + '-' + ke + '-' + ngan : sachHienTai.viTri;

    var ds = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    for (var i = 0; i < ds.length; i++) {
        if (ds[i].maSach === sachHienTai.maSach) {
            ds[i].danhMucChinh = document.getElementById('danhMucChinh').value;
            ds[i].danhMucPhu = document.getElementById('danhMucPhu').value.trim();
            ds[i].tuKhoa = document.getElementById('tuKhoa').value.trim();
            ds[i].ddc = document.getElementById('ddc').value.trim();
            ds[i].viTri = viTri;
            ds[i].ghiChu = document.getElementById('ghiChu').value.trim();
            break;
        }
    }
    localStorage.setItem('danhSachSach', JSON.stringify(ds));
    alert('Lưu biên mục thành công!');
    document.getElementById('formBienMuc').style.display = 'none';
    taiDanhSach();
}

function taiDanhSach() {
    var tbody = document.getElementById('tbodyBienMuc');
    if (!tbody) return; // Nếu không có bảng biên mục thì bỏ qua (tránh báo lỗi)
    
    var ds = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    tbody.innerHTML = '';
    for (var i = 0; i < ds.length; i++) {
        var s = ds[i];
        var tr = document.createElement('tr');
        
        // --- ĐOẠN ĐƯỢC THÊM MỚI ---
        tr.style.cursor = 'pointer'; // Hiện hình bàn tay khi di chuột vào
        tr.title = 'Click để biên mục sách này';
        tr.setAttribute('onclick', "chonSachTuBang('" + s.maSach + "')"); // Gắn sự kiện click
        // --------------------------

        tr.innerHTML = '<td>' + s.maSach + '</td><td>' + s.tenSach + '</td><td>' + s.theLoai + '</td>' +
            '<td>' + (s.danhMucChinh || '-') + '</td><td>' + (s.ddc || '-') + '</td>' +
            '<td>' + (s.viTri || '-') + '</td><td>' + (s.tuKhoa || '-') + '</td>';
        tbody.appendChild(tr);
    }
}


// ==========================================
// PHẦN 3: CHỨC NĂNG DASHBOARD (THỐNG KÊ)
// ==========================================
function taiThongKe() {
    var sachs = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    var nhaps = JSON.parse(localStorage.getItem('phieuNhapKho') || '[]');
    var xuats = JSON.parse(localStorage.getItem('phieuXuatKho') || '[]');

    // 1. Cập nhật Tổng số sách
    var tongSach = 0;
    for (var i = 0; i < sachs.length; i++) tongSach += Number(sachs[i].soLuongTong || 0);
    if (document.getElementById('tongSach')) document.getElementById('tongSach').textContent = tongSach;

    // 2. Cập nhật Giá trị tồn kho
    var giaTri = 0;
    for (var i = 0; i < sachs.length; i++) giaTri += Number(sachs[i].soLuongCon || 0) * Number(sachs[i].giaNhap || 0);
    if (document.getElementById('giaTriTon')) document.getElementById('giaTriTon').textContent = formatTien(giaTri);

    // 3. Cập nhật Phiếu nhập/xuất tháng này
    var thang = new Date().getMonth() + 1;
    var nam = new Date().getFullYear();
    var demNhap = 0, demXuat = 0;
    for (var i = 0; i < nhaps.length; i++) {
        var d = new Date(nhaps[i].ngayNhap || nhaps[i].ngay);
        if (d.getMonth() + 1 === thang && d.getFullYear() === nam) demNhap++;
    }
    for (var i = 0; i < xuats.length; i++) {
        var d = new Date(xuats[i].ngayXuat || xuats[i].ngay);
        if (d.getMonth() + 1 === thang && d.getFullYear() === nam) demXuat++;
    }
    if (document.getElementById('phieuNhapThang')) document.getElementById('phieuNhapThang').textContent = demNhap;
    if (document.getElementById('phieuXuatThang')) document.getElementById('phieuXuatThang').textContent = demXuat;

    // --------------------------------------------------------
    // 4. ĐỒNG BỘ THỂ LOẠI (BAO GỒM CẢ TỰ GÕ) VÀ LÀM GỌN BẢNG
    // --------------------------------------------------------
    var dmMap = {};
    for (var i = 0; i < sachs.length; i++) {
        // Lấy chính xác Thể loại sách (kể cả chữ "Đồ họa" tự gõ)
        var dm = sachs[i].theLoai || 'Chưa phân loại'; 
        if (!dmMap[dm]) dmMap[dm] = { soDau: 0, tongTon: 0, giaTri: 0 };
        dmMap[dm].soDau++;
        dmMap[dm].tongTon += Number(sachs[i].soLuongCon || 0);
        dmMap[dm].giaTri += Number(sachs[i].soLuongCon || 0) * Number(sachs[i].giaNhap || 0);
    }

    // Ép object sang mảng để dễ sắp xếp
    var dmArray = [];
    for (var key in dmMap) {
        dmArray.push({ ten: key, soDau: dmMap[key].soDau, tongTon: dmMap[key].tongTon, giaTri: dmMap[key].giaTri });
    }
    
    // SẮP XẾP CHO GỌN: Thể loại nào tồn nhiều nhất đẩy lên đầu
    dmArray.sort(function(a, b) { return b.tongTon - a.tongTon; });

    var tbDM = document.getElementById('tbDanhMuc');
    if (tbDM) {
        tbDM.innerHTML = '';
        if (dmArray.length === 0) {
            tbDM.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#999">Chưa có dữ liệu</td></tr>';
        } else {
            for (var j = 0; j < dmArray.length; j++) {
                var m = dmArray[j];
                tbDM.innerHTML += '<tr>' +
                    '<td><strong style="color: #2563eb;">' + m.ten + '</strong></td>' +
                    '<td>' + m.soDau + '</td>' +
                    '<td>' + m.tongTon + '</td>' +
                    '<td style="font-weight: 500;">' + formatTien(m.giaTri) + 'đ</td>' +
                '</tr>';
            }
        }
    }

    // 5. Cảnh báo sách sắp hết (Tồn kho < 3 cuốn)
    var tbSH = document.getElementById('tbSapHet');
    if (tbSH) {
        tbSH.innerHTML = '';
        var coSH = false;
        for (var i = 0; i < sachs.length; i++) {
            if (Number(sachs[i].soLuongCon || 0) < 3) {
                tbSH.innerHTML += '<tr><td>' + sachs[i].maSach + '</td><td>' + sachs[i].tenSach + '</td><td>' + sachs[i].tacGia + '</td><td style="color: #ef4444; font-weight: bold; text-align: center;">' + sachs[i].soLuongCon + '</td></tr>';
                coSH = true;
            }
        }
        if (!coSH) tbSH.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#16a34a;padding: 15px;">✅ Kho đang ở mức an toàn</td></tr>';
    }

    // 6. Phiếu nhập gần đây
    var tbPN = document.getElementById('tbPhieuNhap');
    if (tbPN) {
        tbPN.innerHTML = '';
        var ganDay = nhaps.slice(-5).reverse(); // Lấy 5 phiếu mới nhất
        for (var i = 0; i < ganDay.length; i++) {
            var p = ganDay[i];
            tbPN.innerHTML += '<tr><td>' + p.maPhieu + '</td><td>' + p.ngayNhap + '</td><td>' + p.tenNCC + '</td><td style="color: #16a34a; font-weight: bold;">' + formatTien(p.tongTien) + 'đ</td></tr>';
        }
        if (!ganDay.length) tbPN.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#999">Chưa có phiếu nhập nào</td></tr>';
    }
}


// ==========================================
// PHẦN 5: CHỨC NĂNG IN TEM SÁCH
// ==========================================
function loadDanhSachInTem() {
    var tbody = document.getElementById('danhSachSachInTem');
    if (!tbody) return;
    
    var sach = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    var html = '';
    
    if (sach.length === 0) {
        html = '<tr><td colspan="4" style="text-align: center;">Chưa có sách nào</td></tr>';
    } else {
        for (var i = 0; i < sach.length; i++) {
            html += '<tr>';
            html += '<td><input type="checkbox" class="chkSach" value="' + i + '"></td>';
            html += '<td>' + sach[i].maSach + '</td>';
            html += '<td>' + sach[i].tenSach + '</td>';
            html += '<td>' + (sach[i].viTri || 'Chưa xác định') + '</td>';
            html += '</tr>';
        }
    }
    tbody.innerHTML = html;
}

function chonTatCa() {
    var checkboxes = document.getElementsByClassName('chkSach');
    var checkAll = document.getElementById('checkAll').checked;
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = checkAll;
    }
}

function xemTruocTem() {
    var sach = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    var checkboxes = document.getElementsByClassName('chkSach');
    var html = '';
    var hasSelected = false; // Biến kiểm tra xem có chọn sách nào không
    
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            hasSelected = true;
            var index = checkboxes[i].value;
            var s = sach[index];
            
            // Thiết kế tem sách có mã vạch
            html += '<div class="tem-sach" style="display: inline-block; width: 250px; border: 1px solid #000; padding: 10px; margin: 10px; text-align: center; border-radius: 5px;">';
            html += '<div style="font-weight: bold; font-size: 16px; border-bottom: 2px solid #333; padding-bottom: 5px; margin-bottom: 10px;">THƯ VIỆN ABC</div>';
            html += '<div style="margin: 10px 0; font-weight: bold;">' + s.tenSach + '</div>';
            html += '<div style="margin: 5px 0;">Vị trí: ' + (s.viTri || 'N/A') + '</div>';
            
            // Thẻ SVG để render mã vạch (sử dụng maSach làm giá trị)
            html += '<svg class="barcode" jsbarcode-value="' + s.maSach + '" jsbarcode-width="1.5" jsbarcode-height="40" jsbarcode-fontsize="14"></svg>';
            
            html += '</div>';
        }
    }
    
    if (!hasSelected) {
        alert('Vui lòng chọn ít nhất 1 sách!');
        return;
    }
    
    // Hiển thị khung xem trước
    document.getElementById('noiDungTem').innerHTML = html;
    document.getElementById('previewTem').style.display = 'block';

    // Kích hoạt thư viện JsBarcode để vẽ mã vạch vào các thẻ <svg>
    if (typeof JsBarcode !== 'undefined') {
        JsBarcode(".barcode").init();
    } else {
        alert("Lỗi: Chưa tải được thư viện JsBarcode. Bạn nhớ thêm thẻ <script> ở file HTML nhé!");
    }
}

function inTem() {
    xemTruocTem();
    // Đợi 500ms để JsBarcode kịp vẽ xong hình ảnh mã vạch trước khi hộp thoại in hiện lên
    setTimeout(function() {
        window.print();
    }, 500);
}
// ==========================================
// PHẦN 6: CHỨC NĂNG KIỂM KÊ KHO
// ==========================================
function khoiTaoKiemKe() {
    var inputNgay = document.getElementById('ngayKiemKe');
    var inputNguoi = document.getElementById('nguoiKiemKe');
    if (inputNgay) inputNgay.valueAsDate = new Date();
    if (inputNguoi) inputNguoi.value = localStorage.getItem('currentAdmin') || 'Admin';
}

function batDauKiemKe() {
    var sach = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    if (sach.length === 0) {
        alert('Chưa có sách nào trong kho!');
        return;
    }
    
    var html = '';
    for (var i = 0; i < sach.length; i++) {
        html += '<tr>';
        html += '<td>' + (i + 1) + '</td>';
        html += '<td>' + sach[i].maSach + '</td>';
        html += '<td>' + sach[i].tenSach + '</td>';
        html += '<td id="tonHT_' + i + '">' + sach[i].soLuongCon + '</td>';
        html += '<td><input type="number" id="tonThucTe_' + i + '" value="' + sach[i].soLuongCon + '" onchange="tinhChenhLech(' + i + ')" style="width: 80px;"></td>';
        html += '<td id="chenhLech_' + i + '">0</td>';
        html += '</tr>';
    }
    
    document.getElementById('danhSachKiemKe').innerHTML = html;
    document.getElementById('bangKiemKe').style.display = 'block';
}

function tinhChenhLech(index) {
    var tonHT = parseInt(document.getElementById('tonHT_' + index).innerText);
    var tonThucTe = parseInt(document.getElementById('tonThucTe_' + index).value || 0);
    var chenhLech = tonThucTe - tonHT;
    
    var cell = document.getElementById('chenhLech_' + index);
    cell.innerText = chenhLech;
    
    if (chenhLech > 0) {
        cell.style.color = 'green';
        cell.style.fontWeight = 'bold';
    } else if (chenhLech < 0) {
        cell.style.color = 'red';
        cell.style.fontWeight = 'bold';
    } else {
        cell.style.color = 'black';
        cell.style.fontWeight = 'normal';
    }
}

function hoanTatKiemKe() {
    if (!confirm('Xác nhận hoàn tất kiểm kê?\n\nDữ liệu tồn kho sẽ được cập nhật theo số liệu thực tế!')) {
        return;
    }
    
    var sach = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    for (var i = 0; i < sach.length; i++) {
        var tonThucTe = parseInt(document.getElementById('tonThucTe_' + i).value || 0);
        sach[i].soLuongCon = tonThucTe;
    }
    
    localStorage.setItem('danhSachSach', JSON.stringify(sach));
    
    // Lưu lịch sử kiểm kê
    var lichSu = JSON.parse(localStorage.getItem('lichSuKiemKe') || '[]');
    lichSu.push({
        ngay: document.getElementById('ngayKiemKe').value,
        nguoi: document.getElementById('nguoiKiemKe').value,
        soSach: sach.length
    });
    localStorage.setItem('lichSuKiemKe', JSON.stringify(lichSu));
    
    alert('✅ Kiểm kê hoàn tất!\n\nĐã cập nhật tồn kho trong hệ thống.');
    window.location.reload();
}

function huyKiemKe() {
    if (confirm('Hủy kiểm kê?')) {
        window.location.reload();
    }
}
// ==========================================
// PHẦN 7: CHỨC NĂNG LỊCH SỬ NHẬP XUẤT
// ==========================================
function xemTatCaLichSu() {
    document.getElementById('loaiPhieu').value = 'all';
    document.getElementById('tuNgay').value = '';
    document.getElementById('denNgay').value = '';
    locLichSu();
}

function locLichSu() {
    var loai = document.getElementById('loaiPhieu').value;
    var tuNgay = document.getElementById('tuNgay').value;
    var denNgay = document.getElementById('denNgay').value;
    
    // 💡 Lưu ý: Mình giữ nguyên key localStorage của bạn. 
    // Nếu Dashboard đang dùng 'danhSachPhieuNhap', bạn nhớ đồng nhất chỗ này nha!
    var phieuNhap = JSON.parse(localStorage.getItem('phieuNhapKho') || '[]');
    var phieuXuat = JSON.parse(localStorage.getItem('phieuXuatKho') || '[]');
    
    var ketQua = [];
    
    // Thêm phiếu nhập
    if (loai === 'all' || loai === 'nhap') {
        for (var i = 0; i < phieuNhap.length; i++) {
            if (kiemTraNgayLichSu(phieuNhap[i].ngayNhap, tuNgay, denNgay)) {
                ketQua.push({
                    loai: 'Nhập',
                    maPhieu: phieuNhap[i].maPhieu,
                    ngay: phieuNhap[i].ngayNhap,
                    ghiChu: phieuNhap[i].tenNCC,
                    soLuong: phieuNhap[i].danhSachSach ? phieuNhap[i].danhSachSach.length : 0,
                    giaTri: phieuNhap[i].tongTien || 0,
                    nguoi: phieuNhap[i].nguoiNhap
                });
            }
        }
    }
    
    // Thêm phiếu xuất
    if (loai === 'all' || loai === 'xuat') {
        for (var j = 0; j < phieuXuat.length; j++) {
            if (kiemTraNgayLichSu(phieuXuat[j].ngayXuat, tuNgay, denNgay)) {
                ketQua.push({
                    loai: 'Xuất',
                    maPhieu: phieuXuat[j].maPhieu,
                    ngay: phieuXuat[j].ngayXuat,
                    ghiChu: phieuXuat[j].lyDo,
                    soLuong: phieuXuat[j].danhSachSach ? phieuXuat[j].danhSachSach.length : 0,
                    giaTri: phieuXuat[j].tongTien || 0,
                    nguoi: phieuXuat[j].nguoiXuat
                });
            }
        }
    }
    
    // Sắp xếp theo ngày giảm dần
    ketQua.sort(function(a, b) {
        return new Date(b.ngay) - new Date(a.ngay);
    });
    
    // Hiển thị
    var html = '';
    var tongNhap = 0;
    var tongXuat = 0;
    var slPhieuNhap = 0;
    var slPhieuXuat = 0;
    
    if (ketQua.length === 0) {
        html = '<tr><td colspan="7" style="text-align: center;">Không có dữ liệu</td></tr>';
    } else {
        for (var k = 0; k < ketQua.length; k++) {
            var item = ketQua[k];
            var mauLoai = item.loai === 'Nhập' ? 'green' : 'red';
            
            html += '<tr>';
            html += '<td style="color: ' + mauLoai + '; font-weight: bold;">' + item.loai + '</td>';
            html += '<td>' + item.maPhieu + '</td>';
            html += '<td>' + item.ngay + '</td>';
            html += '<td>' + item.ghiChu + '</td>';
            html += '<td>' + item.soLuong + '</td>';
            html += '<td>' + Number(item.giaTri).toLocaleString('vi-VN') + 'đ</td>';
            html += '<td>' + item.nguoi + '</td>';
            html += '</tr>';
            
            if (item.loai === 'Nhập') {
                tongNhap += Number(item.giaTri);
                slPhieuNhap++;
            } else {
                tongXuat += Number(item.giaTri);
                slPhieuXuat++;
            }
        }
    }
    
    document.getElementById('ketQuaLichSu').innerHTML = html;
    
    // Tổng kết
    var tongKetHTML = '';
    tongKetHTML += '<div style="font-size: 18px;">📊 Tổng kết:</div>';
    tongKetHTML += '<div style="margin-top: 10px;">';
    tongKetHTML += '<span style="color: green;">✅ Số phiếu nhập: ' + slPhieuNhap + ' | Tổng tiền: ' + tongNhap.toLocaleString('vi-VN') + 'đ</span>';
    tongKetHTML += '</div>';
    tongKetHTML += '<div style="margin-top: 5px;">';
    tongKetHTML += '<span style="color: red;">❌ Số phiếu xuất: ' + slPhieuXuat + ' | Tổng tiền: ' + tongXuat.toLocaleString('vi-VN') + 'đ</span>';
    tongKetHTML += '</div>';
    tongKetHTML += '<div style="margin-top: 10px; font-size: 20px;">';
    tongKetHTML += '💰 Biến động tồn kho: <span style="color: ' + (tongNhap >= tongXuat ? 'green' : 'red') + ';">' + (tongNhap - tongXuat).toLocaleString('vi-VN') + 'đ</span>';
    tongKetHTML += '</div>';
    document.getElementById('tongKet').innerHTML = tongKetHTML;
}

function kiemTraNgayLichSu(ngay, tuNgay, denNgay) {
    if (!tuNgay && !denNgay) return true;
    var d = new Date(ngay);
    var tu = tuNgay ? new Date(tuNgay) : new Date('1900-01-01');
    var den = denNgay ? new Date(denNgay) : new Date('2100-12-31');
    return d >= tu && d <= den;
}
// ==========================================
// PHẦN 8: CHỨC NĂNG ĐĂNG NHẬP
// ==========================================
function khoiTaoDuLieu() {
    var admins = JSON.parse(localStorage.getItem('admins') || '[]');
    if (admins.length === 0) {
        admins.push({ username: 'admin', password: '123456', role: 'admin', hoTen: 'Quản trị viên' });
        localStorage.setItem('admins', JSON.stringify(admins));
    }
}

function dangNhap() {
    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value;
    var admins = JSON.parse(localStorage.getItem('admins') || '[]');
    var found = null;
    
    for (var i = 0; i < admins.length; i++) {
        if (admins[i].username === username && admins[i].password === password) {
            found = admins[i];
            break;
        }
    }
    
    if (found) {
        localStorage.setItem('currentAdmin', username);
        window.location.href = 'dashboard.html';
    } else {
        document.getElementById('errMsg').style.display = 'block';
    }
}
// ==========================================
// PHẦN 9: CHỨC NĂNG NHÀ CUNG CẤP
// ==========================================
function loadDanhSachNCC() {
    var ncc = JSON.parse(localStorage.getItem('danhSachNCC') || '[]');
    var html = '';
    
    if (ncc.length === 0) {
        html = '<tr><td colspan="6" style="text-align: center;">Chưa có nhà cung cấp nào</td></tr>';
    } else {
        for (var i = 0; i < ncc.length; i++) {
            html += '<tr>';
            html += '<td>' + ncc[i].maNCC + '</td>';
            html += '<td>' + ncc[i].tenNCC + '</td>';
            html += '<td>' + (ncc[i].diaChi || '') + '</td>';
            html += '<td>' + (ncc[i].sdt || '') + '</td>';
            html += '<td>' + (ncc[i].email || '') + '</td>';
            html += '<td>';
            html += '<button onclick="suaNCC(' + i + ')" class="btn-primary">✏️ Sửa</button> ';
            html += '<button onclick="xoaNCC(' + i + ')" class="btn-primary btn-danger">🗑️ Xóa</button>';
            html += '</td>';
            html += '</tr>';
        }
    }
    
    var tbody = document.getElementById('danhSachNCC');
    if (tbody) tbody.innerHTML = html;
}

function suaNCC(index) {
    // CẢI TIẾN 1: Dùng Link URL để báo cho trang web biết là đang sửa
    // Cách này giúp click từ menu "Thêm NCC" sẽ luôn ra form trắng tinh
    window.location.href = 'ncc-them.html?edit=' + index;
}

function xoaNCC(index) {
    if (!confirm('Xác nhận xóa nhà cung cấp này?')) {
        return;
    }
    
    var ncc = JSON.parse(localStorage.getItem('danhSachNCC') || '[]');
    ncc.splice(index, 1);
    localStorage.setItem('danhSachNCC', JSON.stringify(ncc));
    
    alert('✅ Đã xóa!');
    loadDanhSachNCC();
}

// CẢI TIẾN 2: Hàm sinh mã thông minh (Tìm số lớn nhất rồi cộng 1, không bao giờ trùng)
function sinhMaNCCMoi() {
    var ncc = JSON.parse(localStorage.getItem('danhSachNCC') || '[]');
    var max = 0;
    for (var i = 0; i < ncc.length; i++) {
        var ma = ncc[i].maNCC || '';
        if (ma.startsWith('NCC')) {
            var so = parseInt(ma.replace('NCC', '')) || 0;
            if (so > max) max = so;
        }
    }
    return 'NCC' + String(max + 1).padStart(3, '0');
}

function khoiTaoFormNCC() {
    // Đọc trên thanh địa chỉ xem có chữ ?edit= không
    var params = new URLSearchParams(window.location.search);
    var indexSua = params.get('edit');
    var ncc = JSON.parse(localStorage.getItem('danhSachNCC') || '[]');
    
    if (indexSua !== null && ncc[indexSua]) {
        // ---> CHẾ ĐỘ SỬA
        var elTieuDe = document.getElementById('tieuDeNCC');
        if (elTieuDe) elTieuDe.innerText = '✏️ Sửa thông tin nhà cung cấp';
        
        var n = ncc[indexSua];
        
        document.getElementById('maNCC').value = n.maNCC;
        document.getElementById('maNCC').readOnly = true;
        document.getElementById('tenNCC').value = n.tenNCC || '';
        document.getElementById('loaiNCC').value = n.loai || 'Nhà xuất bản';
        document.getElementById('diaChi').value = n.diaChi || '';
        document.getElementById('sdt').value = n.sdt || '';
        document.getElementById('email').value = n.email || '';
        document.getElementById('website').value = n.website || '';
        document.getElementById('nguoiLienHe').value = n.nguoiLienHe || '';
        document.getElementById('mst').value = n.mst || '';
    } else {
        // ---> CHẾ ĐỘ THÊM MỚI
        var elTieuDe = document.getElementById('tieuDeNCC');
        if (elTieuDe) elTieuDe.innerText = '➕ Thêm nhà cung cấp mới';

        document.getElementById('maNCC').value = sinhMaNCCMoi();
        document.getElementById('maNCC').readOnly = true;
        
        // CẢI TIẾN 3: Ép xóa sạch mọi dữ liệu cũ trong các ô nhập
        document.getElementById('tenNCC').value = '';
        document.getElementById('loaiNCC').value = 'Nhà xuất bản';
        document.getElementById('diaChi').value = '';
        document.getElementById('sdt').value = '';
        document.getElementById('email').value = '';
        document.getElementById('website').value = '';
        document.getElementById('nguoiLienHe').value = '';
        document.getElementById('mst').value = '';
    }
}

function luuNCC() {
    var params = new URLSearchParams(window.location.search);
    var indexSua = params.get('edit');
    var ncc = JSON.parse(localStorage.getItem('danhSachNCC') || '[]');
    
    var nccMoi = {
        maNCC: document.getElementById('maNCC').value,
        tenNCC: document.getElementById('tenNCC').value.trim(),
        loai: document.getElementById('loaiNCC').value,
        diaChi: document.getElementById('diaChi').value.trim(),
        sdt: document.getElementById('sdt').value.trim(),
        email: document.getElementById('email').value.trim(),
        website: document.getElementById('website').value.trim(),
        nguoiLienHe: document.getElementById('nguoiLienHe').value.trim(),
        mst: document.getElementById('mst').value.trim()
    };
    
    // Bắt lỗi không nhập tên
    if (!nccMoi.tenNCC) {
        alert('Vui lòng nhập Tên nhà cung cấp!');
        return;
    }
    
    if (indexSua !== null && ncc[indexSua]) {
        // Cập nhật mảng
        ncc[indexSua] = nccMoi;
        alert('✅ Đã cập nhật nhà cung cấp!');
    } else {
        // Thêm mới vào mảng
        ncc.push(nccMoi);
        alert('✅ Đã thêm nhà cung cấp mới!');
    }
    
    localStorage.setItem('danhSachNCC', JSON.stringify(ncc));
    window.location.href = 'ncc-danh-sach.html'; // Chuyển trang
}
// ==========================================
// PHẦN 10: DANH SÁCH PHIẾU NHẬP
// ==========================================
function loadDanhSachPhieuNhap() {
    var phieuNhap = JSON.parse(localStorage.getItem('phieuNhapKho') || '[]');
    var html = '';
    
    if (phieuNhap.length === 0) {
        html = '<tr><td colspan="7" style="text-align: center;">Chưa có phiếu nhập nào</td></tr>';
    } else {
        // Lặp từ cuối mảng lên đầu để hiển thị phiếu mới nhất trước
        for (var i = phieuNhap.length - 1; i >= 0; i--) {
            var p = phieuNhap[i];
            html += '<tr>';
            html += '<td>' + p.maPhieu + '</td>';
            html += '<td>' + p.ngayNhap + '</td>';
            html += '<td>' + p.tenNCC + '</td>';
            html += '<td>' + (p.danhSachSach ? p.danhSachSach.length : 0) + '</td>';
            html += '<td><strong style="color: #16a34a;">' + formatTien(p.tongTien) + 'đ</strong></td>';
            html += '<td>' + p.nguoiNhap + '</td>';
            html += '<td>';
            html += '<button onclick="xemChiTietPhieuNhap(' + i + ')" class="btn-primary">👁️ Xem</button> ';
            html += '<button onclick="inPhieuNhap(' + i + ')" style="background-color: #f59e0b;">🖨️ In</button>';
            html += '</td>';
            html += '</tr>';
        }
    }
    
    var tbody = document.getElementById('danhSachPhieuNhap');
    if (tbody) tbody.innerHTML = html;
}

function xemChiTietPhieuNhap(index) {
    var phieuNhap = JSON.parse(localStorage.getItem('phieuNhapKho') || '[]');
    var p = phieuNhap[index];
    if (!p) return;
    
    var thongTin = '📋 CHI TIẾT PHIẾU NHẬP\n\n';
    thongTin += 'Mã phiếu: ' + p.maPhieu + '\n';
    thongTin += 'Ngày lập: ' + p.ngayNhap + '\n';
    thongTin += 'Nhà cung cấp: ' + p.tenNCC + '\n';
    thongTin += 'Người nhập: ' + p.nguoiNhap + '\n\n';
    thongTin += '📦 DANH SÁCH SẢN PHẨM:\n';
    
    if (p.danhSachSach && p.danhSachSach.length > 0) {
        for (var i = 0; i < p.danhSachSach.length; i++) {
            var s = p.danhSachSach[i];
            thongTin += (i + 1) + '. ' + s.tenSach + ' | SL: ' + s.soLuong + ' | Giá: ' + formatTien(s.giaNhap) + 'đ\n';
        }
    } else {
        thongTin += '(Không có sản phẩm nào)\n';
    }
    
    thongTin += '\n💰 TỔNG THÀNH TIỀN: ' + formatTien(p.tongTien) + 'đ';
    
    alert(thongTin);
}

function inPhieuNhap(index) {
    localStorage.setItem('phieuNhapHienTai', index);
    window.open('nhap-kho-in.html', '_blank');
}
// ==========================================
// PHẦN 11: CHỨC NĂNG IN PHIẾU NHẬP
// ==========================================
function loadDuLieuInPhieu() {
    var phieuIndex = localStorage.getItem('phieuNhapHienTai');
    var phieuNhap = JSON.parse(localStorage.getItem('phieuNhapKho') || '[]');
    
    if (phieuIndex !== null && phieuNhap[phieuIndex]) {
        var phieu = phieuNhap[phieuIndex];
        
        var htmlInfo = '';
        htmlInfo += '<div><strong>Mã phiếu:</strong> ' + phieu.maPhieu + '</div>';
        htmlInfo += '<div><strong>Ngày nhập:</strong> ' + phieu.ngayNhap + '</div>';
        htmlInfo += '<div><strong>Nhà cung cấp:</strong> ' + phieu.tenNCC + '</div>';
        htmlInfo += '<div><strong>Người nhập:</strong> ' + phieu.nguoiNhap + '</div>';
        document.getElementById('thongTinPhieu').innerHTML = htmlInfo;
        
        var htmlSach = '';
        var tongTien = 0;
        for (var i = 0; i < phieu.danhSachSach.length; i++) {
            var s = phieu.danhSachSach[i];
            var thanhTien = s.soLuong * s.giaNhap;
            tongTien += thanhTien;
            
            htmlSach += '<tr>';
            htmlSach += '<td>' + (i + 1) + '</td>';
            htmlSach += '<td>' + s.maSach + '</td>';
            htmlSach += '<td>' + s.tenSach + '</td>';
            htmlSach += '<td>' + s.soLuong + '</td>';
            htmlSach += '<td>' + formatTien(s.giaNhap) + 'đ</td>';
            htmlSach += '<td>' + formatTien(thanhTien) + 'đ</td>';
            htmlSach += '</tr>';
        }
        document.getElementById('danhSachSachIn').innerHTML = htmlSach;
        
        // Lấy tổng tiền lưu sẵn hoặc tự tính lại
        var tongHienThi = phieu.tongTien ? phieu.tongTien : tongTien;
        document.getElementById('tongTienIn').innerHTML = 'TỔNG CỘNG: ' + formatTien(tongHienThi) + 'đ';
    } else {
        document.body.innerHTML = '<p style="text-align: center; color: red; margin-top: 50px; font-size: 20px;">Không tìm thấy phiếu nhập để in!</p>';
    }
}
// ==========================================
// PHẦN 12: CHỨC NĂNG TẠO PHIẾU NHẬP
// ==========================================
var sachDaChonNhap = []; // Biến lưu mảng sách đang thao tác

function khoiTaoTaoPhieuNhap() {
    sachDaChonNhap = []; // Reset mảng mỗi khi vào trang
    
    var inputNgay = document.getElementById('ngayNhap');
    if (inputNgay) inputNgay.valueAsDate = new Date();
    
    // Load danh sách nhà cung cấp vào dropdown
    var ncc = JSON.parse(localStorage.getItem('danhSachNCC') || '[]');
    var html = '<option value="">-- Chọn nhà cung cấp --</option>';
    for (var i = 0; i < ncc.length; i++) {
        html += '<option value="' + ncc[i].maNCC + '">' + ncc[i].tenNCC + '</option>';
    }
    var selectNCC = document.getElementById('ncc');
    if (selectNCC) selectNCC.innerHTML = html;
    
    // Tạo mã phiếu tự động
    var phieuNhap = JSON.parse(localStorage.getItem('phieuNhapKho') || '[]');
    var maPhieu = 'PN' + String(phieuNhap.length + 1).padStart(3, '0');
    var labelMaPhieu = document.getElementById('maPhieu');
    if (labelMaPhieu) labelMaPhieu.innerText = maPhieu;
}

function themSachNhap() {
    var keyword = document.getElementById('timSach').value.trim().toLowerCase();
    if (keyword === '') {
        alert('Vui lòng nhập mã hoặc tên sách!');
        return;
    }
    
    var danhSachSach = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    var timThay = null;
    
    for (var i = 0; i < danhSachSach.length; i++) {
        if (danhSachSach[i].maSach.toLowerCase() === keyword || 
            danhSachSach[i].tenSach.toLowerCase().indexOf(keyword) !== -1) {
            timThay = danhSachSach[i];
            break;
        }
    }
    
    if (!timThay) {
        alert('Không tìm thấy sách!');
        return;
    }
    
    for (var j = 0; j < sachDaChonNhap.length; j++) {
        if (sachDaChonNhap[j].maSach === timThay.maSach) {
            alert('Sách này đã được thêm vào phiếu!');
            return;
        }
    }
    
    sachDaChonNhap.push({
        maSach: timThay.maSach,
        tenSach: timThay.tenSach,
        soLuong: 1,
        giaNhap: timThay.giaNhap || 100000
    });
    
    document.getElementById('timSach').value = '';
    hienThiDanhSachSachNhap();
}

function hienThiDanhSachSachNhap() {
    var tbody = document.getElementById('danhSachSachNhap');
    if (!tbody) return;

    if (sachDaChonNhap.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: #999;">Chưa có sách nào</td></tr>';
        tinhTongNhap();
        return;
    }
    
    var html = '';
    for (var i = 0; i < sachDaChonNhap.length; i++) {
        var s = sachDaChonNhap[i];
        var thanhTien = s.soLuong * s.giaNhap;
        
        html += '<tr>';
        html += '<td>' + (i + 1) + '</td>';
        html += '<td>' + s.maSach + '</td>';
        html += '<td>' + s.tenSach + '</td>';
        html += '<td><input type="number" value="' + s.soLuong + '" min="1" style="width: 80px;" onchange="capNhatSoLuongNhap(' + i + ', this.value)"></td>';
        html += '<td><input type="number" value="' + s.giaNhap + '" min="0" style="width: 120px;" onchange="capNhatGiaNhap(' + i + ', this.value)"></td>';
        html += '<td style="font-weight: bold; color: #16a34a;">' + formatTien(thanhTien) + 'đ</td>';
        html += '<td><button onclick="xoaSachNhap(' + i + ')" class="btn-danger">🗑️</button></td>';
        html += '</tr>';
    }
    
    tbody.innerHTML = html;
    tinhTongNhap();
}

function capNhatSoLuongNhap(index, value) {
    sachDaChonNhap[index].soLuong = parseInt(value) || 1;
    hienThiDanhSachSachNhap();
}

function capNhatGiaNhap(index, value) {
    sachDaChonNhap[index].giaNhap = parseInt(value) || 0;
    hienThiDanhSachSachNhap();
}

function xoaSachNhap(index) {
    if (confirm('Xóa sách này khỏi phiếu?')) {
        sachDaChonNhap.splice(index, 1);
        hienThiDanhSachSachNhap();
    }
}

function tinhTongNhap() {
    var tongTienHang = 0;
    for (var i = 0; i < sachDaChonNhap.length; i++) {
        tongTienHang += sachDaChonNhap[i].soLuong * sachDaChonNhap[i].giaNhap;
    }
    
    var vat = Math.round(tongTienHang * 0.1);
    var elChietKhau = document.getElementById('chietKhau');
    var chietKhau = elChietKhau ? (parseInt(elChietKhau.value) || 0) : 0;
    var giamGia = Math.round((tongTienHang + vat) * chietKhau / 100);
    var tongThanhToan = tongTienHang + vat - giamGia;
    
    if (document.getElementById('tongTienHang')) document.getElementById('tongTienHang').innerText = formatTien(tongTienHang) + 'đ';
    if (document.getElementById('vat')) document.getElementById('vat').innerText = formatTien(vat) + 'đ';
    if (document.getElementById('giamGia')) document.getElementById('giamGia').innerText = formatTien(giamGia) + 'đ';
    if (document.getElementById('tongThanhToan')) document.getElementById('tongThanhToan').innerText = formatTien(tongThanhToan) + 'đ';
}

function xacNhanNhapKho() {
    var ncc = document.getElementById('ncc').value;
    if (ncc === '') {
        alert('Vui lòng chọn nhà cung cấp!');
        return;
    }
    
    if (sachDaChonNhap.length === 0) {
        alert('Vui lòng thêm ít nhất 1 sách vào phiếu!');
        return;
    }
    
    if (!confirm('Xác nhận lưu phiếu nhập kho?')) {
        return;
    }
    
    // Tính lại tổng tiền lần cuối cho chắc
    var tongTienHang = 0;
    for (var i = 0; i < sachDaChonNhap.length; i++) {
        tongTienHang += sachDaChonNhap[i].soLuong * sachDaChonNhap[i].giaNhap;
    }
    var vat = Math.round(tongTienHang * 0.1);
    var chietKhau = parseInt(document.getElementById('chietKhau').value) || 0;
    var giamGia = Math.round((tongTienHang + vat) * chietKhau / 100);
    var tongThanhToan = tongTienHang + vat - giamGia;
    
    // Tìm tên Nhà cung cấp
    var danhSachNCC = JSON.parse(localStorage.getItem('danhSachNCC') || '[]');
    var tenNCC = '';
    for (var j = 0; j < danhSachNCC.length; j++) {
        if (danhSachNCC[j].maNCC === ncc) {
            tenNCC = danhSachNCC[j].tenNCC;
            break;
        }
    }
    
    // Lưu phiếu
    var phieuNhap = JSON.parse(localStorage.getItem('phieuNhapKho') || '[]');
    phieuNhap.push({
        maPhieu: document.getElementById('maPhieu').innerText,
        ngayNhap: document.getElementById('ngayNhap').value,
        maNCC: ncc,
        tenNCC: tenNCC,
        danhSachSach: sachDaChonNhap,
        tongTien: tongThanhToan,
        nguoiNhap: localStorage.getItem('currentAdmin') || 'Admin'
    });
    localStorage.setItem('phieuNhapKho', JSON.stringify(phieuNhap));
    
    // Cộng tồn kho vào danh sách sách
    var danhSachSach = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    for (var k = 0; k < sachDaChonNhap.length; k++) {
        for (var m = 0; m < danhSachSach.length; m++) {
            if (danhSachSach[m].maSach === sachDaChonNhap[k].maSach) {
                // Đảm bảo dữ liệu tồn kho là số
                danhSachSach[m].soLuongCon = (parseInt(danhSachSach[m].soLuongCon) || 0) + sachDaChonNhap[k].soLuong;
                danhSachSach[m].soLuongTong = (parseInt(danhSachSach[m].soLuongTong) || 0) + sachDaChonNhap[k].soLuong;
                // Cập nhật lại giá nhập mới nhất
                danhSachSach[m].giaNhap = sachDaChonNhap[k].giaNhap;
                break;
            }
        }
    }
    localStorage.setItem('danhSachSach', JSON.stringify(danhSachSach));
    
    alert('✅ Nhập kho thành công!');
    window.location.href = 'nhap-kho-danh-sach.html';
}
// ==========================================
// PHẦN 13: CHỨC NĂNG SỬA SÁCH
// ==========================================
var sachDangSuaHT = null; 

// --- HÀM MỚI: Ẩn/hiện ô nhập Thể loại khác (Trang Sửa) ---
function hienThiTheLoaiKhacSua(giaTri) {
    var inputKhac = document.getElementById('theLoaiKhacSua');
    if (giaTri === 'Khác') {
        inputKhac.style.display = 'block';
    } else {
        inputKhac.style.display = 'none';
        inputKhac.value = ''; 
    }
}
// ---------------------------------------------------------

function taiDanhSachSachSua() {
    var ds = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    var tbody = document.getElementById('tbodySachSua');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    if (ds.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #999;">Kho chưa có sách nào</td></tr>';
        return;
    }
    
    for (var i = 0; i < ds.length; i++) {
        var s = ds[i];
        var tr = document.createElement('tr');
        tr.innerHTML = '<td>' + s.maSach + '</td><td>' + s.tenSach + '</td><td>' + s.tacGia + '</td><td>' + (s.theLoai || 'CNTT') + '</td><td>' + s.soLuongCon + '/' + s.soLuongTong + '</td>';
        tr.style.cursor = 'pointer';
        tr.title = "Click để sửa sách này";
        tr.onclick = (function(sach) { return function() { hienThiFormSua(sach); }; })(s);
        tbody.appendChild(tr);
    }
}

function timSachSua() {
    var tim = document.getElementById('timMaSua').value.trim().toLowerCase();
    if (!tim) { alert('Vui lòng nhập mã hoặc tên sách!'); return; }
    
    var ds = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    var found = null;
    for (var i = 0; i < ds.length; i++) {
        if (ds[i].maSach.toLowerCase() === tim || ds[i].tenSach.toLowerCase().indexOf(tim) >= 0) {
            found = ds[i]; break;
        }
    }
    
    if (!found) { 
        alert('Không tìm thấy sách phù hợp!'); 
        return; 
    }
    hienThiFormSua(found);
}

function hienThiFormSua(s) {
    sachDangSuaHT = s;
    document.getElementById('maSachSua').value = s.maSach;
    document.getElementById('tenSachSua').value = s.tenSach;
    document.getElementById('tacGiaSua').value = s.tacGia;
    document.getElementById('nxbSua').value = s.nxb || '';
    document.getElementById('namXBSua').value = s.namXB || '';
    document.getElementById('isbnSua').value = s.isbn || '';
    document.getElementById('soLuongTongSua').value = s.soLuongTong;
    document.getElementById('soLuongConSua').value = s.soLuongCon;
    document.getElementById('giaNhapSua').value = s.giaNhap;
    document.getElementById('giaBTSua').value = s.giaBT || s.giaNhap;
    document.getElementById('viTriSua').value = s.viTri || '';
    document.getElementById('moTaSua').value = s.moTa || '';
    

    var theLoaiSelect = document.getElementById('theLoaiSua');
    var theLoaiInput = document.getElementById('theLoaiKhacSua');
    var isNhomChuan = false;
    
    for (var i = 0; i < theLoaiSelect.options.length; i++) {
        if (theLoaiSelect.options[i].value === s.theLoai) {
            isNhomChuan = true;
            break;
        }
    }
    if (isNhomChuan) {
        theLoaiSelect.value = s.theLoai;
        theLoaiInput.style.display = 'none';
        theLoaiInput.value = '';
    } 
    else {
        theLoaiSelect.value = 'Khác';
        theLoaiInput.style.display = 'block';
        theLoaiInput.value = s.theLoai; 
    }
    
    document.getElementById('formSuaSach').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
}

function capNhatSachSua() {
    if (!sachDangSuaHT) return;
    
    var tenMoi = document.getElementById('tenSachSua').value.trim();
    var tacGiaMoi = document.getElementById('tacGiaSua').value.trim();
    if (!tenMoi || !tacGiaMoi) {
        alert("Tên sách và tác giả không được để trống!");
        return;
    }
    var theLoaiMoi = document.getElementById('theLoaiSua').value;
    if (theLoaiMoi === 'Khác') {
        theLoaiMoi = document.getElementById('theLoaiKhacSua').value.trim();
        if (!theLoaiMoi) {
            alert('Vui lòng nhập tên thể loại!');
            return;
        }
    }
    var ds = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    for (var i = 0; i < ds.length; i++) {
        if (ds[i].maSach === sachDangSuaHT.maSach) {
            ds[i].tenSach = tenMoi;
            ds[i].tacGia = tacGiaMoi;
            ds[i].nxb = document.getElementById('nxbSua').value.trim();
            ds[i].namXB = parseInt(document.getElementById('namXBSua').value) || ds[i].namXB;
            ds[i].isbn = document.getElementById('isbnSua').value.trim();
            ds[i].theLoai = theLoaiMoi; // Lưu thể loại đã xử lý (có sẵn hoặc tự gõ)
            ds[i].soLuongTong = parseInt(document.getElementById('soLuongTongSua').value) || ds[i].soLuongTong;
            ds[i].soLuongCon = parseInt(document.getElementById('soLuongConSua').value) || ds[i].soLuongCon;
            ds[i].giaNhap = parseInt(document.getElementById('giaNhapSua').value) || ds[i].giaNhap;
            ds[i].giaBT = parseInt(document.getElementById('giaBTSua').value) || ds[i].giaBT;
            ds[i].viTri = document.getElementById('viTriSua').value.trim();
            ds[i].moTa = document.getElementById('moTaSua').value.trim();
            break;
        }
    }
    
    localStorage.setItem('danhSachSach', JSON.stringify(ds));
    alert('✅ Cập nhật sách thành công!');
    huySuaSach();
    taiDanhSachSachSua();
}

function xoaSachSua() {
    if (!sachDangSuaHT) return;
    if (!confirm('Bạn có chắc chắn muốn xóa sách "' + sachDangSuaHT.tenSach + '" hoàn toàn khỏi kho?')) return;
    
    var ds = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    var moi = [];
    for (var i = 0; i < ds.length; i++) {
        if (ds[i].maSach !== sachDangSuaHT.maSach) moi.push(ds[i]);
    }
    
    localStorage.setItem('danhSachSach', JSON.stringify(moi));
    alert('✅ Đã xóa sách!');
    huySuaSach();
    taiDanhSachSachSua();
}

function huySuaSach() {
    sachDangSuaHT = null;
    document.getElementById('formSuaSach').style.display = 'none';
    document.getElementById('timMaSua').value = '';
}
// ==========================================
// PHẦN 14: CHỨC NĂNG THÊM SÁCH
// ==========================================
function hienThiTheLoaiKhac(giaTri) {
    var inputKhac = document.getElementById('theLoaiKhacThem');
    if (giaTri === 'Khác') {
        inputKhac.style.display = 'block';
        inputKhac.required = true; // Bắt buộc nhập
    } else {
        inputKhac.style.display = 'none';
        inputKhac.required = false;
        inputKhac.value = ''; // Xóa rác
    }
}
// ------------------------------

function sinhMaSachMoi() {
    var ds = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    var maxSo = 0;
    for (var i = 0; i < ds.length; i++) {
        var ma = ds[i].maSach || '';
        if (ma.startsWith('S')) {
            var so = parseInt(ma.substring(1)) || 0;
            if (so > maxSo) maxSo = so;
        }
    }
    var so = maxSo + 1;
    return 'S' + (so < 10 ? '00' + so : so < 100 ? '0' + so : '' + so);
}

function khoiTaoFormThemSach() {
    var elMaSach = document.getElementById('maSachThem');
    if (elMaSach) {
        elMaSach.value = sinhMaSachMoi();
    }
}

function luuSachMoi() {
    var tenSach = document.getElementById('tenSachThem').value.trim();
    var tacGia = document.getElementById('tacGiaThem').value.trim();
    var nxb = document.getElementById('nxbThem').value.trim();
    var soLuong = parseInt(document.getElementById('soLuongThem').value) || 0;
    var giaNhap = parseInt(document.getElementById('giaNhapThem').value) || 0;
    var giaBT = parseInt(document.getElementById('giaBTThem').value) || 0;
    var theLoai = document.getElementById('theLoaiThem').value;
    if (theLoai === 'Khác') {
        theLoai = document.getElementById('theLoaiKhacThem').value.trim();
        if (!theLoai) {
            alert('Vui lòng nhập tên thể loại mới!');
            return;
        }
    }
    // ----------------------------------------------------

    var sach = {
        maSach: document.getElementById('maSachThem').value,
        tenSach: tenSach,
        tacGia: tacGia,
        nxb: nxb,
        namXB: parseInt(document.getElementById('namXBThem').value) || new Date().getFullYear(),
        theLoai: theLoai, // Lấy giá trị đã được xử lý ở trên
        isbn: document.getElementById('isbnThem').value.trim(),
        soTrang: parseInt(document.getElementById('soTrangThem').value) || 0,
        ngonNgu: document.getElementById('ngonNguThem').value,
        soLuongTong: soLuong,
        soLuongCon: soLuong, 
        giaNhap: giaNhap,
        giaBT: giaBT,
        viTri: document.getElementById('viTriThem').value.trim(),
        moTa: document.getElementById('moTaThem').value.trim()
    };

    var ds = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    ds.push(sach);
    localStorage.setItem('danhSachSach', JSON.stringify(ds));

    alert('✅ Đã thêm sách mới thành công!\nMã sách: ' + sach.maSach);
    
    // Xóa trắng form để nhập tiếp
    document.getElementById('tenSachThem').value = '';
    document.getElementById('tacGiaThem').value = '';
    document.getElementById('nxbThem').value = '';
    document.getElementById('namXBThem').value = '';
    document.getElementById('isbnThem').value = '';
    document.getElementById('soTrangThem').value = '';
    document.getElementById('soLuongThem').value = '';
    document.getElementById('giaNhapThem').value = '';
    document.getElementById('giaBTThem').value = '';
    document.getElementById('viTriThem').value = '';
    document.getElementById('moTaThem').value = '';
    
    // --- THÊM CHỖ NÀY: Trả Thể loại về mặc định sau khi lưu xong ---
    document.getElementById('theLoaiThem').value = 'CNTT';
    var inputKhac = document.getElementById('theLoaiKhacThem');
    if(inputKhac) {
        inputKhac.style.display = 'none';
        inputKhac.value = '';
    }
    // ---------------------------------------------------------------
    
    // Tạo mã mới cho cuốn sách tiếp theo
    document.getElementById('maSachThem').value = sinhMaSachMoi();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// PHẦN 15: CHỨC NĂNG THỐNG KÊ TỒN KHO
// ==========================================
function khoiTaoThongKeTonKho() {
    var inputThoiDiem = document.getElementById('thoiDiemThongKe');
    if (inputThoiDiem) inputThoiDiem.valueAsDate = new Date();
    xemThongKeTonKho();
}

function xemThongKeTonKho() {
    var sach = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    
    // 1. Tính toán Tổng quan
    var tongSoSach = 0;
    var tongGiaTri = 0;
    var soLoaiSach = sach.length;
    
    for (var i = 0; i < sach.length; i++) {
        tongSoSach += parseInt(sach[i].soLuongCon) || 0;
        tongGiaTri += (parseInt(sach[i].soLuongCon) || 0) * (parseInt(sach[i].giaNhap) || 0);
    }
    
    var htmlTongQuan = '';
    htmlTongQuan += '<div style="font-size: 16px;"><strong>📚 Tổng số sách trong kho:</strong> <span style="color: #16a34a; font-size: 20px;">' + tongSoSach + '</span> cuốn</div>';
    htmlTongQuan += '<div style="font-size: 16px;"><strong>📖 Số đầu sách khác nhau:</strong> <span style="color: #3b82f6; font-size: 20px;">' + soLoaiSach + '</span> loại</div>';
    htmlTongQuan += '<div style="font-size: 16px;"><strong>💰 Tổng giá trị tồn kho:</strong> <strong style="color: #ef4444; font-size: 20px;">' + formatTien(tongGiaTri) + 'đ</strong></div>';
    document.getElementById('tongQuanKho').innerHTML = htmlTongQuan;
    
    // 2. Thống kê theo Thể loại
    var thongKeTheLoai = {};
    for (var j = 0; j < sach.length; j++) {
        var theLoai = sach[j].theLoai || 'Khác';
        if (!thongKeTheLoai[theLoai]) {
            thongKeTheLoai[theLoai] = { soLuong: 0, giaTri: 0 };
        }
        thongKeTheLoai[theLoai].soLuong += parseInt(sach[j].soLuongCon) || 0;
        thongKeTheLoai[theLoai].giaTri += (parseInt(sach[j].soLuongCon) || 0) * (parseInt(sach[j].giaNhap) || 0);
    }
    
    var htmlTheLoai = '';
    for (var tl in thongKeTheLoai) {
        var tyLe = tongSoSach > 0 ? (thongKeTheLoai[tl].soLuong / tongSoSach * 100).toFixed(1) : 0;
        htmlTheLoai += '<tr>';
        htmlTheLoai += '<td style="font-weight: bold;">' + tl + '</td>';
        htmlTheLoai += '<td>' + thongKeTheLoai[tl].soLuong + '</td>';
        htmlTheLoai += '<td>' + formatTien(thongKeTheLoai[tl].giaTri) + 'đ</td>';
        htmlTheLoai += '<td><div style="background: #e2e8f0; border-radius: 10px; width: 100%; height: 8px; margin-bottom: 5px;"><div style="background: #16a34a; width: ' + tyLe + '%; height: 100%; border-radius: 10px;"></div></div>' + tyLe + '%</td>';
        htmlTheLoai += '</tr>';
    }
    
    if (htmlTheLoai === '') htmlTheLoai = '<tr><td colspan="4" style="text-align: center;">Chưa có dữ liệu sách trong kho</td></tr>';
    document.getElementById('thongKeTheLoaiKho').innerHTML = htmlTheLoai;
    
    // 3. Phân tích Cảnh báo
    var htmlSapHet = '';
    var htmlTonDong = '';
    var demSapHet = 0;
    var demTonDong = 0;

    for (var k = 0; k < sach.length; k++) {
        var sl = parseInt(sach[k].soLuongCon) || 0;
        if (sl < 5 && sl > 0) {
            htmlSapHet += '<div style="padding: 3px 0;">• ' + sach[k].tenSach + ' (Mã: ' + sach[k].maSach + ') - Còn: <strong>' + sl + '</strong></div>';
            demSapHet++;
        } else if (sl > 100) {
            htmlTonDong += '<div style="padding: 3px 0;">• ' + sach[k].tenSach + ' (Mã: ' + sach[k].maSach + ') - Tồn: <strong>' + sl + '</strong></div>';
            demTonDong++;
        }
    }
    
    if (demSapHet === 0) htmlSapHet = '<span style="color: #16a34a;">✅ Kho an toàn, không có sách sắp hết.</span>';
    if (demTonDong === 0) htmlTonDong = '<span style="color: #16a34a;">✅ Không có đầu sách nào bị tồn đọng quá nhiều.</span>';
    
    document.getElementById('sachSapHetKho').innerHTML = htmlSapHet;
    document.getElementById('sachTonDongKho').innerHTML = htmlTonDong;
}
// ==========================================
// PHẦN 16: DANH SÁCH PHIẾU XUẤT
// ==========================================
function loadDanhSachPhieuXuat() {
    var phieuXuat = JSON.parse(localStorage.getItem('phieuXuatKho') || '[]');
    var html = '';
    
    if (phieuXuat.length === 0) {
        html = '<tr><td colspan="7" style="text-align: center;">Chưa có phiếu xuất nào</td></tr>';
    } else {
        // Lặp từ cuối lên đầu để phiếu mới nhất hiển thị trên cùng
        for (var i = phieuXuat.length - 1; i >= 0; i--) {
            var p = phieuXuat[i];
            html += '<tr>';
            html += '<td>' + p.maPhieu + '</td>';
            html += '<td>' + p.ngayXuat + '</td>';
            html += '<td>' + p.lyDo + '</td>';
            html += '<td>' + (p.danhSachSach ? p.danhSachSach.length : 0) + '</td>';
            html += '<td><strong style="color: #ef4444;">' + formatTien(p.tongTien || 0) + 'đ</strong></td>';
            html += '<td>' + p.nguoiXuat + '</td>';
            html += '<td>';
            html += '<button onclick="xemChiTietPhieuXuat(' + i + ')" class="btn-primary">👁️ Xem</button> ';
            html += '<button onclick="inPhieuXuat(' + i + ')" style="background-color: #f59e0b;">🖨️ In</button>';
            html += '</td>';
            html += '</tr>';
        }
    }
    
    var tbody = document.getElementById('danhSachPhieuXuat');
    if (tbody) tbody.innerHTML = html;
}

function xemChiTietPhieuXuat(index) {
    var phieuXuat = JSON.parse(localStorage.getItem('phieuXuatKho') || '[]');
    var p = phieuXuat[index];
    if (!p) return;
    
    var thongTin = '📋 CHI TIẾT PHIẾU XUẤT\n\n';
    thongTin += 'Mã phiếu: ' + p.maPhieu + '\n';
    thongTin += 'Ngày lập: ' + p.ngayXuat + '\n';
    thongTin += 'Lý do xuất: ' + p.lyDo + '\n';
    thongTin += 'Người xuất: ' + p.nguoiXuat + '\n\n';
    thongTin += '📦 DANH SÁCH SÁCH XUẤT:\n';
    
    if (p.danhSachSach && p.danhSachSach.length > 0) {
        for (var i = 0; i < p.danhSachSach.length; i++) {
            var s = p.danhSachSach[i];
            thongTin += (i + 1) + '. ' + s.tenSach + ' | SL: ' + s.soLuong + '\n';
        }
    } else {
        thongTin += '(Không có sách nào)\n';
    }
    
    if (p.tongTien) {
        thongTin += '\n💰 TỔNG TIỀN XUẤT: ' + formatTien(p.tongTien) + 'đ';
    }
    
    alert(thongTin);
}

function inPhieuXuat(index) {
    localStorage.setItem('phieuXuatHienTai', index);
    window.open('xuat-kho-in.html', '_blank');
}
// ==========================================
// PHẦN 17: CHỨC NĂNG IN PHIẾU XUẤT
// ==========================================
function loadDuLieuInPhieuXuat() {
    var phieuIndex = localStorage.getItem('phieuXuatHienTai');
    var phieuXuat = JSON.parse(localStorage.getItem('phieuXuatKho') || '[]');
    
    if (phieuIndex !== null && phieuXuat[phieuIndex]) {
        var phieu = phieuXuat[phieuIndex];
        
        var htmlInfo = '';
        htmlInfo += '<div><strong>Mã phiếu:</strong> ' + phieu.maPhieu + '</div>';
        htmlInfo += '<div><strong>Ngày xuất:</strong> ' + phieu.ngayXuat + '</div>';
        htmlInfo += '<div><strong>Lý do:</strong> ' + phieu.lyDo + '</div>';
        if (phieu.ghiChu) {
            htmlInfo += '<div><strong>Ghi chú:</strong> ' + phieu.ghiChu + '</div>';
        }
        htmlInfo += '<div><strong>Người xuất:</strong> ' + phieu.nguoiXuat + '</div>';
        document.getElementById('thongTinPhieuXuatIn').innerHTML = htmlInfo;
        
        var htmlSach = '';
        for (var i = 0; i < phieu.danhSachSach.length; i++) {
            var s = phieu.danhSachSach[i];
            htmlSach += '<tr>';
            htmlSach += '<td>' + (i + 1) + '</td>';
            htmlSach += '<td>' + s.maSach + '</td>';
            htmlSach += '<td>' + s.tenSach + '</td>';
            htmlSach += '<td>' + s.soLuong + '</td>';
            htmlSach += '</tr>';
        }
        document.getElementById('danhSachSachXuatIn').innerHTML = htmlSach;
    } else {
        document.body.innerHTML = '<p style="text-align: center; color: red; margin-top: 50px; font-size: 20px;">Không tìm thấy phiếu xuất để in!</p>';
    }
}
// ==========================================
// PHẦN 18: CHỨC NĂNG TẠO PHIẾU XUẤT
// ==========================================
var danhSachSachDaChonXuat = [];

function khoiTaoTaoPhieuXuat() {
    danhSachSachDaChonXuat = [];
    var inputNgay = document.getElementById('ngayXuat');
    if (inputNgay) inputNgay.valueAsDate = new Date();
    
    // Tạo mã phiếu tự động
    var phieuXuat = JSON.parse(localStorage.getItem('phieuXuatKho') || '[]');
    var maPhieu = 'PX' + String(phieuXuat.length + 1).padStart(3, '0');
    var labelMa = document.getElementById('maPhieuXuat');
    if (labelMa) labelMa.innerText = maPhieu;
}

function themSachVaoPhieuXuat() {
    var keyword = document.getElementById('timSachXuat').value.trim().toLowerCase();
    if (!keyword) { alert('Vui lòng nhập mã hoặc tên sách!'); return; }
    
    var dsSach = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    var timThay = dsSach.find(s => s.maSach.toLowerCase() === keyword || s.tenSach.toLowerCase().includes(keyword));
    
    if (!timThay) { alert('Không tìm thấy sách trong kho!'); return; }
    if (parseInt(timThay.soLuongCon) <= 0) { alert('Sách này đã hết trong kho, không thể xuất!'); return; }
    
    if (danhSachSachDaChonXuat.some(s => s.maSach === timThay.maSach)) {
        alert('Sách này đã có trong phiếu xuất!');
        return;
    }
    
    danhSachSachDaChonXuat.push({
        maSach: timThay.maSach,
        tenSach: timThay.tenSach,
        tonKho: parseInt(timThay.soLuongCon),
        soLuong: 1
    });
    
    document.getElementById('timSachXuat').value = '';
    hienThiTableSachXuat();
}

function hienThiTableSachXuat() {
    var tbody = document.getElementById('danhSachSachXuatTable');
    if (!tbody) return;

    if (danhSachSachDaChonXuat.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #999;">Chưa có sách nào được chọn</td></tr>';
        return;
    }
    
    var html = '';
    danhSachSachDaChonXuat.forEach((s, index) => {
        html += `<tr>
            <td>${index + 1}</td>
            <td>${s.maSach}</td>
            <td>${s.tenSach}</td>
            <td><strong>${s.tonKho}</strong></td>
            <td><input type="number" value="${s.soLuong}" min="1" max="${s.tonKho}" style="width: 80px;" onchange="capNhatSLXuat(${index}, this.value)"></td>
            <td><button onclick="xoaSachKhoiPhieuXuat(${index})" class="btn-danger">🗑️</button></td>
        </tr>`;
    });
    tbody.innerHTML = html;
}

function capNhatSLXuat(index, val) {
    var sl = parseInt(val) || 1;
    if (sl > danhSachSachDaChonXuat[index].tonKho) {
        alert('Số lượng xuất không được vượt quá số lượng tồn!');
        danhSachSachDaChonXuat[index].soLuong = danhSachSachDaChonXuat[index].tonKho;
    } else {
        danhSachSachDaChonXuat[index].soLuong = sl;
    }
    hienThiTableSachXuat();
}

function xoaSachKhoiPhieuXuat(index) {
    danhSachSachDaChonXuat.splice(index, 1);
    hienThiTableSachXuat();
}

function xacNhanLuuPhieuXuat() {
    if (danhSachSachDaChonXuat.length === 0) { alert('Vui lòng chọn ít nhất 1 sách!'); return; }
    if (!confirm('Xác nhận xuất kho? Số lượng tồn kho của các sách này sẽ bị giảm!')) return;
    
    var phieuXuat = JSON.parse(localStorage.getItem('phieuXuatKho') || '[]');
    phieuXuat.push({
        maPhieu: document.getElementById('maPhieuXuat').innerText,
        ngayXuat: document.getElementById('ngayXuat').value,
        lyDo: document.getElementById('lyDoXuat').value,
        ghiChu: document.getElementById('ghiChuXuat').value,
        danhSachSach: danhSachSachDaChonXuat,
        nguoiXuat: localStorage.getItem('currentAdmin') || 'Admin'
    });
    localStorage.setItem('phieuXuatKho', JSON.stringify(phieuXuat));
    
    // Cập nhật tồn kho
    var dsSach = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    danhSachSachDaChonXuat.forEach(itemXuat => {
        var sInKho = dsSach.find(s => s.maSach === itemXuat.maSach);
        if (sInKho) {
            sInKho.soLuongCon = Math.max(0, parseInt(sInKho.soLuongCon) - itemXuat.soLuong);
        }
    });
    localStorage.setItem('danhSachSach', JSON.stringify(dsSach));
    
    alert('✅ Xuất kho thành công!');
    window.location.href = 'xuat-kho-danh-sach.html';
}

// ==========================================
// PHẦN 4: BỘ ĐIỀU CHUYỂN (ROUTER CHẠY CODE)
// ==========================================
// Hàm này tự động chạy khi trang HTML load xong
window.onload = function() {
    kiemTraDangNhapChung(); // Trang nào cũng cần check đăng nhập

    // Nếu trình duyệt thấy có ID 'tbodyBienMuc' -> Đang ở trang Biên Mục
    if (document.getElementById('tbodyBienMuc')) {
        taiDanhSach();
    }

    // Nếu trình duyệt thấy có ID 'tongSach' -> Đang ở trang Dashboard
    if (document.getElementById('tongSach')) {
        taiThongKe();
    }
    // Nếu trình duyệt thấy có ID 'danhSachSachInTem' -> Đang ở trang In Tem
    if (document.getElementById('danhSachSachInTem')) {
        loadDanhSachInTem();
    }
    // kiểm kê
    if (document.getElementById('ngayKiemKe')) {
        khoiTaoKiemKe();
    }
    // phieu nhap
    if (document.getElementById('loaiPhieu')) {
        xemTatCaLichSu();
    }
    // Nếu trình duyệt thấy có ô nhập mật khẩu -> Đang ở trang Đăng nhập
    var pwInput = document.getElementById('password');
    if (pwInput) {
        khoiTaoDuLieu();
        // Cho phép nhấn Enter để đăng nhập
        pwInput.addEventListener('keypress', function(e) {
            if (e.keyCode === 13) dangNhap();
        });
    }
    // Nếu trình duyệt thấy có bảng 'danhSachNCC' -> Đang ở trang DS Nhà cung cấp
    if (document.getElementById('danhSachNCC')) {
        loadDanhSachNCC();
    }
    // Nếu trình duyệt thấy có form 'formNCC' -> Đang ở trang Thêm/Sửa NCC
    if (document.getElementById('formNCC')) {
        khoiTaoFormNCC();
    }
    // Nếu trình duyệt thấy có bảng 'danhSachPhieuNhap' -> Đang ở trang DS Phiếu nhập
    if (document.getElementById('danhSachPhieuNhap')) {
        loadDanhSachPhieuNhap();
    }
    // Nếu có ID 'danhSachSachIn' -> Đang ở trang In phiếu nhập
    if (document.getElementById('danhSachSachIn')) {
        loadDuLieuInPhieu();
    }
    // Nếu có ô tìm sách và mã phiếu -> Đang ở trang Tạo phiếu nhập
    if (document.getElementById('timSach') && document.getElementById('maPhieu')) {
        khoiTaoTaoPhieuNhap();
    }
    // Nếu có bảng 'tbodySachSua' -> Đang ở trang Sửa Sách
    if (document.getElementById('tbodySachSua')) {
        taiDanhSachSachSua();
        
        // Tự động load sách từ URL param (nếu có)
        var params = new URLSearchParams(window.location.search);
        var maTu = params.get('ma');
        if (maTu) {
            var ds2 = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
            for (var j = 0; j < ds2.length; j++) {
                if (ds2[j].maSach === maTu) { 
                    hienThiFormSua(ds2[j]); 
                    break; 
                }
            }
        }
    }
    // Nếu có ID 'maSachThem' -> Đang ở trang Thêm sách mới
    if (document.getElementById('maSachThem')) {
        khoiTaoFormThemSach();
    }
    // Nếu có ID 'thoiDiemThongKe' -> Đang ở trang Thống kê tồn kho
    if (document.getElementById('thoiDiemThongKe')) {
        khoiTaoThongKeTonKho();
    }
    // Nếu có ID 'danhSachPhieuXuat' -> Đang ở trang DS Phiếu Xuất
    if (document.getElementById('danhSachPhieuXuat')) {
        loadDanhSachPhieuXuat();
    }
    // Nếu có ID 'danhSachSachXuatIn' -> Đang ở trang In phiếu xuất
    if (document.getElementById('danhSachSachXuatIn')) {
        loadDuLieuInPhieuXuat();
    }
    // Nếu có ID 'maPhieuXuat' -> Đang ở trang Tạo phiếu xuất
    if (document.getElementById('maPhieuXuat')) {
        khoiTaoTaoPhieuXuat();
    }
    // Nếu trình duyệt thấy có form 'formTaiKhoan' -> Đang ở trang Quản lý tài khoản
    if (document.getElementById('formTaiKhoan')) {
        khoiTaoTaiKhoan();
    }
};
// Hàm hiển thị gợi ý khi gõ
function goiYSach(tuKhoa) {
    var box = document.getElementById('boxGoiY');
    tuKhoa = tuKhoa.trim().toLowerCase();
    if (tuKhoa === '') {
        box.style.display = 'none';
        return;
    }
    box.style.position = 'absolute';
    box.style.top = '75px';
    box.style.left = '0';
    box.style.width = '300px';
    box.style.backgroundColor = '#ffffff'; 
    box.style.border = '1px solid #4CAF50';
    box.style.borderRadius = '4px';
    box.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)'; 
    box.style.maxHeight = '250px';
    box.style.overflowY = 'auto';
    box.style.zIndex = '9999';
    var ds = JSON.parse(localStorage.getItem('danhSachSach') || '[]');
    
    var ketQua = ds.filter(function(s) {
        return s.maSach.toLowerCase().includes(tuKhoa) || s.tenSach.toLowerCase().includes(tuKhoa);
    });

    if (ketQua.length === 0) {
        box.innerHTML = '<div style="padding: 10px; color: #999; text-align: center; background-color: #ffffff;">Không tìm thấy sách</div>';
        box.style.display = 'block';
        return;
    }
    var html = '';
    var soLuongHienThi = Math.min(ketQua.length, 5);
    for (var i = 0; i < soLuongHienThi; i++) {
        var s = ketQua[i];
    
        html += '<div class="goi-y-item" onclick="chonGoiY(\'' + s.maSach + '\')" ' +
                'style="padding: 10px 12px; cursor: pointer; border-bottom: 1px solid #eee; background-color: #ffffff; color: #333; font-size: 14px;" ' +
                'onmouseover="this.style.backgroundColor=\'#e8f5e9\'; this.style.color=\'#16a34a\'; this.style.fontWeight=\'bold\'" ' +
                'onmouseout="this.style.backgroundColor=\'#ffffff\'; this.style.color=\'#333\'; this.style.fontWeight=\'normal\'">';
        html += '<strong>' + s.maSach + '</strong> - ' + s.tenSach;
        html += '</div>';
    }
    
    box.innerHTML = html;
    box.style.display = 'block';
}
function chonGoiY(maSach) {
    document.getElementById('timMa').value = maSach;
    document.getElementById('boxGoiY').style.display = 'none';
    
    timSach();
}
document.addEventListener('click', function(e) {
    var input = document.getElementById('timMa');
    var box = document.getElementById('boxGoiY');
    if (box && e.target !== input && e.target !== box && !box.contains(e.target)) {
        box.style.display = 'none';
    }
});