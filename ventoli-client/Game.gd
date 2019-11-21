extends Spatial

# Declare member variables here. Examples:
# var a = 2
# var b = "text"
var GroundBloc = preload("res://GroundBloc.tscn")

var envRfunc = Curve.new()
var envGfunc = Curve.new()
var envBfunc = Curve.new()

# Called when the node enters the scene tree for the first time.
func _ready():
	envRfunc.add_point(Vector2(0, 0))
	envRfunc.add_point(Vector2(0.1, 0))
	envRfunc.add_point(Vector2(0.275, 0.25))
	envRfunc.add_point(Vector2(0.3, 0.27))
	envRfunc.add_point(Vector2(0.5, 0.45))
	envRfunc.add_point(Vector2(0.7, 0.27))
	envRfunc.add_point(Vector2(0.75, 0.27))
	envRfunc.add_point(Vector2(0.8, 0.05))
	envRfunc.add_point(Vector2(0.9, 0))
	envRfunc.add_point(Vector2(1, 0))
	
	envGfunc.add_point(Vector2(0, 0))
	envGfunc.add_point(Vector2(0.1, 0))
	envGfunc.add_point(Vector2(0.275, 0.3))
	envGfunc.add_point(Vector2(0.3, 0.35))
	envGfunc.add_point(Vector2(0.5, 0.65))
	envGfunc.add_point(Vector2(0.9, 0))
	envGfunc.add_point(Vector2(1, 0))
	
	envBfunc.add_point(Vector2(0, 0))
	envBfunc.add_point(Vector2(0.1, 0))
	envBfunc.add_point(Vector2(0.5, 1))
	envBfunc.add_point(Vector2(0.9, 0))
	envBfunc.add_point(Vector2(1, 0))
	for i in range(10):
		for j in range(10):
			var bloc = GroundBloc.instance()
			add_child(bloc)
			bloc.translation.x = i - 5
			bloc.translation.z = j - 5
			bloc.translation.y = floor((i * j) / 16) * 0.5
			

func _input(event):
	if event.is_action("ui_page_up"):
		$CameraSpace.rotation.y += 0.03
	if event.is_action("ui_page_down"):
		$CameraSpace.rotation.y -= 0.03
			
	
var ostime = OS.get_time()
var clockTime = ostime.hour * 60 * 60 + ostime.minute * 60 + ostime.second

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	$Debug.text = ""
	clockTime = fmod(clockTime + delta * 1000, 86400)
	$Debug.text += "Clock : " + str(clockTime) + "\n"
	var decTime = floor(clockTime / 0.864)
	var decTimeInHours = decTime / 10000
	
	$World.environment.background_color.r = envRfunc.interpolate_baked(decTimeInHours / 10)
	$World.environment.background_color.g = envGfunc.interpolate_baked(decTimeInHours / 10)
	$World.environment.background_color.b = envBfunc.interpolate_baked(decTimeInHours / 10)
	
	var decHour = int(floor(decTimeInHours)) % 10
	var decMin = int(floor(decTimeInHours * 100)) % 100
	var decSec = int(floor(decTime)) % 100
	$Debug.text += "DecTime : " + str(decHour) + "h" + str(decMin) + "m" + str(decSec) + "s\n"
		
	$Debug.text += "SunEnergy : " + str($LightSpace/SunLight.light_energy) + "\n"
	$Debug.text += "MoonEnergy : " + str($LightSpace/SunLight.light_energy) + "\n"
	$LightSpace.decTimeInHours = decTimeInHours
