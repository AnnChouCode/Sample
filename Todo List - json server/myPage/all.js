/*綁定 */
//input
const txt = document.querySelector('.txt')
//btn-save
const btnSave = document.querySelector('.save')
//list 條列
const listUl = document.querySelector('.list')

/*變數 */
const _url = "http://localhost:3000";
//用來與 json 裡的資料保持同步，因為在 init 函式中使用重新賦值，所以要用 let
let data = []

/* 初始化，一開啟就列出現有條目 */
function init() {
    axios.get(`${_url}/todos`)
        .then(function (response) {
            data = response.data;
            renderData()
        })
}

init()

/*渲染畫面 */
function renderData() {
    //清空 ul 內程式碼，否則會一直累積顯示
    listUl.innerHTML = ""

    data.forEach((todo) => {
        //創造 li 元素
        let listLi = document.createElement("li");

        //創造 a 元素，讓每個項目都可以連結到 page.html
        //並且在網址中帶入 todo.id 數字做為跳轉頁面後的資料辨識
        let listALink=document.createElement("a")
        listALink.setAttribute("href",`page.html?id=${todo.id}`)
        listALink.textContent = todo.content

        //使用 input 元素做按鈕，並綁定 btnDelete
        let btnDelete = document.createElement("input");
        btnDelete.type = "button"
        btnDelete.classList.add("delete")
        btnDelete.value = "刪除待辦"
        btnDelete.style = "margin-left:8px;"
        //在 btn-delete 中建立 data-num 並以 todo.id 為數字標註編號
        btnDelete.setAttribute('data-num', todo.id)

        //新增子節點
        listLi.appendChild(listALink);
        listLi.appendChild(btnDelete);
        listUl.appendChild(listLi);
    })
}

/*儲存待辦 */
btnSave.addEventListener('click', function () {
    //防止未輸入內容
    if (txt.value === "") {
        alert("請輸入內容");
        return;
    }

    //input 裡輸入的值
    let todoTxt = txt.value

    //將 input 輸入的值 post 進 json
    axios.post(`${_url}/todos`, {
        "content": todoTxt
    })
        .then(function (response) {
            //不能直接呼叫 renderData，因為要更新 data 陣列，藉由 data 陣列呼叫 renderData
            init()
            txt.value = ""
        })
})

/*刪除待辦 */
//必須監聽 ul，因為要取 data-num，並且發泡可以同時觀測 btn-delete
listUl.addEventListener('click', function(e){
    //如果按在 btn-delete 上才有反應
    if (e.target.getAttribute('class') !== 'delete'){
        return
    }

    //取該 btn-delete 的 data-num，這代表這在 json 資料中的 id
    const idOfJSON = e.target.getAttribute('data-num')   

    //注意 todos/ 後面要取的是該生成資料時自然產生的 id
    axios.delete(`${_url}/todos/${idOfJSON}`)
        .then(function (response) {
            alert('刪除成功')
            init()
        })
})
