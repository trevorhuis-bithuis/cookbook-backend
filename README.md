Aerich Init: docker-compose exec cookbook aerich init -t app.db.TORTOISE_ORM
Aerich Create Tables: docker-compose exec cookbook aerich init-db
Run Unit tests: docker-compose exec cookbook python -m pytest --cov="."
Run Flake: docker-compose exec cookbook flake8 .
Run Black: docker-compose exec cookbook black .
Run isort: docker-compose exec cookbook isort .