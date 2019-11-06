def print_recipe(name):
    if name in cookbook:
        print("%s:\nIngredients: %s\nType: %s\nPrep_time: %d"
              % (name, ', '.join(i for i in cookbook[name]['ingredients']),
                 cookbook[name]['meal'], cookbook[name]['prep_time']))
    else:
        print("Sorry, this recipe does not exist")


def delete_recipe(name):
    if name in cookbook:
        del cookbook[name]
        print("%s removed from recipe list" % name)
    else:
        print("Sorry, this recipe does not exist")


def add_recipe(name, ingredients, meal, prep_time):
    if name not in cookbook:
        cookbook[name] = {}
        cookbook[name]['ingredients'] = ([], ingredients)[type(ingredients)
                                                          == list]
        cookbook[name]['meal'] = meal
        cookbook[name]['prep_time'] = (0, prep_time)[type(prep_time) == int]
        print("recipe added successfully to the Cookbook")


def print_cookbook_recipes():
    for elem in cookbook:
        print_recipe(elem)


if __name__ == '__main__':
    cookbook = {}
    elem = ('sandwich', 'cake', 'salad')
    ings = (('ham', 'bread', 'cheese'), ('flour', 'sugar', 'eggs'),
                                        ('avocado', 'arugula',
                                                    'tomatoes', 'spinach'))
    meals = ('lunch', 'dessert', 'lunch')
    prep_times = (10, 60, 15)

    for index, recipe in enumerate(elem):
        cookbook[recipe] = {}
        cookbook[recipe]['ingredients'] = []
        for ing in ings[index]:
            cookbook[recipe]['ingredients'].append(ing)
        cookbook[recipe]['meal'] = meals[index]
        cookbook[recipe]['prep_time'] = prep_times[index]
    input_text = "Please select an option by typing the corresponding" + \
                 "number:\n " + \
                 "\t1: add a recipe\n" + \
                 "\t2: delete a recipe\n" + \
                 "\t3: print a recipe\n" + \
                 "\t4: print the cookbook\n" + \
                 "\t5: quit\n"
    print(input_text)
    while True:
        val = input('>>>')
        if val == '1':
            name = input("Please give me the name of the recipe:\n>>>")
            inp = input("Please give me a list of ingredient"
                        "separated by ',':\n>>>")
            ings_l = [x.strip(' ') for x in inp.split(',')]
            meal = input("Please give me the type of meal:\n>>>")
            prep = input("Please give me the prep time of the recipe:\n>>>")
            add_recipe(name, ings_l, meal, prep)
        elif val == '2':
            name = input("Please give me the name of the recipe"
                         "you want to delete:\n>>>")
            delete_recipe(name)
        elif val == '3':
            name = input("Please give me the name of the recipe"
                         "you want to print:\n>>>")
            print_recipe(name)
        elif val == '4':
            print_cookbook_recipes()
        elif val == '5':
            exit('Exiting Cookbook... BYE!')
        elif val == 'help':
            print(input_text)
        else:
            print("This option does not exist, please type the"
                  "corresponding number.\n"
                  "To exit, enter 5. For commands type 'help'")
