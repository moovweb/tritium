#DIRS = api checker crypto doc linker main package parser shark spec tokenizer
DIRS = shark

all:
	set -e; for d in $(DIRS); do make -C $$d ; done
	make -f tritium.mak

test:
	set -e; for d in $(DIRS); do make test -C $$d ; done
	make -f tritium.mak test

install:
	set -e; for d in $(DIRS); do make install -C $$d ; done
	make -f tritium.mak install

clean:
	set -e; for d in $(DIRS); do make clean -C $$d ; done
	make -f tritium.mak clean

