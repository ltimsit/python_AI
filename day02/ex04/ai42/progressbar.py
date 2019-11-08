import time as t

def progressbar(listy):
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
