extends Spatial

# Declare member variables here. Examples:
# var a = 2
# var b = "text"
var GroundBloc = preload("res://GroundBloc.tscn")

# Called when the node enters the scene tree for the first time.
func _ready():
	var bloc = GroundBloc.instance()
	add_child(bloc)
	pass # Replace with function body.

# Called every frame. 'delta' is the elapsed time since the previous frame.
#func _process(delta):
#	pass
