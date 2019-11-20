extends Spatial

# Declare member variables here. Examples:
# var a = 2
# var b = "text"
var GroundBloc = preload("res://GroundBloc.tscn")

# Called when the node enters the scene tree for the first time.
func _ready():
	var bloc = GroundBloc.instance()
	add_child(bloc)
	
var ostime = OS.get_time()
var clockTime = ostime.hour * 60 * 60 + ostime.minute * 60 + ostime.second

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	$Debug.text = ""
	clockTime = fmod(clockTime + delta * 1000, 86400)
	$Debug.text += "Clock : " + str(clockTime) + "\n"
	var decTime = floor(clockTime / 0.864)
	var decTimeInHours = decTime / 10000
	$Debug.text += "DecTimestamp : " + str(decTime) + "\n"
	var decHour = int(floor(decTimeInHours / 10000)) % 10
	var decMin = int(floor(decTimeInHours / 100)) % 100
	var decSec = int(floor(decTimeInHours)) % 100
	$Debug.text += "DecTime : " + str(decHour) + "h" + str(decMin) + "m" + str(decSec) + "s\n"
		
	$Debug.text += "SunEnergy : " + str($LightSpace/SunLight.light_energy) + "\n"
	$Debug.text += "MoonEnergy : " + str($LightSpace/SunLight.light_energy) + "\n"
	$LightSpace.decTimeInHours = decTimeInHours
