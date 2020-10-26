FROM coding-public-docker.pkg.coding.net/public/docker/nodejs:14

# 复制插件列表
COPY ./package.json /root/cloudbase-framework/registry/package.json

# 使用国内镜像源
RUN npm config set registry https://registry.npm.taobao.org
# 安装 CLI 及 PNPM
RUN npm install -g @cloudbase/cli@latest pnpm
# 使用 PNPM 代替 NPM
RUN echo 'alias npm=pnpm' >> ~/.bashrc
# 全局安装 Deno
RUN curl -fsSL https://deno.land/x/install/install.sh | sh
# 全局安装插件
RUN cd /root/cloudbase-framework/registry/ && npm install

COPY index.js /usr/opts/

CMD [ "node", "/usr/opts/index.js"]
