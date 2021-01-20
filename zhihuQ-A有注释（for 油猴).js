function extractt(){alert('开始');

     //异步请求函数;
    function loadDoc(url) {
        var out ='';
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {if (this.readyState == 4 && this.status == 200) {out=this.responseText;}};
        xhttp.open("GET", url, false);
        xhttp.send(null);
        return out; }

     //文本导出函数
   function exportRaw (data, name){var urlObject = window.URL || window.webkitURL || window;
         var export_blob = new Blob([data]);
         var save_link = document.createElement("a");
         save_link.href = urlObject.createObjectURL(export_blob);
         save_link.download = name;
         save_link.click();};
     //html转txt函数
   function txtToHtml(txt){var parser= new DOMParser();
         var htmlObject = parser.parseFromString(txt,"text/html");
         return htmlObject;}
     //延时函数
   function sleep(n){var m=n*1000;
        var start = new Date();
        while(true){if(new Date()-start>m){break;}}
                 }
//获取问题标题
var title=document.querySelector('#root > div > main > div > div:nth-child(10) > div:nth-child(2) > div > div.QuestionHeader-content > div.QuestionHeader-main > h1').innerText;

//获取问题id
var pattern=/\d+/i;
var id=location.href.match(pattern)[0];
var url='https://www.zhihu.com/api/v4/questions/'+id+'/answers?';
var offsett=0;
var arrSum=[];
while(true){console.log(offsett);
var queryString='include=data[*].is_normal,admin_closed_comment,reward_info,is_collapsed,annotation_action,annotation_detail,collapse_reason,is_sticky,collapsed_by,suggest_edit,comment_count,can_comment,content,editable_content,attachment,voteup_count,reshipment_settings,comment_permission,created_time,updated_time,review_info,relevant_info,question,excerpt,is_labeled,paid_info,paid_info_content,relationship.is_authorized,is_author,voting,is_thanked,is_nothelp,is_recognized;data[*].mark_infos[*].url;data[*].author.follower_count,badge[*].topics;data[*].settings.table_of_content.enabled&limit= 5&offset='+offsett+'&platform= desktop&sort_by= default';
var res=loadDoc(url+queryString);
var d= JSON.parse(res);
var data=d['data'];
if(data.length<=0){break;
}
var arrSingle=[offsett,res];
arrSum[arrSum.length]=arrSingle;
sleep(1);
offsett+=5;
}
var arrSum2=[];
for (var i =0;
i<arrSum.length;
i++){   arrSum2[arrSum2.length]=JSON.parse(arrSum[i][1])['data'];
}
var arrSum3=[];
for (i =0;
i<arrSum2.length;
i++){for (var j =0;
j<arrSum2[i].length;
j++){arrSum3[arrSum3.length]=[arrSum2[i][j]['author']['name'],arrSum2[i][j]['voteup_count'],arrSum2[i][j]['content']]}
}
i = arrSum3.length;
var tempExchangVal;
while (i > 0) {for (j = 0;
 j < i - 1;
 j++) {if (arrSum3[j][1] < arrSum3[j + 1][1]) {tempExchangVal = arrSum3[j];
arrSum3[j] = arrSum3[j + 1];
arrSum3[j + 1] = tempExchangVal;
}
}
i--;
}

//生成html文件后导出
var txt='<meta name="viewport" content="width=device-width, initial-scale=1" /><style>body{background-color:#D9DEDD;}</style>';
for (i =0;i<arrSum3.length;i++){if(arrSum3[i][1]>0){txt+='<div style="border:2px green solid;"><h2 id="'+(i+1)+'"><b>'+arrSum3[i][0]+'</b></h2><a href=#'+(i+1)+'>点击此处可以收藏</a><p><b>'+arrSum3[i][1]+'</b></p>'+arrSum3[i][2]+'</div>';}}exportRaw(txt,title.replace('\r','')+'.html');}

    var p =document.querySelectorAll('.QuestionButtonGroup')[1];


    var c = p.firstElementChild;


    var button=document.createElement('button');

    button.style.width='50px';

    button.style.height='30px';

    button.style.backgroundColor='blue';

    button.style.color='white';

    button.innerText='提取';

    button.onclick=extractt;

    p.insertBefore(button,c);
