## sp-starter-kit - V1

This is a legacy project and is left for historical purposes. Use source from [source](../source) folder.

### Building the legacy project

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Run and Build options

In order to run the solution for testing purposes in the local Workbench, you have to execute the following script:

```
npm run build:dev
```

Moreover, if you like to run the solution for testing purposes without starting the local Workbench, you have to execute the following script:

```
npm run build:dev -- --nobrowser
```

Mind the `--` before the actual `--nobrowser` flag.

In order to build the solution for dev (no --ship flag) you have to execute the following script:

```
npm run build:dev
```

In order to build the solution for production (with --ship flag) you have to execute the following script:

```
npm run build:prod
```

The custom build scripts will do `gulp clean`, `gulp build`, and `gulp package-solution` for you.
Likewise, to bundle the solution, there are the following scripts:

```
npm run bundle:dev
```

or

```
npm run bundle:prod
```

Using the out of the box gulp commands, you could fail because of memory allocation issues with exception "JavaScript heap out of memory" due to the defaul memory max limits of Node.js.