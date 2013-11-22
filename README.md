jquery.connectors
=================

jQuery extension to connect html elements to each other.
The project is at starting point so be kind and patient.

Just dowload it and display the exmaple.html in your browser

Usage
-----

1. just import the js file in your project and call :
```javascript 
        $(".thing").connect(
                $(".other") ,
                { x:0 , y:0 } ,
                { x:0 , y:0 } ,
                { 'border-top' : 'solid 1px red'});
```

Warning
-------
 - Compatibility : Firefox, Chrome, Safari, Opera, IE>=9
 - Support connection between one sized jquery object :

The call :
```javascript
        A.connect(B , { x:0 , y:0 } , { x:0 , y:0 } , { 'border-top' : '2px solid red' });
```
Is OK if :
```javascript
        A.size() == B.size() == 1
```
 - If your page layout change dynamically, don't forget to reconnect all connectors (remove + connect)

Next
----
 - [x] connect 2 one sized jQuery object's centers
 - [ ] indirect connectors (automatic and with manual line breaks)
 - [ ] allow two collections of object in 1 call
 - [ ] make the connectors dynamic (stay connect whatever happen in the layout)
 - [ ] finish the IE compatibility (bugs remaining)
