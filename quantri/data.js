// ==========================================
// FILE: data.js - DỮ LIỆU MẪU HỆ THỐNG
// ==========================================
const DU_LIEU_MAU = {
    admins: [
        { id: 1, username: "admin", password: "123", hoTen: "Cao Thanh Tuyền", vaiTro: "Admin", role: "admin", trangThai: "Hoạt động", sdtNv: "0901234567", emailNv: "admin@thuvien.com" },
        { id: 2, username: "thukho_01", password: "123", hoTen: "Lê Văn Lộc", vaiTro: "Thủ kho", role: "thukho", trangThai: "Hoạt động", sdtNv: "0912345678", emailNv: "loc.le@thuvien.com" },
        { id: 3, username: "thuthu_01", password: "123", hoTen: "Nguyễn Ngọc Trâm", vaiTro: "Thủ thư", role: "thuthu", trangThai: "Hoạt động", sdtNv: "0923456789", emailNv: "tram.nguyen@thuvien.com" },
        { id: 4, username: "nv_tuananh", password: "123", hoTen: "Đinh Tuấn Anh", vaiTro: "Thủ thư", role: "thuthu", trangThai: "Khóa", sdtNv: "0934567890", emailNv: "anh.dinh@thuvien.com" }
    ],
}
// ==========================================
// TỰ ĐỘNG NẠP DỮ LIỆU VÀO LOCALSTORAGE (CHỈ NẠP LẦN ĐẦU)
// ==========================================
if (!localStorage.getItem('admins')) {
    localStorage.setItem('admins', JSON.stringify(DU_LIEU_MAU.admins));
    console.log("Đã khởi tạo dữ liệu tài khoản mẫu!");
}