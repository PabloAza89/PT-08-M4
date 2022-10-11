/* EXAMPLE = SELECT name, year FROM movies WHERE year = 1902 AND rank > 5; */

tables:

actors
directors_genres
movies_directors
roles
directors
movies
movies_genres

1 - Birthyear - Buscá todas las películas filmadas en el año que naciste.

SELECT name, year FROM movies WHERE year = 1989; HW
SELECT name FROM movies WHERE year = 1989; OK

2 - 1982 - Cuantas películas hay en la DB que sean del año 1982?

SELECT COUNT(*) FROM movies where year = 1982; HW 
/* SELECT COUNT(*) FROM movies WHERE year = 1902 AND rank > 5; */

3 - Stacktors - Buscá actores que tengan el substring stack en su apellido.

SELECT last_name, first_name FROM actors WHERE last_name = "Willis"; OK
SELECT substr(last_name,1,6) FROM actors where last_name='Willis'; OK
SELECT substr(last_name,1) FROM actors where last_name='Willis'; OK
SELECT substr(last_name,1) FROM actors where last_name='willis'; OK

SELECT first_name, last_name
    FROM actors
    WHERE last_name LIKE '%willi%'; OK

SELECT first_name, last_name
    FROM actors
    WHERE last_name LIKE '%stack%'; HW

4 - Fame Name Game - Buscá los 10 nombres y apellidos más populares entre los actores.
    Cuantos actores tienen cada uno de esos nombres y apellidos?

SELECT 
    first_name,
    COUNT(*) AS "Count"
FROM actors
GROUP BY 
    first_name
ORDER BY Count(*) DESC
LIMIT 5; OK

SELECT    
    last_name,
    COUNT(*) AS "Count"
FROM actors
GROUP BY 
    last_name
ORDER BY Count(*) DESC
LIMIT 5; OK

SELECT 
    first_name,
    COUNT(*) AS "Count"
FROM actors
GROUP BY 
    first_name
UNION
SELECT    
    last_name,
    COUNT(*) AS "Count"
FROM actors
GROUP BY 
    last_name
ORDER BY Count DESC
LIMIT 10; HW

SELECT first_name, NAME FROM
    (
    SELECT 
        first_name,
        last_name,
        COUNT(first_name) AS "NAME"
    FROM actors
    GROUP BY
        first_name
    LIMIT 5    
    )
 GROUP BY
    first_name
ORDER BY COUNT(NAME) DESC
LIMIT 10;





SELECT    
    last_name,
    COUNT(*) AS "Count"
FROM actors
GROUP BY 
    last_name
ORDER BY Count DESC
LIMIT 10;







5 - Prolific - Listá el top 100 de actores más activos junto con el número de roles que haya realizado.


