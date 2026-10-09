export type Faq = { group: string; q: string; a: string };

export const FAQ_GROUPS = ["Đặt món", "Về bữa ăn", "Dinh dưỡng", "Giao hàng"] as const;

/** Nội dung FAQ viết theo thông tin hiện có của Bếp. Các mục đánh dấu cần xác nhận nằm trong README. */
export const FAQS: Faq[] = [
  { group: "Đặt món", q: "Bếp Nhà Thanh hoạt động thế nào?", a: "Bếp nấu bữa trưa kiểu cơm nhà theo ngày: gạo lứt nấu lúc 6 giờ sáng, rau mua buổi sáng, đạm ướp từ tối hôm trước. Bạn chọn món, Bếp nấu và giao tận bàn làm việc trong khung giờ bạn chọn. Mỗi món ghi rõ kcal, Protein, Carb, Fat." },
  { group: "Đặt món", q: "Làm sao để đặt món?", a: "Vào mục Bữa trưa, chọn ngày và món, bấm Thêm. Sau đó mở giỏ hàng, điền tên, số điện thoại, địa chỉ, chọn khung giờ giao và phương thức thanh toán rồi bấm Đặt món. Bạn cũng có thể gọi 0939 729 955 để đặt qua điện thoại." },
  { group: "Đặt món", q: "Tôi cần đặt trước mấy giờ?", a: "Bếp nhận đơn cho bữa trưa hôm nay tới 10:30. Đặt sau giờ này, Bếp sẽ giao vào bữa trưa của ngày kế tiếp." },
  { group: "Đặt món", q: "Có những cách thanh toán nào?", a: "Tiền mặt khi nhận bowl, chuyển khoản (quét QR sau khi đặt) hoặc ví điện tử như MoMo, ZaloPay, VNPay." },
  { group: "Đặt món", q: "Tôi muốn đổi hoặc huỷ đơn thì sao?", a: "Bạn gọi Bếp sớm nhất có thể trước 10:30 cùng ngày để đổi món hoặc huỷ. Sau thời điểm này Bếp đã bắt đầu nấu nên khó thay đổi." },
  { group: "Về bữa ăn", q: "Phần ăn của Bếp có gì đặc biệt?", a: "Cơm gạo lứt nấu trong ngày, rau hái sáng, đạm nạc như ức gà, cá hồi, đậu hũ, ít dầu và sốt để riêng để bạn tự rưới theo khẩu vị. Mỗi bowl cân theo khẩu phần chuẩn trước khi đóng hộp." },
  { group: "Về bữa ăn", q: "Món ăn có bị nhạt không?", a: "Bếp nêm vừa phải để giữ vị nguyên liệu. Nếu bạn thích đậm hơn, hãy rưới thêm sốt đi kèm. Bạn cũng có thể nhắn Bếp ở phần ghi chú đơn hàng để điều chỉnh khẩu vị." },
  { group: "Về bữa ăn", q: "Có món chay không?", a: "Có. Mỗi ngày Bếp luôn có ít nhất một món chay. Bạn dùng bộ lọc Thuần chay ở mục Tất cả món để xem các món chay." },
  { group: "Về bữa ăn", q: "Tôi bị dị ứng thì chọn món thế nào?", a: "Trang chi tiết của mỗi món ghi dòng \"Có chứa\" các thành phần dễ gây dị ứng như mè, đậu nành, đậu phộng, cá, trứng. Nếu bạn dị ứng nặng, hãy gọi Bếp trước khi đặt để được tư vấn." },
  { group: "Dinh dưỡng", q: "Số liệu kcal và macro có chính xác không?", a: "Bếp tính theo khẩu phần chuẩn, sai số khoảng 10% do nguyên liệu tươi và cách nấu. Sốt tính riêng, nên chưa gồm sốt bạn rưới thêm. Số liệu mang tính tham khảo, không thay lời khuyên của bác sĩ hay chuyên gia dinh dưỡng." },
  { group: "Dinh dưỡng", q: "Đĩa Macro là gì?", a: "Là vòng tròn quanh mỗi bowl với ba cung màu: hồng là Protein, xanh lá là Carb, cam là Fat. Độ dài mỗi cung tỉ lệ theo năng lượng (Protein và Carb 4 kcal mỗi gram, Fat 9 kcal mỗi gram), nên nhìn qua là biết món nghiêng về đạm hay tinh bột." },
  { group: "Dinh dưỡng", q: "Ăn món của Bếp có giúp giảm cân không?", a: "Bếp không hứa hẹn kết quả cân nặng. Bữa ăn của Bếp cân đối đạm, xơ và năng lượng, ghi rõ con số để bạn dễ tính cho cả ngày. Nếu bạn có mục tiêu cụ thể về sức khoẻ, nên hỏi ý kiến bác sĩ hoặc chuyên gia dinh dưỡng." },
  { group: "Dinh dưỡng", q: "Món của Bếp có phải low-carb không?", a: "Không. Bếp dùng gạo lứt, quinoa, bún và khoai để bữa trưa đủ năng lượng cho buổi chiều làm việc. Món nhiều đạm, ít kcal nằm trong nhóm Nhiều đạm và Dưới 450 kcal." },
  { group: "Giao hàng", q: "Bếp giao trong khung giờ nào?", a: "Bữa trưa giao từ 11:00 đến 12:30. Khi đặt, bạn chọn một trong ba khung: 11:00–11:30, 11:30–12:00 hoặc 12:00–12:30. Phí giao là 19.000đ." },
  { group: "Giao hàng", q: "Bếp giao tới khu vực nào?", a: "Bếp đặt tại Số 5 Võ Oanh, Bình Thạnh, TP. Hồ Chí Minh và giao nội thành thành phố. Nhập địa chỉ khi đặt hoặc gọi Bếp để kiểm tra khu vực của bạn." },
  { group: "Giao hàng", q: "Món giao tươi hay đông lạnh? Nên bảo quản thế nào?", a: "Bếp nấu và giao trong ngày, không cấp đông. Bạn nên ăn trong 2 giờ sau khi nhận. Nếu chưa ăn ngay, để ngăn mát và dùng trong ngày. Hâm phần cơm, thịt khoảng 60 giây, rau và sốt để nguội." },
  { group: "Giao hàng", q: "Tôi có thể đến lấy món tại Bếp không?", a: "Được. Bếp mở cửa 8:00–12:00 tại Số 5 Võ Oanh, Bình Thạnh. Bạn nên gọi 0939 729 955 trước để Bếp chuẩn bị sẵn phần của bạn." },
];
