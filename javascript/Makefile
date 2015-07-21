glue: tesseract.idl
	python /Users/kevin/emsdk/emscripten/1.30.0/tools/webidl_binder.py tesseract.idl glue

lepton:
	cd ../leptonica-1.72; \
	emconfigure ./configure --enable-shared=no --disable-programs --without-zlib --without-libpng --without-jpeg --without-giflib --without-libtiff; \
	emmake make

node: glue
	emcc -Oz --closure 1 \
		wrapper.cpp ../api/baseapi.cpp \
		-o lengle.js \
		--post-js glue.js --post-js anterior.js \
		../leptonica-1.72/wumbo/*.c \
		-I../leptonica-1.72/src \
		-I../api -I../cube -I../opencl -I../ccutil -I../textord -I../classify -I../dict -I../ccmain -I../cutil -I../wordrec -I../ccstruct  -I../viewer \
		../ccmain/*.cpp ../ccutil/*.cpp   ../wordrec/*.cpp ../textord/*.cpp ../ccstruct/*.cpp ../dict/*.cpp ../cutil/*.cpp ../classify/*.cpp \
		-DANDROID_BUILD -DGRAPHICS_DISABLED \
		-DGRAPHICS_DISABLED -DIMGUNPK_H -DSECURE_NAMES -DTESSDATA_PREFIX="./" -DUSE_STD_NAMESPACE  \
		--memory-init-file 0 -s TOTAL_MEMORY=268435456 \
		-s EXPORT_NAME='"TesseractCore"'  -s MODULARIZE=1 -s NO_BROWSER=1 \
		-s EXPORTED_FUNCTIONS='["_pixDestroy","_boxaDestroy","_pixaDestroy","_ptaDestroy"]' \
		--js-transform "python strip_node.py" \
		--llvm-lto 1 -s INVOKE_RUN=0 -s NO_EXIT_RUNTIME=1 -s AGGRESSIVE_VARIABLE_ELIMINATION=1 

dev: glue
	emcc -Oz --closure 1 \
		wrapper.cpp ../api/baseapi.cpp \
		-o madeline.js \
		--post-js glue.js --post-js anterior.js \
		../leptonica-1.72/wumbo/*.c \
		-I../leptonica-1.72/src \
		-I../api -I../cube -I../opencl -I../ccutil -I../textord -I../classify -I../dict -I../ccmain -I../cutil -I../wordrec -I../ccstruct  -I../viewer \
		../ccmain/*.cpp ../ccutil/*.cpp   ../wordrec/*.cpp ../textord/*.cpp ../ccstruct/*.cpp ../dict/*.cpp ../cutil/*.cpp ../classify/*.cpp \
		-DANDROID_BUILD -DGRAPHICS_DISABLED \
		-DGRAPHICS_DISABLED -DIMGUNPK_H -DSECURE_NAMES -DTESSDATA_PREFIX="./" -DUSE_STD_NAMESPACE  \
		--memory-init-file 0 -s TOTAL_MEMORY=268435456 \
		-s EXPORT_NAME='"TesseractCore"'  -s MODULARIZE=1 -s NO_BROWSER=1 \
		-s EXPORTED_FUNCTIONS='["_pixDestroy","_boxaDestroy","_pixaDestroy","_ptaDestroy"]' \
		--llvm-lto 1 -s INVOKE_RUN=0 -s NO_EXIT_RUNTIME=1 -s AGGRESSIVE_VARIABLE_ELIMINATION=1 

module:
	cp lengle.js tesseract.js-core/index.js
	echo "module.exports = TesseractCore;" >> tesseract.js-core/index.js