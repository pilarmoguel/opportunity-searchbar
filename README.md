# Opportunity Searchbar
Goal of this project is to provide an independent Javascript file which provides the HTML5 custom element `<opportunity-searchbar></opportunity-searchbar>`. This element can be placed everywhere on a website and provides an easy way for your visitors to start searching [AIESECs huge database of opportunities](https://opportunities.aiesec.org).

## Installation
**Not released yet**

## Development
### Project structure
- the src folder contains all the source files with the following schema
    - every file besides C_main.js represents one module
    - modules are either called A_modulename.js or B_modulename.js (A for dependency modules and B for core modules)
    - every module defines a variable with the same name as the module, which either represents an object or a function
- the build folder contains the final JS file

### build process
1. Concat all source files and minify the result
2. put a self-executing function around everything and write it to the output file

If you use the build.sh script please make sure to have uglifyJS 2 installed (`sudo npm install -h uglify-js`).