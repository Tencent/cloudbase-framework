FROM node:lts-alpine

ARG tag=latest

# 复制插件列表
COPY ./package.json /root/cloudbase-framework/registry/package.json
COPY ./.npmrc /root/cloudbase-framework/registry/.npmrc

# 安装 curl
RUN apk add --update curl bash git openssh && \
    # 删除 apk 缓存
    rm -rf /var/cache/apk/* && \
    # 设置npm镜像源
    npm config set registry http://mirrors.tencent.com/npm/ && \
    # 安装 CLI 及 PNPM
    npm install -g @cloudbase/cli@$tag pnpm && \
    echo $tag && \
    # 全局安装 Deno
    curl -fsSL https://deno.land/x/install/install.sh | sh && \
    echo 'export DENO_INSTALL="/root/.deno"\nexport PATH="$DENO_INSTALL/bin:$PATH"' >> ~/.profile && \
    # 全局安装插件
    cd /root/cloudbase-framework/registry/ && \
    npm install && \
    # 更新 shell profile
    . ~/.profile && \
    # 更新 react 组件库
    mkdir -p /root/.weapps-materials/gsd-h5-react@0.0.61 && \
    cd /root/.weapps-materials/ && \
    curl https://user-source-1303824488.cos.ap-shanghai.myqcloud.com/materials/gsd-h5-react@0.0.61/source.zip -o gsd-h5-react@0.0.61.zip && \
    unzip gsd-h5-react@0.0.61.zip -d gsd-h5-react@0.0.61 && \
    cd gsd-h5-react@0.0.61 && yarn && \
    # 更新 mp 组件库
    mkdir -p /root/.weapps-materials/gsd-h5-react-mp@0.0.61 && \
    cd /root/.weapps-materials/ && \
    curl https://user-source-1303824488.cos.ap-shanghai.myqcloud.com/materials/gsd-h5-react@0.0.61/source-mp.zip -o gsd-h5-react-mp@0.0.61.zip && \
    unzip gsd-h5-react-mp@0.0.61.zip -d gsd-h5-react-mp@0.0.61 && \
    rm -rf /root/.weapps-materials/*.zip && \
    ls -al /root/.weapps-materials

    # deno --version

COPY index.js /usr/opts/

CMD ["node", "/usr/opts/index.js"]
