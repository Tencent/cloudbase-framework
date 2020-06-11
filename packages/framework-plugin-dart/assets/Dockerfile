FROM google/dart

ENV PUB_HOSTED_URL https://mirrors.cloud.tencent.com/dart-pub
ENV FLUTTER_STORAGE_BASE_URL https://mirrors.cloud.tencent.com/flutter

WORKDIR /app
ADD pubspec.* /app/
RUN pub get --no-precompile
RUN pub get --no-precompile
ADD . /app/
RUN pub get --offline --no-precompile

WORKDIR /app
EXPOSE 80

ENTRYPOINT ["pub", "run", "aqueduct:aqueduct", "serve", "--port", "80"]