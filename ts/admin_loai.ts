import{ URL_API, TLoai} from './commom.js';
export const form_them_loai = () => {  
    return`
        <form class="col-9 m-auto border border-primary p-2">
            <h2>Thêm loại sản phẩm</h2>
            <div class="mb-3">
                Tên loại: <input id="ten_loai" class="form-control border-primary" type="text">
            </div>
            <div class="mb-3">
                Nguồn gốc: <input id="nguon_goc" class="form-control border-primary" type="text">
            </div>
             <div class="mb-3">
                Mô tả: <input id="mo_ta" class="form-control border-primary" type="text">
            </div>
            <div class="mb-3">
                Xuất xứ: <input id="xuat_xu" class="form-control border-primary" type="text">
            </div>
            <button id="btn" type="button" class="btn btn-primary px-3">Thêm</button>
        </form>
    `
}
export const them_loai = async() =>{
    let ten_loai:string = (document.querySelector("#ten_loai") as HTMLInputElement).value;
    let nguon_goc:string = (document.querySelector("#nguon_goc") as HTMLInputElement).value;
    let mo_ta:string = (document.querySelector("#mo_ta") as HTMLInputElement).value;
    let xuat_xu:string = (document.querySelector("#xuat_xu") as HTMLInputElement).value;
    
    let data = {ten_loai:ten_loai, nguon_goc:nguon_goc, mo_ta:mo_ta, xuat_xu:xuat_xu}
    let opt = {method:"post", body:JSON.stringify(data), headers:{"Content-type":"application/json"}}
    let kq = await fetch(URL_API +"/loai", opt) 
    .then(req => req.json()).then(data=> data);
    document.location ="list_loai.html"; 
}
export const loai_list = async() =>{
    let data = await fetch(URL_API +"/loai") 
    .then(req => req.json()).then(data=> data);
    let listloai_arr:TLoai[] = data as TLoai[];
    let str=``;
    listloai_arr.forEach(loai => str += motloai(loai));
    str=`
        <div id="listnhasx" class="listnhasx p-4">
        <h2 class="text-xl font-bold mb-4">
            Quản trị nhà sản xuất 
            <a href="them_loai.html" class="float-end text-blue-500">Thêm</a>
        </h2>
        <div id="data">
            <div class="nsx flex justify-between font-bold">
                <b>id</b>
                <b>Tên loại</b>
                <b>Nguồn gốc</b>
                <b>Mô tả</b>
                <b>Xuất xứ</b>
            </div>
            ${str}
        </div>
    </div>`;
    return str; 
}
const motloai = (loai:TLoai) =>
    `<div class="loai">
        <span>${loai.id}</span>
        <span>${loai.ten_loai}</span>
        <span>${loai.nguon_goc}</span>
        <span>${loai.mo_ta}</span>
        <span>${loai.xuat_xu}</span>
        <span>
            <a href="nha_sx_sua.html?${loai.id}" class="btn btn-warning px-3 me-1">Sửa</a>
            <button idloai="${loai.id}" class="btn btn-danger px-3 btnxoa">Xóa</button>
        </span>
    </div>`

    export const xoa_loai = async(btn:HTMLButtonElement) =>{
        let id:string = btn.getAttribute("idloai");
        let hoi:boolean = window.confirm("Bạn có muốn xóa không?");
        if(hoi==false) return;
        let opt = {method:"delete"}
        let kq  = await fetch(URL_API+ `/loai/${id}`, opt).then(req => req.json()).then(data =>data)
        document.location = "list_loai.html";
    }
    
   