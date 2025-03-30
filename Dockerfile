FROM ubuntu:latest

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    cmake \
    libboost-dev \
    libssl-dev \
    libasio-dev \
    nlohmann-json3-dev \
    wget \
    libcrypto++-dev \
    libcrypto++-utils \
    ca-certificates \
    libboost-system-dev \
    nginx

RUN mkdir -p /app/server /app/webapp

ARG CROW_DEB_URL="https://github.com/CrowCpp/Crow/releases/download/v1.2.1.2/Crow-1.2.1-Linux.deb"
RUN wget -O /tmp/crow.deb ${CROW_DEB_URL}

RUN dpkg -i /tmp/crow.deb

RUN apt --fix-broken install -y


COPY server /app/server

WORKDIR /app/server

RUN make clean

RUN make

RUN chmod +x /app/server/server

WORKDIR /

COPY webapp /app/webapp

RUN apt-get install -y supervisor

RUN rm -rf /etc/nginx/sites-available/default
RUN rm -rf /etc/nginx/sites-enabled/default

COPY config/nginx.conf /etc/nginx/conf.d/

COPY config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf", "-n"]
