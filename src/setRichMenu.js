function setRichMenu(LINEAPI, imgID, richWidth, richHeight, dict, defalut) //画像とリンクの辞書配列
{

    let MenuAPI = LINEAPI;
    let RICHAPI = LINEAPI;
    let DefAPI = LINEAPI;



    var detail = []
    for (let i = 0; i < dict.length; i++) {
        var areas = {
            "bounds": {
                "x": dict[i].x,
                "y": dict[i].y,
                "width": dict[i].width,
                "height": dict[i].height
            },
            "action": {
                "type": dict[i].type
            }
        }
        switch (dict[i].type) {
            case "uri":
                areas.action.uri = dict[i].uri;
                break;
            case "message":
                areas.action.text = dict[i].text;
                break;
            case "datetimepicker":
                areas.action.data = dict[i].data;
                areas.action.mode = dict[i].mode;
                break;
            case "camera":
                areas.action.label = dict[i].label;
                break;
            case "postback":
                areas.action.data = dict[i].data;
                if (dict[i].displayText) areas.action.displayText = dict[i].displayText;
                break;
        }
        detail.push(areas);
    }

    let size = {
        'width': richWidth,
        'height': richHeight
    }

    MenuAPI.payload = {
        "size": size,
        "selected": true,
        "name": "Bot Info",
        "chatBarText": "サブメニュー",
        "areas": detail
    };
    MenuAPI.options.payload = JSON.stringify(MenuAPI.payload);

    let Res = UrlFetchApp.fetch(`${LINEAPI.endpoint}/richmenu`, MenuAPI.options);
    if (Res.getResponseCode() != 200) return;


    //画像のセット
    var dest = DriveApp.getFileById(imgID).getBlob();
    const richmenuId = JSON.parse(Res.getContentText()).richMenuId;
    RICHAPI.options.headers['Content-Type'] = "image/jpeg";
    RICHAPI.options.payload = dest;
    //    RICHAPI.options.muteHttpExceptions = true;
    console.log(RICHAPI.options);
    Res = UrlFetchApp.fetch(`https://api-data.line.me/v2/bot/richmenu/${richmenuId}/content`,
        RICHAPI.options);

    if (Res.getResponseCode() == 200) {
        if (defalut == true) {
            delete DefAPI.options.headers["Content-Type"];
            /* DefAPI.options.method ="DELETE";
             Res = UrlFetchApp.fetch(`${DefAPI.endpoint}/user/all/richmenu/${richmenuId}`,
                 DefAPI.options);
             */
            Res = UrlFetchApp.fetch(`${DefAPI.endpoint}/user/all/richmenu/${richmenuId}`,
                DefAPI.options);
            // Logger.log(Res.getContentText());
            if (Res.getResponseCode() == 200) {
                console.log("OK");
                return true;
            }
            else {
                //   Logger.log(Res.getResponseCode());
            }
        }
    }
}

/*
function isDefaultRichId(LINEAPI) {
    delete LINEAPI.options.headers['Content-Type'];
    LINEAPI.options.method = "DELETE";
    let Res = UrlFetchApp.fetch(LINEAPI.endpoint + "/user/all/richmenu", LINEAPI.options);

    LINEAPI.options.method = "GET";
    let Res = UrlFetchApp.fetch(LINEAPI.endpoint + "/user/all/richmenu", LINEAPI.options);
    Logger.log(Res.getContentText());
    /*    if (Res.getResponseCode() == 200) {
            return JSON.parse(Res.getContentText()).richMenuId;
        }
        return 0;
    }
    */
