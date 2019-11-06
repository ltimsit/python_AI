class Account(object):
    ID_COUNT = 1
    def __init__(self, name, **kwargs):
        self.id = self.ID_COUNT
        self.name = name
        self.__dict__.update(kwargs)
        if hasattr(self, 'value'):
            self.value = 0
        Account.ID_COUNT += 1
    def transfer(self, amount):
        self.value += amount

class Bank(object):
    """The bank"""
    def __init__(self):
        self.account = []
    def add(self, account):
        self.account.append(account)


    def check_account(info, account_list):
        if type(info) == int:
            for elem in account_list:
                if isinstance(elem, Account) and elem.id == info:
                    return elem
        elif type(info) == str:
            for elem in account_list:
                if isinstance(elem, Account) and elem.name == info:
                    return elem
        return False

    def check_startwith(dic, st_list):
        for key in dic:
            for st in st_list:
                if key.startswith(st):
                    return True
        return False

    def check_key(dic, keys):
        for key in keys:
            if not key in dic:
                return False
        return True

    def check_corrupted(acc_list):
        for elem in acc_list:
            if len(elem.__dict__) % 2 == 0:
                print(elem.__dict__)
                return False
            if not Bank.check_startwith(elem.__dict__, ['zip', 'addr']):
                return False
            if not Bank.check_key(elem.__dict__, ['name', 'id', 'value']):
                return False
            for key, value in elem.__dict__.items():
                if key.startswith('b'):
                    return False
            return True

    def check_amount(acc, amount):
        if amount < 0 or acc.value < amount:
            return False
        return True



    def transfer(self, origin, dest, amount):
        """
            @origin: int(id) or str(name) of the first account
            @dest:    int(id) or str(name) of the destination account
            @amount: float(amount) amount to transfer
            @return         True if success, False if an error occured
        """
        o_account = Bank.check_account(origin, self.account)
        d_account = Bank.check_account(dest, self.account)
        if not o_account or not d_account:
            return False
        if not Bank.check_corrupted([o_account, d_account]):
            return False
        if not Bank.check_amount(o_account, amount):
            return False
        o_account.transfer(-amount)
        d_account.transfer(amount)
        return True

    def fix_account(self, account):
        """
            fix the corrupted account
            @account: int(id) or str(name) of the account
            @return         True if success, False if an error occured"""
        return True


if __name__ == '__main__':
    bank = Bank()
    acc1 = Account('test', zip_='a', addr='b', id=5, value=45, gg=4, cc=5)
    acc1.transfer(50)
    acc2 = Account('test2', zip_='a', addr='b', id=5, value=45, gg=4, cc=6)
    bank.add(acc1)
    bank.add(acc2)
    print(acc1.value)
    print(acc2.value)
    print(bank.transfer('test', 'test2', 20))
    print(acc2.value)
