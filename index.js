axios
  .get(
    "https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json?token=AAQWFQDSNRRXC6FBW7PDSETBOESVW"
  )
  .then(function (res) {
    let data = res.data;
    // {
    //     "job": "前端工程師",
    //     "gender": "男性",
    //     "age": "21~25 歲",
    //     "education": "高中畢業",
    //     "major": "非資訊、設計、語言科系相關(歷史、會計、國貿)",
    //     "first_job": {
    //         "tenure": "1 個月以下",
    //         "leave": "想要轉職成前端工程師",
    //         "position": "視覺設計 (UI、平面)",
    //         "skill": "後端語言 (Node.js、Python、PHP、JAVA、Ruby), AWS, GCP 等雲服務知識",
    //         "render": "不確定這是什麼"
    //     },
    //     "works": {
    //         "window": "非技術主管",
    //         "market": "4"
    //     },
    //     "company": {
    //         "industry": "接案公司",
    //         "score": "10",
    //         "work": "實體辦公室",
    //         "area": "台灣 - 高屏",
    //         "scale": "21~49 人",
    //         "people": "1 人",
    //         "job_tenure": "1 年以下",
    //         "salary": "36~50 萬",
    //         "salary_score": "10",
    //         "industry_message": ""
    //     }
    // }

    // 接案公司的薪資滿意度平均分數

    const salaryScore = data
      .filter((item) => {
        return item.company.industry === "接案公司";
      })
      .map((item) => {
        return Number(item.company.salary_score);
      })
      .reduce((sum, cur) => {
        return sum + cur;
      }, 0);

    let salaryScorelength = data.filter((item) => {
      return item.company.industry === "接案公司";
    }).length;
    const salaryScoreAverage = salaryScore / salaryScorelength;

    var chart = c3.generate({
      bindto: "#bar1",
      data: {
        columns: [["平均分數", salaryScoreAverage]],
        type: "bar",
      },
      bar: {
        width: {
          ratio: 0.1,
        },
      },
    });

    // 博奕、電商公司兩個產業滿意度的平均分數
    // 博奕
    const gameCompanyScore = data
      .filter((item) => {
        return item.company.industry === "博奕";
      })
      .map((item) => {
        return Number(item.company.score);
      })
      .reduce((sum, cur) => {
        return sum + cur;
      }, 0);
    console.log("gameCompanyScore", gameCompanyScore);
    let gameCompanyScorelength = data.filter((item) => {
      return item.company.industry === "博奕";
    }).length;
    const gameCompanyScoreAverage = (
      salaryScore / gameCompanyScorelength
    ).toFixed(2);
    console.log(gameCompanyScoreAverage);

    // 電商
    const ecCompanyScore = data
      .filter((item) => {
        return item.company.industry === "電子商務";
      })
      .map((item) => {
        return Number(item.company.score);
      })
      .reduce((sum, cur) => {
        return sum + cur;
      }, 0);
    console.log("ecCompanyScore", ecCompanyScore);
    let ecCompanyScorelength = data.filter((item) => {
      return item.company.industry === "電子商務";
    }).length;
    const ecCompanyScoreAverage = (salaryScore / ecCompanyScorelength).toFixed(
      2
    );
    console.log(ecCompanyScoreAverage);

    var chart = c3.generate({
      bindto: "#bar2",
      data: {
        columns: [
          ["博奕", gameCompanyScoreAverage],
          ["電子商務", ecCompanyScoreAverage],
        ],
        type: "bar",
      },
      bar: {
        width: {
          ratio: 0.2, // this makes bar width 50% of length between ticks
        },
        // or
        //width: 100 // this makes bar width 100px
      },
    });

    // 男女比例
    let maleNumber = 0;
    data.forEach((item) => {
      if (item.gender === "男性") {
        return maleNumber++;
      }
    });
    console.log("maleNumber", maleNumber);

    let femaleNumber = 0;
    data.forEach((item) => {
      if (item.gender === "女性") {
        return femaleNumber++;
      }
    });
    console.log("femaleNumber", femaleNumber);

    var chart = c3.generate({
      bindto: "#pie1",
      data: {
        // iris data from R
        columns: [
          ["男性", maleNumber],
          ["女性", femaleNumber],
        ],
        type: "pie",
        onclick: function (d, i) {},
        onmouseover: function (d, i) {},
        onmouseout: function (d, i) {},
      },
    });

    // 薪水區間分佈
    // let salary = [
    //   ["36~50 萬", 10],
    //   ["51~60 萬", 20],
    // ];
    let counts = {};
    data.forEach((item) => {
      counts[item.company.salary] = (counts[item.company.salary] || 0) + 1;
    });
    console.log("salary", counts);

    const newArr = Object.keys(counts);
    console.log("newArr", newArr);

    const salaryArray = [];
    newArr.forEach((item) => {
      let arr = [];
      arr.push(item);
      arr.push(counts[item]);
      salaryArray.push(arr);
    });
    console.log("salaryArray", salaryArray);

    var chart = c3.generate({
      bindto: "#pie2",
      data: {
        // iris data from R
        columns: salaryArray,
        type: "pie",
        onclick: function (d, i) {},
        onmouseover: function (d, i) {},
        onmouseout: function (d, i) {},
      },
    });
    setTimeout(function () {
      chart.unload({
        ids: "data1",
      });
      chart.unload({
        ids: "data2",
      });
    }, 2500);
  });
