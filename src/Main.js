//受信したら動作する
function doPost(e){
  const BASE_URL      = 'https://api.line.me/v2/bot';
  const Zoom_BaseURL  = "https://api.zoom.us/v2";
  const ACCESS_TOKEN  = PropertiesService.getScriptProperties().getProperty('CHANNNELACCESSTOKEN');
 
  const DATABASE      = PropertiesService.getScriptProperties().getProperty('DATABASEKEY');
  console.log(JSON.parse(e.postData.contents).events[0].source);
  let source = JSON.parse(e.postData.contents);
  let type = source.events[0].type;
  let userId        = source.events[0].source.userId;
  let replyToken    = source.events[0].replyToken;
//  let message       = JSON.parse(e.postData.contents).events[0].message.text;
  let RecieveData = {
    'userId': userId,
    'ReplyToken':replyToken,
  //  'Message': message
  };
  if (type == "postback")
  {
    let id = source.events[0].postback.data.split("=")[1];  //MeetingIdの抽出
    let member = new MeetingMember(id,RecieveData.userId,"",new Date(),DATABASE);
    if (member.Search() == null) 
    {
      member.Regist();
      var message = new LINEAPI(BASE_URL,ACCESS_TOKEN).PushMessage(RecieveData.userId,"参加登録を行いました．\n開催まで，しばらくお待ちください．");
    }
    else
    {
      var message = new LINEAPI(BASE_URL,ACCESS_TOKEN).PushMessage(RecieveData.userId,"すでに参加登録済みです．");
    }
    UrlFetchApp.fetch(message.url,message.options);
  }
}
function test(){    //LocalTest

  const ACCESS_TOKEN  = PropertiesService.getScriptProperties().getProperty('CHANNNELACCESSTOKEN');
  const SECRET        = PropertiesService.getScriptProperties().getProperty('CHANNNEL_SECRET'); 
  const DATABASE      = PropertiesService.getScriptProperties().getProperty('DATABASEKEY');
  const BASE_URL      = 'https://api.line.me/v2/bot';
  const Zoom_BaseURL  = "https://api.zoom.us/v2";

  const  line_api = new LINEAPI(BASE_URL,ACCESS_TOKEN);   /*LINEAPI操作用インスタンス作成*/
  const  zoom_api = new Zoom(Zoom_BaseURL);             /*Zoomの操作用インスタンス作成*/
 
  
 /* var userId        = JSON.parse(e.postData.contents).events[0].source.userId;
  var replyToken    = JSON.parse(e.postData.contents).events[0].replyToken;
  var message       = JSON.parse(e.postData.contents).events[0].message.text;
  var RecieveData = {
    'userId': userId,
    'ReplyToken':replyToken,
    'Message': message
  };
  */
  /*zoom_api.CreateMeeting("abs",
                          new Date(),
                          DATABASE);
 */
   /*  var fx = Flex("123","456",22,23);
    var res = line_api.FlexMessage(fx);
    UrlFetchApp.fetch(res.url,res.options);
  */
  let Res = zoom_api.CreateMeeting("123",new Date(),DATABASE);
  let day = Res.startat.getMonth()+1;
  let d = Res.startat.getDate();
  let h = Res.startat.getHours();
  let min = ("00" + Res.startat.getMinutes()) .slice(-2);
       
  let dict = Flex(Res.MeetingId,Res.topic,`${day}/${d}`,`${h}:${min}`);
  var res = line_api.FlexMessage(dict);
  UrlFetchApp.fetch(res.url,res.options);
 
}

//送信したら動作する
/*
function doGet(e){

}
*/