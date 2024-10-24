const URL_API = `http://localhost:3000`;
class CSanPham {
    id;
    ten_sp;
    slug;
    sku;
    gia;
    gia_km;
    hinh;
    an_hien;
    mota;
    id_loai;
    ngay;
    han_sd;
    so_luong;
    hot;
    luot_xem;
    constructor(id, ten_sp, slug, sku, gia, gia_km, hinh, an_hien, mota, id_loai, ngay, han_sd, so_luong, hot, luot_xem) { this.id = id; this.ten_sp = ten_sp; this.slug = slug; this.sku = sku; this.gia = gia; this.gia_km = gia_km; this.hinh = hinh; this.an_hien = an_hien; this.mota = mota; this.id_loai = id_loai; this.ngay = ngay; this.han_sd = han_sd; this.so_luong = so_luong; this.hot = hot; this.luot_xem = luot_xem; }
}
class CChicken extends CSanPham {
    id_sp;
    thanh_phan;
    cach_bao_quan;
    nguon_goc;
    constructor(id, ten_sp, slug, sku, gia, gia_km, hinh, an_hien, mota, id_loai, ngay, han_sd, so_luong, hot, luot_xem, id_sp, thanh_phan, cach_bao_quan, nguon_goc) {
        super(id, ten_sp, slug, sku, gia, gia_km, hinh, an_hien, mota, id_loai, ngay, han_sd, so_luong, hot, luot_xem);
        this.id_sp = id_sp;
        this.thanh_phan = thanh_phan;
        this.cach_bao_quan = cach_bao_quan;
        this.nguon_goc = nguon_goc;
    }
}
export { CSanPham, CChicken, URL_API };
