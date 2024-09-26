#FROM php:8.0-cli

FROM phpdockerio/php80-cli:latest
#WORKDIR "/application"

# Fix debconf warnings upon build
ARG DEBIAN_FRONTEND=noninteractive

# Install selected extensions and other stuff
RUN apt-get update \
    && apt-get -y --no-install-recommends install supervisor php8.0-mysql nano php8.0-redis php8.0-bcmath php8.0-zmq php8.0-pgsql \
    && apt-get clean; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

#RUN apt-get update -qq && \
#    apt-get install -y -qq --no-install-recommends libzmq3-dev supervisor && \
#    pecl install zmq-beta && \
#    docker-php-ext-install pdo pdo_mysql bcmath pcntl && \
#    docker-php-ext-enable zmq && \
#    apt-get clean; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

EXPOSE 19477

COPY ./ /var/www/html/
RUN chmod -R 777 /var/www/html/storage
COPY ./docker/workers/supervisord.conf /etc/supervisord.conf
COPY ./docker/workers/workers/ /etc/supervisor/conf.d/

ENTRYPOINT ["/usr/bin/supervisord", "-n", "-c",  "/etc/supervisord.conf"]

WORKDIR /etc/supervisor/conf.d/
