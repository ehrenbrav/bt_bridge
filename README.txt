Dependencies
============
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install nodejs
sudo ln -s /usr/bin/nodejs /usr/bin/node

Disable bluetoothd:
sudo systemctl disable bluetooth

In the directory above the root directory of the hh project, execute the following:
git clone https://github.com/ehrenbrav/omniwear-driver.git

In the omniwear-driver directory, build the driver using make, then:
sudo cp o/libomniwear_sdk.so /usr/local/lib
sudo ldconfig

Install the node dependencies:
npm install bleno
sudo npm install -g node-gyp

Build the addon, using the following from the root directory:
node-gyp configure
node-gyp build

Execute the bleno code using:
sudo node omniwear

You may need to set an environment variable specifying the
correct BlueTooth interface to use:
sudo BLENO_HCI_DEVICE_ID=1 node peripheral
