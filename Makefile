include node_modules/make-better/core.inc
include node_modules/make-better/frontend.inc

## Set these to the path containing your *.styl/*.jade/*.js files
#STYLUS_DIR := path/to/stylus/files
#JADE_DIR := path/to/jade/files
#JS_DIR := path/to/client/js/files

build: html css js

#html:
#css:
#js:

#public/css/app.css: $(STYLUS_FILES)
#	stylus $(STYLUS_DIR)/app.styl -o public/css
