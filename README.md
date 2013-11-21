jquery.connectors
=================

jQuery extension to connect html elements to each other.
The project is at starting point so be kind and patient.

Just dowload it and display the exmaple.html in your browser (IEs < 9 are bad and not really tested, but it will be soon)

Usage
=====

 - /!\ use one sized jQuery object (no connection of bunches of elements together in one command... not for the moment :)
 - just import the js file in your project and call :
   - $(".thing").connect(
        $(".other"),
        {x:0, y:0},
        {x:0, y:0},
        {'border-top':'solid 1px red'}
    );

more doc soon
