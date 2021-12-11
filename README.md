Тестовое задание для Funbox

Приложение запущено на сайте route-app.iliamashkov.me

При клонировании из репозитория функционал урезан 
вследствие невозможности выложить в открытый доступ приватный API ключ

Инструкция по запуску:
1. git clone https://github.com/e7f3/route-app
2. npm install
3. npm run build
4. npm run start

Приложение - редактор маршрутов, в котором пользователь в интерактивном режиме 
может создавать на карте маршрут, указывая начальную, 
конечную и промежуточные точки движения. Для каждой точки
маршрута можно посмотреть ее адрес.

Маршрут может быть: 
1. Ломаной линия состоящей из прямых, соединяющих 2 соседние в списке точки.
2. Реальным путём между точками (в режимах Автомобиль, Велосипед, Пешеход, Общественный транспорт)

- Порядок точек маршрута в списке можно изменять перетаскиванием.
- Маркеры, соответствующие точкам маршрута, можно перемещать по карте 
  перетаскиванием.
- При изменении порядка точек в списке или их удалении, а также при перемещении
  маркеров маршрут на карте автоматически перерисовывается.
- При клике на маркер появляется балун, в балуне отображается название
  соответствующей ему точки.