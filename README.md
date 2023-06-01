[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml)
[![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)

# Проект Mesto фронтенд + бэкенд

https://github.com/annagroshkova/express-mesto-gha

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки  
`/models` — папка с файлами описания схем пользователя и карточки

Остальные директории вспомогательные, создаются при необходимости разработчиком.

## Запуск проекта

`npm run start` — запускает сервер  
`npm run dev` — запускает сервер с hot-reload

## Mongo

```shell
brew services start mongodb-community
brew services stop mongodb-community
```


```
ssh anna@158.160.107.173

http://158.160.107.173:3000/users 

https://anna.nomoredomains.rocks/

https://api.anna.nomoredomains.rocks

git pull origin main
pm2 restart app

scp -r ./build/* anna@158.160.107.173:/home/anna/mesto-frontend
  
  
sudo nano /etc/nginx/sites-available/default
sudo nginx -t 
sudo systemctl reload nginx 

```
