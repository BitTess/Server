# BitTess
##Peer to Peer Website server

BitTess is a new type of website that is based on the bit torrent protocol.
It connects users to a swarm that feeds them data and they can then interact with.
A demo site can be played with [here](http://www.bittess.com/demo/)
If you have any questions contact us at git@bittess.com

##Installation
To get started with this server first you need a Linux server that has node installed

Once you have cloned this repo the server can be run by the following command

```
node node_modules/peer/node_modules/ws/index.js
```

Replace the server in the first line of the client bt.js file with your server IP and you should be good to go.

##Where to go from here

The main server configuration and processing in done in the `/node_modules/peer/lib/server.js` file check that one out.

You should really split this one off into a separate file to play around with it more safely. 

##Troubleshooting

Some commonly found issues are as follows

* btoa not installed - If you get an error about btoa then you need to install btoa by running `npm install btoa`
* UserDB error - If you get this error donâ€™t worry it just cant find the user database file. It will create one during the first backup, or you can create your own by running `touch /tmp/UserDB.txt'`
* ip is 0.0.0.0 - you will get this if you are running this behind a NAT or on a cloud server without a visible IP such as on cloud 9. Just use your full connection name to connect as normally
* Can't connect - there are several reasons you might not be able to connect. Check your firewalls and try pinging the server to check connectivity. Try a html request and check the browser console

If you have any further questions send us an email at help@bittess.com and we will try to help you out.
