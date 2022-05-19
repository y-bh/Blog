/*
 * @Author: 陈昊天
 * @LastEditors: 陈昊天
 * @description: page description
 * @Date: 2022-05-16 22:33:54
 * @LastEditTime: 2022-05-16 22:57:38
 */
let tabList = [
  {
    title: '企业级代理服务',
    icon: 'icon-img1'
  },
  {
    title: '优质性能保证',
    icon: 'icon-img2'
  },
  {
    title: '资源自由去重',
    icon: 'icon-img3'
  },
  {
    title: 'API快捷调用',
    icon: 'icon-img4'
  },
  {
    title: '终端使用授权',
    icon: 'icon-img5'
  },
  {
    title: '专业技术客服',
    icon: 'icon-img6'
  }
]

let menuList = [
  {
    title: '海量优质IP资源',
    alt: '海量优质IP资源',
    className: 'icon-1'
  },
  {
    title: '200+城市地区',
    alt: '200+城市地区',
    className: 'icon-2'
  },
  {
    title: '稳定的自建机房保障',
    alt: '稳定的自建机房保障',
    className: 'icon-3'
  },
  {
    title: '不限制多机器调用',
    alt: '不限制多机器调用',
    className: 'icon-4'
  },
  {
    title: '不限制并发请求数量',
    alt: '不限制并发请求数量',
    className: 'icon-5'
  },
]

let currentId = 1

let social = '/images/business/social_gathering.png';
let market = '/images/business/market_research.png';
let brand = '/images/business/brand_protection.png';
let seo = '/images/business/SEO_information.png';
let electronic = '/images/business/electronic_commerce.png';
let price = '/images/business/price_monitoring.png';

const getBusinessData = () => {
  try {
    const data = {
      tabList,
      menuList,
      currentId,
      imgUrl: {
        social,
        market,
        brand,
        seo,
        electronic,
        price
      }
    }
    return data
  } catch (error) {
    console.error('error:',error);
  }
}

module.exports = {
  getBusinessData
}