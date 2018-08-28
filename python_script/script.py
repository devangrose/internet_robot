import RPi.GPIO as GPIO
import time

# Pin values
LEFT_1 = 1
LEFT_2 = 2
RIGHT_1 = 3
RIGHT_2 = 4

GPIO.setmode(GPIO.BOARD)

GPIO.setup(LEFT_1, GPIO.OUT, initial = 0)
GPIO.setup(LEFT_2, GPIO.OUT, initial = 0)
GPIO.setup(RIGHT_1, GPIO.OUT, initial = 0)
GPIO.setup(RIGHT_2, GPIO.OUT, initial = 0)

spin()

while(true) 
    #get all rows from DB
    rows = []
    for row in rows
        commands = row.split(',')
        for command in commands
            if command == 'left'
                leftTurn()
            else if command == 'right'
                rightTurn()
            else if command == 'forward'
                forward()
            else if command == 'spin'
                spin()

    time.sleep(0.5)


def leftTurn(): 
    print('Turning left')        

def rightTurn():
    print('Turning right')
    
def forward():
    print('Going forward')

def spin():
    print('spinning')

GPIO.cleanup()
