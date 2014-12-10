# TODO: do this for both files:

# TODO: add echo statements to make clearer where we have got to
# TODO: abort on error?
# TODO: log output?

mkdir -p ~/build/CUL-DigitalServices

  # Install Grasshopper
echo 'Installing Grasshopper'
cd ~/build/CUL-DigitalServices
git clone --branch master --depth=1 git://github.com/CUL-DigitalServices/grasshopper.git ./grasshopper
cd ./grasshopper
npm install --production

  # Configure postgres
# Done in previous script as it needs sudo

echo "config.db.database = 'grasshoppertest';" >> config.js

  # Install Grasshopper UI
echo 'Installing Grasshopper UI'
cd ~/build/CUL-DigitalServices
git clone --branch master --depth=1 git://github.com/CUL-DigitalServices/grasshopper-ui.git ./grasshopper-ui
cd ~/build/CUL-DigitalServices/grasshopper-ui
npm install


##### DO THIS MANUALLY ######

# this is where grunt-cli seems to be needed
# TODO: find out more about how this grunt task works
# TODO: review the apache config contents and understand how they work, e.g. log location, parameterise things, how much is 2.4-specific, how much is grasshopper, how much is grasshopper-ui
# work out how best to do the multiple VirtualHosts in production (admin and tenants on separate interfaces?)
# e.g. for my own testing purposes:
#sudo vim /usr/local/apache2/conf/sites-enabled/app_admin.conf # edit 127.0.0.1:80 to *:80 to make it work on 192.168.56.56
#sudo vim /usr/local/apache2/conf/sites-enabled/app_timetable.conf # edit 127.0.0.2:80 to *:80 to make it work on 192.168.56.56 , add ServerName directives for each of those in /etc/hosts above
#sudo /usr/local/apache2/bin/apachectl restart
#  - grunt configApache
#  - sudo cp ./target/optimized/apache/httpd.conf /usr/local/apache2/conf/httpd.conf
#  - sudo cp -R ./target/optimized/apache/app_*.conf /usr/local/apache2/conf/sites-enabled

echo Now put httpd.conf into /usr/local/apache2/conf/httpd.conf
echo and app_*.conf and /usr/local/apache2/conf/sites-enabled


###### Start Apache ######
echo sudo /usr/local/apache2/bin/apachectl start

##### also start the grasshopper server (as per its README.md):
echo cd ~/build/CUL-DigitalServices/grasshopper
echo node app




###### PUT THIS IN CRON #######

## cd build/CUL-DigitalServices/grasshopper-ui
## git pull
