from datetime import date
from recipe import recipe

class book:
    def __init__(self, name):
            self.name = name
            self.creation_date = date.today().strftime("%d/%m/%Y %H:%M:%S")
            self.last_update = self.creation_date
            self.recipe_list = {'starter': {}, 'lunch': {}, 'desert': {}}

    
    def get_recipe_by_name(self, name):
        for key, value in self.recipe_list.items():
            if name in value:
                print(str(value[name]))
                return value[name]
        print("Sorry, I don't know this recipe")
        

    def get_recipe_by_type(self, recipe_type):
        if recipe_type in self.recipe_list:
            return self.recipe_list[recipe_type]
        print("Sorry, I don't know this type of recipe")

    def add_recipe(self, new_recipe):
        if isinstance(new_recipe, recipe):
            if new_recipe.recipe_type in self.recipe_list:
                self.recipe_list[new_recipe.recipe_type][new_recipe.name] = new_recipe
            else:
                self.recipe_list[new_recipe.recipe_type] = {new_recipe.name: new_recipe}
            self.last_update = date.today().strftime("%d/%m/%Y %H:%M:%S")
        else:
            print("The argument you passed is not a recipe")

        
