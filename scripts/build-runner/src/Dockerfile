FROM node:lts-alpine

ARG tag=latest

# 复制插件列表
COPY ./package.json /root/cloudbase-framework/registry/package.json
COPY ./.npmrc /root/cloudbase-framework/registry/.npmrc
COPY ./lowcode/h5/ /root/.weapps-build/app/h5/
COPY ./lowcode/mp/ /root/.weapps-build/app/mp/

# 安装 curl
RUN apk add --update curl bash git openssh && \
    # 删除 apk 缓存
    rm -rf /var/cache/apk/* && \
    # 设置npm镜像源
    npm config set registry http://mirrors.tencent.com/npm/ && \
    # 安装 CLI 及 PNPM
    npm install -g @cloudbase/cli@$tag pnpm && \
    echo $tag && \
    # 全局安装插件
    cd /root/cloudbase-framework/registry/ && \
    npm install --no-package-lock && \
    rm -rf package-lock.json && \
    # 低代码：内置官方 react 组件库
    mkdir -p /root/.weapps-materials/gsd-h5-react@0.0.61 && \
    cd /root/.weapps-materials/ && \
    curl https://user-source-1303824488.cos.ap-shanghai.myqcloud.com/materials/gsd-h5-react%400.0.61/source-full.zip -o gsd-h5-react@0.0.61.zip && \
    unzip gsd-h5-react@0.0.61.zip -d gsd-h5-react@0.0.61 && \
    cd gsd-h5-react@0.0.61 && \
    # 低代码：内置官方 mp 组件库
    mkdir -p /root/.weapps-materials/gsd-h5-react-mp@0.0.61 && \
    cd /root/.weapps-materials/ && \
    curl https://user-source-1303824488.cos.ap-shanghai.myqcloud.com/materials/gsd-h5-react@0.0.61/source-mp.zip -o gsd-h5-react-mp@0.0.61.zip && \
    unzip gsd-h5-react-mp@0.0.61.zip -d gsd-h5-react-mp@0.0.61 && \
    rm -rf /root/.weapps-materials/*.zip && \
    ls -al /root/.weapps-materials && \
    # 低代码：内置官方框架依赖
    cd /root/.weapps-build/app/h5/ && yarn && rm package.json .npmrc && \
    cd /root/.weapps-build/app/mp/ && yarn && rm package.json

COPY index.js /usr/opts/

CMD ["node", "/usr/opts/index.js"]
