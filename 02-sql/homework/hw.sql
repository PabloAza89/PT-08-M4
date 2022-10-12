/* EXAMPLE = SELECT name, year FROM movies WHERE year = 1902 AND rank > 5; */

OPEN IN PROMPT:
cd C:/demo-db/sqlite
sqlite3
.open C:/demo-db/imdb-large.sqlite3.db

cd C:\demo-juan-sql\sqlite\
cd C:/demo-juan-sql/sqlite/
sqlite3
.open C:\demo-juan-db\imdb-large.sqlite3.db
.open C:/demo-juan-db/imdb-large.sqlite3.db
.open imdb-large.sqlite3.db



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
SELECT * FROM movies WHERE year = 1992; CR

2 - 1982 - Cuantas películas hay en la DB que sean del año 1982?

SELECT COUNT(*) FROM movies where year = 1982; HW 
select count(*) as Total
from movies
where year = 1982; CR
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

select * 
from actors
where last_name like '%stack%'; CR

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

select first_name, last_name
count (*) as Total
from actors
group by lower(first_name), lower(last_name)
order by Total desc
limit 10; CR

5 - Prolific
Listá el top 100 de actores más activos junto con el número de roles que haya realizado.

select a.first_name, a.last_name,
count(*) as Total
from actors as a
join roles as r on a.id = r.actor_id
group by a.id
order by Total desc
limit 10; CR

6 - Bottom of the Barrel
Cuantas películas tiene IMDB por género? Ordená la lista por el género menos popular.

select genre,
count(*) as Total
from movies_genres
group by genre
order by Total; CR

select genre,
count(*) 
from movies_genres
group by genre
order by count(*);

7 - Braveheart
Listá el nombre y apellido de todos los actores que trabajaron en la película "Braveheart" de 1995,
ordená la lista alfabéticamente por apellido.

-- actores --> a.id = r.actor_id <--     roles --> r.movies_id = m.id <-- movies

select a.first_name, a.last_name from actors as a
join roles as r on a.id = r.actor_id
join movies as m on r.movie_id = m.id
where m.name = "Braveheart" and m.year = 1995
order by a.last_name; CR

8 - Leap Noir
Listá todos los directores que dirigieron una película de género 'Film-Noir' en un año bisiesto
 (para reducir la complejidad, asumí que cualquier año divisible por cuatro es bisiesto).
 Tu consulta debería devolver el nombre del director, el nombre de la peli y el año.
 Todo ordenado por el nombre de la película.

select d.last_name, m.name, m.year
from directors as d
join movies_directors as md on d.id = md.director_id
join movies as m in md.movie_id = m.id
join movies_genres as mg on m.id = mg.movie_id
where mg.genre = "Film-Noir"
and m.year % 4 = 0
order by m.name; CR

9 - Bacon
Listá todos los actores que hayan trabajado con Kevin Bacon en películas de Drama 
(incluí el título de la peli). Excluí al señor Bacon de los resultados.

select a.first_name, a.last_name, m.name
from actors as a
join roles as r on a.id = r.actor_id
join movies as m on r.movie_id = m.id
join movies_genres as mg on m.id = mg.movie_id
where mg.genre = "Drama"
and m.id in (
    select m.id
    from movies as m
    join roles as r on m.id = r.movie_id
    join actors as a on r.actor_id = a.id
    where a.first_name = "Kevin" and a.last_name = "Bacon"

)
and (a.first_name || a.last_name != "KevinBacon"); CR

10 - Immortal Actors
Qué actores actuaron en una película antes de 1900 y también en una película después del 2000?

select * from actors
where id in (
    select r.actor_id from roles as r
    join movies as m on r.movies_id = m.id
    where m.year < 1900
) and id in (
    select r.actor_id from roles as r
    join movies as m on r.movies_id = m.id
    where m.year > 2000
); CR

11 - Busy Filming 
Buscá actores que actuaron en cinco o más roles en la misma película después del año 1990.
Noten que los ROLES pueden tener duplicados ocasionales, sobre los cuales no estamos interesados:
queremos actores que hayan tenido cinco o más roles DISTINTOS (DISTINCT cough cough) en la misma película.
Escribí un query que retorne los nombres del actor, el título de la película y el número de roles 
(siempre debería ser > 5).

select a.first_name, a.last_name, m.name,
count (distinct role) as Total
from actors as a
join roles as r on a.id = r.actor_id
join movies as m on r.movie_id = m.id
where m.year > 1990
group by a.id, m.id
having count(distinct role) > 5; CR

12 - ♀
Para cada año, contá el número de películas en ese años que sólo tuvieron actrices femeninas.

select year,
count (distinct id) as Total
from movies
where id not in (
    select r.movie_id from roles as r
    join actors as a on r.actor_id = a.id
    where a.gender = "M"
)
group by year; CR

