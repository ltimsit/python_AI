import time
from random import randint
from getpass import getuser

def log(func):
    def wrapper(*args, **kwargs):
        start_time = time.perf_counter()
        res = func(*args, **kwargs) 
        exec_time = time.perf_counter() - start_time
        printed_exectime = ("%.3f s" % exec_time, "%.3f ms" % (exec_time * 1000))[float("%.3f" % exec_time) < 0.01]
        data = "(%s)Running: %-20s [ exec-time = %-8s ]\n" % (getuser(), func.__name__, printed_exectime)
        f = open("machine.log","a")
        f.write(data)
        f.close()
        return res
    return wrapper

    


class CoffeeMachine():
    water_level = 100

    @log
    def start_machine(self):
     if self.water_level > 20:
         return True
     else:
         print("Please add water!")
         return False

    @log
    def boil_water(self):
        return "boiling..."

    @log
    def make_coffee(self):
        if self.start_machine():
            for _ in range(20):
                time.sleep(0.1)
                self.water_level -= 1
            print(self.boil_water())
            print("Coffee is ready!")

    @log
    def add_water(self, water_level):
        time.sleep(randint(1, 5))
        self.water_level += water_level
        print("Blub blub blub...")

if __name__ == "__main__":
    machine = CoffeeMachine()
    for i in range(0, 5):
        machine.make_coffee()
    machine.make_coffee()
    machine.add_water(70)
