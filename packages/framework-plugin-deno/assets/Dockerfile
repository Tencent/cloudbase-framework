FROM <%= dockerImage %>

WORKDIR /install

RUN apt-get update && apt-get install curl unzip -y
RUN curl -fsSL https://x.deno.js.cn/install.sh | sh <%= denoVersion %>

ENV DENO_DIR="/root/.cache/deno"
ENV DENO_INSTALL="/root/.deno"
ENV PATH="$DENO_INSTALL/bin:$PATH"
ENV PORT=80

EXPOSE 80
ENTRYPOINT ["deno"]

WORKDIR /usr/src/app
COPY . .
RUN deno install <%= entry %>

CMD ["run", <%- denoRunOptions %>, "<%= entry %>"]
