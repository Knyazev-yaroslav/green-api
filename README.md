# Чат

# _Тестовое задание на должность Front-end (React) разработчик_

![demo](https://github.com/Knyazev-yaroslav/green-api/blob/master/screenshots/Chat_demo.png)

## Запуск приложения:

Установите зависимости и запустите сервер.

```sh
npm i
npm start
```

## Информация о работе приложения:

Для корректной работы приложения у вас должен быть авторизированный аккаунт Green-api, а также в настройках уведомлений должно быть включено только "Получать уведомления о входящих сообщениях и файлах"

скриншот

После запуска вам необходимо ввести ваши IdInstance и ApiTokenInstance из личного кабинета Green-api. Данные сохраняются в localStorage, при повторном запуске не придется их вводить еще раз.

скриншот с логином

После авторизации вас направит на страницу с самим чатом. На ней вы будете получать все уведомления о входящих сообщениях, а также можно отправлять сообщения, нажав на кнопку "Новый чат". Если ваши сообщения не отправляются, скорее всего у вас исчерпан лимит.

## Структура проекта

api - инстанс и работа с api
assets - хранение изображений
hooks - кастомные хуки
pages - страницы приложения
shared - компоненты, используемые на нескольких страницах
store - redux toolkit store
utils - общие функции

## Описание работы:

### 6 базовых компонентов из которых состоит интерфейc:

- Chat item list (чат из левой панели)
- Message (сообщение из тела чата)
- Input (Поле ввода)
- Header (хедер)
- Time (Дата в теле чата)
- New message (полоса что есть новые сообщеня)

### Особенности, обусловленные требованиями к работе:

- При уменьшении экрана правая часть с сообщениями уменьшается. Верстка до разрешения экрана 700 пикселей. Если размер экрана в ширину меньше 700 пикселей, выводится заглушка “ПРОСТИТЕ! НО ДЛЯ МОБИЛЬНЫХ ТЕЛЕФОНОВ У НАС ЕСТЬ МОБИЛЬНОЕ ПРИЛОЖЕНИЕ”.
- Input (Поле ввода) согласно требованиям было реализовано не через input и не textarea, но с возможностью писать в этом поле аналогично как в textarea. Должно быть видно три строки, если текста более трёх строк, то должна появиться прокрутка.
- Левая панель, список чатов: В названиях чата, если название слишком длинное и не умещается в одну строку, обрезается название через троеточие(…)
  Если текст сообщения (вторая строка) слишком большой, остаются две строки, остальное обрезается и ставится троеточие (…)
- При нажатии на чат слева в правой части динамически подгружаются сообщения, относящиеся к этому чату.
