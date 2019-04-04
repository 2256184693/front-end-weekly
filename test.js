const test = (title, fn, cases) => {
  console.log(`
--------------------------------------------
测试名称：${title}
--------------------------------------------
  `);
  let l = cases.length;
  let successNum = 0;
  let erorNum = 0;
  cases.forEach(caseItem => {
    let res = fn(...caseItem.args);
    if(res === caseItem.result) {
      successNum++;
    }else {
      erorNum++;
      console.log(`
  -----------------------------
  测试错误!
  测试用例:${caseItem.args};
  正确答案:${caseItem.result};
  实际答案:${res};
  -----------------------------
      `);
    }
  })
  if(l === successNum) {
    console.log(`
恭喜，测试通过
    `);
  }else{
    console.log(`
测试结束,未通过所有用例。
    `);
  }
}

module.exports = {
  test,
};