npx nx build --prod --output-path www

docker container stop $(docker container ls -q --filter name=spacko-magic-nginx*)

docker container prune

docker build -t spacko-magic-nginx .

docker run --name spacko-magic-nginx -d -p 80:80 spacko-magic-nginx

