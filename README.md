# Fwibble

How to start up the webpack database:
You'll need to do a global install of webpack: `npm install -g webpack>`.
Then run `npm install` in your root directory.
Then type `webpack` into the command line to put all this stuff into a dist. folder.
Run an `npm start`, and you should now be able to pull up the site on localhost:8080.
If you want to automatically update your in-browser view when you make changes, you can run `webpack -w`.
Running `webpack -p` (p for production) will minify and uglify the dist files.
