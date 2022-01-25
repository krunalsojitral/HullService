Command line instructions

Git global setup
git config --global user.name "LetsNurture"
git config --global user.email "network@letsnurture.com"

Create a new repository
git clone git@192.168.1.4:network/KDSVW_ATWHullService_10142021.git
cd KDSVW_ATWHullService_10142021
touch README.md
git add README.md
git commit -m "add README"
git push -u origin master

Existing folder or Git repository
cd existing_folder
git init
git remote add origin git@192.168.1.4:network/KDSVW_ATWHullService_10142021.git
git add .
git commit
git push -u origin master