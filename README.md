# README

## Занятие 27.05.2024

### Тема: React useEffect.

Репозитарий содержит материалы по занятию группы 211223, посвященному хуку `useEffect`.

### Цели занятия
- повторение и закрепление знаний;
- решение задач.

### Базовое определение.
> Хук `useEffect` позволяет нам синхронизировать компонент с внешней системой. Это цитата из официальной документации (см.полезные ссылки внизу). Другие источники говорят о том, что этот хук предназначен для выполнения т.н. "сайд-эффектов", и для привязки к событиям жизненного цикла компонента. Пока что ничего не понятно. Попробуем разобраться.

> Side-effect - что это такое? В Реакте, принято под этим определением считать все операции или поведения, которые случаются в компоненте после рендеринга (отрисовки), и НЕ влияют напрямую на текущий цикл рендеринга компонента. Обычно под "сайд-эффектами" понимаются асинхронные запросы к бэку, подписки, изменение DOM вручную, и любые другие взаимодействия с внешним миром.

То есть, теперь мы примерно понимаем, в чем нам может помочь хук `useEffect`, что следует в нем делать. Но остается непонятное определение "жизненный цикл компонента". Давайте разберемся и в этом.

> Жизненный цикл компонента - это собственно "жизнь" компонента с момента его встраивания в DOM (монтирования), до удаления из DOM-дерева (размонтирования). И в случае с функциональными компонентами, принято выделять 3 фазы жизненного цикла.

![Фазы ЖЦ функционального компонента](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*GM2K74SM_OUffP4uGV48_A.png)

