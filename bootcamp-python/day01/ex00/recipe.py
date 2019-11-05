class recipe:
    def __init__(self, name, c_lvl, time, ings, r_type, desc=''):
        error = []
        try:
            self.name = name
            if not c_lvl in range(1, 5):
                error.append("Cooking level is not between 1 and 5") 
            if not type(time) == int:
                error.append("Wrong type for cooking time (expected int)")
            if not type(ings) == list:
                error.append("ingredients should be a list")
            if not type(r_type) == str:
                error.append("Wrong type dor recipe_type (expected str)")
            if error:
                for err in error:
                    print(err)
                exit()
            self.cooking_lvl = c_lvl
            self.cooking_time = time
            self.ingredients = ings
            self.description = desc
            self.recipe_type = r_type
        except:
            exit("Error in recipe parameter")



    def __str__(self):
        data = "name: "\
               +self.name\
               +"\ncooking level: "\
               +str(self.cooking_lvl)\
               +"\ncooking time: "\
               +str(self.cooking_time)\
               +"\ningredients: "\
               +', '.join(self.ingredients)\
               +"\ndescription: "\
               +self.description\
               +"\nrecipe type: "\
               +self.recipe_type
        return data


