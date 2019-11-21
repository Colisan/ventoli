extends Spatial

# Declare member variables here. Examples:
# var a = 2
# var b = "text"

# Called when the node enters the scene tree for the first time.
func _ready():
	pass # Replace with function body.

# Called every frame. 'delta' is the elapsed time since the previous frame.
#func _process(delta):
#	pass

func _on_Area_mouse_entered():
	$Overlay.visible = true
	pass # Replace with function body.

func _on_Area_mouse_exited():
	$Overlay.visible = false
	pass # Replace with function body.

func _on_Area_input_event(camera, event, click_position, click_normal, shape_idx):
	if event is InputEventMouseButton && event.pressed:
		$OverUnderlay.visible = !$OverUnderlay.visible
		print_debug(event)
