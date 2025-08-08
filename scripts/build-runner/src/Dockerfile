FROM node:lts-alpine

ARG tag=latest

# 复制插件列表
COPY ./package.json /root/cloudbase-framework/registry/package.json

COPY ./.npmrc /root/cloudbase-framework/registry/.npmrc
COPY index.js /usr/opts/

# 安装 curl
RUN apk add --update curl bash git openssh moreutils&& \
    # 删除 apk 缓存
    rm -rf /var/cache/apk/* && \
    # 设置npm镜像源
    npm config set registry http://mirrors.tencent.com/npm/ && \
    # 安装 CLI 及 PNPM
    npm install -g @cloudbase/cli@$tag pnpm && \
    echo $tag && \
    ls -la /root/cloudbase-framework/registry

RUN cd /root/cloudbase-framework/registry/ && \
    yarn && \
    cp -rf /root/cloudbase-framework/registry/node_modules/@cloudbase/framework-plugin-low-code-installer /root/cloudbase-framework/registry/node_modules/@cloudbase/framework-plugin-low-code

COPY ./lowcode /app/deps_workspace
WORKDIR /app/deps_workspace/h5
RUN yarn install

WORKDIR /app/deps_workspace/mp
RUN yarn install

WORKDIR /app/deps_workspace/mp/packages/system
RUN yarn install

WORKDIR /app
RUN rm -rf deps_workspace

COPY index.js /usr/opts/

CMD ["node", "/usr/opts/index.js"]
