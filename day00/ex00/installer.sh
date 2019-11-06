#!/bin/sh
VERSION=$(python -V)
PATH=/sgoinfre/goinfre/Perso/ltimsit-

if [ "${VERSION}" != "Python 3.7.4" ]
then
	cd $PATH && curl https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-x86_64.sh -o miniconda.sh && ./miniconda.sh -b -p $PATH/miniconda3
	export PATH="/sgoinfre/goinfre/Perso/ltimsit-/miniconda3/bin:$PATH"
fi
