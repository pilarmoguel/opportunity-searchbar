#!/bin/bash

UGLIFYJS="/usr/local/bin/uglifyjs"

if [ -x $UGLIFYJS ]; then
    BASEPATH=`dirname "$0"`

    echo "(function(){" > ${BASEPATH}/build/opportunity-searchbar.js
    for f in ${BASEPATH}/src/*.js; do
        (cat "${f}"; echo) >> ${BASEPATH}/build/opportunity-searchbar.js;
    done
    echo "})();" >> ${BASEPATH}/build/opportunity-searchbar.js
    ${UGLIFYJS} ${BASEPATH}/build/opportunity-searchbar.js -o ${BASEPATH}/build/opportunity-searchbar.min.js
else
    echo "Please install uglifyjs globally or update the path in the build script"
fi

