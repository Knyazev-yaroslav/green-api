# Пользовательский интерфейс для отправки и получений сообщений WhatsApp

# _Тестовое задание на должность "Фронтенд разработчик React"_

![demo](https://github.com/Knyazev-yaroslav/green-api/blob/master/screenshots/Chat_demo.png)

## Запуск приложения:

Установите зависимости и запустите сервер.

```sh
npm i
npm start
```

## Информация о работе приложения:

Для корректной работы приложения у вас должен быть авторизированный аккаунт Green-api, а также в настройках уведомлений должно быть включено только "Получать уведомления о входящих сообщениях и файлах"

![correct settings](https://github.com/Knyazev-yaroslav/green-api/blob/master/screenshots/Correct_settings_demo.png)

После запуска вам необходимо ввести ваши IdInstance и ApiTokenInstance из личного кабинета Green-api. 

![login demo](https://github.com/Knyazev-yaroslav/green-api/blob/master/screenshots/Instance.png)
Данные сохраняются в localStorage, при повторном запуске не придется их вводить еще раз.

![login demo](https://github.com/Knyazev-yaroslav/green-api/blob/master/screenshots/Login_page.png)

После авторизации вас направит на страницу с самим чатом. На ней вы будете получать все уведомления о входящих сообщениях, а также можно отправлять сообщения, нажав на кнопку "Новый чат". Если ваши сообщения не отправляются, скорее всего у вас исчерпан лимит.

## Структура проекта

- api - инстанс и работа с api
- assets - хранение изображений
- hooks - кастомные хуки
- pages - страницы приложения
- shared - компоненты, используемые на нескольких страницах
- store - redux toolkit store
- utils - общие функции
