
// =========================================================
// 1. XỬ LÝ ĐĂNG NHẬP / ĐĂNG XUẤT / KIỂM TRA PHIÊN
// =========================================================

function kiemTraDangNhapChung() {
    var user = localStorage.getItem('currentAdmin');
    var trangHienTai = window.location.pathname.toLowerCase();

    if (!user && !trangHienTai.includes('login.html')) { 
        window.location.href = 'login.html'; 
        return; 
    }
    
    // Nếu chưa đăng nhập nhưng đang ở trang login -> Dừng lại, cho phép đăng nhập
    if (!user) return; 

    // Nếu đã đăng nhập -> Tìm và in tên hiển thị lên header/dashboard
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

function dangNhapSuperAdmin() {
    var u = document.getElementById('username').value.trim();
    var p = document.getElementById('password').value.trim();
    var errMsg = document.getElementById('errMsg');
    var tatCaTaiKhoan = JSON.parse(localStorage.getItem('admins')) || [];

    var userHopLe = tatCaTaiKhoan.find(function(tk) {
        return tk.username === u && tk.password === p && (tk.vaiTro === 'Admin' || tk.role === 'admin');
    });

    if (userHopLe) {
        // Đăng nhập thành công
        errMsg.style.display = 'none';
        localStorage.setItem('currentAdmin', userHopLe.username);
        window.location.href = 'tai-khoan.html'; // Chuyển hướng vào trang quản lý tài khoản
    } else {
        // Đăng nhập thất bại
        errMsg.style.display = 'block';
        document.getElementById('password').value = ''; // Xóa pass cho người dùng nhập lại
    }
}

function dangXuat() {
    localStorage.removeItem('currentAdmin');
    window.location.href = 'login.html'; // Đăng xuất xong thì quay về trang đăng nhập
}


// =========================================================
// 2. MODULE: QUẢN LÝ TÀI KHOẢN (CRUD)
// =========================================================

let idSuaTKHienTai = null;

// Khởi tạo và đổ dữ liệu ra bảng lần đầu
function khoiTaoTaiKhoan() {
    let dsTK = JSON.parse(localStorage.getItem('admins')) || [];
    hienThiDanhSachTK(dsTK);
}

// Hàm vẽ bảng dữ liệu
function hienThiDanhSachTK(data) {
    const tbody = document.getElementById('danhSachTK');
    if (!tbody) return;
    
    tbody.innerHTML = ''; 

    data.forEach((tk, index) => {
        let mauQuyen = '';
        if (tk.vaiTro === 'Admin' || tk.role === 'admin') mauQuyen = 'color: #d9534f; font-weight: bold;';
        else if (tk.vaiTro === 'Thủ kho') mauQuyen = 'color: #4CAF50; font-weight: bold;';
        else mauQuyen = 'color: #2196F3; font-weight: bold;';
        
        let trangThaiHTML = tk.trangThai === 'Hoạt động' ? '🟢 Hoạt động' : '🔴 Đã khóa';
        let nutThaoTac = tk.trangThai === 'Hoạt động' 
            ? `<button type="button" onclick="xoaTK(${tk.id || index})" class="btn-danger btn-action">Khóa</button>`
            : `<button type="button" onclick="moKhoaTK(${tk.id || index})" class="btn-action" style="background: #00BCD4; border: none; padding: 8px 16px; color: white; cursor: pointer;">Mở</button>`;

        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="text-align: center;">${index + 1}</td>
            <td><strong>${tk.username}</strong></td>
            <td>${tk.hoTen || 'Chưa cập nhật'}</td>
            <td style="${mauQuyen}">${tk.vaiTro || tk.role || 'Chưa phân quyền'}</td>
            <td>${trangThaiHTML}</td>
            <td style="text-align: center;">
                <button type="button" onclick="suaTK(${tk.id || index})" class="btn-action" style="background: #f0ad4e; border: none; padding: 8px 16px; color: white; cursor: pointer; margin-right: 5px;">Sửa</button>
                ${nutThaoTac}
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Hàm Thêm mới hoặc Cập nhật tài khoản
function luuTaiKhoan() {
    let dsTK = JSON.parse(localStorage.getItem('admins')) || [];
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value; 
    const hoTen = document.getElementById('hoTen').value.trim();
    const sdtNv = document.getElementById('sdtNv') ? document.getElementById('sdtNv').value : '';
    const emailNv = document.getElementById('emailNv') ? document.getElementById('emailNv').value : '';
    const vaiTro = document.getElementById('vaiTro').value;
    const trangThai = document.getElementById('trangThai').value;

    if (!username || !password) {
        alert('Username và Password không được để trống!');
        return;
    }

    if (idSuaTKHienTai !== null) {
        // TRẠNG THÁI: CẬP NHẬT
        let index = dsTK.findIndex((tk, idx) => (tk.id === idSuaTKHienTai || idx === idSuaTKHienTai));
        if (index !== -1) {
            dsTK[index].username = username;
            if(password) dsTK[index].password = password; 
            dsTK[index].hoTen = hoTen;
            dsTK[index].sdtNv = sdtNv;
            dsTK[index].emailNv = emailNv;
            dsTK[index].vaiTro = vaiTro;
            dsTK[index].role = vaiTro; 
            dsTK[index].trangThai = trangThai;
            alert('Cập nhật tài khoản thành công!');
        }
        idSuaTKHienTai = null; 
    } else {
        // TRẠNG THÁI: THÊM MỚI
        if(dsTK.find(tk => tk.username === username)) {
            alert('Lỗi: Username này đã tồn tại!');
            return;
        }
        const idMoi = dsTK.length > 0 ? Math.max(...dsTK.map(t => t.id || 0)) + 1 : 1;
        dsTK.push({ id: idMoi, username, password, hoTen, sdtNv, emailNv, vaiTro, role: vaiTro, trangThai });
        alert('Thêm tài khoản mới thành công!');
    }

    localStorage.setItem('admins', JSON.stringify(dsTK));
    document.getElementById('formTaiKhoan').reset();
    hienThiDanhSachTK(dsTK);
}

// Hàm đẩy dữ liệu lên form để sửa
function suaTK(idOrIndex) {
    let dsTK = JSON.parse(localStorage.getItem('admins')) || [];
    const tk = dsTK.find((t, idx) => t.id === idOrIndex || idx === idOrIndex);
    
    if (tk) {
        document.getElementById('username').value = tk.username;
        document.getElementById('password').value = tk.password || ''; 
        document.getElementById('hoTen').value = tk.hoTen || '';
        if(document.getElementById('sdtNv')) document.getElementById('sdtNv').value = tk.sdtNv || '';
        if(document.getElementById('emailNv')) document.getElementById('emailNv').value = tk.emailNv || '';
        document.getElementById('vaiTro').value = tk.vaiTro || tk.role || 'Thủ kho';
        document.getElementById('trangThai').value = tk.trangThai || 'Hoạt động';
        
        idSuaTKHienTai = idOrIndex; 
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }
}

// Hàm khóa tài khoản
function xoaTK(idOrIndex) {
    if(confirm("Xác nhận KHÓA tài khoản này? (Tài khoản khóa sẽ không thể đăng nhập)")) {
        let dsTK = JSON.parse(localStorage.getItem('admins')) || [];
        let tk = dsTK.find((t, idx) => t.id === idOrIndex || idx === idOrIndex);
        if(tk) tk.trangThai = 'Khóa';
        localStorage.setItem('admins', JSON.stringify(dsTK));
        hienThiDanhSachTK(dsTK);
    }
}
// Hàm mở khóa tài khoản
function moKhoaTK(idOrIndex) {
    if(confirm("Xác nhận MỞ KHÓA cho tài khoản này?")) {
        let dsTK = JSON.parse(localStorage.getItem('admins')) || [];
        let tk = dsTK.find((t, idx) => t.id === idOrIndex || idx === idOrIndex);
        if(tk) tk.trangThai = 'Hoạt động';
        localStorage.setItem('admins', JSON.stringify(dsTK));
        hienThiDanhSachTK(dsTK);
    }
}
// Hàm tìm kiếm
function timKiem() {
    let dsTK = JSON.parse(localStorage.getItem('admins')) || [];
    const tuKhoa = document.getElementById('timKiemTK').value.toLowerCase();
    
    const ketQua = dsTK.filter(tk => 
        (tk.username && tk.username.toLowerCase().includes(tuKhoa)) || 
        (tk.hoTen && tk.hoTen.toLowerCase().includes(tuKhoa))
    );
    hienThiDanhSachTK(ketQua); 
}

// =========================================================
// 3. TIỆN ÍCH & KHỞI CHẠY HỆ THỐNG
// =========================================================

function formatTien(n) {
    return Number(n || 0).toLocaleString('vi-VN');
}

window.onload = function() {
    kiemTraDangNhapChung();
    if (document.getElementById('formTaiKhoan')) {
        khoiTaoTaiKhoan(); 
    }
    
    let passInput = document.getElementById('password');
    if (passInput && window.location.pathname.toLowerCase().includes('login.html')) {
        passInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') dangNhapSuperAdmin();
        });
    }
}