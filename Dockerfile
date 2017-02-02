#
# Plode/Nginx Dockerfile
#

# Pull base image.
FROM nginx

# Copy config over
COPY nginx.conf /etc/nginx/nginx.conf

# Copy files over
COPY deploy /var/www

# Install Nginx.
RUN \
  apt-get update && \
  apt-get install -y vim

# Define mountable directories.
# VOLUME ["/etc/nginx/sites-enabled", "/etc/nginx/certs", "/etc/nginx/conf.d", "/var/log/nginx", "/var/www/html"]

# Define working directory.
WORKDIR /etc/nginx

# Define default command.
#CMD ["nginx"]

# Expose ports.
EXPOSE 8080
#EXPOSE 443


# docker run -d -p 5000:8080 -v <sites-enabled-dir>:/etc/nginx/conf.d -v <certs-dir>:/etc/nginx/certs -v <log-dir>:/var/log/nginx -v <html-dir>:/var/www/html dockerfile/nginx
# docker run -p 5000:8080 --name plode -d kanizer/plode
