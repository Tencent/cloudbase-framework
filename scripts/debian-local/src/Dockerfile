FROM debian:buster-slim

RUN echo "deb http://mirrors.cloud.tencent.com/debian/ buster main contrib non-free\
deb http://mirrors.cloud.tencent.com/debian/ buster-updates main contrib non-free\
deb http://mirrors.cloud.tencent.com/debian/ buster-backports main contrib non-free\
deb http://mirrors.cloud.tencent.com/debian-security buster/updates main contrib non-free\
deb-src http://mirrors.cloud.tencent.com/debian/ buster main contrib non-free\
deb-src http://mirrors.cloud.tencent.com/debian/ buster-updates main contrib non-free\
deb-src http://mirrors.cloud.tencent.com/debian/ buster-backports main contrib non-free\
deb-src http://mirrors.cloud.tencent.com/debian-security buster/updates main contrib non-free" > /etc/apt/sources.list

RUN apt-get clean all
RUN apt-get update


