from recipe import recipe
from book import book

tourte = recipe('tourte', 2, 2, ['a', 'b'], 'lunch', 'une tourte')
cookbook = book('cookbook')

cookbook.add_recipe(tourte)
cookbook.get_recipe(name)
