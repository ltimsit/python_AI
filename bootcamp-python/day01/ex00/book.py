from datetime import date
from recipe import recipe

class book:
    def __init__(self, name):
        #try:
            self.name = name
            self.creation_date = date.today().strftime("%d/%m/%Y %H:%M:%S")
            self.last_update = self.creation_date
            self.recipe_list = {'starter': {}, 'lunch': {}, 'desert': {}}
        #except:
         #   exit("Error in book parameter")

    
    def get_recipe_by_name(self, name):
        #for key, value in self.recipe_list.items():
         #   for recipe in value:
          #      if recipe.name == name:
           #         return recipe
        for key, value in self.recipe_list.items():
            if name in value:
                print(str(value[name]))
                return value[name]
        print("Sorry, I don't know this recipe")
        

    def get_recipe_by_type(self, recipe_type):
        if recipe_type in self.recipe_list:
            return self.recipe_list[recipe_type]
        print("Sorry, I don't know this type of recipe")

    def add_recipe(self, recipe):
        if isinstance(recipe, recipe):
            if recipe.recipe_type in self.recipe_list:
                self.recipe_list[recipe.recipe_type][recipe.name] = recipe
            else:
                self.recipe_list[recipe.recipe_type] = {recipe.name: recipe}
            self.last_update = date.today().strftime("%d/%m/%Y %H:%M:%S")
        else:
            print("The argument you passed is not a recipe")

        
