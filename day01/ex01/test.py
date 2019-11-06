from game import GotCharacter, Lannister


if __name__ == "__main__":
    jaime = Lannister('Jaime')
    print(jaime.__dict__)
    jaime.print_house_word()
    jaime.die()
    print(jaime.is_alive)
    print(jaime.__doc__)
