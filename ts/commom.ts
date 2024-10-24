const URL_API = `http://localhost:3000`;
type TLoai = {
    id: number;
    ten_loai: string;
    nguon_goc: string;
    mo_ta: string;
    xuat_xu: string
}
type TSanPham = {
    id: number;
    ten_sp: string;
    slug: string;
    sku: string;
    gia: number;
    gia_km: number;
    hinh: string;
    an_hien: number;
    mota: string;
    id_loai: number;
    ngay: string;
    han_sd: string;
    so_luong: number;
    hot: number;
    luot_xem: number;
}
interface IBaiViet {
    id: number;
    tieu_de: string;
    mo_ta: string;
    noi_dung: string;
    ngay: string;
    hinh: string;
    id_loai: string;

}
interface IBinhLuan {
    id: number;
    noi_dung: string;
    ngay: string;
    id_sp: number;
    id_user: number;
    ho_ten: string;
    email: string;
}
type THinh_Anh = {
    id:number;
    alt:string;
    photographer:string;
}
type TThuocTinh = {
    id:number;
    id_sp:number;
    thanh_phan:string;
    cach_bao_quan:string;
    nguon_goc:string;
}  
class CSanPham implements TSanPham{
    id: number; ten_sp: string; slug: string; sku: string; gia: number; gia_km: number; hinh: string; an_hien: number; 
    mota: string; id_loai: number; ngay: string; han_sd: string; so_luong: number; hot: number; luot_xem: number;
    constructor( id: number, ten_sp: string, slug: string, sku: string, gia: number, gia_km: number, hinh: string, an_hien: number, mota: string, id_loai: number, ngay: string, han_sd: string, so_luong: number, hot: number, luot_xem: number )
    { this.id = id; this.ten_sp = ten_sp; this.slug = slug; this.sku = sku; this.gia = gia; this.gia_km = gia_km; this.hinh = hinh; this.an_hien = an_hien; this.mota = mota; this.id_loai = id_loai; this.ngay = ngay; this.han_sd = han_sd; this.so_luong = so_luong; this.hot = hot; this.luot_xem = luot_xem; }
}
class CChicken extends CSanPham implements TThuocTinh{
    id_sp:number;thanh_phan:string;cach_bao_quan:string;nguon_goc:string;
    constructor(id: number, ten_sp: string, slug: string, sku: string, gia: number, gia_km: number, hinh: string, an_hien: number,
        mota: string, id_loai: number, ngay: string, han_sd: string, so_luong: number, hot: number, luot_xem: number,
        id_sp: number, thanh_phan: string, cach_bao_quan: string, nguon_goc: string) {
        super(id, ten_sp, slug, sku, gia, gia_km, hinh, an_hien, mota, id_loai, ngay, han_sd, so_luong, hot, luot_xem);
        this.id_sp = id_sp;
        this.thanh_phan = thanh_phan;
        this.cach_bao_quan = cach_bao_quan;
        this.nguon_goc = nguon_goc;
    }
}
type TNha_SX = {
    id: number;
    ten: string;
    thu_tu: number;
    an_hien: number;
}

export{CSanPham, CChicken, TSanPham, URL_API, TNha_SX, TLoai} 