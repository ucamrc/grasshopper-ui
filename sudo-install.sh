# TODO: guard against being run as non-root

echo == == == == == == == == == == == == == == == == == == == == == == ==
echo == Installing Node.js

#language: node_js
#node_js:
#  - "0.10.33"
# grasshopper uses - "0.10.30" ??
# https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager
# https://deb.nodesource.com/setup magically (scarily!) configures apt-get to just do the right thing (urgh) - but nicer than non apt ??
# maybe do this locally/fork it locally etc - although it will be different from travis.
# TRY Paste this at end of sources.list for now

echo 'deb https://deb.nodesource.com/node precise main' >> /etc/apt/sources.list
echo 'deb-src https://deb.nodesource.com/node precise main' >> /etc/apt/sources.list 
curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -
apt-get update
apt-cache showpkg nodejs # shows 0.10.33 at the moment
apt-get install -y nodejs # without the above fixes, actually installs 0.6.12

# Travis log appears to use "nvm install 0.10.33"

# http://achinth.com/post/58263924087/installing-node-js-using-nvm-on-ubuntu
# https://raw.githubusercontent.com/creationix/nvm/master/install.sh # argh more scary run stuff off the web as root


echo == == == == == == == == == == == == == == == == == == == == == == ==
echo == Installing Git (in case not already installed)
apt-get install -y git

echo == == == == == == == == == == == == == == == == == == == == == == ==
echo == Installing PostgreSQL and setting up databases and users

#addons:
#  postgresql: "9.3"
# Is "addon" the same as just psql or is it an addon for node.js?

apt-get install -y postgresql # actually installs 9.1 ??

# [start postgresql is built in]

sudo -u postgres psql template1 -c 'CREATE USER grasshopper WITH PASSWORD '\''grasshopper'\'';'
sudo -u postgres psql template1 -c 'CREATE DATABASE grasshopper;'
sudo -u postgres psql template1 -c 'CREATE DATABASE grasshoppertest;'
sudo -u postgres psql template1 -c 'GRANT ALL PRIVILEGES ON DATABASE grasshopper TO grasshopper;'
sudo -u postgres psql template1 -c 'GRANT ALL PRIVILEGES ON DATABASE grasshoppertest TO grasshopper;'


echo == == == == == == == == == == == == == == == == == == == == == == ==
echo == Installing Pre-requisites for Apache

  # Prepare the machine
# DUPLICATE apt-get update
# mostly gcc and make ; probably similar to stuff already on Travis so possibly superfluous
# But a bigger question (cf SG??) is whether it's appropriate to build Apache and dependencies from scratch?
# If we are going to build from source, let's pick a more official source than lib.gblearn.com
# see http://httpd.apache.org/docs/2.4/install.html (as mentioned in README.md)
## it explains the dependencies, and has more official mirrors than lib.gblearn.com

apt-get install -y build-essential
cd /usr/local/lib

  # Get Apache HTTP-server 2.4
# apache 2.4 comes with trusty by default, but might not have apr/apr-util/pcre?
wget http://lib.gblearn.com/apache/httpd-2.4.10.tar.gz -q
tar xfz httpd-2.4.10.tar.gz
cd httpd-2.4.10/srclib/

  # Download dependencies
wget http://lib.gblearn.com/apache/apr/apr-1.5.1.tar.gz -q
wget http://lib.gblearn.com/apache/apr/apr-util-1.5.3.tar.gz -q
wget http://lib.gblearn.com/apache/pcre/pcre-8.34.tar.gz -q

  # Install and configure APR
echo 'Installing APR'
tar xfz ./apr-1.5.1.tar.gz
cd apr-1.5.1
./configure
make --silent
make install --silent
cd ../

  # Install and configure APR util
echo 'Installing APR util'
tar xfz ./apr-util-1.5.3.tar.gz
cd apr-util-1.5.3
./configure --with-apr=/usr/local/apr/bin/apr-1-config
make --silent
make install --silent
cd ../

  # Install and configure PCRE
echo 'Installing PCRE'
tar xfz pcre-8.34.tar.gz
cd pcre-8.34
./configure --prefix=/usr/local/pcre
make --silent
make install --silent
cd ../..

echo == == == == == == == == == == == == == == == == == == == == == == ==
echo == Installing Apache

  # Install and configure Apache HTTPD 2.4
./configure --prefix=/usr/local/apache2 --with-pcre=/usr/local/pcre --enable-so
make --silent
make install --silent
cd /usr/local/apache2/conf
mkdir sites-enabled

echo == == == == == == == == == == == == == == == == == == == == == == ==
echo == Configuring /etc/hosts

# admin.grasshopper.com for internal use only (e.g. via curl in setup scripts)
# ARGH admin really does seem to need a separate hostname or port because
# admin and tenant share /api ABSOLUTE path which is used by swagger as basePath? :-(
# One workaround for now could be to use ssh with port-forwarding to 127.0.0.1 ?
sudo sed -i "2i127.0.0.1 admin.grasshopper.com" /etc/hosts
cat /etc/hosts

