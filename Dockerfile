# Mozilla Austin CTF
FROM            node:6-alpine
MAINTAINER      Firefox Operartions Security Team <foxsec@mozilla.com>
LABEL version = "1.0.1"

RUN apk update && apk add git

COPY . /mozilla-ctf
WORKDIR /mozilla-ctf
RUN npm install --production --unsafe-perm

EXPOSE  3000
CMD ["npm", "start"]
