extends Spatial

# Declare member variables here. Examples:
# var a = 2
# var b = "text"
export var decTimeInHours = 0

var sunEnergyFct = Curve.new()
var moonEnergyFct = Curve.new()

# Called when the node enters the scene tree for the first time.
func _ready():
	sunEnergyFct.add_point(Vector2(0, 0))
	sunEnergyFct.add_point(Vector2(0.1, 0))
	sunEnergyFct.add_point(Vector2(0.5, 1))
	sunEnergyFct.add_point(Vector2(0.9, 0))
	sunEnergyFct.add_point(Vector2(1, 0))
	moonEnergyFct.add_point(Vector2(0, 1));
	moonEnergyFct.add_point(Vector2(0.4, 0))
	moonEnergyFct.add_point(Vector2(0.5, 0))
	moonEnergyFct.add_point(Vector2(0.6, 0))
	moonEnergyFct.add_point(Vector2(1, 1))

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	rotation_degrees.z = 90 - 36 * decTimeInHours
	
	var sunEnergy = sunEnergyFct.interpolate_baked(decTimeInHours / 10)
	var moonEnergy = moonEnergyFct.interpolate_baked(decTimeInHours / 10)
	$SunLight.light_energy = sunEnergy
	$MoonLight.light_energy = moonEnergy
#	pass
