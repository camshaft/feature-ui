
build: components index.js feature-ui.css
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components

lint:
	recess --stripColors feature-ui.css

.PHONY: clean lint
