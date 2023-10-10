v=entity
entity:
	cd src 
	nest g res $(v) --no-spec
	cd ..

action:
	@echo $(filter-out $@,$(MAKECMDGOALS))
act:
	@echo $(v)