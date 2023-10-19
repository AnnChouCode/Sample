/*取頁面 id 做為資料辨識 */
//如果 console location.href 會得到字串 'http://127.0.0.1:5500/myPage/page.html?id=數字'，所以要做處理，使用 split 以 '=' 為分隔，就可以取得等號後的數字
const pageID = location.href.split("=")[1]

/*變數 */
const _url = "http://localhost:3000";

/*頁面抓取對應資料 */
axios.get(`${_url}/todos/${pageID}`)
    .then(function (response) {
        const pageH1 = document.querySelector("h1")
        pageH1.textContent = response.data.id

        const pageContent = document.querySelector(".content")
        pageContent.textContent = response.data.content
    })
