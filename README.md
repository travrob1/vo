# Veteran Opportunities

## Instructions
Repo - `https://github.com/krakenjs/swaggerize-express`

1. Clone the repo: `git clone git@bitbucket.org:travis_rosoin/vo.git`
2. Install packages: `npm install`
3. (optional) Change out the database configuration in config/database.js
4. (optional) Change out auth keys in config/auth.js ???
5. Launch: `node server.js`
6. Visit in your browser at: `http://localhost:4000`

## To update API:
0. assuming you are on `master` branch to start with.
1. load up API document ./config/swagger.yaml into http://editor.swagger.io/#/
2. make your changes
3. download the json and YAML file.
4. `git checkout swaggerize`
5. copy the downloaded json and YAML file to ./config/
5. `yo swaggerize`, answers are:
```
Swaggerize Generator
Tell us a bit about your application
? Path (or URL) to swagger document: ./config/swagger.json
? What would you like to call this project: api
? Your name: Chris David
? Your github user name: tongfa
? Your email: voapi@sky.chrisdavid.com
identical .eslintignore
identical .eslintrc
identical .npmignore
 conflict package.json
? Overwrite package.json? a
overwrite this and all others
```
6.  `git add .`
7.  `git commit -m'update API'`
8.  `git checkout master`
9.  `git merge swaggerize`
10. Now just the delta from the last `yo swaggerize` run will be merged into `master`.



