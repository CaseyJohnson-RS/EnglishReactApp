
# Проект 'English App'

Used CSS Framework Tailwind

---

## Требования к проекту

### Описание

Онлайн приложение для изучения английских слов. Приложение позволяет добавлять слова в собственный словарь и тренировать их.

### Нефункциональные

- Проект это одностраничное онлайн приложение (SPA)

### Функциональные

- Приложение должно сохранять прогресс и учетную запись

- Приложение должно иметь страницу входа/регистрации пользователя

- Приложение должно иметь личную страницу пользователя

- Приложение должно иметь страницу добавления слов

- Приложение должно иметь страницу тренировки слов

- Приложение должно иметь страницу словаря

- Страница входа должна иметь:
  
  - поле ввода логина
  
  - поле ввода пароля

- Страница регистрации должна иметь:
  
  - поле ввода логина
  
  - поле ввода ника пользователя
  
  - поле ввода пароля

- Личная страница пользователя должна отображать информацию:
  
  - Ник пользователя
  
  - Время общего использования приложения (время, прошедшее с регистрации)
  
  - Количество выученных слов
  
  - ~~Аватар~~

- Страница добавления слов должна иметь:
  
  - Колонку с рекомендованными словами (с кнопкой добавления в словарь)
  
  - Поиск слов и добавление найденных слов в словарь (добавленные в словарь слова тоже отображаются с пометкой 'добавлен в словарь')

- Страница тренировки слов должна иметь:
  
  - Описание того, сколько слов созревает
  
  - Описание того, сколько слов нужно повторить
  
  - Кнопку открытия словаря

- Страница словаря должна содержать:
  
  - Список слов с переводом и количеством оставшихся тренировок (сортировка по количеству оставшихся тренировок)

- ~~Приложение должно иметь возможность сменить/восстановить пароль~~

- Тренировка должна состоять из:
  
  - Выбрать правильный перевод (с английского на русский и с русского на английский) из 4 возможных вариантов (возможность кликнуть мышкой на правильный ответ или нажать на цифру на клавиатуре)
  - Восстановление слова по анаграмме
  - Написать слово на английском (дан русский перевод)
  - Окончание тренировки показывает ошибки

- Тренировка должна подчиняться правилам:
  
  - Слова, в которых была допущена хоть одна ошибка, отправляются на тренировку с сохранение прогресса изучения
  - Чтобы изучить слово, нужно повторить их без ошибок четыре раза
  - После первой безошибочной попытки слово повторяется через 