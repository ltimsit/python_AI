class Evaluator:
    def zip_evaluate(coefs, words):
        if not type(coefs) == list or not type(words) == list:
            return -1
        if not len(coefs) == len(words):
            return -1
        sum_l = 0.0
        for c, w in zip(coefs, words):
            sum_l += len(w) * c
        return sum_l

    def enumerate_evaluate(coefs, words):
        if not type(coefs) == list or not type(words) == list:
            return -1
        if not len(coefs) == len(words):
            return -1
        sum_l = 0.0
        for i, w in enumerate(words):
            sum_l += len(w) * coefs[i]
        return sum_l



if __name__ == '__main__':
    words = ["Le", "Lorem", "Ipsum", "est", "simple"]
    coefs = [1.0, 2.0, 1.0, 4.0, 0.5]
    print(Evaluator.zip_evaluate(coefs, words))
    print(Evaluator.enumerate_evaluate(coefs, words))

    words = ["Le", "Lorem", "Ipsum", "n'", "est", "pas", "simple"]
    coefs = [0.0, -1.0, 1.0, -12.0, 0.0, 42.42]
    print(Evaluator.zip_evaluate(coefs, words))
    print(Evaluator.enumerate_evaluate(coefs, words))
