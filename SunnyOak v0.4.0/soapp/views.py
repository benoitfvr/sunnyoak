# coding=utf-8
#feuille de route
import time	# importe lib temps
from flask import Flask, render_template, request, Response	#import de flask
from neopixel import *	#importe lib pour le controle des leds
from multiprocessing import Process
import RPi.GPIO as GPIO
import requests
import json


lampeallume = False

# Gestion des séquences
processes_sequence = []
strip = Adafruit_NeoPixel(25, 18, 800000, 10, False, 255, 0)
strip.begin()

def ramdomrainbow():
	"""Draw rainbow that uniformly distributes itself across all pixels."""
	while True:
		for j in range(256*5):
			for i in range(25):
				strip.setPixelColor(i, wheel((int(i * 256 / 25) + j) & 255))
			strip.show()
			time.sleep(20/1000.0)
		print('toto')

def wheel(pos):
	"""Generate rainbow colors across 0-255 positions."""
	if pos < 85:
		return Color(pos * 3, 255 - pos * 3, 0)
	elif pos < 170:
		pos -= 85
		return Color(255 - pos * 3, 0, pos * 3)
	else:
		pos -= 170
		return Color(0, pos * 3, 255 - pos * 3)

def tournerainbow():
	"""Wipe color across display a pixel at a time."""
	for i in range(25):
		strip.setPixelColor(i, color)
		strip.show()
		time.sleep(25/1000.0)

# Gestion du bouton
pinBtn = 23
GPIO.setmode(GPIO.BCM)
GPIO.setup(pinBtn, GPIO.IN, pull_up_down = GPIO.PUD_UP)

def bouton():
	while True:
		etat = GPIO.input(pinBtn)
		if etat == 0:
			databtn = {"command":'RE'}
			r = requests.post("http://127.0.0.1:5000/gestionlampe", data = databtn)
			valjson = json.loads(r.text)
			if valjson["etat"] == False:
				databtn = {"command":'ON'}
				r = requests.post("http://127.0.0.1:5000/gestionlampe", data = databtn)
				while GPIO.input(pinBtn) == 1:
					time.sleep(0.5)
			else:
				databtn = {"command":'OFF'}
				r = requests.post("http://127.0.0.1:5000/gestionlampe", data = databtn)
				while GPIO.input(pinBtn) == 1:
					time.sleep(0.5)

		time.sleep(0.5)

process_bouton = Process(target=bouton)
process_bouton.start()

# Serveur Flask
app = Flask(__name__)
@app.route('/', methods = ['GET'])
def index():
	if "hue" in request.form :
		hue = request.form["hue"]
		print(hue)
		return render_template('main.html', hue=hue)
	return render_template('main.html', hue=0)

	#	Les differentes commandes d'envois
@app.route('/gestionlampe', methods = ['GET', 'POST'])
def changecolor():	#	fonction gerant les commande pour le changement de couleur
	global lampeallume
	if "command" in request.form:
		while len(processes_sequence) > 0:
			process = processes_sequence.pop()
			process.terminate()
# commande pour récupérer l'état allume/eteint de la lampe
		if request.form["command"] == 'RE':
			sendjson = json.dumps({"success": True, "command": request.form["command"], "etat": lampeallume})
# commande pour changer la couleur de la lampe
		elif request.form["command"] == 'CC':
			lampeallume = True
			r, g, b = int(request.form["red"]), int(request.form["green"]), int(request.form["blue"])
			for i in range(25): strip.setPixelColor(i,Color(g, r, b))
			strip.show()
			sendjson = json.dumps({"success": True, "command": request.form["command"], "red": r, "green": g, "blue": b })
# Commande pour eteindre
		elif request.form["command"] == 'OFF':
			lampeallume = False
			r, g, b = 0, 0, 0
			for i in range(25): strip.setPixelColor(i,Color(g, r, b))
			strip.show()
			sendjson = json.dumps({"success": True, "command": request.form["command"], "red": r, "green": g, "blue": b })
#	Commande pour allumer en blanc
		elif request.form["command"] == 'ON':
			lampeallume = True
			r, g, b = 255, 255, 255
			for i in range(25): strip.setPixelColor(i,Color(g, r, b))
			strip.show()
			sendjson = json.dumps({"success": True, "command": request.form["command"], "red": r, "green": g, "blue": b })
# Commande pour une des séquences
		elif request.form["command"] == 'RR':
			lampeallume = True
			r, g, b = 127, 127, 127
			process = Process(target=ramdomrainbow)
			process.start()
			processes_sequence.append(process)
			sendjson = json.dumps({"success": True, "command": request.form["command"], "red": r, "green": g, "blue": b })
# Commande pour une des séquences
		elif request.form["command"] == 'TR':
			lampeallume = True
			r, g, b = 127, 127, 127
			process = Process(target=tournerainbow)
			process.start()
			processes_sequence.append(process)
			sendjson = json.dumps({"success": True, "command": request.form["command"], "red": r, "green": g, "blue": b })

		else :
			sendjson = json.dumps({"success": False})
	else :
		sendjson = json.dumps({"success": False})

	resp = Response(sendjson)
	resp.headers["Content-Type"] = 'application/json'
	return resp
