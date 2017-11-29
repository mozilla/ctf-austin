
## Setup

### Deploy on Heroku (free ($0/month) dyno)

1. Click the button below and follow the instructions

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

> This is the quickest way to get a running instance! If
> you have forked this repository, the deploy button will automatically
> pick up your fork for deployment! As long as you do not perform any
> DDoS attacks you are free to use any tools or scripts to hack your
> instance on Heroku!

### From Sources

1. Install [node.js](#nodejs-version-compatibility)
2. Run `git clone https://github.com/mozilla-services/ctf-austin.git` (or
   clone [your own fork](https://github.com/mozilla-services/ctf-austin/fork)
   of the repository)
3. Go into the cloned folder with `cd ctf-austin`
4. Run `npm install` (only has to be done before first start or when you
   change the source code)
5. Run `npm start`
6. Browse to <http://localhost:3000>

### Docker Container [![Docker Automated build](https://img.shields.io/docker/automated/mozilla/ctf-austin.svg)](https://registry.hub.docker.com/u/mozilla/ctf-austin/) [![Docker Pulls](https://img.shields.io/docker/pulls/mozilla/ctf-austin.svg)](https://registry.hub.docker.com/u/mozilla/ctf-austin/) [![](https://images.microbadger.com/badges/image/mozilla/ctf-austin.svg)](https://microbadger.com/images/mozilla/ctf-austin "Get your own image badge on microbadger.com")

1. Install [Docker](https://www.docker.com)
2. Run `docker pull mozilla/ctf-austin`
3. Run `docker run -d -p 3000:3000 mozilla/ctf-austin`
4. Browse to <http://localhost:3000> (on macOS and Windows browse to
   <http://192.168.99.100:3000> if you are using docker-machine instead
   of the native docker installation )

#### Even easier: Run Docker Container from Docker Toolbox (Kitematic)

1. Install and launch
   [Docker Toolbox](https://www.docker.com/docker-toolbox)
2. Search for `ctf-austin` and click _Create_ to download image and run
   container
3. Click on the _Open_ icon next to _Web Preview_ to browse to OWASP
   Juice Shop

### Amazon EC2 Instance

1. Setup an _Amazon Linux AMI_ instance
2. In _Step 3: Configure Instance Details_ unfold _Advanced Details_ and
   copy the script below into _User Data_
3. In _Step 6: Configure Security Group_ add a _Rule_ that opens port 80
   for HTTP
4. Launch instance
5. Browse to your instance's public DNS

```
#!/bin/bash
yum update -y
yum install -y docker
service docker start
docker pull mozilla-services/ctf-austin
docker run -d -p 80:3000 mozilla-services/ctf-austin
```

> Technically Amazon could view hacking activity on any EC2 instance as
> an attack on their AWS infrastructure! We highly discourage aggressive
> scanning or automated brute force attacks! You have been warned!

### Vagrant

1. Install [Vagrant](https://www.vagrantup.com/downloads.html) and
   [Virtualbox](https://www.virtualbox.org/wiki/Downloads)
2. Run `git clone https://github.com/mozilla-services/ctf-austin.git` (or
   clone [your own fork](https://github.com/mozilla-services/ctf-austin/fork)
   of the repository)
3. Run `cd vagrant && vagrant up`
4. Browse to [192.168.33.10](http://192.168.33.10)

> To show the possible impact of
> [XSS](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)),
> assume you received and (of course) clicked
> [this inconspicuous phishing link](http://192.168.33.10/#/search?q=%3Cscript%3Evar%20js%20%3Ddocument.createElement%28%22script%22%29;js.type%20%3D%20%22text%2Fjavascript%22;js.src%3D%22http:%2F%2F192.168.33.10%2Fshake.js%22;document.body.appendChild%28js%29;varhash%3Dwindow.location.hash;window.location.hash%3Dhash.substr%280,8%29;%3C%2Fscript%3Eapple)
> and login. Apart from the visual/audible effect, the attacker also
> installed [an input logger](http://192.168.33.10/logger.php) to grab
> credentials! This could easily run on a 3rd party server in real life!
>
> _This feature is only available when running a Vagrant box. A
> recording of the effect is available on Youtube:_
> [:tv:](https://www.youtube.com/watch?v=L7ZEMWRm7LA)

## Node.js version compatibility

The following versions of
[node.js](http://nodejs.org) are supported, in line as close as possible with the
official [node.js LTS schedule](https://github.com/nodejs/LTS). Docker
images and packaged distributions are offered accordingly:

| node.js | [Docker image](https://registry.hub.docker.com/u/mozilla-services/ctf-austin)             | [Packaged distributions](https://github.com/mozilla-services/ctf-austin/releases/latest)       |
|:--------|:------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------------|
| __6.x__ | __`latest`__ (current official release), `snapshot` (preview from `develop` branch) | `ctf-austin-<version>_node6_windows_x64.zip`, `ctf-austin-<version>_node6_linux_x64.tgz` |
| 8.x     |                                                                                     | `ctf-austin-<version>_node8_windows_x64.zip`, `ctf-austin-<version>_node8_linux_x64.tgz` |
