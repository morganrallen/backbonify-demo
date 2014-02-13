Demo application demonstrating using browserify and Backbone in a modular fashion. Might not be a 100% 'correct way' of using either but it is the process I have developed into.

Requirements
============
Make sure you have NodeJS installed already. npm comes with it.
If not get it here. http://nodejs.org/
All platforms are supported.

Installation
====
```
git clone https://github.com/morganrallen/backbonify-demo
cd backbonify-demo
npm install
npm run build
npm run serve
```


Develeopment
============
In seperate terminals (of what ever if comfortable to your environment)
run the following

```
npm run less-dev
npm run watchify
npm run serve
```

This will set up watch handlers for all less source and JS to be rebundled
on change.
