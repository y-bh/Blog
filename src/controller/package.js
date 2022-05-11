/*
 * @Author: dengxiujie
 * @LastEditors: dengxiujie
 * @description: page description
 * @Date: 2022-05-10 16:14:15
 * @LastEditTime: 2022-05-10 17:38:07
 */
var packageObj = {
  countMeal: [{//IP价格
    proxyTime: 3,
    price: 0.005
  }, {
    proxyTime: 5,
    price: 0.01
  }, {
    proxyTime: 10,
    price: 0.02
  }, {
    proxyTime: 15,
    price: 0.02
  }],
  rechargeRate: [{//选择预充值金额rechargeMeals
    price: 50,
    all: 50,
    per: 1
  }, {
    price: 300,
    all: 315,
    per: 5
  },
  {
    price: 500,
    all: 550,
    per: 10
  },
  {
    price: 1000,
    all: 1200,
    per: 20
  },
  {
    price: 5000,
    all: 7000,
    per: 40
  },
  {
    price: 10000,
    all: 15000,
    per: 50.1
  },
  {
    price: 30000,
    all: 60000,
    per: 100
  }],
  proxyTimes: [{//选择IP时效
    key: 3,
    value: 0.005
  }, {
    key: 5,
    value: 0.01
  }, {
    key: 10,
    value: 0.002
  }, {
    key: 15,
    value: 0.003
  }],
  mealDates: [{//选择购买时长
    
  }]
}
module.exports = packageObj;