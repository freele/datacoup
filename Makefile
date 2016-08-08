deploy:
	rm -rf ./public/* && \
	roots compile -e production && \
	git add public && \
	git commit -a -m 'gh-pages build' && \
	git push origin --delete gh-pages && \
	git subtree push --prefix public origin gh-pages && \
	git rm -r --cached public && \
	git reset --hard HEAD~1

watch:
	roots watch

.PHONY: deploy watch
