/*
 * @Author: liyuntao
 * @LastEditors: liyuntao
 * @description: page description
 * @Date: 2022-05-25 14:52:31
 * @LastEditTime: 2022-05-25 15:33:28
 */

function getTime() {

  let now = new Date()

  //测试时间 用来测试的时间段，上线注释掉。 地道！
  //测试时间 - START
  // let oldoldTime = new Date('2022-03-22 00:00:00')   //上次活动开始时间
  // let oldTime = new Date('2000-01-01 00:00:00') - new Date('2022-04-21 23:59:59')  //活动之间切换阈值 以本次开始时间为准
  // let newTime = new Date('2022-04-22 00:00:00') - new Date('2022-06-02 23:59:59')  //本次活动结束时间
  //测试时间 - END


  //线上时间段 测试注释掉，上线解注释。
  //线上时间 - START
  let oldoldTime = new Date('2022-04-22 00:00:00')   //上次活动开始时间
  let oldTime = new Date('2022-06-02 00:00:00')   //活动之间切换阈值 以本次开始时间为准
  let newTime = new Date('2077-06-02 23:59:59')   //本次活动结束时间
  //线上时间 - END

  
  if (+now >= +oldoldTime && +now < oldTime){
    return 'l'
  }else if(+now >= +oldTime && +now < newTime){
    return 'f'
  }else{
    return 'd'
  }
}

module.exports = { getTime }