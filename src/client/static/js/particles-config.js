
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 60,//数量
      "density": {
        "enable": true,//密集
        "value_area": 1920 //区域散布密度大小
      }
    },
    "color": {
      "value":["#ef00ff","#00ff14","#fc5531"]//原子的颜色
    },
    "shape": {
      "type": "image",//原子的形状 circle  edge   triangle polygon image
      "stroke": {
        "width": 1, //原子的宽度 默认 是2
        "color": "#ffffff" //原子颜色
      },
      "polygon": {
        "nb_sides": 5 //原子的多边形边数
      },
      "image": {
        "src": "/images/home/particle-img.png", //原子的图片可以使用自定义图片
        "width": 20, //图片宽度
        "height": 20  //图片高度
      }
    },
    "opacity": {
      value: {
        min: 0.1,
        max: 0.1
      },
      //"value": 0.8, //不透明度
      "random": true, // 随机不透明度
      "anim": {
        "enable": false, //渐变动画
        "speed": 1, //渐变动画速度 默认是3
        "opacity_min": 0.25, //渐变动画不透明度 默认：0.25
        "sync": false
      }
    },
    "size": {
      "value": 13, //原子大小 默认：20
      // "min":10,
      "random": true,
      //"random": { enable: true, minimumValue: 4 }, //原子大小随机
      "anim": {
        "enable": true, //原子渐变
        "speed": 5, //原子渐变速度
        "size_min": 10,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false, //连接线
      // "distance": 100, //连接线距离
      // "color": "#ffffff", //连接线颜色
      // "opacity": 0.4, //连接线不透明度
      // "width": 2//连接线的宽度
    },
    "move": {
      "enable": true, // 原子移动
      "speed": 3, //原子移动速度
      "direction": "none", //原子移动方向
      "random": true, // 移动随机方向
      "straight": false, //直接移动
      "out_mode": "bounce", //是否移动出画布 "out" "bounce"
      "bounce": false, // 是否跳动移动 
      "attract": {
        "enable": false, //原子之间吸引
        "rotateX": 600, //原子之间吸引X水平距离
        "rotateY": 1200 //y垂直距离
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas", //原子之间互动检测
    "events": {
      "onhover": {
        "enable": false, //悬停
        "mode": "repulse" //悬停模式  "grab" 抓取临近的 "bubble"  泡沫球效果 "repulse"  击退效果
      },
      "onclick": {
        "enable": true,//点击效果
        "mode": "push" //点击效果模式 "push" "remove" "bubble" "repulse" 
      },
      "resize": true //互动事件调整
    },
    "modes": {
      "grab": {
        "distance": 140, //原子互动抓取距离
        "line_linked": {
          "opacity": 1 // 原子互动抓取距离连线不透明度
        }
      },
      "bubble": {
        "distance": 400, //原子抓取泡沫效果之间的距离
        "size": 5,  //原子抓取泡沫效果之间的大小
        "duration": 2, //原子抓取泡沫效果之间的持续事件
        "opacity": 0.8,
        "speed": 3
      },
      "repulse": {
        "distance": 200, //击退效果距离
        "duration": 0.4 //击退效果持续事件
      },
      "push": {
        "particles_nb": 0 //  粒子推出的数量
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});


/* ---- stats.js config ---- */

// var count_particles, stats, update;
// stats = new Stats;
// stats.setMode(0);
// stats.domElement.style.position = 'absolute';
// stats.domElement.style.left = '0px';
// stats.domElement.style.top = '0px';
// document.body.appendChild(stats.domElement);
// count_particles = document.querySelector('.js-count-particles');
// update = function() {
//   stats.begin();
//   stats.end();
//   if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
//     count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
//   }
//   requestAnimationFrame(update);
// };
// requestAnimationFrame(update);