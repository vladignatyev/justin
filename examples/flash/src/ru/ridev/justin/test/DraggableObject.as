package ru.ridev.justin.test
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	
	import flashx.textLayout.tlf_internal;
	
	public class DraggableObject extends Sprite
	{
		private var _oldX:Number;
		private var _oldY:Number;
		
		public function DraggableObject()
		{
			super();
			this.graphics.beginFill(0xFF0000);
			this.graphics.drawEllipse(5,5,10,10);
			this.graphics.endFill();
			this.width = 10;
			this.height = 10;
			
			this.addEventListener(Event.ADDED_TO_STAGE, init);
		}
		
		private function init(event:Event):void {
			this.addEventListener(MouseEvent.MOUSE_DOWN, mouseDown);
			this.addEventListener(MouseEvent.MOUSE_UP, mouseUp);
		}
		
		private function mouseDown(event:MouseEvent):void {
			dispatchEvent(new DraggableObjectEvent(DraggableObjectEvent.START_DRAG));
			saveMouseCoordinates(event);
			this.stage.addEventListener(MouseEvent.MOUSE_MOVE, mouseMove);
		}
		
		private function saveMouseCoordinates(event:MouseEvent):void {
			this._oldX = event.stageX;
			this._oldY = event.stageY;
		}
		
		private function mouseUp(event:MouseEvent):void {
			dispatchEvent(new DraggableObjectEvent(DraggableObjectEvent.STOP_DRAG));
			this.stage.removeEventListener(MouseEvent.MOUSE_MOVE, mouseMove);
		}
		
		private function mouseMove(event:MouseEvent):void {
			x = x + (event.stageX - this._oldX);
			y = y + (event.stageY - this._oldY);
			saveMouseCoordinates(event);
			dispatchEvent(new DraggableObjectEvent(DraggableObjectEvent.DRAGGED, x, y));
		}
	}
}