FROM hub.xiaoxi.com/library/node:v1
ADD web.tar.gz  /opt/projName/tianqi-http-web-pc
WORKDIR /opt/projName/tianqi-http-web-pc
RUN npm install pm2@latest -g
ENTRYPOINT ["pm2","start","start.js"]
ENTRYPOINT ["tail","-f","/dev/null"]