# coding=utf-8
# démarage de l'instance du site en local
from soapp import app   # import des ressources du site web dans le dossier soapp 

if __name__ == "__main__":      # flask cherche le nom de l'app pour les ressources du site
	app.run(debug=True, host='0.0.0.0')       # demarre le serveur sur l'ip de la rpi pour l'utiliser en local
