FROM coding-public-docker.pkg.coding.net/public/docker/nodejs:14

COPY ./package.json /root/cloudbase-framework/registry/package.json

RUN  npm config set registry https://registry.npm.taobao.org
RUN  npm install -g @cloudbase/cli@latest
RUN cd /root/cloudbase-framework/registry/ && npm install

COPY index.js /usr/opts/

CMD [ "node", "/usr/opts/index.js"]
