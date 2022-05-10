import time	# importe lib temps
import RPi.GPIO as GPIO

pinBtn = 23
GPIO.setmode(GPIO.BCM)
GPIO.setup(pinBtn, GPIO.IN, pull_up_down = GPIO.PUD_UP)

while True:
	etat = GPIO.input(pinBtn)
	if etat == 0 :
		print("ok")
		time.sleep(1)