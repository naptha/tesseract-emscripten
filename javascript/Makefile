glue: tesseract.idl
	python /Users/kevin/emsdk/emscripten/1.30.0/tools/webidl_binder.py tesseract.idl glue

lepton:
	cd ../leptonica-1.72; \
	emconfigure ./configure --enable-shared=no --disable-programs --without-zlib --without-libpng --without-jpeg --without-giflib --without-libtiff; \
	emmake make


dev: glue
	emcc -Oz --closure 1 \
		wrapper.cpp ../api/baseapi.cpp \
		-o frank.js \
		--post-js glue.js --post-js anterior.js \
		../leptonica-1.72/wumbo/*.c \
		-I../leptonica-1.72/src \
		-I../api -I../cube -I../opencl -I../ccutil -I../textord -I../classify -I../dict -I../ccmain -I../cutil -I../wordrec -I../ccstruct  -I../viewer \
		../ccmain/*.cpp ../ccutil/*.cpp   ../wordrec/*.cpp ../textord/*.cpp ../ccstruct/*.cpp ../dict/*.cpp ../cutil/*.cpp ../classify/*.cpp \
		-DANDROID_BUILD -DGRAPHICS_DISABLED \
		-DGRAPHICS_DISABLED -DIMGUNPK_H -DSECURE_NAMES -DTESSDATA_PREFIX="./" -DUSE_STD_NAMESPACE  \
		--memory-init-file 0 -s TOTAL_MEMORY=268435456 \
		-s EXPORT_NAME='"Tesseract304"'  -s MODULARIZE=1 -s NO_BROWSER=1 \
		-s EXPORTED_FUNCTIONS='["_pixDestroy","_boxaDestroy","_pixaDestroy","_ptaDestroy"]' \
		--llvm-lto 1 -s INVOKE_RUN=0 -s NO_EXIT_RUNTIME=1 -s AGGRESSIVE_VARIABLE_ELIMINATION=1 

# ../leptonica-1.72/src/pageseg.c \
# -I../leptonica-1.72/src -L../leptonica-1.72/src/.libs/ -llept \


# emcc -Oz --closure 1 \
# 	wrapper.cpp baseapi.cpp \
# 	-o frank.html \
# 	--post-js glue.js \
# 	-I/Users/kevin/Downloads/emsdk_portable/v4/include/leptonica \
# 	-L/Users/kevin/Downloads/emsdk_portable/v4/leptonica-1.71/src/.libs/ -llept \
# 	-I../opencl -I../ccutil -I../textord -I../classify -I../dict -I../ccmain -I../cutil -I../wordrec -I../ccstruct  -I../viewer \
# 	../ccmain/*.cpp ../ccutil/*.cpp   ../wordrec/*.cpp ../textord/*.cpp ../ccstruct/*.cpp ../dict/*.cpp ../cutil/*.cpp ../classify/*.cpp \
# 	-DANDROID_BUILD -DGRAPHICS_DISABLED \
# 	--preload-file tessdata/eng.traineddata --preload-file phototest.bmp \
# 	--preload-file tessdata/chi_sim.traineddata --preload-file chinese3.bmp --preload-file chinese4.bmp --preload-file chinese5.pbm --preload-file chinese3.tif \
# 	-DGRAPHICS_DISABLED -DIMGUNPK_H -DSECURE_NAMES -DTESSDATA_PREFIX="./" -DUSE_STD_NAMESPACE  \
# 	--memory-init-file 0 -s TOTAL_MEMORY=268435456
# 	# -s EXPORT_NAME='"TesseractCore"'  -s MODULARIZE=1 -s NO_BROWSER=1\
# 	# --llvm-lto 1 -s INVOKE_RUN=0 -s NO_EXIT_RUNTIME=1 -s AGGRESSIVE_VARIABLE_ELIMINATION=1 


# # -DANDROID_BUILD -DGRAPHICS_DISABLED disables Cube
# # -L/Users/kevin/Downloads/emsdk_portable/v4/leptonica-1.71/src/.libs/ -llept \
# # 