Картинка взята [отсюда](https://javascript.plainenglish.io/react-lifecycle-methods-in-functional-components-db72e038bd2a) - это также есть в полезных ссылках.

На картинке, мы можем видеть 3 фазы:
 - монтирование (Mounting) - это самая первая отрисовка (рендеринг) нашего компонента, и вставка его в DOM-дерево. После завершения этой фазы, мы видим наш компонент на экране.
 - обновление (Updating) - это перерисовки (ререндер) нашего компонента. Они происходят тогда, когда Реакт считает, что компонент мог поменять свое отображение, и его нужно перерисовать. Такое происходит при изменении пропсов, внутреннего стейта компонента.
 - размонтирование (Unmounting) - эта фаза происходит, когда наш компонент уже не нужен, и сейчас будет удален из DOM-дерева.

Собственно, а как же со всем этим работать, при чем здесь эффекты, зачем хуки???

По порядку. Мы уже знаем, что хук `useEffect` нужен для привязки к фазам жизненного цикла, взаимодействия с чем-то "внешним", и выполнения "сайд-эффектов". Теперь поговорим о синтаксисе хука, и рассмотрим его варианты использования.

### Синтаксис хука useEffect
```
useEffect( callbackFunction, [dependencyArray]);
```

Что мы видим в анатомии хука? Это функция, которая принимает 1 или 2 аргумента.
 - `callbackFunction` - обязательный аргумент. Это собственно сам эффект, то есть та логика, которая должна быть выполнена. Здесь может быть, например, асинхронная операция (обращение к бэку за данными), или инициализация каких-нибудь таймеров, подписок, слушателей, и т.д.
 - `dependencyArray` - необязательный аргумент. Массив зависимостей, который указывает на те фрагменты компонента, при изменении которых будет срабатывать наш эффект. Это также помогает привязаться к фазам жизненного цикла компонента.

Пока что, наверное, не особо понятно, а зачем нам массив зависимостей. Попробуем разобраться.

Как мы уже увидели, сам эффект - это просто функция (аргумент `callbackFunction`). Эта функция будет выполняться КАЖДЫЙ раз при  отрисовке компонента, т.е. на ВСЕХ фазах жизненного цикла (монтирование, обновление, размонтирование). С помощью массива зависимостей, мы можем попросить наш эффект выполняться не всегда, а в какие-то конкретные моменты. Например, только на самый первый рендер (на фазу монтирования). Или выполняться только в том случае, если изменилась какая-то часть пропсов/стейта компонента.

Рассмотрим на конкретном примере, и заодно напишем наш первый эффект. Давайте предположим, что у нас есть компонент `ClicksCounter`, он просто считает клики, сохраняет их во внутреннем стейте и показывает на экран. И наша задача - на фазе монтирования этого компонента вывести в консоль сообщение "Hello From Component!". Из постановки следует, что нам нужно привязаться к фазе монтирования компонента.
```
useEffect( () => {
  console.log('Hello From Component!');
}, []);
```

Вот собственно и все! Весь наш эффект, до копейки. Обратите внимание на второй аргумент, то есть на массив зависимостей. Он пустой. Это НЕ ЭКВИВАЛЕНТНО отсутствию массива зависимостей!!!

Таким образом, мы написали первый эффект, который отвечает за привязку к фазе монтирования компонента. Что это значит: это значит что наш эффект выполняется ТОЛЬКО ОДИН РАЗ, на фазе монтирования, то есть самого первого рендеринга компонента. Мы можем в этом убедиться воочию: давайте покликаем на кнопку. Мы видим, что внутренний стейт компонента меняется, и происходит фаза обновления компонента, т.е. компонент перерисовывается. Но эффект не выполняется.

Теперь поэкспериментируем. Давайте попробуем удалить массив зависимостей из нашего компонента. Вроде ничего не изменилось. А попробуем покликать по кнопке - и мы видим, что наш компонент перерисовывается, И эффект выполняется! То есть, мы как бы сказали "эй, Реакт, выполняй этот эффект на КАЖДЫЙ рендеринг нашего компонента".

И нам осталось рассмотреть только одну фазу - фазу размонтирования компонента, то есть тот момент, когда он будет убран из DOM-дерева. У нас в компоненте `App` уже подготовлен для этого плацдарм, то есть присутствует кнопка, которая управляет наличием компонента `ClicksCounter` в дереве. Кликнем на нее (спрячем компонент), и увидим, что из разметки HTML исчез соответствующий `div.clicksCounterContainer`. То есть, мы "размонтировали" компонент.

Теперь, как же нам привязаться к этой фазе? Для этого, есть возможность вернуть из эффекта функцию-колбэк, которая будет вызвана как раз на фазе размонтирования компонента.
```
useEffect(() => {
  // do something...
  return () => {
    // This will be fired when unmounting
  }
}, []);
```

Проверим. Добавим такой колбэк на фазу размонтирования нашего `ClicksCounter`.

### Когда, как, и зачем использовать эффекты
 - Эффекты используем только на верхнем уровне компонента, вне всяких функций и т.д.
 - В компоненте может быть множество эффектов
 - Внимательно работаем с массивом зависимостей
 - В эффектах осуществляем привязку к событиям жизненного цикла компонента

### Основные варианты использования эффектов
 - запросы к бэку (например, компонент рисует список товаров, и при монтировании ему нужно запросить этот список товаров, сохранить в локальном стейте, и отрисовать его).
 - открытие соединений (вебсокеты)
 - регистрация слушателей на события (например, мы регистрируемся на события изменения размера окна, или на событие скролла)
 - установка таймеров и интервалов

### Задачи на закрепление
1. В компонент `ClicksCounter`, добавьте код, чтобы он каждую секунду выводил в консоль сообщение "Сlicked N times!", где N - количество кликов из локального стейта.
2. На размонтирование компонента, сделайте очистку функциональности из п.1.
3. Создайте компонент `DateTimeComponent`, которы будет показывать время и дату (в текущей локализации) с точностью до секунды.
4. В компоненте `App`, на фазе монтирования, запросите список товаров с бэка (адрес - `https://dummyjson.com/products`).
5. Обеспечьте отрисовку этих товаров в компоненте `App` в виде сетки из 4 столбцов.

### Полезные ссылки
[Жизненный цикл компонента](https://javascript.plainenglish.io/react-lifecycle-methods-in-functional-components-db72e038bd2a) - со схемой и подробным описанием.

[Официальная документация](https://react.dev/reference/react/useEffect#connecting-to-an-external-system) - информативно, с интерактивными примерами. Все "незнакомое", типа кастомных хуков и т.д. - пропускать.

[Русскоязычный гайд](https://habr.com/ru/companies/rshb/articles/687364/) - толково, и с пояснением про ЖЦ компонента.
