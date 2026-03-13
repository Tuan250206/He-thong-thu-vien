// ==========================================
// FILE: data.js - SIÊU DỮ LIỆU MẪU (36 CUỐN SÁCH)
// ==========================================
const DU_LIEU_MAU = {
    admins: [
        { id: 1, username: "admin", password: "123", hoTen: "Nguyễn Quản Trị", vaiTro: "Admin", role: "admin", trangThai: "Hoạt động", sdtNv: "0901234567", emailNv: "admin@thuvien.com" },
        { id: 2, username: "thukho", password: "123", hoTen: "Trần Thủ Kho", vaiTro: "Thủ kho", role: "thukho", trangThai: "Hoạt động", sdtNv: "0912345678", emailNv: "thukho@thuvien.com" },
        { id: 3, username: "thuthu", password: "123", hoTen: "Lê Thị Thủ Thư", vaiTro: "Thủ thư", role: "thuthu", trangThai: "Hoạt động", sdtNv: "0923456789", emailNv: "thuthu@thuvien.com" },
        { id: 4, username: "nhanvien_khoa", password: "123", hoTen: "Phạm Nghỉ Việc", vaiTro: "Thủ thư", role: "thuthu", trangThai: "Khóa", sdtNv: "0934567890", emailNv: "nghiviec@thuvien.com" }
    ],
    sach: [
        // --- NHÓM 1: CÔNG NGHỆ THÔNG TIN & WEB ---
        { maSach: "S001", tenSach: "Lập trình Python cơ bản", tacGia: "Nguyễn Văn A", nxb: "NXB Trẻ", namXB: 2023, theLoai: "CNTT", soLuongTong: 50, soLuongCon: 45, giaNhap: 100000, giaBT: 150000, viTri: "A-1-1", danhMucChinh: "Công nghệ kỹ thuật", danhMucPhu: "Lập trình", tuKhoa: "python, cơ bản, code", ddc: "005.133" },
        { maSach: "S002", tenSach: "Cấu trúc dữ liệu và giải thuật", tacGia: "Lê Văn B", nxb: "NXB Giáo Dục", namXB: 2022, theLoai: "CNTT", soLuongTong: 30, soLuongCon: 30, giaNhap: 120000, giaBT: 180000, viTri: "A-1-2", danhMucChinh: "Công nghệ kỹ thuật", danhMucPhu: "Thuật toán", tuKhoa: "ctdl, gt, c++", ddc: "005.1" },
        { maSach: "S003", tenSach: "Thiết kế Web với HTML/CSS/JS", tacGia: "Trần C", nxb: "NXB Thanh Niên", namXB: 2024, theLoai: "CNTT", soLuongTong: 150, soLuongCon: 140, giaNhap: 80000, giaBT: 120000, viTri: "A-2-1", danhMucChinh: "Công nghệ kỹ thuật", danhMucPhu: "Web", tuKhoa: "web, html, css, js", ddc: "006.7" },
        { maSach: "S016", tenSach: "Clean Code: Viết Code Sạch", tacGia: "Robert C. Martin", nxb: "Tri Thức", namXB: 2020, theLoai: "CNTT", soLuongTong: 40, soLuongCon: 38, giaNhap: 150000, giaBT: 220000, viTri: "A-2-2", danhMucChinh: "Công nghệ kỹ thuật", danhMucPhu: "Phát triển", tuKhoa: "clean code", ddc: "005.1" },
        { maSach: "S017", tenSach: "Chinh phục ReactJS", tacGia: "Đặng IT", nxb: "Khoa Học", namXB: 2023, theLoai: "CNTT", soLuongTong: 60, soLuongCon: 55, giaNhap: 130000, giaBT: 190000, viTri: "A-2-3", danhMucChinh: "Công nghệ kỹ thuật", danhMucPhu: "Web Frontend", tuKhoa: "react, frontend", ddc: "006.76" },
        { maSach: "S025", tenSach: "Trí tuệ nhân tạo (AI) toàn tập", tacGia: "Stuart Russell", nxb: "ĐH Quốc Gia", namXB: 2023, theLoai: "CNTT", soLuongTong: 20, soLuongCon: 15, giaNhap: 250000, giaBT: 350000, viTri: "A-3-1", danhMucChinh: "Công nghệ kỹ thuật", danhMucPhu: "Trí tuệ nhân tạo", tuKhoa: "ai, machine learning", ddc: "006.3" },
        { maSach: "S026", tenSach: "Bảo mật mạng máy tính", tacGia: "William Stallings", nxb: "Bách Khoa", namXB: 2021, theLoai: "CNTT", soLuongTong: 25, soLuongCon: 25, giaNhap: 180000, giaBT: 240000, viTri: "A-3-2", danhMucChinh: "Công nghệ kỹ thuật", danhMucPhu: "Mạng máy tính", tuKhoa: "bảo mật, an ninh mạng", ddc: "005.8" },

        // --- NHÓM 2: THIẾT KẾ ĐỒ HỌA ---
        { maSach: "S018", tenSach: "Tư duy Thiết kế Đồ họa", tacGia: "Gavin Ambrose", nxb: "Mỹ Thuật", namXB: 2021, theLoai: "Đồ họa", soLuongTong: 35, soLuongCon: 30, giaNhap: 180000, giaBT: 250000, viTri: "F-1-1", danhMucChinh: "Văn học nghệ thuật", danhMucPhu: "Thiết kế đồ họa", tuKhoa: "design, layout", ddc: "741.6" },
        { maSach: "S019", tenSach: "Nghệ thuật Thiết kế UI/UX", tacGia: "Nhiều tác giả", nxb: "Thông Tin", namXB: 2024, theLoai: "Đồ họa", soLuongTong: 45, soLuongCon: 40, giaNhap: 160000, giaBT: 210000, viTri: "F-1-2", danhMucChinh: "Công nghệ kỹ thuật", danhMucPhu: "Thiết kế giao diện", tuKhoa: "ui, ux, figma", ddc: "004.019" },
        { maSach: "S020", tenSach: "Làm chủ Adobe Illustrator", tacGia: "Brian Wood", nxb: "NXB Trẻ", namXB: 2022, theLoai: "Đồ họa", soLuongTong: 50, soLuongCon: 2, giaNhap: 140000, giaBT: 200000, viTri: "F-1-3", danhMucChinh: "Công nghệ kỹ thuật", danhMucPhu: "Công cụ thiết kế", tuKhoa: "illustrator, vector", ddc: "006.68" },
        { maSach: "S027", tenSach: "Nhiếp ảnh cơ bản", tacGia: "Tom Ang", nxb: "Mỹ Thuật", namXB: 2019, theLoai: "Đồ họa", soLuongTong: 15, soLuongCon: 10, giaNhap: 300000, giaBT: 450000, viTri: "F-2-1", danhMucChinh: "Văn học nghệ thuật", danhMucPhu: "Nhiếp ảnh", tuKhoa: "camera, nhiếp ảnh", ddc: "770" },

        // --- NHÓM 3: KHOA HỌC TỰ NHIÊN ---
        { maSach: "S021", tenSach: "Giải tích Cơ bản", tacGia: "Nguyễn Đình Trí", nxb: "NXB Giáo Dục", namXB: 2021, theLoai: "Khoa học", soLuongTong: 120, soLuongCon: 110, giaNhap: 55000, giaBT: 75000, viTri: "G-1-1", danhMucChinh: "Khoa học tự nhiên", danhMucPhu: "Toán học", tuKhoa: "toán, giải tích", ddc: "515" },
        { maSach: "S022", tenSach: "Phương trình Vi phân", tacGia: "Nhiều tác giả", nxb: "ĐH Quốc Gia", namXB: 2020, theLoai: "Khoa học", soLuongTong: 80, soLuongCon: 75, giaNhap: 60000, giaBT: 80000, viTri: "G-1-2", danhMucChinh: "Khoa học tự nhiên", danhMucPhu: "Toán học", tuKhoa: "vi phân, đạo hàm", ddc: "515.35" },
        { maSach: "S023", tenSach: "Vũ trụ trong vỏ hạt dẻ", tacGia: "Stephen Hawking", nxb: "NXB Trẻ", namXB: 2018, theLoai: "Khoa học", soLuongTong: 50, soLuongCon: 1, giaNhap: 90000, giaBT: 130000, viTri: "G-2-1", danhMucChinh: "Khoa học tự nhiên", danhMucPhu: "Vật lý", tuKhoa: "vũ trụ, hố đen", ddc: "523.1" },
        { maSach: "S028", tenSach: "Hóa học đại cương", tacGia: "Lê Văn C", nxb: "KHTN", namXB: 2021, theLoai: "Khoa học", soLuongTong: 60, soLuongCon: 60, giaNhap: 70000, giaBT: 100000, viTri: "G-2-2", danhMucChinh: "Khoa học tự nhiên", danhMucPhu: "Hóa học", tuKhoa: "hóa đại cương", ddc: "540" },
        { maSach: "S029", tenSach: "Sinh lý học người", tacGia: "Arthur Guyton", nxb: "Y Học", namXB: 2022, theLoai: "Khoa học", soLuongTong: 25, soLuongCon: 20, giaNhap: 450000, giaBT: 600000, viTri: "G-3-1", danhMucChinh: "Khoa học tự nhiên", danhMucPhu: "Sinh học", tuKhoa: "y học, cơ thể người", ddc: "612" },

        // --- NHÓM 4: TÂM LÝ & KỸ NĂNG SỐNG ---
        { maSach: "S004", tenSach: "Đắc Nhân Tâm", tacGia: "Dale Carnegie", nxb: "NXB Tổng hợp", namXB: 2021, theLoai: "Tâm lý", soLuongTong: 100, soLuongCon: 2, giaNhap: 50000, giaBT: 80000, viTri: "B-1-1", danhMucChinh: "Khoa học xã hội", danhMucPhu: "Tâm lý học", tuKhoa: "giao tiếp", ddc: "158.1" },
        { maSach: "S005", tenSach: "Nhà Lãnh Đạo Không Chức Danh", tacGia: "Robin Sharma", nxb: "NXB Trẻ", namXB: 2020, theLoai: "Tâm lý", soLuongTong: 40, soLuongCon: 40, giaNhap: 70000, giaBT: 100000, viTri: "B-1-2", danhMucChinh: "Khoa học xã hội", danhMucPhu: "Lãnh đạo", tuKhoa: "self-help", ddc: "158.4" },
        { maSach: "S006", tenSach: "Tư Duy Nhanh Và Chậm", tacGia: "Daniel Kahneman", nxb: "Thế Giới", namXB: 2019, theLoai: "Tâm lý", soLuongTong: 60, soLuongCon: 45, giaNhap: 150000, giaBT: 220000, viTri: "B-2-1", danhMucChinh: "Khoa học xã hội", danhMucPhu: "Tâm lý học", tuKhoa: "tư duy", ddc: "153.4" },
        { maSach: "S030", tenSach: "Thói Quen Nguyên Tử (Atomic Habits)", tacGia: "James Clear", nxb: "Thế Giới", namXB: 2022, theLoai: "Tâm lý", soLuongTong: 120, soLuongCon: 100, giaNhap: 110000, giaBT: 160000, viTri: "B-2-2", danhMucChinh: "Khoa học xã hội", danhMucPhu: "Phát triển bản thân", tuKhoa: "thói quen", ddc: "158.1" },
        { maSach: "S031", tenSach: "Sức Mạnh Tiềm Thức", tacGia: "Joseph Murphy", nxb: "Tổng hợp TP.HCM", namXB: 2020, theLoai: "Tâm lý", soLuongTong: 80, soLuongCon: 3, giaNhap: 85000, giaBT: 130000, viTri: "B-2-3", danhMucChinh: "Khoa học xã hội", danhMucPhu: "Phát triển bản thân", tuKhoa: "tiềm thức", ddc: "158.1" },

        // --- NHÓM 5: KINH TẾ QUẢN LÝ ---
        { maSach: "S007", tenSach: "Cha Giàu Cha Nghèo", tacGia: "Robert Kiyosaki", nxb: "NXB Trẻ", namXB: 2018, theLoai: "Kinh tế", soLuongTong: 300, soLuongCon: 280, giaNhap: 60000, giaBT: 95000, viTri: "C-1-1", danhMucChinh: "Kinh tế quản lý", danhMucPhu: "Tài chính cá nhân", tuKhoa: "tiền bạc, đầu tư", ddc: "332.024" },
        { maSach: "S008", tenSach: "Nhà Đầu Tư Thông Minh", tacGia: "Benjamin Graham", nxb: "Tri Thức", namXB: 2022, theLoai: "Kinh tế", soLuongTong: 50, soLuongCon: 48, giaNhap: 180000, giaBT: 250000, viTri: "C-1-2", danhMucChinh: "Kinh tế quản lý", danhMucPhu: "Chứng khoán", tuKhoa: "đầu tư, cổ phiếu", ddc: "332.6" },
        { maSach: "S032", tenSach: "Từ Tốt Đến Vĩ Đại", tacGia: "Jim Collins", nxb: "NXB Trẻ", namXB: 2019, theLoai: "Kinh tế", soLuongTong: 60, soLuongCon: 55, giaNhap: 120000, giaBT: 180000, viTri: "C-2-1", danhMucChinh: "Kinh tế quản lý", danhMucPhu: "Quản trị kinh doanh", tuKhoa: "doanh nghiệp", ddc: "658" },
        { maSach: "S033", tenSach: "Bí Mật Tư Duy Triệu Phú", tacGia: "T. Harv Eker", nxb: "Tổng hợp TP.HCM", namXB: 2021, theLoai: "Kinh tế", soLuongTong: 90, soLuongCon: 80, giaNhap: 75000, giaBT: 110000, viTri: "C-2-2", danhMucChinh: "Kinh tế quản lý", danhMucPhu: "Tài chính cá nhân", tuKhoa: "làm giàu", ddc: "332.024" },
        { maSach: "S034", tenSach: "Think and Grow Rich", tacGia: "Napoleon Hill", nxb: "Thế Giới", namXB: 2020, theLoai: "Kinh tế", soLuongTong: 70, soLuongCon: 68, giaNhap: 80000, giaBT: 120000, viTri: "C-2-3", danhMucChinh: "Kinh tế quản lý", danhMucPhu: "Kinh doanh", tuKhoa: "nghĩ giàu làm giàu", ddc: "650.1" },

        // --- NHÓM 6: VĂN HỌC & TIỂU THUYẾT ---
        { maSach: "S009", tenSach: "Dế Mèn Phiêu Lưu Ký", tacGia: "Tô Hoài", nxb: "Kim Đồng", namXB: 2015, theLoai: "Văn học", soLuongTong: 80, soLuongCon: 75, giaNhap: 35000, giaBT: 50000, viTri: "D-1-1", danhMucChinh: "Văn học nghệ thuật", danhMucPhu: "Văn học Việt Nam", tuKhoa: "thiếu nhi", ddc: "895.9" },
        { maSach: "S010", tenSach: "Số Đỏ", tacGia: "Vũ Trọng Phụng", nxb: "Văn Học", namXB: 2017, theLoai: "Văn học", soLuongTong: 40, soLuongCon: 20, giaNhap: 45000, giaBT: 65000, viTri: "D-1-2", danhMucChinh: "Văn học nghệ thuật", danhMucPhu: "Văn học Việt Nam", tuKhoa: "trào phúng", ddc: "895.9" },
        { maSach: "S011", tenSach: "Những Người Khốn Khổ", tacGia: "Victor Hugo", nxb: "Văn Học", namXB: 2010, theLoai: "Văn học", soLuongTong: 25, soLuongCon: 25, giaNhap: 200000, giaBT: 300000, viTri: "D-2-1", danhMucChinh: "Văn học nghệ thuật", danhMucPhu: "Văn học Phương Tây", tuKhoa: "kinh điển", ddc: "843" },
        { maSach: "S035", tenSach: "Nhà Giả Kim", tacGia: "Paulo Coelho", nxb: "Hội Nhà Văn", namXB: 2020, theLoai: "Văn học", soLuongTong: 150, soLuongCon: 130, giaNhap: 55000, giaBT: 80000, viTri: "D-2-2", danhMucChinh: "Văn học nghệ thuật", danhMucPhu: "Tiểu thuyết", tuKhoa: "hành trình", ddc: "863" },
        { maSach: "S036", tenSach: "Hai vạn dặm dưới đáy biển", tacGia: "Jules Verne", nxb: "Văn Học", namXB: 2018, theLoai: "Văn học", soLuongTong: 30, soLuongCon: 28, giaNhap: 65000, giaBT: 95000, viTri: "D-2-3", danhMucChinh: "Văn học nghệ thuật", danhMucPhu: "Viễn tưởng", tuKhoa: "phiêu lưu", ddc: "843" },
        { maSach: "S037", tenSach: "Thép đã tôi thế đấy", tacGia: "Nikolai Ostrovsky", nxb: "Văn Học", namXB: 2015, theLoai: "Văn học", soLuongTong: 20, soLuongCon: 20, giaNhap: 70000, giaBT: 110000, viTri: "D-3-1", danhMucChinh: "Văn học nghệ thuật", danhMucPhu: "Văn học Nga", tuKhoa: "kinh điển, cách mạng", ddc: "891.73" },
        { maSach: "S038", tenSach: "Tuổi trẻ đáng giá bao nhiêu", tacGia: "Rosie Nguyễn", nxb: "Hội Nhà Văn", namXB: 2018, theLoai: "Văn học", soLuongTong: 100, soLuongCon: 2, giaNhap: 60000, giaBT: 90000, viTri: "D-3-2", danhMucChinh: "Văn học nghệ thuật", danhMucPhu: "Tản văn", tuKhoa: "tuổi trẻ, cảm hứng", ddc: "895.9" },

        // --- NHÓM 7: NGOẠI NGỮ & THIẾU NHI ---
        { maSach: "S024", tenSach: "Hack Não 1500 Từ Vựng Tiếng Anh", tacGia: "Nguyễn Hiệp", nxb: "Thế Giới", namXB: 2021, theLoai: "Ngoại ngữ", soLuongTong: 100, soLuongCon: 90, giaNhap: 250000, giaBT: 395000, viTri: "E-1-1", danhMucChinh: "Ngôn ngữ học", danhMucPhu: "Tiếng Anh", tuKhoa: "từ vựng, ielts", ddc: "420" },
        { maSach: "S039", tenSach: "Minna no Nihongo (Sơ cấp 1)", tacGia: "3A Corporation", nxb: "NXB Trẻ", namXB: 2019, theLoai: "Ngoại ngữ", soLuongTong: 40, soLuongCon: 35, giaNhap: 80000, giaBT: 120000, viTri: "E-1-2", danhMucChinh: "Ngôn ngữ học", danhMucPhu: "Tiếng Nhật", tuKhoa: "tiếng nhật, jlpt n5", ddc: "495.6" },
        { maSach: "S040", tenSach: "Ngữ pháp Tiếng Hàn Cơ Bản", tacGia: "Ahn Jean-myung", nxb: "Tổng hợp TP.HCM", namXB: 2020, theLoai: "Ngoại ngữ", soLuongTong: 30, soLuongCon: 28, giaNhap: 150000, giaBT: 210000, viTri: "E-1-3", danhMucChinh: "Ngôn ngữ học", danhMucPhu: "Tiếng Hàn", tuKhoa: "tiếng hàn, topik", ddc: "495.7" },
        { maSach: "S041", tenSach: "Harry Potter và Hòn đá Phù thủy", tacGia: "J.K. Rowling", nxb: "NXB Trẻ", namXB: 2017, theLoai: "Thiếu nhi", soLuongTong: 60, soLuongCon: 15, giaNhap: 110000, giaBT: 160000, viTri: "H-1-1", danhMucChinh: "Văn học nghệ thuật", danhMucPhu: "Viễn tưởng", tuKhoa: "phép thuật", ddc: "823" },
        { maSach: "S042", tenSach: "Doraemon - Tập 1", tacGia: "Fujiko F. Fujio", nxb: "Kim Đồng", namXB: 2022, theLoai: "Thiếu nhi", soLuongTong: 200, soLuongCon: 190, giaNhap: 18000, giaBT: 25000, viTri: "H-1-2", danhMucChinh: "Văn học nghệ thuật", danhMucPhu: "Truyện tranh", tuKhoa: "manga, mèo máy", ddc: "741.5" }
    ],
    ncc: [
        { maNCC: "NCC001", tenNCC: "Nhà xuất bản Trẻ", loai: "Nhà xuất bản", diaChi: "161B Lý Chính Thắng, Q3, TP.HCM", sdt: "02839316289", email: "info@nxbtre.com.vn", nguoiLienHe: "Chị Hoa" },
        { maNCC: "NCC002", tenNCC: "Công ty sách Nhã Nam", loai: "Công ty phát hành", diaChi: "59 Đỗ Quang, Cầu Giấy, Hà Nội", sdt: "02435146876", email: "lienhe@nhanam.vn", nguoiLienHe: "Anh Bình" },
        { maNCC: "NCC003", tenNCC: "NXB Kim Đồng", loai: "Nhà xuất bản", diaChi: "55 Quang Trung, Hai Bà Trưng, Hà Nội", sdt: "02439434730", email: "info@nxbkimdong.com.vn", nguoiLienHe: "Chị Lan" },
        { maNCC: "NCC004", tenNCC: "Fahasa", loai: "Đại lý phân phối", diaChi: "60-62 Lê Lợi, Q1, TP.HCM", sdt: "1900636467", email: "info@fahasa.com", nguoiLienHe: "Anh Tuấn" },
        { maNCC: "NCC005", tenNCC: "NXB Giáo Dục Việt Nam", loai: "Nhà xuất bản", diaChi: "81 Trần Hưng Đạo, Hoàn Kiếm, HN", sdt: "02438220801", email: "nxbgdvn@nxbgd.vn", nguoiLienHe: "Cô Minh" }
    ],
    phieuNhap: [
        { maPhieu: "PN001", ngayNhap: "2026-02-15", maNCC: "NCC005", tenNCC: "NXB Giáo Dục Việt Nam", danhSachSach: [ { maSach: "S021", tenSach: "Giải tích Cơ bản", soLuong: 120, giaNhap: 55000 }, { maSach: "S022", tenSach: "Phương trình Vi phân", soLuong: 80, giaNhap: 60000 } ], tongTien: 11400000, nguoiNhap: "thukho" },
        { maPhieu: "PN002", ngayNhap: "2026-03-02", maNCC: "NCC001", tenNCC: "Nhà xuất bản Trẻ", danhSachSach: [ { maSach: "S001", tenSach: "Lập trình Python cơ bản", soLuong: 50, giaNhap: 100000 }, { maSach: "S007", tenSach: "Cha Giàu Cha Nghèo", soLuong: 100, giaNhap: 60000 }, { maSach: "S020", tenSach: "Làm chủ Adobe Illustrator", soLuong: 50, giaNhap: 140000 } ], tongTien: 18000000, nguoiNhap: "admin" },
        { maPhieu: "PN003", ngayNhap: "2026-03-05", maNCC: "NCC002", tenNCC: "Công ty sách Nhã Nam", danhSachSach: [ { maSach: "S004", tenSach: "Đắc Nhân Tâm", soLuong: 50, giaNhap: 50000 }, { maSach: "S006", tenSach: "Tư Duy Nhanh Và Chậm", soLuong: 60, giaNhap: 150000 }, { maSach: "S030", tenSach: "Thói Quen Nguyên Tử", soLuong: 120, giaNhap: 110000 } ], tongTien: 24700000, nguoiNhap: "thukho" },
        { maPhieu: "PN004", ngayNhap: "2026-03-09", maNCC: "NCC003", tenNCC: "NXB Kim Đồng", danhSachSach: [ { maSach: "S009", tenSach: "Dế Mèn Phiêu Lưu Ký", soLuong: 80, giaNhap: 35000 }, { maSach: "S042", tenSach: "Doraemon - Tập 1", soLuong: 200, giaNhap: 18000 } ], tongTien: 6400000, nguoiNhap: "admin" }
    ],
    phieuXuat: [
        { maPhieu: "PX001", ngayXuat: "2026-02-20", lyDo: "Xuất sách lên Thư viện", ghiChu: "Khoa Toán-Tin", danhSachSach: [ { maSach: "S021", tenSach: "Giải tích Cơ bản", soLuong: 10, tonKho: 120 }, { maSach: "S022", tenSach: "Phương trình Vi phân", soLuong: 5, tonKho: 80 } ], tongTien: 0, nguoiXuat: "admin" },
        { maPhieu: "PX002", ngayXuat: "2026-03-08", lyDo: "Xuất phòng đọc mở", ghiChu: "Bổ sung kệ sách C", danhSachSach: [ { maSach: "S001", tenSach: "Lập trình Python cơ bản", soLuong: 5, tonKho: 50 }, { maSach: "S007", tenSach: "Cha Giàu Cha Nghèo", soLuong: 20, tonKho: 300 } ], tongTien: 0, nguoiXuat: "admin" },
        { maPhieu: "PX003", ngayXuat: "2026-03-11", lyDo: "Thanh lý sách rách", ghiChu: "Biên bản số 12", danhSachSach: [ { maSach: "S004", tenSach: "Đắc Nhân Tâm", soLuong: 48, tonKho: 50 }, { maSach: "S020", tenSach: "Làm chủ Adobe Illustrator", soLuong: 48, tonKho: 50 } ], tongTien: 0, nguoiXuat: "thukho" }
    ],
    kiemKe: [
        { ngay: "2026-01-31", nguoi: "admin", soSach: 10 },
        { ngay: "2026-02-28", nguoi: "admin", soSach: 20 },
        { ngay: "2026-03-01", nguoi: "thukho", soSach: 36 }
    ]
};
// DÁN ĐOẠN NÀY VÀO CUỐI FILE DATA.JS
// ==========================================
// TỰ ĐỘNG NẠP DỮ LIỆU VÀO LOCALSTORAGE KHI LOAD FILE NÀY
// ==========================================
localStorage.setItem('admins', JSON.stringify(DU_LIEU_MAU.admins));
localStorage.setItem('danhSachSach', JSON.stringify(DU_LIEU_MAU.sach));
localStorage.setItem('danhSachNCC', JSON.stringify(DU_LIEU_MAU.ncc));
localStorage.setItem('phieuNhapKho', JSON.stringify(DU_LIEU_MAU.phieuNhap));
localStorage.setItem('phieuXuatKho', JSON.stringify(DU_LIEU_MAU.phieuXuat));
localStorage.setItem('lichSuKiemKe', JSON.stringify(DU_LIEU_MAU.kiemKe));

console.log("✅ Đã ép nạp thành công bộ dữ liệu mẫu 36 cuốn sách!");