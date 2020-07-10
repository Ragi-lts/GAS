function postbackseq(source) {
    let userId = source.events[0].source.userId;
    let replyToken = source.events[0].replyToken;
    //  let message       = JSON.parse(e.postData.contents).events[0].message.text;
    let RecieveData = {
        'userId': userId,
        'ReplyToken': replyToken,
        //  'Message': message
    };
    let PBdata = postBackAnalyze(source);
    console.log(PBdata);
    switch (PBdata.kindof) {
        case "attend":
            let member = new MeetingMember(PBdata.value, RecieveData.userId, "", new Date(), DATABASE);
            if (member.Search() == null) {
                member.Regist();
                var message = new LINEAPI(BASE_URL, ACCESS_TOKEN).PushMessage(RecieveData.userId,
                    "参加登録を行いました。開催までしばらくお待ちください。");
            }
            else {
                var message = new LINEAPI(BASE_URL, ACCESS_TOKEN).PushMessage(RecieveData.userId, "すでに参加登録済みです。開催までしばらくお待ちください。");
            }
            UrlFetchApp.fetch(message.url, message.options);
            break;
        case "closed":
            var message = new LINEAPI(BASE_URL, ACCESS_TOKEN).PushMessage(RecieveData.userId,
                "工事中です。しばらくお待ちください。");
            UrlFetchApp.fetch(message.url, message.options);
            break;
        case "check":
            let now = new Date();
            let hour = now.getHours();
            let min = ("00" + now.getMinutes()).slice(-2);
            Data = new Zoom(Zoom_BaseURL).checkMeeting();
            var message = new LINEAPI(BASE_URL, ACCESS_TOKEN).PushMessage(RecieveData.userId,
                `${hour}:${min}現在,\n予定されている会議は${Data.length}件です。`);
            UrlFetchApp.fetch(message.url, message.options);
            if (Data.length > 0) console.log(Data);
            break;
    }
}
