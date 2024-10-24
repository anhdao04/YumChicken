import{ URL_API, TNha_SX, TLoai} from './commom.js';
export const form_them_nha_sx = () => {  
    return`
        <form class="col-9 m-auto border border-primary p-2">
            <div class="mb-3">
                Tên <input id="ten" class="form-control border-primary" type="text">
            </div>
            <div class="mb-3">
                Thứ tự <input id="thu_tu" class="form-control border-primary" type="number">
            </div>
            <div class="mb-3">
                Ẩn hiện
                <input name="an_hien" value="0" type="radio"> Ẩn
                <input name="an_hien" value="1" type="radio" checked> Hiện
            </div>
            <button id="btn" type="button" class="btn btn-primary px-3">Thêm</button>
        </form>
    `
}
export const them_nha_sx = async() =>{
    let ten:string = (document.querySelector("#ten") as HTMLInputElement).value;
    let thu_tu:number = Number((document.querySelector("#thu_tu") as HTMLInputElement).value);
    let anhien:string = (document.querySelector("[name = an_hien]:checked") as HTMLInputElement).value;
    
    let data = {ten:ten, thu_tu:thu_tu, an_hien:anhien}
    let opt = {method:"post", body:JSON.stringify(data), headers:{"Content-type":"application/json"}}
    let kq = await fetch(URL_API +"/nha_sx", opt) 
    .then(req => req.json()).then(data=> data);
    document.location ="nha_sx_list.html"; 
}
export const list_nha_sx = async() =>{
    let data = await fetch(URL_API +"/nha_sx") 
    .then(req => req.json()).then(data=> data);
    let listsx_arr:TNha_SX[] = data as TNha_SX[];
    let str=``;
    listsx_arr.forEach(nsx => str += motnhasx(nsx));
    str=`
        <div id="listnhasx" class="listnhasx p-4">
        <h2 class="text-xl font-bold mb-4">
            Quản trị nhà sản xuất 
            <a href="nha_sx_them.html" class="float-end text-blue-500">Thêm</a>
        </h2>
        <div id="data">
            <div class="nsx flex justify-between font-bold">
                <b>id</b>
                <b>Tên</b>
                <b>Thứ tự</b>
                <b>Ẩn hiện</b>
                <b>Thao tác</b>
            </div>
            ${str}
        </div>
    </div>`;
    return str; 
}
const motnhasx = (nsx:TNha_SX) =>
    `<div class="nsx">
        <span>${nsx.id}</span>
        <span>${nsx.ten}</span>
        <span>${nsx.thu_tu}</span>
        <span>${nsx.an_hien==0? 'Đang ấn':'Đang hiện'}</span>
        <span>
            <a href="nha_sx_sua.html?${nsx.id}" class="btn btn-warning px-3 me-1">Sửa</a>
            <button idnsx="${nsx.id}" class="btn btn-danger px-3 btnxoa">Xóa</button>
        </span>
    </div>`

    export const xoa_nha_sx = async(btn:HTMLButtonElement) =>{
        let id:string = btn.getAttribute("idnsx");
        let hoi:boolean = window.confirm("Bạn có muốn xóa không?");
        if(hoi==false) return;
        let opt = {method:"delete"}
        let kq  = await fetch(URL_API+ `/nha_sx/${id}`, opt).then(req => req.json()).then(data =>data)
        document.location = "nha_sx_list.html";
    }
    export const form_sua_nha_sx = async( id:string) => {  
        let url:string = URL_API + `/nha_sx/?id=${id}`;
        let nsx = await fetch(url).then(req => req.json()).then(data =>data[0])
        return`
        <form class="col-9 m-auto border border-primary p-2">
            <div class="mb-3">
                Tên <input id="ten" value="${nsx.ten}" class="form-control border-primary" type="text">
            </div>
            <div class="mb-3">
                Thứ tự <input id="thu_tu" value="${nsx.thu_tu}" class="form-control border-primary" type="number">
            </div>
            <div class="mb-3">
                Ẩn hiện
                <input name="an_hien" value="0" type="radio" ${nsx.an_hien==0? 'checked':''}> Ẩn
                <input name="an_hien" value="1" type="radio" ${nsx.an_hien==1? 'checked':''}> Hiện
            </div>
            <input type="hidden" id="id" value="${id}">
            <button id="btn" type="button" class="btn btn-primary px-3">Cập nhâtj</button>
        </form>
    `
    }
   