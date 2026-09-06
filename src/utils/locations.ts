import type { District, FlightLocation } from "../types/weather";

// ===== 28 HUYỆN — TỈNH GIA LAI MỚI (NQ 202/2025) =====
// Gia Lai cũ (17) + Bình Định cũ (11)

export const GIA_LAI_DISTRICTS: District[] = [
  // ==================== KHU VỰC GIA LAI CŨ ====================
  {
    id: "pleiku", name: "TP. Pleiku", type: "city", region: "gia_lai",
    centerLat: 13.9833, centerLon: 108.0000,
    communes: [
      "P. Pleiku", "P. Diên Hồng", "P. Chi Lăng", "P. Thống Nhất",
      "P. Trà Bá", "P. Thắng Lợi", "P. Yên Thế",
      "Xã Biển Hồ", "Xã Tân Sơn", "Xã Gào", "Xã An Phú",
      "Xã Chư Á", "Xã Ia Kênh", "Xã Chư Hdrông"
    ]
  },
  {
    id: "an_khe", name: "TX. An Khê", type: "town", region: "gia_lai",
    centerLat: 13.9544, centerLon: 108.6514,
    communes: [
      "P. An Khê", "P. An Bình", "P. An Phú", "P. An Tân",
      "Xã Cửu An", "Xã Song An", "Xã Tú An", "Xã Xuân An", "Xã Thành An"
    ]
  },
  {
    id: "ayun_pa", name: "TX. Ayun Pa", type: "town", region: "gia_lai",
    centerLat: 13.3906, centerLon: 108.4375,
    communes: [
      "P. Ayun Pa", "P. Sông Bờ", "P. Đoàn Kết", "P. Hòa Bình",
      "Xã Ia Rbol", "Xã Chư Băh", "Xã Ia Sao", "Xã Ia Rtô"
    ]
  },
  {
    id: "chu_pah", name: "H. Chư Păh", type: "district", region: "gia_lai",
    centerLat: 14.1300, centerLon: 108.0000,
    communes: [
      "TT. Phú Hòa", "Xã Hà Tây", "Xã Ia Khươl", "Xã Ia Phí",
      "Xã Ia Ly", "Xã Ia Mơ Nông", "Xã Ia Kreng", "Xã Đăk Tơ Ver",
      "Xã Hòa Phú", "Xã Chư Đăng Ya", "Xã Ia Ka", "Xã Ia Nhin"
    ]
  },
  {
    id: "chu_prong", name: "H. Chư Prông", type: "district", region: "gia_lai",
    centerLat: 13.7500, centerLon: 107.8333,
    communes: [
      "TT. Chư Prông", "Xã Ia Kly", "Xã Ia Drăng", "Xã Ia Boòng",
      "Xã Ia O", "Xã Ia Púch", "Xã Ia Me", "Xã Ia Vê",
      "Xã Ia Bang", "Xã Ia Pia", "Xã Ia Ga", "Xã Ia Lâu",
      "Xã Ia Piơr", "Xã Bàu Cạn", "Xã Bình Giáo", "Xã Ia Phìn",
      "Xã Ia Tôr", "Xã Thăng Hưng"
    ]
  },
  {
    id: "chu_puh", name: "H. Chư Pưh", type: "district", region: "gia_lai",
    centerLat: 13.5000, centerLon: 108.0000,
    communes: [
      "TT. Nhơn Hòa", "Xã Ia Hrú", "Xã Ia Rong", "Xã Ia Dreng",
      "Xã Ia Hla", "Xã Chư Don", "Xã Ia Phang", "Xã Ia Le", "Xã Ia Blứ"
    ]
  },
  {
    id: "chu_se", name: "H. Chư Sê", type: "district", region: "gia_lai",
    centerLat: 13.7167, centerLon: 108.0833,
    communes: [
      "Xã Chư Sê", "Xã Al Bá", "Xã Ayun", "Xã Bar Măih",
      "Xã Bờ Ngoong", "Xã Chư Pơng", "Xã H Bông", "Xã Ia HLốp",
      "Xã Ia Ko", "Xã Ia Tiêm", "Xã Kông Htok"
    ]
  },
  {
    id: "dak_doa", name: "H. Đak Đoa", type: "district", region: "gia_lai",
    centerLat: 14.1135, centerLon: 108.1666,
    communes: [
      "TT. Đak Đoa", "Xã Hà Đông", "Xã Đak Sơ Mei", "Xã Đak Krong",
      "Xã Hải Yang", "Xã Kon Gang", "Xã Tân Bình", "Xã Hnol",
      "Xã Ia Pết", "Xã Ia Băng", "Xã Glar", "Xã A Dơk",
      "Xã Trang", "Xã Hà Bầu", "Xã Nam Yang", "Xã K'Dang",
      "Xã H'Neng", "Xã Ia Dơk"
    ]
  },
  {
    id: "dak_po", name: "H. Đak Pơ", type: "district", region: "gia_lai",
    centerLat: 13.9333, centerLon: 108.5333,
    communes: [
      "Xã Đak Pơ", "Xã An Thành", "Xã Cư An", "Xã Hà Tam",
      "Xã Phú An", "Xã Tân An", "Xã Ya Hội", "Xã Yang Bắc"
    ]
  },
  {
    id: "duc_co", name: "H. Đức Cơ", type: "district", region: "gia_lai",
    centerLat: 13.7833, centerLon: 107.6167,
    communes: [
      "TT. Chư Ty", "Xã Ia Dom", "Xã Ia Nan", "Xã Ia Din",
      "Xã Ia Kla", "Xã Ia Kriêng", "Xã Ia Pnôn", "Xã Ia Lang", "Xã Ia Dơk"
    ]
  },
  {
    id: "ia_grai", name: "H. Ia Grai", type: "district", region: "gia_lai",
    centerLat: 13.9667, centerLon: 107.8167,
    communes: [
      "TT. Ia Kha", "Xã Ia Grăng", "Xã Ia Tô", "Xã Ia O",
      "Xã Ia Dêr", "Xã Ia Chia", "Xã Ia Pếch", "Xã Ia Sao",
      "Xã Ia Hrung", "Xã Ia Bă", "Xã Ia Krai", "Xã Ia Tơi"
    ]
  },
  {
    id: "ia_pa", name: "H. Ia Pa", type: "district", region: "gia_lai",
    centerLat: 13.4833, centerLon: 108.5500,
    communes: [
      "Xã Ia Pa", "Xã Chư Mố", "Xã Ia Kdăm", "Xã Ia Tul",
      "Xã Ia Broăi", "Xã Ia Trok", "Xã Kim Tân", "Xã Ia Mrơn",
      "Xã Chư Răng", "Xã Pờ Tó"
    ]
  },
  {
    id: "kbang", name: "H. Kbang", type: "district", region: "gia_lai",
    centerLat: 14.2833, centerLon: 108.6000,
    communes: [
      "TT. Kbang", "Xã Đak Roong", "Xã Kon Pne", "Xã Kông Lơng Khơng",
      "Xã Kông Pla", "Xã Krong", "Xã Lơ Ku", "Xã Nghĩa An",
      "Xã Sơ Pai", "Xã Sơn Lang", "Xã Tơ Tung", "Xã Đông",
      "Xã Đak Hlơ", "Xã Đak SMar"
    ]
  },
  {
    id: "kong_chro", name: "H. Kông Chro", type: "district", region: "gia_lai",
    centerLat: 13.7667, centerLon: 108.5667,
    communes: [
      "TT. Kông Chro", "Xã An Trung", "Xã Chơ Long", "Xã Đak Kơ Ning",
      "Xã Đak Pling", "Xã Đak Pơ Pho", "Xã Đak Tơ Pang", "Xã Đak Song",
      "Xã Kông Yang", "Xã SRó", "Xã Yang Nam", "Xã Yang Trung", "Xã Ya Ma"
    ]
  },
  {
    id: "krong_pa", name: "H. Krông Pa", type: "district", region: "gia_lai",
    centerLat: 13.2315, centerLon: 108.6549,
    communes: [
      "TT. Phú Túc", "Xã Chư Gu", "Xã Chư Ngọc", "Xã Chư Rcăm",
      "Xã Đất Bằng", "Xã Ia Hdreh", "Xã Ia Mlá", "Xã Ia Rsai",
      "Xã Ia Rsươm", "Xã Ia Rmok", "Xã Krông Năng", "Xã Phú Cần", "Xã Uar"
    ]
  },
  {
    id: "mang_yang", name: "H. Mang Yang", type: "district", region: "gia_lai",
    centerLat: 13.9667, centerLon: 108.3000,
    communes: [
      "TT. Kon Dơng", "Xã Ayun", "Xã Đak Djrăng", "Xã Đak Jơ Ta",
      "Xã Đak Ta Ley", "Xã Đak Yă", "Xã Hà Ra", "Xã Kon Chiêng",
      "Xã Kon Thụp", "Xã Lơ Pang", "Xã Đê Ar", "Xã Hra"
    ]
  },
  {
    id: "phu_thien", name: "H. Phú Thiện", type: "district", region: "gia_lai",
    centerLat: 13.4333, centerLon: 108.3833,
    communes: [
      "TT. Phú Thiện", "Xã Ayun Hạ", "Xã Chrôh Pơnan", "Xã Chư A Thai",
      "Xã Ia Ake", "Xã Ia Hiao", "Xã Ia Peng", "Xã Ia Piar",
      "Xã Ia Sol", "Xã Ia Yeng"
    ]
  },

  // ==================== KHU VỰC BÌNH ĐỊNH (11 ĐƠN VỊ HÀNH CHÍNH) ====================
  {
    id: "quy_nhon", name: "TP. Quy Nhơn", type: "city", region: "binh_dinh",
    centerLat: 13.7765, centerLon: 109.2237,
    communes: [
      "P. Trần Phú", "P. Lê Hồng Phong", "P. Trần Hưng Đạo", "P. Lê Lợi", "P. Thị Nại",
      "P. Đống Đa", "P. Hải Cảng", "P. Ngô Mây", "P. Nguyễn Văn Cừ", "P. Quang Trung",
      "P. Ghềnh Ráng", "P. Bùi Thị Xuân", "P. Trần Quang Diệu", "P. Nhơn Bình", "P. Nhơn Phú",
      "Xã Nhơn Lý", "Xã Nhơn Hội", "Xã Nhơn Hải", "Xã Nhơn Châu", "Xã Phước Mỹ"
    ]
  },
  {
    id: "an_nhon", name: "TX. An Nhơn", type: "town", region: "binh_dinh",
    centerLat: 13.8833, centerLon: 109.1167,
    communes: [
      "P. Bình Định", "P. Đập Đá", "P. Nhơn Hưng", "P. Nhơn Thành", "P. Nhơn Hòa",
      "Xã Nhơn An", "Xã Nhơn Phúc", "Xã Nhơn Lộc", "Xã Nhơn Thọ", "Xã Nhơn Khánh",
      "Xã Nhơn Mỹ", "Xã Nhơn Hậu", "Xã Nhơn Phong", "Xã Nhơn Tân", "Xã Nhơn Hạnh"
    ]
  },
  {
    id: "hoai_nhon", name: "TX. Hoài Nhơn", type: "town", region: "binh_dinh",
    centerLat: 14.3667, centerLon: 109.0167,
    communes: [
      "P. Bồng Sơn", "P. Tam Quan", "P. Tam Quan Bắc", "P. Tam Quan Nam", "P. Hoài Hảo",
      "P. Hoài Thanh Tây", "P. Hoài Thanh", "P. Hoài Hương", "P. Hoài Tân", "P. Hoài Xuân",
      "P. Hoài Đức", "Xã Hoài Sơn", "Xã Hoài Châu Bắc", "Xã Hoài Châu", "Xã Hoài Phú",
      "Xã Hoài Hải", "Xã Hoài Mỹ"
    ]
  },
  {
    id: "an_lao", name: "H. An Lão", type: "district", region: "binh_dinh",
    centerLat: 14.5500, centerLon: 108.9167,
    communes: [
      "TT. An Lão", "Xã An Dũng", "Xã An Hưng", "Xã An Trung", "Xã An Quang",
      "Xã An Vinh", "Xã An Toàn", "Xã An Tân", "Xã An Nghĩa", "Xã An Hòa"
    ]
  },
  {
    id: "hoai_an", name: "H. Hoài Ân", type: "district", region: "binh_dinh",
    centerLat: 14.3333, centerLon: 108.8833,
    communes: [
      "TT. Tăng Bạt Hổ", "Xã Ân Hảo Đông", "Xã Ân Hảo Tây", "Xã Ân Sơn", "Xã Ân Mỹ",
      "Xã Ân Tín", "Xã Ân Thạnh", "Xã Ân Phong", "Xã Ân Đức", "Xã Ân Tường Đông",
      "Xã Ân Tường Tây", "Xã Ân Hữu", "Xã Ân Nghĩa", "Xã Bok Tới", "Xã Đắk Mang"
    ]
  },
  {
    id: "phu_cat", name: "H. Phù Cát", type: "district", region: "binh_dinh",
    centerLat: 14.0500, centerLon: 109.0500,
    communes: [
      "TT. Ngô Mây", "TT. Cát Tiến", "Xã Cát Sơn", "Xã Cát Lâm", "Xã Cát Hanh",
      "Xã Cát Tài", "Xã Cát Minh", "Xã Cát Khánh", "Xã Cát Thành", "Xã Cát Hải",
      "Xã Cát Hiệp", "Xã Cát Trinh", "Xã Cát Tân", "Xã Cát Chánh", "Xã Cát Nhơn",
      "Xã Cát Thắng", "Xã Cát Tường", "Xã Cát Hưng"
    ]
  },
  {
    id: "phu_my", name: "H. Phù Mỹ", type: "district", region: "binh_dinh",
    centerLat: 14.2230, centerLon: 109.0861,
    communes: [
      "TT. Phù Mỹ", "TT. Bình Dương", "Xã Mỹ Đức", "Xã Mỹ Châu", "Xã Mỹ Thắng",
      "Xã Mỹ Lộc", "Xã Mỹ Lợi", "Xã Mỹ An", "Xã Mỹ Phong", "Xã Mỹ Trinh",
      "Xã Mỹ Thọ", "Xã Mỹ Thành", "Xã Mỹ Chánh", "Xã Mỹ Quang", "Xã Mỹ Chánh Tây",
      "Xã Mỹ Hiệp", "Xã Mỹ Tài", "Xã Mỹ Cát", "Xã Mỹ Hòa"
    ]
  },
  {
    id: "tay_son", name: "H. Tây Sơn", type: "district", region: "binh_dinh",
    centerLat: 13.9431, centerLon: 108.8800,
    communes: [
      "TT. Phú Phong", "Xã Bình Thuận", "Xã Tây An", "Xã Bình Hòa", "Xã Tây Bình",
      "Xã Bình Thành", "Xã Tây Vinh", "Xã Bình Tường", "Xã Tây Giang", "Xã Bình Nghi",
      "Xã Tây Thuận", "Xã Vĩnh An", "Xã Bình Tân", "Xã Tây Phú", "Xã Tây Xuân"
    ]
  },
  {
    id: "tuy_phuoc", name: "H. Tuy Phước", type: "district", region: "binh_dinh",
    centerLat: 13.8167, centerLon: 109.1500,
    communes: [
      "TT. Tuy Phước", "TT. Diêu Trì", "Xã Phước Thắng", "Xã Phước Quang", "Xã Phước Hưng",
      "Xã Phước Hòa", "Xã Phước Sơn", "Xã Phước Hiệp", "Xã Phước Lộc", "Xã Phước Nghĩa",
      "Xã Phước Thuận", "Xã Phước An", "Xã Phước Thành"
    ]
  },
  {
    id: "van_canh", name: "H. Vân Canh", type: "district", region: "binh_dinh",
    centerLat: 13.7000, centerLon: 108.9000,
    communes: [
      "TT. Vân Canh", "Xã Canh Liên", "Xã Canh Hiệp", "Xã Canh Thuận", "Xã Canh Hòa",
      "Xã Canh Hiển", "Xã Canh Vinh"
    ]
  },
  {
    id: "vinh_thanh", name: "H. Vĩnh Thạnh", type: "district", region: "binh_dinh",
    centerLat: 14.2500, centerLon: 108.6833,
    communes: [
      "TT. Vĩnh Thạnh", "Xã Vĩnh Sơn", "Xã Vĩnh Kim", "Xã Vĩnh Hảo", "Xã Vĩnh Hiệp",
      "Xã Vĩnh Thịnh", "Xã Vĩnh Thuận", "Xã Vĩnh Quang", "Xã Vĩnh Hòa"
    ]
  },
];

