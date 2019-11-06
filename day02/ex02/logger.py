import time
from random import randint

def logt(func):
    f= open("machine.log","a")
    def wrapper(*args, **kwargs):
        print(func.__name__)
        data = "Running: "+func.__name__+' '+str(time.time())+"\n"
        f.write(data)
        return func(*args, **kwargs)
    #f.close()
    print('banane')
    return wrapper

    


class CoffeeMachine():
    water_level = 100

    @logt
    def start_machine(self):
     if self.water_level > 20:
         return True
     else:
         print("Please add water!")
         return False

    @logt
    def boil_water(self):
        return "boiling..."

    @logt
    def make_coffee(self):
        if self.start_machine():
            for _ in range(20):
                time.sleep(0.1)
                self.water_level -= 1
            print(self.boil_water())
            print("Coffee is ready!")

    @logt
    def add_water(self, water_level):
        time.sleep(randint(1, 5))
        self.water_level += water_level
        print("Blub blub blub...")

if __name__ == "__main__":
    print('test')
    machine = CoffeeMachine()
    print('test2')
    for i in range(0, 5):
        machine.make_coffee()
    machine.make_coffee()
    machine.add_water(70)
