from recipe import recipe
from book import book

tourte = recipe('tourte', 5, 6, ['a', 'b'], 'lunch', 'une tourte')
vomit = recipe('vomit', 4, 6, ['C', 'D'], 'anytime', 'always unexpected')
cookbook = book('cookbook')

cookbook.add_recipe(tourte)
cookbook.get_recipe_by_name('tourte')
cookbook.get_recipe_by_type('lunch')
cookbook.get_recipe_by_type(6)
cookbook.add_recipe(vomit)
cookbook.get_recipe_by_name('vomit')