// ===== HELPERS =====

export function getDistrictLocations(): FlightLocation[] {
  return GIA_LAI_DISTRICTS.map((d) => ({
    id: d.id,
    name: d.name,
    lat: d.centerLat,
    lon: d.centerLon,
    district: d.name,
    isDistrictCenter: true,
  }));
}

export function flattenLocations(): FlightLocation[] {
  const result: FlightLocation[] = [];
  for (const d of GIA_LAI_DISTRICTS) {
    result.push({
      id: d.id, name: d.name,
      lat: d.centerLat, lon: d.centerLon,
      district: d.name, isDistrictCenter: true,
    });
    for (const commune of d.communes) {
      const slug = commune
        .replace(/^(P\.|TT\.|Xã)\s*/, "")
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d").replace(/Đ/g, "D")
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_|_$/g, "");
      result.push({
        id: `${d.id}__${slug}`, name: commune,
        lat: d.centerLat, lon: d.centerLon,
        district: d.name, isDistrictCenter: false,
      });
    }
  }
  return result;
}

export const DEFAULT_LOCATION: FlightLocation = {
  id: "pleiku", name: "TP. Pleiku",
  lat: 13.9833, lon: 108.0000,
  district: "TP. Pleiku", isDistrictCenter: true,
};

export const REGION_LABELS: Record<string, string> = {
  gia_lai: "Khu vực Gia Lai",
  binh_dinh: "Khu vực Bình Định",
};

export const NEW_PROVINCE_FULL_NAME = "Tỉnh Gia Lai (Mới - Mô hình 34 tỉnh thành)";
export const NEW_PROVINCE_SHORT_NAME = "Tỉnh Gia Lai";

