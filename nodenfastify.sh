#!/bin/bash
/usr/bin/date | logger
current_year=$(date +'%Y')
logfilename=log${current_year}.log
/usr/bin/date +'%Y-%m-%d %H:%M:%S %::z' >> /home/isilud/progs/node/nfastify/${logfilename}
#current_path=$(pwd)
#echo ${current_path} >> /home/isilud/progs/bash/test/log${current_year}.log
#current_wd=$(cwd)
#echo ${current_wd} >> /home/isilud/progs/bash/test/log${current_year}.log
/bin/nodemon --tls-min-v1.0 /home/isilud/progs/node/nfastify/index.mjs > ${logfilename} >&1
