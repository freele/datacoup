deploy:
	roots compile -e production && ./node_modules/ship/bin/ship public -to gh-pages

watch:
	roots watch

.PHONY: deploy watch
