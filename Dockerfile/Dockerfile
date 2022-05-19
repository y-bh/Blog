FROM hub.xiaoxi.com/library/node:v1
ADD web.tar.gz  /opt/projName/ipdark-front-tianqi-ip
WORKDIR /opt/projName/ipdark-front-tianqi-ip
RUN npm install pm2@latest -g
RUN tail -f /dev/null
ENTRYPOINT ["pm2","start","start.js"]