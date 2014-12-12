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

# As it turns out, ./target/optimized/apache/httpd.conf seems to be the same as ./grasshopper-ui/apache/httpd.conf
echo sudo cp ~/build/CUL-DigitalServices/grasshopper-ui/apache/httpd.conf /usr/local/apache2/conf/httpd.conf

# These are only in my temporary branch
echo sudo cp ./apache/temp/app_*.conf /usr/local/apache2/conf/sites-enabled
echo Then edit them appropriately \(notably they are hard-coded to /home/rwlc3\):
echo sudo vim /usr/local/apache2/conf/sites-enabled/app_*.conf


###### Start Apache ######
echo sudo /usr/local/apache2/bin/apachectl start

##### also start the grasshopper server (as per its README.md):
echo TODO this obviously wont persist when you logout
echo cd ~/build/CUL-DigitalServices/grasshopper
echo node app


##### Setup Tenant using local-only admin.grasshopper.com #####

# LOGIN
curl -b /tmp/curlcookiejar -c /tmp/curlcookiejar -w '\nHTTP STATUS: %{http_code}\nTIME: %{time_total}\n' -e / admin.grasshopper.com/api/auth/login -X POST -d 'password=administrator&username=administrator'

# TODO: change the password when it is implemented(!)

# LIST TENANTS (CHECK LOGGED IN OK)
curl -b /tmp/curlcookiejar -c /tmp/curlcookiejar -w '\nHTTP STATUS: %{http_code}\nTIME: %{time_total}\n' -e / admin.grasshopper.com/api/tenants

# CREATE TENANT
curl -b /tmp/curlcookiejar -c /tmp/curlcookiejar -w '\nHTTP STATUS: %{http_code}\nTIME: %{time_total}\n' -e / admin.grasshopper.com/api/tenants -X POST -d 'displayName=mytenant'
### assume returns "id":1

# CREATE APP (needs tenantId from above, change host param to match)
curl -b /tmp/curlcookiejar -c /tmp/curlcookiejar -w '\nHTTP STATUS: %{http_code}\nTIME: %{time_total}\n' -e / admin.grasshopper.com/api/apps -X POST -d 'displayName=myapp&tenantId=1&host=2013.cam.timetable.grasshopper.com&type=timetable'
### assume returns "id":1

# CREATE APP USER (needs appId from above)
curl -b /tmp/curlcookiejar -c /tmp/curlcookiejar -w '\nHTTP STATUS: %{http_code}\nTIME: %{time_total}\n' -e / admin.grasshopper.com/api/users -X POST -d 'appId=1&displayName=TestUser&email=test&password=test'

###### PUT THIS IN CRON #######

# will also need grasshopper pull!

## cd build/CUL-DigitalServices/grasshopper-ui
## git pull
