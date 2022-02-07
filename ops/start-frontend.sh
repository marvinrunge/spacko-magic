npx nx build --prod --output-path www --prefix ../

docker build -t spacko-magic-nginx ../.

docker run --name spacko-magic-nginx -d -p 80:80 spacko-magic-nginx

