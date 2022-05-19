/*
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-05-14 13:51:32
 * @LastEditTime: 2022-05-16 18:56:13
 */




$("#kernelBox li").hover(function () {
  $(this).addClass("active")
  $(this).siblings().removeClass("active");
})

numDynamic("cityNum",0,200,2,50)
numDynamic("ipTotalNum",0,31974,18,5)
numDynamic("ipNum",0,200,2,50)
numDynamic("canUserNum",0,99,2,50)