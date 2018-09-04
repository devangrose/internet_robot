import RPi.GPIO as GPIO
import time
import psycopg2

# Global variables
WAIT_TIME = 2

# Pin values
LEFT_FORWARD = 37
LEFT_BACKWARD = 31
RIGHT_FORWARD = 35
RIGHT_BACKWARD = 32
GROUND1 = 36
GROUND2 = 38

# Connect to db
conn = psycopg2.connect(host="ec2-54-243-216-33.compute-1.amazonaws.com",database="d9bus00pl9m261", user="ubfmernncagzmj", password="bfd6104f565e55cc04b6f5ed513523acf683e50ac7144afa9274d9f9e03da3da", sslmode="require")
cur = conn.cursor()

GPIO.setmode(GPIO.BOARD)

GPIO.setup(LEFT_FORWARD, GPIO.OUT)
GPIO.setup(LEFT_BACKWARD, GPIO.OUT)
GPIO.setup(RIGHT_BACKWARD, GPIO.OUT)
GPIO.setup(RIGHT_FORWARD, GPIO.OUT)
GPIO.setup(GROUND1, GPIO.OUT)
GPIO.setup(GROUND2, GPIO.OUT)


def leftTurn(length):
    print('Turning left')        
    GPIO.output(LEFT_FORWARD, GPIO.HIGH)

    time.sleep(length)
    GPIO.output(LEFT_FORWARD, GPIO.LOW)

def rightTurn(length):
    print('Turning right')
    GPIO.output(RIGHT_FORWARD, GPIO.HIGH)

    time.sleep(length)
    GPIO.output(RIGHT_FORWARD, GPIO.LOW)

def backward(length):
    print('Going backward')
    GPIO.output(RIGHT_BACKWARD, GPIO.HIGH)
    GPIO.output(LEFT_BACKWARD, GPIO.HIGH)

    time.sleep(length)
    GPIO.output(RIGHT_BACKWARD, GPIO.LOW)
    GPIO.output(LEFT_BACKWARD, GPIO.LOW)

    
def forward(length):
    print('Going forward')
    GPIO.output(RIGHT_FORWARD, GPIO.HIGH)
    GPIO.output(LEFT_FORWARD, GPIO.HIGH)

    time.sleep(length)
    GPIO.output(RIGHT_FORWARD, GPIO.LOW)
    GPIO.output(LEFT_FORWARD, GPIO.LOW)

def spin():
    print('spinning')


while(True):
    #get all rows from DB
    cur.execute("""SELECT id, content from commands""")
    rows = cur.fetchall()
    for row in rows:
        commands = row[1].split(' ')
        for command in commands:
            command = command.strip()
            if command == 'left':
                leftTurn(WAIT_TIME)
            if command == 'right':
                rightTurn(WAIT_TIME)
            if command == 'forward':
                forward(WAIT_TIME)
            if command == 'backward':
                backward(WAIT_TIME)
        cur.execute("""DELETE FROM commands WHERE id={0}""".format(row[0]))
    conn.commit()
    time.sleep(0.5)

GPIO.cleanup()

