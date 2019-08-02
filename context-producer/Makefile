curdir = $(shell pwd)
cname =tutorial-train
container = tutorial-train
vol = -v $(curdir)/config.js:/config.js
restart=--restart=always
#network=--net=fiware_link
#log = --log-driver=syslog --log-opt syslog-facility=local6 --log-opt tag="[odpt]"

build:
	docker build -t $(container) .
run:
	docker run -d $(restart) --name $(cname) $(vol) $(log) $(network) $(container)
logs:
	docker logs $(cname)
stop:
	docker stop $(cname)
rm:
	docker rm $(cname)
down:
	make stop;make rm
reboot:
	make stop;make rm;make run
