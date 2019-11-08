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
