import RPi.GPIO as GPIO
import time
import psycopg2

# Pin values
LEFT_1 = 22
LEFT_2 = 24
RIGHT_1 = 14
RIGHT_2 = 16

# Connect to db
conn = psycopg2.connect(host="ec2-54-243-216-33.compute-1.amazonaws.com",database="d9bus00pl9m261", user="ubfmernncagzmj", password="bfd6104f565e55cc04b6f5ed513523acf683e50ac7144afa9274d9f9e03da3da", sslmode="require")
cur = conn.cursor()

def leftTurn(): 
    print('Turning left')        

def rightTurn():
    print('Turning right')
    
def forward():
    print('Going forward')

def spin():
    print('spinning')



GPIO.setmode(GPIO.BOARD)

GPIO.setup(LEFT_1, GPIO.OUT, initial = 0)
GPIO.setup(LEFT_2, GPIO.OUT, initial = 0)
GPIO.setup(RIGHT_1, GPIO.OUT, initial = 0)
GPIO.setup(RIGHT_2, GPIO.OUT, initial = 0)

spin()

while(True):
    #get all rows from DB
    cur.execute("""SELECT id, content from commands""")
    rows = cur.fetchall()
    for row in rows:
        print(row)
        commands = row[1].split(',')
        for command in commands:
            if command == 'left':
                leftTurn()
            elif command == 'right':
                rightTurn()
            elif command == 'forward':
                forward()
            elif command == 'spin':
                spin()
        print(row[0])
        cur.execute("""DELETE FROM commands WHERE id=%s""",str(row[0]))
    conn.commit()
    time.sleep(0.5)

GPIO.cleanup()
