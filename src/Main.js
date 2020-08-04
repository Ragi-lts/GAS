//多くの関数で使用する定数はすべてグローバル化
let BASE_URL = 'https://api.line.me/v2/bot';
let Zoom_BaseURL = "https://api.zoom.us/v2";
let ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty('CHANNNELACCESSTOKEN');
let SECRET = PropertiesService.getScriptProperties().getProperty('CHANNNEL_SECRET');
let DATABASE = PropertiesService.getScriptProperties().getProperty('DATABASEKEY');
let RichMenuImg = PropertiesService.getScriptProperties().getProperty('RichMenuImg');

function doGet(){
  return HtmlService.createHtmlOutputFromFile("Home.html");
}


//受信したら動作する
function doPost(e) {
  let source = JSON.parse(e.postData.contents);
  let type = source.events[0].type;
  switch (type) {
    case "postback":
      postbackseq(source);
      break;
    case "message":
      let data = JSON.parse(source.events[0].message.text);
      
    default:
      break;
  }

}


function setMenu() {    //LocalTest
  const line_api = new LINEAPI(BASE_URL, ACCESS_TOKEN);   /*LINEAPI操作用インスタンス作成*/
  //  const zoom_api = new Zoom(Zoom_BaseURL);             /*Zoomの操作用インスタンス作成*/

  const Richmenu = [                                      /*リッチメニューの詳細*/
   {
      'x': 0,
      'y': 0,
      'width': 400,
      'height': 405,
      'type': "uri",
      'uri': "https://liff.line.me/1654337169-a93ejDPe"
    },
    {
      'x': 400,
      'y': 0,
      'width': 600,
      'height': 405,
      'type': "postback",
      'data': "?check=Meeting",
      'displayText': "会議の予定を確認したい"
    },
    {
      'x': 1000,
      'y': 0,
      'width': 200,
      'height': 405,
      'type': "uri",
      'uri': "https://liff.line.me/1654337169-rzoplDmp"
    }
  ];
  setRichMenu(line_api,
    RichMenuImg,
    1200, 405,
    Richmenu, true);
}


