function send(socket) {
	const key = $(".searchValue").val(),
		device = $(".device").val(),
		page = $(".page").val();

	socket.emit('submit',{"key" : key,"device" : device,"page" : page})
}
function showData(dataList) {
	let oTable = $("<table></table>").addClass("searchResults"),
		strTitle = $("<tr></tr>"),
		tempContent = [];
	// console.log(dataList);
	for(let i = 0;i < dataList.length;i++){
		let strContent = $("<tr></tr>"),
			dataItem = dataList[i];

		for(let item in dataItem){
			if(item === "_id") continue;
			//收集表头
			i == 0 && strTitle.append($("<th>"+item+"</th>"));
			if(item === "link") {
				let td = $("<td></td>"),
					link = $("<a>链接</a>").attr("href",dataItem[item]);

				td.html(link);
				strContent.append(td);
			}
			else if(item === "img" && dataItem[item] !== ""){
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
		.appendTo($(".oTable"));
}
$(function () {
	let socket = io.connect();
	$(".submit").click((e)=>{
		 send(socket);
	})

	socket.on('crawl',(dataLists)=>{
		console.log(dataLists)
		if(!!dataLists){
				showData(dataLists);
		}else {
			alert("error")
		}
	})
})
