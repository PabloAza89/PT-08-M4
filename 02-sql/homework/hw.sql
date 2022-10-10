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



