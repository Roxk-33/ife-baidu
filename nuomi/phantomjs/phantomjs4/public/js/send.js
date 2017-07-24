/**
 * Created by hao on 2017/7/21.
 */
function showData(dataList) {
    let oTable = $("<table></table>").addClass("searchResults"),
        strTitle = $("<tr></tr>"),
        tempContent = [];
    // console.log(dataList);
    for(let i = 0;i < dataList.length;i++){
        let strContent = $("<tr></tr>"),
            dataItem = dataList[i];

        for(let item in dataItem){
            //收集表头
            i == 0 && strTitle.append($("<th>"+item+"</th>"));
            if(item === "_id") continue;
            if(item === "link") {
                let td = $("<td></td>"),
                    link = $("<a>链接</a>").attr("href",dataItem[item]);

                td.html(link);
                strContent.append(td);
            }
            if(item === "img" && dataItem[item] !== ""){
                let td = $("<td></td>"),
                    img = $("<img>").attr("src",dataItem[item])
                        .addClass("dataImg");

                td.html(img);
                strContent.append(td);
            }
            else {
                strContent.append($("<td>" + dataItem[item] + "</td>"))
            }
        }

        tempContent.push(strContent);
    }
    oTable.append(strTitle,tempContent)
        .appendTo($(".contanier"));
}

function send() {
    const key = $(".searchValue").val(),
          device = $(".device").val();

    if(key === ""){
        return false;
    }

    $.ajax({
        type : 'get',
        url : '/crawl',
        dataType : 'json',
        cache : false,
        timeout : 0,
        data : {"key" : key,"device" : device},
        success:function(data){
            console.log(data)
            if(!!data){

                showData(data);

            }else {
                alert("error")
            }
        },
    })
}
$().ready(function () {
    $(".content").click((e)=>{
        let isOK = send();
    })
})