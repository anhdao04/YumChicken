const URL_API = `http://localhost:3000`;
export const lay_loai = async () => {
    let loai_arr;
    loai_arr = await fetch(URL_API + "/loai").then(res => {
        return res.json();
    })
        .then(data => {
        return data;
    });
    let kq = ``;
    loai_arr.forEach(loai => {
        kq += `<li><a href="sptrongloai.html?id=${loai.id}">${loai.ten_loai}</a></li>`;
    });
    console.log(loai_arr);
    return kq;
};
const code_mot_sp = (sp) => {
    return `
    <div class="sp">
        <a href="sp.html?id=${sp.id}">
            <h3>${sp.ten_sp}</h3>
            <img src="${sp.hinh}">
            <p>Giá gốc: ${Number(sp.gia).toLocaleString("vi")} VNĐ</p>
            <p>Khuyến mãi: ${Number(sp.gia_km).toLocaleString("vi")} </p>
            <p>Ngày SX: ${new Date(sp.ngay).toLocaleDateString("vi")}</p>
            <p>Lượt xem: ${sp.luot_xem}</p>
        </a>
    </div>`;
};
export const lay_sp_moi = async (so_sp) => {
    let sp_arr;
    sp_arr = await fetch(URL_API + `/san_pham?_sort=-ngay&_limit=${so_sp}`)
        .then(res => res.json())
        .then(data => data);
    let kq = ``;
    sp_arr.forEach(sp => {
        kq += code_mot_sp(sp);
    });
    return kq;
};
export const lay_sp_noi_bat = async (so_sp) => {
    let sp_arr;
    sp_arr = await fetch(URL_API + `/san_pham?hot=1&_limit=${so_sp}`)
        .then(res => res.json())
        .then(data => data);
    let kq = ``;
    sp_arr.forEach(sp => {
        kq += code_mot_sp(sp);
    });
    return kq;
};
const code_mot_bv = (bv) => {
    return `
    <div class="bv">
        <h3>${bv.tieu_de}</h3>
        <p>${bv.mo_ta}</p>
    </div>`;
};
export const lay_bai_viet_moi = async (sobv) => {
    let bv_arr;
    bv_arr = await fetch(URL_API + `/bai_viet?_sort=-ngay&_limit=${sobv}`)
        .then(res => res.json())
        .then(data => data);
    let kq = ``;
    bv_arr.forEach(bv => {
        kq += code_mot_bv(bv);
    });
    return kq;
};
const code_mot_bl = (bl) => {
    return `
    <div class="bl">
        <h3>${bl.ho_ten}
            <span> ${new Date(bl.ngay).toLocaleDateString("vi")} 
                ${new Date(bl.ngay).toLocaleTimeString("vi")} 
            </span>

        </h3>
        <p>${bl.noi_dung}</p>
    </div>`;
};
export const lay_binh_luan = async (sobl = 6) => {
    let bl_arr;
    bl_arr = await fetch(URL_API + `/binh_luan?_sort=-ngay&_limit=${sobl}`)
        .then(res => res.json())
        .then(data => data);
    let kq = ``;
    bl_arr.forEach(bl => {
        kq += code_mot_bl(bl);
    });
    return kq;
};
const lay_anh_dep = async (tu_khoa, so_anh) => {
    let url = `https://api.pexels.com/v1/search?query=${tu_khoa}`;
    let apikey = `jWc26dihH0I2baTTt5KnIct0bhdYyCWByebs3e4A1rlMm33HG5meFoWp`;
    let data = await fetch(url, { headers: { Authorization: apikey } })
        .then(res => res.json()).then(data => data);
    console.log(data);
    let hinh_arr = data.photos;
    console.log("hinh_arr= ", hinh_arr);
    let str = ``;
    hinh_arr.forEach(h => {
        let mota = h.alt;
        let tacgia = h.photographer;
        let urlhinh = h.src.medium;
        str += `
            <div class="hinh">
                <img src="${urlhinh}">
                <p>${mota}</p>
                <p>${tacgia}</p>
            </div>
        `;
    });
    return str;
};
export { lay_anh_dep };
export const laysptheoloai = async (id_loai, sosp = 9) => {
    let data = await fetch(URL_API + `/san_pham?id_loai=${id_loai}&_sort=-ngay&_limit=${sosp}`)
        .then(res => res.json())
        .then(data => data);
    let str = ``;
    data.forEach(sp => {
        str += code_mot_sp(sp);
    });
    str = `
        <div id="sptheoloai" class="listsp">
            <h2>Sản phẩn theo loại</h2>
            <div id="data">${str}</div>
        </div>`;
    console.log("str", str);
    return str;
};
export const lay1sp = async (id = 0) => {
    let sp = await fetch(URL_API + `/san_pham/?id=${id}`)
        .then(res => res.json())
        .then(data => data[0]);
    let tt = await fetch(URL_API + `/thuoc_tinh?id=${id}`)
        .then(res => res.json())
        .then(data => data[0]);
    let { ten_sp, slug, sku, gia, gia_km, hinh, an_hien, mota, id_loai, ngay, han_sd, so_luong, hot, luot_xem } = sp;
    let { thanh_phan, cach_bao_quan, nguon_goc } = tt;
    let obj = { id, ten_sp, slug, sku, gia, gia_km, hinh, an_hien, mota, id_loai, ngay, han_sd, so_luong, hot, luot_xem, thanh_phan, cach_bao_quan, nguon_goc };
    let str = `
        <div id="left"><img src="${obj.hinh}"></div>
        <div id="middle">
            <h4>${obj.ten_sp}</h4>
            <p>Giá gốc: ${obj.gia} VNĐ</p>
            <p>Khuyến mãi: ${obj.gia_km} VNĐ </p>
            <p>Ngày sản xuất: ${obj.ngay}</p>
            <p>Hạn sử dụng: ${obj.han_sd}</p>
            <p>Số lượng: ${obj.so_luong}</p>
            <button class="btn btn-primary">Thêm vào giỏ hàng</button>
        </div>
        <div id="right">
            <p>Thành phần: ${obj.thanh_phan}</p>
            <p>Cách bảo quản: ${obj.cach_bao_quan}</p>
            <p>Nguồn gốc: ${obj.nguon_goc}</p>
            <p>Lượt xem: ${sp.luot_xem}</p>
        </div>`;
    str = `
        <div id="chitietsp">
            <h2>Chi tiết sản phẩm</h2>
            <div id="data">${str}</div>
        </div>`;
    return str;
};
