class GotCharacter:
    """Na na nanana naa nanana"""
    def __init__(self, first_name, is_alive=True):
        self.first_name = first_name
        self.is_alive = is_alive


class Lannister(GotCharacter):
    """A Lannister always pays his dept"""
    def __init__(self, first_name, is_alive=True):
        super().__init__(first_name, is_alive=is_alive)
        self.family_name = 'Lannister'
        self.house_word = "Hear Me Roar !"

    def print_house_word(self):
        print(self.house_word)

    def die(self):
        self.is_alive = False


if __name__ == "__main__":
    jaime = Lannister('Jaime')
    print(jaime.__dict__)
    jaime.print_house_word()
    jaime.die()
    print(jaime.is_alive)
    print(jaime.__doc__)
