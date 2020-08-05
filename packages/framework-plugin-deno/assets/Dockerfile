FROM debian:buster-slim

WORKDIR /install

RUN apt-get update && apt-get install curl unzip -y

RUN curl -fsSL https://deno.land/x/install/install.sh | sh

ENV DENO_DIR="/root/.cache/deno"
ENV DENO_INSTALL="/root/.deno"
ENV PATH="$DENO_INSTALL/bin:$PATH"

WORKDIR /app

COPY . .

ENTRYPOINT ["deno"]

CMD ["run", "-A", "__launcher.ts"]
