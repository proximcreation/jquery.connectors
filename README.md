jquery.connectors
=================

jQuery extension to connect html elements to each other.
The project is at starting point so be kind and patient.

Just dowload it and display the exmaple.html in your browser

Usage
-----

1. Import the lib in your page (¡¡ after the jquery import !!):

```html
<script src="jquery.connectors.0.1.0.min.js"></script>
```
2. Call the method and let’s connect jQuery stuff !

2.1. simple direct mode :

```javascript 
$(".thing").connect(
    $(".other") ,
    { 'border-top' : 'solid 1px red' } ,
    { 'direct' } ,
    0
);
```

2.2. simple indirect mode :

```javascript 
$(".thing").connect(
    $(".other"), /* the target(s) */ ,
    { 'border-top' : 'solid 1px red' }, /* css style of the connectors */
    { 'indirect' }, /* mode : direct | indirect */
    0.5, /* line breaks exactly between the objects. Give here a floating number between 0 and 1, it’s the ratio of distance where lines break.*/
    true, /* optional : is your body ccs position property set to relative | absolute */
    {x:0, y:0}, /* optionnal : offset from the center of the first object */
    {x:0, y:0}  /* optionnal : offset from the center of the second object */
    
);
```

Warning
-------
 - Compatibility : Firefox, Chrome, Safari, Opera, IE>=9
 - If your page layout change dynamically, don't forget to reconnect all connectors (remove + connect)

Next
----
 - [x] connect 2 one sized jQuery object's centers
 - [x] indirect connectors (automatic and with manual line breaks)
 - [x] allow two collections of object in 1 call
 - [ ] make the connectors dynamic (stay connect whatever happen in the layout)
 - [ ] finish the IE compatibility (bugs remaining)
 - [x] allow round connectors in inderect mode
