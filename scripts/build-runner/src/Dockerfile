FROM coding-public-docker.pkg.coding.net/public/docker/nodejs:14

ARG tag=latest

# 复制插件列表
COPY ./package.json /root/cloudbase-framework/registry/package.json

# 使用国内镜像源
RUN npm config set registry http://mirrors.tencent.com/npm/ && \
    # 安装 CLI 及 PNPM
    npm install -g @cloudbase/cli@$tag pnpm && \
    echo $tag && \
    # 全局安装 Deno
    curl -fsSL https://deno.land/x/install/install.sh | sh && \
    echo 'export DENO_INSTALL="/root/.deno"\nexport PATH="$DENO_INSTALL/bin:$PATH"' >> ~/.profile && \
    # 全局安装插件
    cd /root/cloudbase-framework/registry/ && \
    pnpm install && \
    . ~/.profile && \
    deno --version

COPY index.js /usr/opts/

CMD ["node", "/usr/opts/index.js"]
