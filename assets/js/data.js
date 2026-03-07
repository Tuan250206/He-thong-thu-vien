/**
 * data.js – Mock data for Hệ thống Thư viện
 * All data is realistic Vietnamese content.
 */

'use strict';

const MOCK_DATA = {

  /* ── Users (thủ thư / nhân viên) ────────────────────────── */
  users: [
    { id: 'U001', username: 'thuthu1',   password: '123456', role: 'user', name: 'Nguyễn Thị Thu Hà',  email: 'thuthu1@thuvien.vn',   sdt: '0901234561', trangThai: 'active' },
    { id: 'U002', username: 'thuthu2',   password: '123456', role: 'user', name: 'Trần Văn Minh',       email: 'thuthu2@thuvien.vn',   sdt: '0901234562', trangThai: 'active' },
    { id: 'U003', username: 'nhanvien1', password: '123456', role: 'user', name: 'Lê Thị Phương Anh',  email: 'nhanvien1@thuvien.vn', sdt: '0901234563', trangThai: 'active' }
  ],

  /* ── Admins ──────────────────────────────────────────────── */
  admins: [
    { id: 'A001', username: 'admin', password: 'admin123', role: 'admin', name: 'Phạm Văn Quản Trị', email: 'admin@thuvien.vn', sdt: '0901234500', trangThai: 'active' }
  ],

  /* ── Độc giả ─────────────────────────────────────────────── */
  docGia: [
    { maDG:'SV001', hoTen:'Nguyễn Văn An',       ngaySinh:'2002-03-15', gioiTinh:'Nam',  lop:'CNTT01', khoa:'Công nghệ thông tin',   email:'nguyenvanan@email.com',   sdt:'0912000001', diaChi:'12 Lý Thường Kiệt, Hà Nội',       trangThai:'active',    ngayCapThe:'2023-09-01', ngayHetHan:'2025-09-01', soSachDangMuon:1 },
    { maDG:'SV002', hoTen:'Trần Thị Bình',        ngaySinh:'2001-07-22', gioiTinh:'Nữ',   lop:'KT02',   khoa:'Kinh tế',               email:'tranthibinh@email.com',   sdt:'0912000002', diaChi:'34 Nguyễn Huệ, TP.HCM',           trangThai:'active',    ngayCapThe:'2023-09-01', ngayHetHan:'2025-09-01', soSachDangMuon:2 },
    { maDG:'SV003', hoTen:'Lê Minh Cường',        ngaySinh:'2003-11-05', gioiTinh:'Nam',  lop:'VH03',   khoa:'Văn học',               email:'leminhcuong@email.com',   sdt:'0912000003', diaChi:'56 Trần Phú, Đà Nẵng',            trangThai:'active',    ngayCapThe:'2023-09-01', ngayHetHan:'2025-09-01', soSachDangMuon:0 },
    { maDG:'SV004', hoTen:'Phạm Thị Dung',        ngaySinh:'2002-05-18', gioiTinh:'Nữ',   lop:'CNTT02', khoa:'Công nghệ thông tin',   email:'phamthidung@email.com',   sdt:'0912000004', diaChi:'78 Hoàng Văn Thụ, Hà Nội',        trangThai:'inactive',  ngayCapThe:'2022-09-01', ngayHetHan:'2024-09-01', soSachDangMuon:0 },
    { maDG:'SV005', hoTen:'Hoàng Văn Em',         ngaySinh:'2001-01-30', gioiTinh:'Nam',  lop:'LS01',   khoa:'Lịch sử',               email:'hoangvanem@email.com',    sdt:'0912000005', diaChi:'90 Đinh Tiên Hoàng, Huế',         trangThai:'active',    ngayCapThe:'2023-09-01', ngayHetHan:'2025-09-01', soSachDangMuon:1 },
    { maDG:'SV006', hoTen:'Vũ Thị Phương',        ngaySinh:'2002-09-12', gioiTinh:'Nữ',   lop:'KH01',   khoa:'Khoa học tự nhiên',     email:'vuthiphuong@email.com',   sdt:'0912000006', diaChi:'23 Bà Triệu, Hà Nội',             trangThai:'active',    ngayCapThe:'2023-09-01', ngayHetHan:'2025-09-01', soSachDangMuon:3 },
    { maDG:'SV007', hoTen:'Đặng Minh Giang',      ngaySinh:'2003-04-25', gioiTinh:'Nam',  lop:'TL01',   khoa:'Tâm lý học',            email:'dangminhgiang@email.com', sdt:'0912000007', diaChi:'45 Nguyễn Trãi, Cần Thơ',         trangThai:'suspended', ngayCapThe:'2022-03-15', ngayHetHan:'2024-03-15', soSachDangMuon:2 },
    { maDG:'SV008', hoTen:'Bùi Thị Hoa',          ngaySinh:'2001-12-08', gioiTinh:'Nữ',   lop:'KT03',   khoa:'Kinh tế',               email:'buithihoa@email.com',     sdt:'0912000008', diaChi:'67 Lê Lợi, TP.HCM',               trangThai:'active',    ngayCapThe:'2023-09-01', ngayHetHan:'2025-09-01', soSachDangMuon:0 },
    { maDG:'SV009', hoTen:'Trịnh Văn Hùng',       ngaySinh:'2002-06-17', gioiTinh:'Nam',  lop:'CNTT03', khoa:'Công nghệ thông tin',   email:'trinhvanhung@email.com',  sdt:'0912000009', diaChi:'89 Phạm Hùng, Hà Nội',            trangThai:'active',    ngayCapThe:'2023-09-01', ngayHetHan:'2025-09-01', soSachDangMuon:1 },
    { maDG:'SV010', hoTen:'Đinh Thị Lan',         ngaySinh:'2003-02-28', gioiTinh:'Nữ',   lop:'SP01',   khoa:'Sư phạm',               email:'dinhthilan@email.com',    sdt:'0912000010', diaChi:'11 Cầu Giấy, Hà Nội',             trangThai:'active',    ngayCapThe:'2023-09-01', ngayHetHan:'2025-09-01', soSachDangMuon:2 },
    { maDG:'SV011', hoTen:'Ngô Văn Long',         ngaySinh:'2001-08-14', gioiTinh:'Nam',  lop:'VH02',   khoa:'Văn học',               email:'ngoVanlong@email.com',    sdt:'0912000011', diaChi:'33 Tây Sơn, Hà Nội',              trangThai:'active',    ngayCapThe:'2023-09-01', ngayHetHan:'2025-09-01', soSachDangMuon:0 },
    { maDG:'SV012', hoTen:'Phan Thị Mai',         ngaySinh:'2002-10-03', gioiTinh:'Nữ',   lop:'DL01',   khoa:'Du lịch',               email:'phanthimai@email.com',    sdt:'0912000012', diaChi:'55 Hàng Bông, Hà Nội',            trangThai:'active',    ngayCapThe:'2023-09-01', ngayHetHan:'2025-09-01', soSachDangMuon:1 },
    { maDG:'SV013', hoTen:'Lý Minh Nam',          ngaySinh:'2003-07-19', gioiTinh:'Nam',  lop:'KH02',   khoa:'Khoa học tự nhiên',     email:'lyminhnam@email.com',     sdt:'0912000013', diaChi:'77 Đội Cấn, Hà Nội',              trangThai:'inactive',  ngayCapThe:'2021-09-01', ngayHetHan:'2023-09-01', soSachDangMuon:0 },
    { maDG:'SV014', hoTen:'Cao Thị Oanh',         ngaySinh:'2001-03-26', gioiTinh:'Nữ',   lop:'KT04',   khoa:'Kinh tế',               email:'caoThioanh@email.com',    sdt:'0912000014', diaChi:'99 Hai Bà Trưng, TP.HCM',         trangThai:'active',    ngayCapThe:'2023-09-01', ngayHetHan:'2025-09-01', soSachDangMuon:2 },
    { maDG:'SV015', hoTen:'Trần Văn Phong',       ngaySinh:'2002-11-11', gioiTinh:'Nam',  lop:'CNTT04', khoa:'Công nghệ thông tin',   email:'tranvanphong@email.com',  sdt:'0912000015', diaChi:'21 Nguyễn Chí Thanh, Hà Nội',     trangThai:'active',    ngayCapThe:'2023-09-01', ngayHetHan:'2025-09-01', soSachDangMuon:0 },
    { maDG:'SV016', hoTen:'Đỗ Thị Quỳnh',        ngaySinh:'2003-05-07', gioiTinh:'Nữ',   lop:'NN01',   khoa:'Ngôn ngữ học',          email:'dothiquynh@email.com',    sdt:'0912000016', diaChi:'43 Kim Mã, Hà Nội',               trangThai:'active',    ngayCapThe:'2023-09-01', ngayHetHan:'2025-09-01', soSachDangMuon:1 },
    { maDG:'SV017', hoTen:'Hà Văn Sơn',          ngaySinh:'2001-09-23', gioiTinh:'Nam',  lop:'LS02',   khoa:'Lịch sử',               email:'havanson@email.com',      sdt:'0912000017', diaChi:'65 Đê La Thành, Hà Nội',          trangThai:'active',    ngayCapThe:'2023-09-01', ngayHetHan:'2025-09-01', soSachDangMuon:3 },
    { maDG:'SV018', hoTen:'Lương Thị Trang',      ngaySinh:'2002-01-16', gioiTinh:'Nữ',   lop:'SP02',   khoa:'Sư phạm',               email:'luongtrang@email.com',    sdt:'0912000018', diaChi:'87 Cát Linh, Hà Nội',             trangThai:'active',    ngayCapThe:'2023-09-01', ngayHetHan:'2025-09-01', soSachDangMuon:0 },
    { maDG:'SV019', hoTen:'Võ Văn Uy',            ngaySinh:'2003-08-04', gioiTinh:'Nam',  lop:'KH03',   khoa:'Khoa học tự nhiên',     email:'vovanuy@email.com',       sdt:'0912000019', diaChi:'19 Trúc Bạch, Hà Nội',            trangThai:'suspended', ngayCapThe:'2022-09-01', ngayHetHan:'2024-09-01', soSachDangMuon:1 },
    { maDG:'SV020', hoTen:'Nguyễn Thị Vân',      ngaySinh:'2001-04-20', gioiTinh:'Nữ',   lop:'CNTT05', khoa:'Công nghệ thông tin',   email:'nguyenthivan@email.com',  sdt:'0912000020', diaChi:'41 Xuân Thủy, Hà Nội',            trangThai:'active',    ngayCapThe:'2023-09-01', ngayHetHan:'2025-09-01', soSachDangMuon:2 },
    { maDG:'SV021', hoTen:'Đào Văn Xuân',        ngaySinh:'2002-12-09', gioiTinh:'Nam',  lop:'TL02',   khoa:'Tâm lý học',            email:'daovanxuan@email.com',    sdt:'0912000021', diaChi:'63 Đống Đa, Hà Nội',              trangThai:'active',    ngayCapThe:'2023-09-01', ngayHetHan:'2025-09-01', soSachDangMuon:0 },
    { maDG:'SV022', hoTen:'Bùi Thị Yến',         ngaySinh:'2003-06-27', gioiTinh:'Nữ',   lop:'VH03',   khoa:'Văn học',               email:'buithiyen@email.com',     sdt:'0912000022', diaChi:'85 Đại Cồ Việt, Hà Nội',          trangThai:'active',    ngayCapThe:'2023-09-01', ngayHetHan:'2025-09-01', soSachDangMuon:1 },
    { maDG:'SV023', hoTen:'Trương Văn Zung',      ngaySinh:'2001-10-14', gioiTinh:'Nam',  lop:'KT05',   khoa:'Kinh tế',               email:'truongvanzung@email.com', sdt:'0912000023', diaChi:'17 Giải Phóng, Hà Nội',           trangThai:'active',    ngayCapThe:'2023-09-01', ngayHetHan:'2025-09-01', soSachDangMuon:0 },
    { maDG:'SV024', hoTen:'Lê Thị Ánh',           ngaySinh:'2002-02-01', gioiTinh:'Nữ',   lop:'CNTT06', khoa:'Công nghệ thông tin',   email:'lethianh@email.com',      sdt:'0912000024', diaChi:'39 Khâm Thiên, Hà Nội',           trangThai:'active',    ngayCapThe:'2023-09-01', ngayHetHan:'2025-09-01', soSachDangMuon:2 },
    { maDG:'SV025', hoTen:'Phạm Văn Bắc',        ngaySinh:'2003-09-18', gioiTinh:'Nam',  lop:'NN02',   khoa:'Ngôn ngữ học',          email:'phamvanbac@email.com',    sdt:'0912000025', diaChi:'61 Đinh Lễ, Hà Nội',              trangThai:'active',    ngayCapThe:'2023-09-01', ngayHetHan:'2025-09-01', soSachDangMuon:1 },
    { maDG:'SV026', hoTen:'Hoàng Thị Châu',      ngaySinh:'2001-05-05', gioiTinh:'Nữ',   lop:'DL02',   khoa:'Du lịch',               email:'hoangchau@email.com',     sdt:'0912000026', diaChi:'83 Tràng Thi, Hà Nội',            trangThai:'active',    ngayCapThe:'2023-09-01', ngayHetHan:'2025-09-01', soSachDangMuon:0 },
    { maDG:'SV027', hoTen:'Nguyễn Minh Dũng',    ngaySinh:'2002-07-31', gioiTinh:'Nam',  lop:'KH04',   khoa:'Khoa học tự nhiên',     email:'nguyenminhdung@email.com',sdt:'0912000027', diaChi:'15 Phan Chu Trinh, Hà Nội',       trangThai:'inactive',  ngayCapThe:'2021-09-01', ngayHetHan:'2023-09-01', soSachDangMuon:0 },
    { maDG:'SV028', hoTen:'Vũ Thị Oanh',         ngaySinh:'2003-03-22', gioiTinh:'Nữ',   lop:'SP03',   khoa:'Sư phạm',               email:'vuthioanh@email.com',     sdt:'0912000028', diaChi:'37 Quán Thánh, Hà Nội',           trangThai:'active',    ngayCapThe:'2023-09-01', ngayHetHan:'2025-09-01', soSachDangMuon:3 },
    { maDG:'SV029', hoTen:'Đinh Văn Phú',        ngaySinh:'2001-11-09', gioiTinh:'Nam',  lop:'CNTT07', khoa:'Công nghệ thông tin',   email:'dinhvanphu@email.com',    sdt:'0912000029', diaChi:'59 Thụy Khuê, Hà Nội',            trangThai:'active',    ngayCapThe:'2023-09-01', ngayHetHan:'2025-09-01', soSachDangMuon:1 },
    { maDG:'SV030', hoTen:'Cao Thị Quế',         ngaySinh:'2002-08-26', gioiTinh:'Nữ',   lop:'VH04',   khoa:'Văn học',               email:'caothique@email.com',     sdt:'0912000030', diaChi:'81 Yên Phụ, Hà Nội',              trangThai:'active',    ngayCapThe:'2023-09-01', ngayHetHan:'2025-09-01', soSachDangMuon:0 }
  ],

  /* ── Sách ────────────────────────────────────────────────── */
  sach: [
    // CNTT
    { maSach:'S001', tenSach:'Lập trình C++ từ cơ bản đến nâng cao',    tacGia:'Phạm Hữu Khang',          nxb:'NXB Lao động',             namXB:2020, theLoai:'CNTT',      isbn:'9786045612345', ngonNgu:'Tiếng Việt', soTrang:560, viTriKe:'A1-01', soLuongTong:5, soLuongCon:3, giaBoiThuong:150000, giaNhap:95000,  moTa:'Giáo trình lập trình C++ từ cơ bản đến nâng cao, phù hợp sinh viên CNTT.' },
    { maSach:'S002', tenSach:'Python cho người mới bắt đầu',             tacGia:'Nguyễn Thế Anh',          nxb:'NXB Thông tin & TT',       namXB:2021, theLoai:'CNTT',      isbn:'9786045623456', ngonNgu:'Tiếng Việt', soTrang:420, viTriKe:'A1-02', soLuongTong:8, soLuongCon:5, giaBoiThuong:120000, giaNhap:78000,  moTa:'Hướng dẫn học Python từ đầu với các ví dụ thực tế.' },
    { maSach:'S003', tenSach:'Cơ sở dữ liệu – Lý thuyết và thực hành',  tacGia:'Trần Việt Anh',           nxb:'NXB Đại học QG HN',        namXB:2019, theLoai:'CNTT',      isbn:'9786045634567', ngonNgu:'Tiếng Việt', soTrang:380, viTriKe:'A1-03', soLuongTong:6, soLuongCon:2, giaBoiThuong:130000, giaNhap:85000,  moTa:'Giáo trình cơ sở dữ liệu cho sinh viên đại học.' },
    { maSach:'S004', tenSach:'Thiết kế website với HTML, CSS & JavaScript',tacGia:'Lê Văn Lợi',            nxb:'NXB Lao động',             namXB:2022, theLoai:'CNTT',      isbn:'9786045645678', ngonNgu:'Tiếng Việt', soTrang:480, viTriKe:'A1-04', soLuongTong:7, soLuongCon:4, giaBoiThuong:140000, giaNhap:90000,  moTa:'Hướng dẫn toàn diện phát triển web front-end.' },
    { maSach:'S005', tenSach:'Machine Learning với Python',              tacGia:'Vũ Đình Mẫn',            nxb:'NXB Thông tin & TT',       namXB:2023, theLoai:'CNTT',      isbn:'9786045656789', ngonNgu:'Tiếng Việt', soTrang:520, viTriKe:'A1-05', soLuongTong:4, soLuongCon:1, giaBoiThuong:200000, giaNhap:135000, moTa:'Giới thiệu Machine Learning và ứng dụng với Python.' },
    { maSach:'S006', tenSach:'Mạng máy tính – Computer Networks',        tacGia:'Andrew S. Tanenbaum',     nxb:'NXB Đại học QG HN',        namXB:2018, theLoai:'CNTT',      isbn:'9786045667890', ngonNgu:'Tiếng Việt', soTrang:620, viTriKe:'A1-06', soLuongTong:3, soLuongCon:3, giaBoiThuong:180000, giaNhap:120000, moTa:'Sách kinh điển về mạng máy tính, bản dịch tiếng Việt.' },
    { maSach:'S007', tenSach:'Java – Lập trình hướng đối tượng',         tacGia:'Đặng Thị Thu Hiền',       nxb:'NXB Khoa học & KT',        namXB:2021, theLoai:'CNTT',      isbn:'9786045678901', ngonNgu:'Tiếng Việt', soTrang:450, viTriKe:'A1-07', soLuongTong:5, soLuongCon:0, giaBoiThuong:145000, giaNhap:92000,  moTa:'Toàn diện về lập trình Java hướng đối tượng.' },
    { maSach:'S008', tenSach:'React.js – Xây dựng ứng dụng web hiện đại',tacGia:'Phạm Huy Hoàng',         nxb:'NXB Lao động',             namXB:2022, theLoai:'CNTT',      isbn:'9786045689012', ngonNgu:'Tiếng Việt', soTrang:390, viTriKe:'A1-08', soLuongTong:6, soLuongCon:4, giaBoiThuong:155000, giaNhap:100000, moTa:'Hướng dẫn thực hành xây dựng SPA với React.js.' },
    // Văn học
    { maSach:'S009', tenSach:'Truyện Kiều',                               tacGia:'Nguyễn Du',               nxb:'NXB Văn học',              namXB:2019, theLoai:'Văn học',   isbn:'9786045690123', ngonNgu:'Tiếng Việt', soTrang:260, viTriKe:'B2-01', soLuongTong:10,soLuongCon:7, giaBoiThuong:80000,  giaNhap:45000,  moTa:'Tuyệt tác văn học Việt Nam bất hủ của đại thi hào Nguyễn Du.' },
    { maSach:'S010', tenSach:'Số đỏ',                                     tacGia:'Vũ Trọng Phụng',          nxb:'NXB Văn học',              namXB:2018, theLoai:'Văn học',   isbn:'9786045701234', ngonNgu:'Tiếng Việt', soTrang:290, viTriKe:'B2-02', soLuongTong:8, soLuongCon:5, giaBoiThuong:75000,  giaNhap:42000,  moTa:'Tiểu thuyết châm biếm nổi tiếng của văn học hiện thực Việt Nam.' },
    { maSach:'S011', tenSach:'Chí Phèo & Những truyện ngắn hay nhất',    tacGia:'Nam Cao',                 nxb:'NXB Văn học',              namXB:2020, theLoai:'Văn học',   isbn:'9786045712345', ngonNgu:'Tiếng Việt', soTrang:310, viTriKe:'B2-03', soLuongTong:7, soLuongCon:3, giaBoiThuong:85000,  giaNhap:50000,  moTa:'Tuyển tập truyện ngắn xuất sắc của nhà văn Nam Cao.' },
    { maSach:'S012', tenSach:'Dế Mèn phiêu lưu ký',                      tacGia:'Tô Hoài',                 nxb:'NXB Kim Đồng',             namXB:2021, theLoai:'Văn học',   isbn:'9786045723456', ngonNgu:'Tiếng Việt', soTrang:220, viTriKe:'B2-04', soLuongTong:12,soLuongCon:8, giaBoiThuong:65000,  giaNhap:38000,  moTa:'Tác phẩm thiếu nhi nổi tiếng nhất của văn học Việt Nam.' },
    { maSach:'S013', tenSach:'Chiến tranh và Hòa bình',                   tacGia:'Lev Tolstoy',             nxb:'NXB Văn học',              namXB:2019, theLoai:'Văn học',   isbn:'9786045734567', ngonNgu:'Tiếng Việt', soTrang:1200,viTriKe:'B2-05', soLuongTong:4, soLuongCon:2, giaBoiThuong:250000, giaNhap:160000, moTa:'Bộ tiểu thuyết đồ sộ về chiến tranh Napoléon, bản dịch tiếng Việt.' },
    { maSach:'S014', tenSach:'Tắt đèn',                                   tacGia:'Ngô Tất Tố',              nxb:'NXB Văn học',              namXB:2018, theLoai:'Văn học',   isbn:'9786045745678', ngonNgu:'Tiếng Việt', soTrang:190, viTriKe:'B2-06', soLuongTong:6, soLuongCon:4, giaBoiThuong:70000,  giaNhap:40000,  moTa:'Tiểu thuyết hiện thực phê phán về nông thôn Việt Nam trước 1945.' },
    { maSach:'S015', tenSach:'Hoàng tử bé',                               tacGia:'Antoine de Saint-Exupéry',nxb:'NXB Hội Nhà văn',          namXB:2022, theLoai:'Văn học',   isbn:'9786045756789', ngonNgu:'Tiếng Việt', soTrang:120, viTriKe:'B2-07', soLuongTong:15,soLuongCon:10,giaBoiThuong:55000,  giaNhap:30000,  moTa:'Tác phẩm kinh điển thế giới, bản dịch tiếng Việt.' },
    // Kinh tế
    { maSach:'S016', tenSach:'Kinh tế học vi mô',                         tacGia:'N. Gregory Mankiw',       nxb:'NXB Lao động – XH',        namXB:2020, theLoai:'Kinh tế',   isbn:'9786045767890', ngonNgu:'Tiếng Việt', soTrang:680, viTriKe:'C3-01', soLuongTong:5, soLuongCon:2, giaBoiThuong:220000, giaNhap:145000, moTa:'Giáo trình kinh tế học vi mô cơ bản, bản dịch tiếng Việt.' },
    { maSach:'S017', tenSach:'Kinh tế học vĩ mô',                         tacGia:'N. Gregory Mankiw',       nxb:'NXB Lao động – XH',        namXB:2020, theLoai:'Kinh tế',   isbn:'9786045778901', ngonNgu:'Tiếng Việt', soTrang:660, viTriKe:'C3-02', soLuongTong:5, soLuongCon:3, giaBoiThuong:220000, giaNhap:145000, moTa:'Giáo trình kinh tế học vĩ mô cơ bản, bản dịch tiếng Việt.' },
    { maSach:'S018', tenSach:'Tư duy nhanh và chậm',                      tacGia:'Daniel Kahneman',         nxb:'NXB Thế giới',             namXB:2021, theLoai:'Kinh tế',   isbn:'9786045789012', ngonNgu:'Tiếng Việt', soTrang:540, viTriKe:'C3-03', soLuongTong:8, soLuongCon:5, giaBoiThuong:180000, giaNhap:115000, moTa:'Khám phá hai hệ thống tư duy ảnh hưởng đến quyết định kinh tế.' },
    { maSach:'S019', tenSach:'Cha giàu cha nghèo',                        tacGia:'Robert T. Kiyosaki',      nxb:'NXB Lao động',             namXB:2019, theLoai:'Kinh tế',   isbn:'9786045790123', ngonNgu:'Tiếng Việt', soTrang:310, viTriKe:'C3-04', soLuongTong:10,soLuongCon:6, giaBoiThuong:110000, giaNhap:70000,  moTa:'Cuốn sách về tài chính cá nhân nổi tiếng toàn cầu.' },
    { maSach:'S020', tenSach:'Quản trị học',                              tacGia:'Nguyễn Thành Độ',         nxb:'NXB ĐH KTQD',              namXB:2020, theLoai:'Kinh tế',   isbn:'9786045801234', ngonNgu:'Tiếng Việt', soTrang:480, viTriKe:'C3-05', soLuongTong:6, soLuongCon:2, giaBoiThuong:160000, giaNhap:100000, moTa:'Giáo trình quản trị học dành cho sinh viên kinh tế.' },
    // Lịch sử
    { maSach:'S021', tenSach:'Đại Việt sử ký toàn thư – Tập 1',         tacGia:'Ngô Sĩ Liên',             nxb:'NXB Khoa học XH',          namXB:2017, theLoai:'Lịch sử',   isbn:'9786045812345', ngonNgu:'Tiếng Việt', soTrang:820, viTriKe:'D4-01', soLuongTong:3, soLuongCon:2, giaBoiThuong:280000, giaNhap:185000, moTa:'Bộ sử lớn nhất còn lại của Việt Nam thời trung đại.' },
    { maSach:'S022', tenSach:'Lịch sử Việt Nam từ nguồn gốc đến thế kỷ XIX',tacGia:'Đào Duy Anh',          nxb:'NXB Văn hóa Thông tin',    namXB:2016, theLoai:'Lịch sử',   isbn:'9786045823456', ngonNgu:'Tiếng Việt', soTrang:560, viTriKe:'D4-02', soLuongTong:4, soLuongCon:3, giaBoiThuong:190000, giaNhap:120000, moTa:'Tổng quan lịch sử dân tộc Việt từ thời kỳ đầu đến cận đại.' },
    { maSach:'S023', tenSach:'Sapiens: Lược sử loài người',               tacGia:'Yuval Noah Harari',       nxb:'NXB Tri thức',             namXB:2021, theLoai:'Lịch sử',   isbn:'9786045834567', ngonNgu:'Tiếng Việt', soTrang:580, viTriKe:'D4-03', soLuongTong:7, soLuongCon:4, giaBoiThuong:195000, giaNhap:125000, moTa:'Cuốn sách bán chạy toàn cầu về lịch sử nhân loại.' },
    { maSach:'S024', tenSach:'Lịch sử thế giới cận đại',                 tacGia:'Vũ Dương Ninh',           nxb:'NXB Giáo dục',             namXB:2019, theLoai:'Lịch sử',   isbn:'9786045845678', ngonNgu:'Tiếng Việt', soTrang:490, viTriKe:'D4-04', soLuongTong:5, soLuongCon:1, giaBoiThuong:165000, giaNhap:105000, moTa:'Giáo trình lịch sử thế giới cận đại cho bậc đại học.' },
    // Khoa học
    { maSach:'S025', tenSach:'Vũ trụ trong vỏ hạt dẻ',                   tacGia:'Stephen Hawking',         nxb:'NXB Trẻ',                  namXB:2020, theLoai:'Khoa học',   isbn:'9786045856789', ngonNgu:'Tiếng Việt', soTrang:216, viTriKe:'E5-01', soLuongTong:6, soLuongCon:4, giaBoiThuong:170000, giaNhap:110000, moTa:'Khoa học vũ trụ đương đại được giải thích cho đại chúng.' },
    { maSach:'S026', tenSach:'Lược sử thời gian',                         tacGia:'Stephen Hawking',         nxb:'NXB Trẻ',                  namXB:2019, theLoai:'Khoa học',   isbn:'9786045867890', ngonNgu:'Tiếng Việt', soTrang:274, viTriKe:'E5-02', soLuongTong:5, soLuongCon:3, giaBoiThuong:155000, giaNhap:98000,  moTa:'Khám phá bí ẩn của vũ trụ qua cái nhìn của nhà vật lý thiên tài.' },
    { maSach:'S027', tenSach:'Người thông minh không thể nghèo',         tacGia:'Brian Tracy',             nxb:'NXB Lao động',             namXB:2022, theLoai:'Khoa học',   isbn:'9786045878901', ngonNgu:'Tiếng Việt', soTrang:280, viTriKe:'E5-03', soLuongTong:8, soLuongCon:5, giaBoiThuong:120000, giaNhap:78000,  moTa:'Bí quyết tư duy làm giàu và thành công trong cuộc sống.' },
    { maSach:'S028', tenSach:'Toán học phổ thông – Giải tích',            tacGia:'Nguyễn Đình Trí',         nxb:'NXB Giáo dục',             namXB:2018, theLoai:'Khoa học',   isbn:'9786045889012', ngonNgu:'Tiếng Việt', soTrang:380, viTriKe:'E5-04', soLuongTong:4, soLuongCon:0, giaBoiThuong:130000, giaNhap:85000,  moTa:'Giáo trình giải tích toán học cho bậc đại học.' },
    // Tâm lý / Kỹ năng sống
    { maSach:'S029', tenSach:'Đắc nhân tâm',                              tacGia:'Dale Carnegie',           nxb:'NXB Tổng hợp TP.HCM',      namXB:2021, theLoai:'Kỹ năng',   isbn:'9786045890123', ngonNgu:'Tiếng Việt', soTrang:320, viTriKe:'F6-01', soLuongTong:12,soLuongCon:8, giaBoiThuong:100000, giaNhap:65000,  moTa:'Nghệ thuật giao tiếp và tạo ảnh hưởng đến con người.' },
    { maSach:'S030', tenSach:'Nghĩ giàu làm giàu',                        tacGia:'Napoleon Hill',           nxb:'NXB Lao động',             namXB:2020, theLoai:'Kỹ năng',   isbn:'9786045901234', ngonNgu:'Tiếng Việt', soTrang:350, viTriKe:'F6-02', soLuongTong:9, soLuongCon:6, giaBoiThuong:115000, giaNhap:74000,  moTa:'Triết lý thành công và làm giàu nổi tiếng nhất mọi thời đại.' },
    { maSach:'S031', tenSach:'Thói quen nguyên tử',                       tacGia:'James Clear',             nxb:'NXB Thế giới',             namXB:2022, theLoai:'Kỹ năng',   isbn:'9786045912345', ngonNgu:'Tiếng Việt', soTrang:302, viTriKe:'F6-03', soLuongTong:10,soLuongCon:7, giaBoiThuong:125000, giaNhap:82000,  moTa:'Phương pháp xây dựng thói quen tốt và loại bỏ thói quen xấu.' },
    { maSach:'S032', tenSach:'Sức mạnh của thói quen',                    tacGia:'Charles Duhigg',          nxb:'NXB Lao động',             namXB:2019, theLoai:'Kỹ năng',   isbn:'9786045923456', ngonNgu:'Tiếng Việt', soTrang:370, viTriKe:'F6-04', soLuongTong:7, soLuongCon:4, giaBoiThuong:120000, giaNhap:78000,  moTa:'Khoa học và bí quyết hình thành thói quen trong cuộc sống.' },
    // Giáo khoa / Tham khảo
    { maSach:'S033', tenSach:'Giáo trình Triết học Mác – Lênin',          tacGia:'Bộ GD & ĐT',             nxb:'NXB Chính trị QG – ST',    namXB:2021, theLoai:'Giáo khoa', isbn:'9786045934567', ngonNgu:'Tiếng Việt', soTrang:420, viTriKe:'G7-01', soLuongTong:15,soLuongCon:10,giaBoiThuong:95000,  giaNhap:60000,  moTa:'Giáo trình môn Triết học Mác – Lênin theo chương trình mới.' },
    { maSach:'S034', tenSach:'Giáo trình Kinh tế chính trị Mác – Lênin', tacGia:'Bộ GD & ĐT',             nxb:'NXB Chính trị QG – ST',    namXB:2021, theLoai:'Giáo khoa', isbn:'9786045945678', ngonNgu:'Tiếng Việt', soTrang:390, viTriKe:'G7-02', soLuongTong:15,soLuongCon:9, giaBoiThuong:90000,  giaNhap:57000,  moTa:'Giáo trình môn Kinh tế chính trị Mác – Lênin theo chương trình mới.' },
    { maSach:'S035', tenSach:'Giáo trình Tư tưởng Hồ Chí Minh',          tacGia:'Bộ GD & ĐT',             nxb:'NXB Chính trị QG – ST',    namXB:2021, theLoai:'Giáo khoa', isbn:'9786045956789', ngonNgu:'Tiếng Việt', soTrang:380, viTriKe:'G7-03', soLuongTong:15,soLuongCon:8, giaBoiThuong:90000,  giaNhap:57000,  moTa:'Giáo trình môn Tư tưởng Hồ Chí Minh theo chương trình mới.' },
    // Ngoại ngữ
    { maSach:'S036', tenSach:'English Grammar in Use – 5th Edition',      tacGia:'Raymond Murphy',          nxb:'Cambridge University Press',namXB:2019, theLoai:'Ngoại ngữ', isbn:'9780521189064', ngonNgu:'Tiếng Anh', soTrang:394, viTriKe:'H8-01', soLuongTong:6, soLuongCon:3, giaBoiThuong:350000, giaNhap:220000, moTa:'Giáo trình ngữ pháp tiếng Anh thực hành hàng đầu thế giới.' },
    { maSach:'S037', tenSach:'IELTS Fighter – Bộ đề thi IELTS',           tacGia:'Lê Thị Lan Anh',          nxb:'NXB Dân trí',              namXB:2022, theLoai:'Ngoại ngữ', isbn:'9786045967890', ngonNgu:'Tiếng Anh', soTrang:430, viTriKe:'H8-02', soLuongTong:8, soLuongCon:5, giaBoiThuong:175000, giaNhap:112000, moTa:'Tổng hợp bộ đề thi IELTS kèm hướng dẫn giải chi tiết.' },
    { maSach:'S038', tenSach:'Tiếng Nhật cho người mới bắt đầu – Minna',  tacGia:'3A Corporation',          nxb:'NXB Trẻ',                  namXB:2020, theLoai:'Ngoại ngữ', isbn:'9786045978901', ngonNgu:'Tiếng Nhật',soTrang:320, viTriKe:'H8-03', soLuongTong:5, soLuongCon:2, giaBoiThuong:195000, giaNhap:125000, moTa:'Giáo trình tiếng Nhật Minna no Nihongo bản song ngữ.' },
    // Nghệ thuật
    { maSach:'S039', tenSach:'Lịch sử nghệ thuật thế giới',               tacGia:'E.H. Gombrich',           nxb:'NXB Mỹ thuật',             namXB:2018, theLoai:'Nghệ thuật', isbn:'9786045989012', ngonNgu:'Tiếng Việt', soTrang:688, viTriKe:'I9-01', soLuongTong:3, soLuongCon:2, giaBoiThuong:320000, giaNhap:205000, moTa:'Tổng quan về lịch sử nghệ thuật từ thời cổ đại đến hiện đại.' },
    // Y học / Sức khỏe
    { maSach:'S040', tenSach:'Sức khỏe toàn diện – Bí quyết sống thọ',    tacGia:'Nguyễn Lân Việt',         nxb:'NXB Y học',                namXB:2021, theLoai:'Y học',      isbn:'9786045990123', ngonNgu:'Tiếng Việt', soTrang:260, viTriKe:'J10-01',soLuongTong:7, soLuongCon:5, giaBoiThuong:130000, giaNhap:85000,  moTa:'Hướng dẫn chăm sóc sức khỏe và phòng ngừa bệnh tật.' },
    // Pháp luật
    { maSach:'S041', tenSach:'Bộ luật Dân sự Việt Nam 2015 – Bình luận',  tacGia:'Bộ Tư pháp',             nxb:'NXB Tư pháp',              namXB:2020, theLoai:'Pháp luật',  isbn:'9786046001234', ngonNgu:'Tiếng Việt', soTrang:780, viTriKe:'K11-01',soLuongTong:4, soLuongCon:2, giaBoiThuong:250000, giaNhap:160000, moTa:'Bình luận và giải thích Bộ luật Dân sự 2015.' },
    { maSach:'S042', tenSach:'Luật Doanh nghiệp và hướng dẫn thi hành',   tacGia:'Nguyễn Văn Phương',       nxb:'NXB Tư pháp',              namXB:2021, theLoai:'Pháp luật',  isbn:'9786046012345', ngonNgu:'Tiếng Việt', soTrang:560, viTriKe:'K11-02',soLuongTong:5, soLuongCon:3, giaBoiThuong:200000, giaNhap:128000, moTa:'Toàn văn Luật Doanh nghiệp 2020 kèm hướng dẫn thực thi.' },
    // Truyện thiếu nhi
    { maSach:'S043', tenSach:'Doraemon – Tập 1',                           tacGia:'Fujiko F. Fujio',          nxb:'NXB Kim Đồng',             namXB:2020, theLoai:'Thiếu nhi',  isbn:'9786046023456', ngonNgu:'Tiếng Việt', soTrang:180, viTriKe:'L12-01',soLuongTong:20,soLuongCon:15,giaBoiThuong:40000,  giaNhap:22000,  moTa:'Bộ truyện tranh thiếu nhi nổi tiếng nhất Việt Nam.' },
    { maSach:'S044', tenSach:'Harry Potter và Hòn đá Phù thủy',           tacGia:'J.K. Rowling',            nxb:'NXB Trẻ',                  namXB:2021, theLoai:'Thiếu nhi',  isbn:'9786046034567', ngonNgu:'Tiếng Việt', soTrang:380, viTriKe:'L12-02',soLuongTong:8, soLuongCon:5, giaBoiThuong:120000, giaNhap:78000,  moTa:'Tập 1 bộ tiểu thuyết giả tưởng nổi tiếng nhất thế giới.' },
    // Địa lý / Du lịch
    { maSach:'S045', tenSach:'Non nước Việt Nam – Hướng dẫn du lịch',     tacGia:'Tổng cục Du lịch',        nxb:'NXB Hà Nội',               namXB:2022, theLoai:'Du lịch',    isbn:'9786046045678', ngonNgu:'Tiếng Việt', soTrang:520, viTriKe:'M13-01',soLuongTong:5, soLuongCon:4, giaBoiThuong:170000, giaNhap:108000, moTa:'Cẩm nang du lịch đầy đủ các tỉnh thành Việt Nam.' },
    // Thêm CNTT
    { maSach:'S046', tenSach:'Docker & Kubernetes – Thực chiến',           tacGia:'Bùi Văn Sơn',            nxb:'NXB Lao động',             namXB:2023, theLoai:'CNTT',      isbn:'9786046056789', ngonNgu:'Tiếng Việt', soTrang:460, viTriKe:'A1-09', soLuongTong:5, soLuongCon:3, giaBoiThuong:175000, giaNhap:112000, moTa:'Hướng dẫn triển khai ứng dụng với Docker và Kubernetes.' },
    { maSach:'S047', tenSach:'Thuật toán và cấu trúc dữ liệu',            tacGia:'Robert Sedgewick',        nxb:'NXB Đại học QG HN',        namXB:2020, theLoai:'CNTT',      isbn:'9786046067890', ngonNgu:'Tiếng Việt', soTrang:600, viTriKe:'A1-10', soLuongTong:4, soLuongCon:1, giaBoiThuong:200000, giaNhap:130000, moTa:'Giáo trình thuật toán và cấu trúc dữ liệu bậc đại học.' },
    { maSach:'S048', tenSach:'An toàn thông tin mạng',                    tacGia:'William Stallings',       nxb:'NXB Thông tin & TT',       namXB:2021, theLoai:'CNTT',      isbn:'9786046078901', ngonNgu:'Tiếng Việt', soTrang:520, viTriKe:'A1-11', soLuongTong:3, soLuongCon:2, giaBoiThuong:190000, giaNhap:122000, moTa:'Tổng quan về bảo mật hệ thống thông tin và mạng máy tính.' },
    { maSach:'S049', tenSach:'Trí tuệ nhân tạo – Một tiếp cận hiện đại', tacGia:'Stuart Russell',          nxb:'NXB Đại học QG HN',        namXB:2022, theLoai:'CNTT',      isbn:'9786046089012', ngonNgu:'Tiếng Việt', soTrang:720, viTriKe:'A1-12', soLuongTong:3, soLuongCon:0, giaBoiThuong:240000, giaNhap:155000, moTa:'Giáo trình AI chuẩn quốc tế, bản dịch tiếng Việt.' },
    { maSach:'S050', tenSach:'Điện toán đám mây – Nền tảng và ứng dụng', tacGia:'Đỗ Minh Tuấn',           nxb:'NXB Khoa học & KT',        namXB:2022, theLoai:'CNTT',      isbn:'9786046090123', ngonNgu:'Tiếng Việt', soTrang:380, viTriKe:'A1-13', soLuongTong:4, soLuongCon:2, giaBoiThuong:155000, giaNhap:98000,  moTa:'Giới thiệu cloud computing và các dịch vụ AWS, Azure, GCP.' }
  ],

  /* ── Phiếu mượn ──────────────────────────────────────────── */
  phieuMuon: [
    { maPhieu:'PM0001', maDG:'SV001', maNV:'U001', ngayMuon:'2024-11-01', hanTra:'2024-11-15', trangThai:'daTra',     danhSachSach:[{maSach:'S001',tenSach:'Lập trình C++ từ cơ bản đến nâng cao',soLuong:1},{maSach:'S002',tenSach:'Python cho người mới bắt đầu',soLuong:1}], ghiChu:'' },
    { maPhieu:'PM0002', maDG:'SV002', maNV:'U001', ngayMuon:'2024-11-05', hanTra:'2024-11-19', trangThai:'daTra',     danhSachSach:[{maSach:'S016',tenSach:'Kinh tế học vi mô',soLuong:1},{maSach:'S017',tenSach:'Kinh tế học vĩ mô',soLuong:1}], ghiChu:'' },
    { maPhieu:'PM0003', maDG:'SV003', maNV:'U002', ngayMuon:'2024-11-10', hanTra:'2024-11-24', trangThai:'daTra',     danhSachSach:[{maSach:'S009',tenSach:'Truyện Kiều',soLuong:1}], ghiChu:'' },
    { maPhieu:'PM0004', maDG:'SV005', maNV:'U002', ngayMuon:'2024-11-15', hanTra:'2024-11-29', trangThai:'quaHan',    danhSachSach:[{maSach:'S023',tenSach:'Sapiens: Lược sử loài người',soLuong:1}], ghiChu:'Quá hạn chưa trả' },
    { maPhieu:'PM0005', maDG:'SV006', maNV:'U001', ngayMuon:'2024-11-20', hanTra:'2024-12-04', trangThai:'dangMuon',  danhSachSach:[{maSach:'S005',tenSach:'Machine Learning với Python',soLuong:1},{maSach:'S007',tenSach:'Java – Lập trình hướng đối tượng',soLuong:1},{maSach:'S008',tenSach:'React.js – Xây dựng ứng dụng web hiện đại',soLuong:1}], ghiChu:'' },
    { maPhieu:'PM0006', maDG:'SV009', maNV:'U003', ngayMuon:'2024-11-22', hanTra:'2024-12-06', trangThai:'dangMuon',  danhSachSach:[{maSach:'S003',tenSach:'Cơ sở dữ liệu – Lý thuyết và thực hành',soLuong:1}], ghiChu:'' },
    { maPhieu:'PM0007', maDG:'SV010', maNV:'U001', ngayMuon:'2024-11-25', hanTra:'2024-12-09', trangThai:'dangMuon',  danhSachSach:[{maSach:'S033',tenSach:'Giáo trình Triết học Mác – Lênin',soLuong:1},{maSach:'S034',tenSach:'Giáo trình Kinh tế chính trị Mác – Lênin',soLuong:1}], ghiChu:'' },
    { maPhieu:'PM0008', maDG:'SV012', maNV:'U002', ngayMuon:'2024-10-01', hanTra:'2024-10-15', trangThai:'quaHan',    danhSachSach:[{maSach:'S029',tenSach:'Đắc nhân tâm',soLuong:1}], ghiChu:'Đã liên hệ nhắc nhở' },
    { maPhieu:'PM0009', maDG:'SV014', maNV:'U003', ngayMuon:'2024-11-28', hanTra:'2024-12-12', trangThai:'dangMuon',  danhSachSach:[{maSach:'S018',tenSach:'Tư duy nhanh và chậm',soLuong:1},{maSach:'S019',tenSach:'Cha giàu cha nghèo',soLuong:1}], ghiChu:'' },
    { maPhieu:'PM0010', maDG:'SV015', maNV:'U001', ngayMuon:'2024-09-15', hanTra:'2024-09-29', trangThai:'daTra',     danhSachSach:[{maSach:'S004',tenSach:'Thiết kế website với HTML, CSS & JavaScript',soLuong:1}], ghiChu:'' },
    { maPhieu:'PM0011', maDG:'SV017', maNV:'U002', ngayMuon:'2024-11-30', hanTra:'2024-12-14', trangThai:'dangMuon',  danhSachSach:[{maSach:'S021',tenSach:'Đại Việt sử ký toàn thư – Tập 1',soLuong:1},{maSach:'S022',tenSach:'Lịch sử Việt Nam từ nguồn gốc đến thế kỷ XIX',soLuong:1},{maSach:'S023',tenSach:'Sapiens: Lược sử loài người',soLuong:1}], ghiChu:'' },
    { maPhieu:'PM0012', maDG:'SV020', maNV:'U001', ngayMuon:'2024-12-01', hanTra:'2024-12-15', trangThai:'dangMuon',  danhSachSach:[{maSach:'S046',tenSach:'Docker & Kubernetes – Thực chiến',soLuong:1},{maSach:'S047',tenSach:'Thuật toán và cấu trúc dữ liệu',soLuong:1}], ghiChu:'' },
    { maPhieu:'PM0013', maDG:'SV022', maNV:'U003', ngayMuon:'2024-10-20', hanTra:'2024-11-03', trangThai:'daTra',     danhSachSach:[{maSach:'S010',tenSach:'Số đỏ',soLuong:1},{maSach:'S011',tenSach:'Chí Phèo & Những truyện ngắn hay nhất',soLuong:1}], ghiChu:'' },
    { maPhieu:'PM0014', maDG:'SV024', maNV:'U002', ngayMuon:'2024-12-02', hanTra:'2024-12-16', trangThai:'dangMuon',  danhSachSach:[{maSach:'S048',tenSach:'An toàn thông tin mạng',soLuong:1},{maSach:'S049',tenSach:'Trí tuệ nhân tạo – Một tiếp cận hiện đại',soLuong:1}], ghiChu:'' },
    { maPhieu:'PM0015', maDG:'SV025', maNV:'U001', ngayMuon:'2024-11-12', hanTra:'2024-11-26', trangThai:'daTra',     danhSachSach:[{maSach:'S036',tenSach:'English Grammar in Use – 5th Edition',soLuong:1}], ghiChu:'' },
    { maPhieu:'PM0016', maDG:'SV028', maNV:'U003', ngayMuon:'2024-12-03', hanTra:'2024-12-17', trangThai:'dangMuon',  danhSachSach:[{maSach:'S029',tenSach:'Đắc nhân tâm',soLuong:1},{maSach:'S031',tenSach:'Thói quen nguyên tử',soLuong:1},{maSach:'S032',tenSach:'Sức mạnh của thói quen',soLuong:1}], ghiChu:'' },
    { maPhieu:'PM0017', maDG:'SV029', maNV:'U001', ngayMuon:'2024-12-05', hanTra:'2024-12-19', trangThai:'dangMuon',  danhSachSach:[{maSach:'S001',tenSach:'Lập trình C++ từ cơ bản đến nâng cao',soLuong:1}], ghiChu:'' },
    { maPhieu:'PM0018', maDG:'SV001', maNV:'U002', ngayMuon:'2024-10-10', hanTra:'2024-10-24', trangThai:'daTra',     danhSachSach:[{maSach:'S025',tenSach:'Vũ trụ trong vỏ hạt dẻ',soLuong:1}], ghiChu:'' },
    { maPhieu:'PM0019', maDG:'SV007', maNV:'U001', ngayMuon:'2024-09-01', hanTra:'2024-09-15', trangThai:'quaHan',    danhSachSach:[{maSach:'S041',tenSach:'Bộ luật Dân sự Việt Nam 2015 – Bình luận',soLuong:1},{maSach:'S042',tenSach:'Luật Doanh nghiệp và hướng dẫn thi hành',soLuong:1}], ghiChu:'Đọc giả đang bị đình chỉ' },
    { maPhieu:'PM0020', maDG:'SV016', maNV:'U003', ngayMuon:'2024-12-06', hanTra:'2024-12-20', trangThai:'dangMuon',  danhSachSach:[{maSach:'S037',tenSach:'IELTS Fighter – Bộ đề thi IELTS',soLuong:1}], ghiChu:'' },
    { maPhieu:'PM0021', maDG:'SV030', maNV:'U002', ngayMuon:'2024-10-05', hanTra:'2024-10-19', trangThai:'daTra',     danhSachSach:[{maSach:'S015',tenSach:'Hoàng tử bé',soLuong:1}], ghiChu:'' },
    { maPhieu:'PM0022', maDG:'SV002', maNV:'U001', ngayMuon:'2024-12-07', hanTra:'2024-12-21', trangThai:'dangMuon',  danhSachSach:[{maSach:'S020',tenSach:'Quản trị học',soLuong:1}], ghiChu:'' }
  ],

  /* ── Phiếu phạt ──────────────────────────────────────────── */
  phieuPhat: [
    { maPhieuPhat:'PP0001', maPhieuMuon:'PM0004', maDG:'SV005', loaiViPham:'treHan',  soNgayTre:15, soTien:75000,  trangThai:'chuaThanhToan', ngayLap:'2024-12-14', ghiChu:'Quá hạn 15 ngày, 1 cuốn sách' },
    { maPhieuPhat:'PP0002', maPhieuMuon:'PM0008', maDG:'SV012', loaiViPham:'treHan',  soNgayTre:45, soTien:225000, trangThai:'chuaThanhToan', ngayLap:'2024-12-14', ghiChu:'Quá hạn 45 ngày, 1 cuốn sách' },
    { maPhieuPhat:'PP0003', maPhieuMuon:'PM0019', maDG:'SV007', loaiViPham:'treHan',  soNgayTre:90, soTien:900000, trangThai:'chuaThanhToan', ngayLap:'2024-12-14', ghiChu:'Quá hạn 90 ngày, 2 cuốn sách' },
    { maPhieuPhat:'PP0004', maPhieuMuon:'PM0001', maDG:'SV001', loaiViPham:'treHan',  soNgayTre:3,  soTien:30000,  trangThai:'daThanhToan',   ngayLap:'2024-11-18', ghiChu:'Trả trễ 3 ngày, 2 cuốn sách' },
    { maPhieuPhat:'PP0005', maPhieuMuon:'PM0003', maDG:'SV003', loaiViPham:'matSach', soNgayTre:0,  soTien:80000,  trangThai:'daThanhToan',   ngayLap:'2024-11-24', ghiChu:'Mất sách "Truyện Kiều", bồi thường theo giá quy định' },
    { maPhieuPhat:'PP0006', maPhieuMuon:'PM0010', maDG:'SV015', loaiViPham:'huHong',  soNgayTre:0,  soTien:50000,  trangThai:'daThanhToan',   ngayLap:'2024-09-29', ghiChu:'Sách bị rách bìa, tính 50% giá bồi thường' },
    { maPhieuPhat:'PP0007', maPhieuMuon:'PM0013', maDG:'SV022', loaiViPham:'treHan',  soNgayTre:7,  soTien:70000,  trangThai:'daThanhToan',   ngayLap:'2024-11-10', ghiChu:'Trả trễ 7 ngày, 2 cuốn sách' },
    { maPhieuPhat:'PP0008', maPhieuMuon:'PM0015', maDG:'SV025', loaiViPham:'treHan',  soNgayTre:2,  soTien:10000,  trangThai:'daThanhToan',   ngayLap:'2024-11-28', ghiChu:'Trả trễ 2 ngày, 1 cuốn sách' },
    { maPhieuPhat:'PP0009', maPhieuMuon:'PM0021', maDG:'SV030', loaiViPham:'treHan',  soNgayTre:1,  soTien:5000,   trangThai:'daThanhToan',   ngayLap:'2024-10-20', ghiChu:'Trả trễ 1 ngày, 1 cuốn sách' },
    { maPhieuPhat:'PP0010', maPhieuMuon:'PM0002', maDG:'SV002', loaiViPham:'huHong',  soNgayTre:0,  soTien:75000,  trangThai:'daThanhToan',   ngayLap:'2024-11-19', ghiChu:'Sách "Kinh tế học vi mô" bị ẩm mốc, bồi thường 50% giá' }
  ],

  /* ── Phiếu đặt chỗ ───────────────────────────────────────── */
  phieuDatCho: [
    { maDatCho:'DC0001', maDG:'SV003', maSach:'S007', ngayDat:'2024-12-01', hanLaySach:'2024-12-08', trangThai:'dangCho',  ghiChu:'Đặt chờ sách Java OOP' },
    { maDatCho:'DC0002', maDG:'SV011', maSach:'S005', ngayDat:'2024-11-28', hanLaySach:'2024-12-05', trangThai:'dangCho',  ghiChu:'Đặt chờ sách Machine Learning' },
    { maDatCho:'DC0003', maDG:'SV013', maSach:'S028', ngayDat:'2024-11-20', hanLaySach:'2024-11-27', trangThai:'hetHan',   ghiChu:'Không đến lấy đúng hạn' },
    { maDatCho:'DC0004', maDG:'SV023', maSach:'S049', ngayDat:'2024-12-05', hanLaySach:'2024-12-12', trangThai:'dangCho',  ghiChu:'Đặt sách AI chuẩn quốc tế' },
    { maDatCho:'DC0005', maDG:'SV026', maSach:'S013', ngayDat:'2024-11-15', hanLaySach:'2024-11-22', trangThai:'daNhan',   ghiChu:'Đã nhận sách Chiến tranh và Hòa bình' },
    { maDatCho:'DC0006', maDG:'SV030', maSach:'S036', ngayDat:'2024-12-06', hanLaySach:'2024-12-13', trangThai:'dangCho',  ghiChu:'Đặt sách English Grammar in Use' },
    { maDatCho:'DC0007', maDG:'SV019', maSach:'S047', ngayDat:'2024-10-10', hanLaySach:'2024-10-17', trangThai:'huy',      ghiChu:'Hủy theo yêu cầu độc giả' }
  ],

  /* ── Phiếu nhập ──────────────────────────────────────────── */
  phieuNhap: [
    {
      maPhieuNhap:'PN0001', ngayNhap:'2024-01-10', maNCC:'NCC001', nguoiNhap:'A001',
      danhSachSach:[
        {maSach:'S001',tenSach:'Lập trình C++ từ cơ bản đến nâng cao',soLuong:5,donGia:95000,thanhTien:475000},
        {maSach:'S002',tenSach:'Python cho người mới bắt đầu',soLuong:8,donGia:78000,thanhTien:624000},
        {maSach:'S003',tenSach:'Cơ sở dữ liệu – Lý thuyết và thực hành',soLuong:6,donGia:85000,thanhTien:510000}
      ],
      tongTien:1609000, vat:160900, chietKhau:80450, tongThanhToan:1689450, ghiChu:'Nhập đầu năm học'
    },
    {
      maPhieuNhap:'PN0002', ngayNhap:'2024-02-15', maNCC:'NCC002', nguoiNhap:'A001',
      danhSachSach:[
        {maSach:'S009',tenSach:'Truyện Kiều',soLuong:10,donGia:45000,thanhTien:450000},
        {maSach:'S010',tenSach:'Số đỏ',soLuong:8,donGia:42000,thanhTien:336000},
        {maSach:'S011',tenSach:'Chí Phèo & Những truyện ngắn hay nhất',soLuong:7,donGia:50000,thanhTien:350000},
        {maSach:'S012',tenSach:'Dế Mèn phiêu lưu ký',soLuong:12,donGia:38000,thanhTien:456000}
      ],
      tongTien:1592000, vat:159200, chietKhau:0, tongThanhToan:1751200, ghiChu:'Bổ sung sách văn học'
    },
    {
      maPhieuNhap:'PN0003', ngayNhap:'2024-04-20', maNCC:'NCC003', nguoiNhap:'A001',
      danhSachSach:[
        {maSach:'S033',tenSach:'Giáo trình Triết học Mác – Lênin',soLuong:15,donGia:60000,thanhTien:900000},
        {maSach:'S034',tenSach:'Giáo trình Kinh tế chính trị Mác – Lênin',soLuong:15,donGia:57000,thanhTien:855000},
        {maSach:'S035',tenSach:'Giáo trình Tư tưởng Hồ Chí Minh',soLuong:15,donGia:57000,thanhTien:855000}
      ],
      tongTien:2610000, vat:261000, chietKhau:130500, tongThanhToan:2740500, ghiChu:'Nhập giáo trình đại cương'
    },
    {
      maPhieuNhap:'PN0004', ngayNhap:'2024-07-05', maNCC:'NCC001', nguoiNhap:'A001',
      danhSachSach:[
        {maSach:'S046',tenSach:'Docker & Kubernetes – Thực chiến',soLuong:5,donGia:112000,thanhTien:560000},
        {maSach:'S047',tenSach:'Thuật toán và cấu trúc dữ liệu',soLuong:4,donGia:130000,thanhTien:520000},
        {maSach:'S048',tenSach:'An toàn thông tin mạng',soLuong:3,donGia:122000,thanhTien:366000},
        {maSach:'S049',tenSach:'Trí tuệ nhân tạo – Một tiếp cận hiện đại',soLuong:3,donGia:155000,thanhTien:465000},
        {maSach:'S050',tenSach:'Điện toán đám mây – Nền tảng và ứng dụng',soLuong:4,donGia:98000,thanhTien:392000}
      ],
      tongTien:2303000, vat:230300, chietKhau:115150, tongThanhToan:2418150, ghiChu:'Bổ sung sách CNTT mới nhất'
    },
    {
      maPhieuNhap:'PN0005', ngayNhap:'2024-09-01', maNCC:'NCC004', nguoiNhap:'A001',
      danhSachSach:[
        {maSach:'S029',tenSach:'Đắc nhân tâm',soLuong:12,donGia:65000,thanhTien:780000},
        {maSach:'S030',tenSach:'Nghĩ giàu làm giàu',soLuong:9,donGia:74000,thanhTien:666000},
        {maSach:'S031',tenSach:'Thói quen nguyên tử',soLuong:10,donGia:82000,thanhTien:820000},
        {maSach:'S032',tenSach:'Sức mạnh của thói quen',soLuong:7,donGia:78000,thanhTien:546000}
      ],
      tongTien:2812000, vat:281200, chietKhau:140600, tongThanhToan:2952600, ghiChu:'Bổ sung sách kỹ năng sống'
    }
  ],

  /* ── Phiếu xuất ──────────────────────────────────────────── */
  phieuXuat: [
    {
      maPhieuXuat:'PX0001', ngayXuat:'2024-03-10', lyDoXuat:'thanhLy', nguoiXuat:'A001',
      danhSachSach:[{maSach:'S028',tenSach:'Toán học phổ thông – Giải tích',soLuong:1,donGia:85000,lyDo:'Sách cũ, in năm 2010, không còn phù hợp chương trình'}],
      tongGiaTri:85000, ghiChu:'Thanh lý sách cũ quý I/2024'
    },
    {
      maPhieuXuat:'PX0002', ngayXuat:'2024-05-20', lyDoXuat:'huHong', nguoiXuat:'A001',
      danhSachSach:[
        {maSach:'S012',tenSach:'Dế Mèn phiêu lưu ký',soLuong:1,donGia:38000,lyDo:'Bìa bị ẩm mốc nghiêm trọng'},
        {maSach:'S015',tenSach:'Hoàng tử bé',soLuong:1,donGia:30000,lyDo:'Trang sách bị xé rách nhiều'}
      ],
      tongGiaTri:68000, ghiChu:'Xuất sách hư hỏng không sửa chữa được'
    },
    {
      maPhieuXuat:'PX0003', ngayXuat:'2024-08-15', lyDoXuat:'mat', nguoiXuat:'A001',
      danhSachSach:[{maSach:'S009',tenSach:'Truyện Kiều',soLuong:1,donGia:45000,lyDo:'Độc giả làm mất, đã thu tiền bồi thường'}],
      tongGiaTri:45000, ghiChu:'Xuất sách mất sau khi đã thu bồi thường'
    },
    {
      maPhieuXuat:'PX0004', ngayXuat:'2024-10-01', lyDoXuat:'thanhLy', nguoiXuat:'A001',
      danhSachSach:[
        {maSach:'S022',tenSach:'Lịch sử Việt Nam từ nguồn gốc đến thế kỷ XIX',soLuong:1,donGia:120000,lyDo:'Bản in cũ năm 2005'},
        {maSach:'S024',tenSach:'Lịch sử thế giới cận đại',soLuong:1,donGia:105000,lyDo:'Sách cũ, đã có bản mới'}
      ],
      tongGiaTri:225000, ghiChu:'Thanh lý sách cũ quý IV/2024'
    },
    {
      maPhieuXuat:'PX0005', ngayXuat:'2024-11-30', lyDoXuat:'huHong', nguoiXuat:'A001',
      danhSachSach:[{maSach:'S007',tenSach:'Java – Lập trình hướng đối tượng',soLuong:1,donGia:92000,lyDo:'Gáy sách bị bung, không thể đóng lại'}],
      tongGiaTri:92000, ghiChu:'Xuất sách hư hỏng quý IV/2024'
    }
  ],

  /* ── Nhà cung cấp ────────────────────────────────────────── */
  nhaCungCap: [
    { maNCC:'NCC001', tenNCC:'Công ty TNHH Sách Giáo Dục Việt',        loai:'NhaSanXuat',   diaChi:'25 Đinh Lễ, Hoàn Kiếm, Hà Nội',           dienThoai:'024.38248593', email:'info@sachgiaoduc.vn',    website:'www.sachgiaoduc.vn',    nguoiLienHe:'Nguyễn Văn Thịnh',   maSoThue:'0100111111', trangThai:'active', ghiChu:'Chuyên cung cấp sách CNTT và giáo khoa' },
    { maNCC:'NCC002', tenNCC:'NXB Văn Học – Chi nhánh HN',              loai:'NhaPhanPhoi',  diaChi:'18 Nguyễn Trường Tộ, Ba Đình, Hà Nội',     dienThoai:'024.37162158', email:'hanoibranch@vanhoathn.vn',website:'www.nxbvanhoc.com.vn',  nguoiLienHe:'Trần Thị Hoa',       maSoThue:'0100222222', trangThai:'active', ghiChu:'Chuyên cung cấp sách văn học, văn hóa' },
    { maNCC:'NCC003', tenNCC:'NXB Chính Trị Quốc Gia – Sự Thật',       loai:'NhaSanXuat',   diaChi:'6-8 Bà Triệu, Hoàn Kiếm, Hà Nội',         dienThoai:'024.38266263', email:'nxbctqg@nxbctqg.vn',    website:'www.nxbctqg.vn',        nguoiLienHe:'Lê Minh Quân',       maSoThue:'0100333333', trangThai:'active', ghiChu:'Cung cấp giáo trình đại cương' },
    { maNCC:'NCC004', tenNCC:'Công ty CP Phát hành Sách FAHASA',        loai:'NhaPhanPhoi',  diaChi:'185 Đinh Tiên Hoàng, Q.1, TP.HCM',        dienThoai:'028.38251564', email:'purchase@fahasa.com',    website:'www.fahasa.com',        nguoiLienHe:'Phạm Thị Lan',       maSoThue:'0300444444', trangThai:'active', ghiChu:'Nhà phân phối sách lớn toàn quốc' },
    { maNCC:'NCC005', tenNCC:'Công ty CP Sách Alpha',                    loai:'NhaPhanPhoi',  diaChi:'27 Huỳnh Khương Ninh, Q.1, TP.HCM',       dienThoai:'028.38224455', email:'books@alphabooks.vn',    website:'www.alphabooks.vn',     nguoiLienHe:'Hoàng Văn Dũng',     maSoThue:'0300555555', trangThai:'active', ghiChu:'Chuyên sách kinh tế, kỹ năng sống' },
    { maNCC:'NCC006', tenNCC:'NXB Giáo Dục Việt Nam',                   loai:'NhaSanXuat',   diaChi:'81 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội',    dienThoai:'024.38221368', email:'giaoduc@nxbgd.vn',      website:'www.nxbgd.vn',          nguoiLienHe:'Vũ Thị Hằng',        maSoThue:'0100666666', trangThai:'active', ghiChu:'NXB quốc gia chuyên giáo trình' },
    { maNCC:'NCC007', tenNCC:'Công ty TNHH Thư Viện Số Việt Nam',       loai:'NhaCungCap',   diaChi:'55 Giải Phóng, Hai Bà Trưng, Hà Nội',     dienThoai:'024.36286868', email:'contact@thuvienso.vn',  website:'www.thuvienso.vn',      nguoiLienHe:'Đặng Minh Tuấn',     maSoThue:'0100777777', trangThai:'active', ghiChu:'Cung cấp sách điện tử và tài nguyên số' },
    { maNCC:'NCC008', tenNCC:'Nhà sách Trí Tuệ',                        loai:'NhaBanLe',     diaChi:'10 Lê Thánh Tông, Hải Châu, Đà Nẵng',    dienThoai:'0236.3812345', email:'tritue@nhsach.vn',      website:'',                      nguoiLienHe:'Ngô Thị Bích',       maSoThue:'0400888888', trangThai:'active', ghiChu:'Nhà sách khu vực miền Trung' },
    { maNCC:'NCC009', tenNCC:'Công ty CP Văn Hóa Tổng Hợp',             loai:'NhaPhanPhoi',  diaChi:'133 Hùng Vương, Hồng Bàng, Hải Phòng',   dienThoai:'0225.3746789', email:'vanhoa@vhtonghe.vn',    website:'www.vhtonghop.vn',      nguoiLienHe:'Bùi Văn Long',       maSoThue:'0200999999', trangThai:'inactive', ghiChu:'Tạm ngừng hợp tác' },
    { maNCC:'NCC010', tenNCC:'NXB Trẻ – Chi nhánh Hà Nội',              loai:'NhaSanXuat',   diaChi:'161B Lý Chính Thắng, Q.3, TP.HCM',        dienThoai:'028.39316289', email:'hanoi@nxbtre.com.vn',   website:'www.nxbtre.com.vn',     nguoiLienHe:'Đinh Thị Thanh',     maSoThue:'0300101010', trangThai:'active', ghiChu:'Chuyên sách văn học dịch và khoa học phổ thông' },
    { maNCC:'NCC011', tenNCC:'Cambridge University Press Vietnam',       loai:'NhaSanXuat',   diaChi:'Unit 10, 63 Ly Thai To, Hoan Kiem, HN',   dienThoai:'024.39363668', email:'vietnam@cambridge.org', website:'www.cambridge.org',     nguoiLienHe:'David Nguyen',       maSoThue:'0100111213', trangThai:'active', ghiChu:'Nhà xuất bản ngoại văn chính thức' },
    { maNCC:'NCC012', tenNCC:'Công ty TNHH Nhập Khẩu Sách Quốc Tế',    loai:'NhaPhanPhoi',  diaChi:'29 Nguyễn Bỉnh Khiêm, Q.1, TP.HCM',      dienThoai:'028.38291122', email:'import@interbook.vn',   website:'www.interbook.vn',      nguoiLienHe:'Trần Quốc Hùng',     maSoThue:'0300121212', trangThai:'active', ghiChu:'Chuyên nhập khẩu sách ngoại ngữ' }
  ]
};
