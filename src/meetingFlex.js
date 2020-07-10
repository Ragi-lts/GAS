function Flex (MeetingId,topic,DayAt,StartAt){
  let dict = 
{
    "type": "bubble",
    "size": "giga",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "会議開催のお知らせ",
          "size": "lg",
          "weight": "bold",
          "align": "center",
          "wrap": true
        },
        {
          "type": "separator",
          "margin": "md"
        },
        {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": `以下の日時で${topic}を開催します。`,
              "wrap": true
            },
            {
              "type": "text",
              "text": "参加希望の方は，【参加する】のボタンをクリックしてください。",
              "wrap": true
            }
          ]
        },
        {
          "type": "separator"
        },
        {
          "type": "box",
          "layout": "baseline",
          "contents": [
            {
              "type": "text",
              "text": "開催日",
              "flex": 1,
              "wrap": true,
              "size": "sm",
              "align": "center",
              "color": "#aaaaaa"
            },
            {
              "type": "text",
              "text": `${DayAt}`,
              "flex": 3,
              "wrap": true,
              "size": "md",
              "align": "center"
            }
          ],
          "margin": "lg",
          "spacing": "none",
          "borderColor": "#000000"
        },
        {
          "type": "box",
          "layout": "baseline",
          "contents": [
            {
              "type": "text",
              "text": "開始時間",
              "flex": 1,
              "wrap": true,
              "size": "sm",
              "color": "#aaaaaa",
              "align": "center"
            },
            {
              "type": "text",
              "text": `${StartAt}`,
              "flex": 3,
              "wrap": true,
              "size": "md",
              "align": "center"
            }
          ],
          "margin": "lg"
        },
        {
          "type": "separator"
        },
        {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "postback",
                "label": "参加する",
                "data": `?attend=${MeetingId}`,
                "displayText": "参加します"
              },
              "style": "primary",
              "height": "md"
            }
          ],
          "margin": "xxl"
        }
      ]
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "重要",
          "align": "center",
          "size": "lg",
          "color": "#FF1919"
        },
        {
          "type": "text",
          "text": "新システムの開発と移行に伴い，参加ボタンを押した際にレスポンスに時間がかかる，またはレスポンスがない可能性があります。その際は，会議の開始時間後に問い合わせをお願いします。",
          "wrap": true,
          "color": "#FF7272"
        }
      ]
    },
    "styles": {
      "header": {
        "separator": true
      },
      "body": {
        "separator": true
      },
      "footer": {
        "backgroundColor": "#E6E6FA"
      }
    }
  }
return dict;
}

