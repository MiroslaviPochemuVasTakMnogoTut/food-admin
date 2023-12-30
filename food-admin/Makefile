v=entity
entity:
	nest g res $(v) --no-spec

action:
	@echo $(filter-out $@,$(MAKECMDGOALS))
act:
	@echo $(v)

run-dev:
	docker run -it --rm \
	-p 3000:3000 \
	--name dev_cont \
	food_cont

build:
	docker build . -t food_cont

somerun:
	docker run -v ${pwd}:/app -p 4000:4000 --name app food_cont
# cd src 
# cd ..