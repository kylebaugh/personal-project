SELECT * FROM glossary
WHERE unit_id = $1
ORDER BY name;