import time as t

def ft_progress(listy):
    for i in listy:
        load = '['
        for j in range(0, 10):
            load += (' ', '*')[len(listy)/10 * j < i]
        load += ']'
        perc = (i * 100 / len(listy) + 1)
        elapsed = t.time() - start_time
        print("|%d%%| ETA %.2f %s %.2f" % (perc, elapsed * 100 / perc - elapsed + 0.10,
                                     load, elapsed), end='\r')
        yield i



listy = range(1000)
ret = 0
start_time = t.time()
for elem in ft_progress(listy):
    ret += (elem + 3) % 5
    t.sleep(0.01)
print()
print(ret)