FROM alpine:latest

# Install python and pip
RUN apk add --no-cache --update python py-pip bash nodejs gcc postgresql-dev python-dev linux-headers musl-dev libc-dev libffi-dev
ADD ./c2c/requirements.txt /tmp/requirements.txt

# Install dependencies
RUN python -m pip install --upgrade pip && pip install --upgrade setuptools ez_setup && pip install --no-cache-dir -r /tmp/requirements.txt

# Add our code
ADD ./c2c /opt/c2c/
WORKDIR /opt/c2c	

RUN cd /opt/c2c && rm -rf node_modules && npm install

ENV PORT $PORT
EXPOSE 5000

RUN adduser -D c2c
USER c2c

# $PORT is set by Heroku		
CMD ./start.sh