➜  educational_app git:(master) npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (educational_app)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository: (https://github.com/alexfjclements/group_project_education_app.git)
keywords:
author:
license: (ISC)
About to write to /Users/alexanderclements/codeclan/projects/js_group_project/educational_app/package.json:

{
  "name": "educational_app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/alexfjclements/group_project_education_app.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/alexfjclements/group_project_education_app/issues"
  },
  "homepage": "https://github.com/alexfjclements/group_project_education_app#readme"
}


Is this OK? (yes)
➜  educational_app git:(master) ✗ npm install -D webpack webpack-cli

> fsevents@1.2.4 install /Users/alexanderclements/codeclan/projects/js_group_project/educational_app/node_modules/fsevents
> node install

[fsevents] Success: "/Users/alexanderclements/codeclan/projects/js_group_project/educational_app/node_modules/fsevents/lib/binding/Release/node-v64-darwin-x64/fse.node" already installed
Pass --update-binary to reinstall or --build-from-source to recompile
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN educational_app@1.0.0 No description

+ webpack@4.27.1
+ webpack-cli@3.1.2
added 447 packages from 307 contributors and audited 4263 packages in 15.303s
found 0 vulnerabilities

➜  educational_app git:(master) ✗ npm install -D nodemon

> nodemon@1.18.7 postinstall /Users/alexanderclements/codeclan/projects/js_group_project/educational_app/node_modules/nodemon
> node bin/postinstall || exit 0

npm WARN educational_app@1.0.0 No description

+ nodemon@1.18.7
added 54 packages from 26 contributors and audited 6501 packages in 6.745s
found 0 vulnerabilities

➜  educational_app git:(master) ✗ npm install body-parser express mongodb
npm WARN educational_app@1.0.0 No description

+ express@4.16.4
+ body-parser@1.18.3
+ mongodb@3.1.10
added 55 packages from 39 contributors and audited 6663 packages in 8.719s
found 0 vulnerabilities

➜  educational_app git:(master) ✗   
