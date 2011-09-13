package ru.ridev.justin.test
{
	import flash.events.Event;
	
	public class DraggableObjectEvent extends Event
	{
		public static const START_DRAG:String = "startDrag";
		public static const STOP_DRAG:String = "stopDrag";
		public static const DRAGGED:String = "dragged";
		
		private var _newX:Number = 0;
		private var _newY:Number = 0;
		
		public function get newX():Number { return _newX; }
		public function get newY():Number { return _newY; }
		
		public function DraggableObjectEvent(type:String, newX:Number = 0, newY:Number = 0, bubbles:Boolean=false, cancelable:Boolean=false)
		{
			super(type, bubbles, cancelable);
			_newX = newX;
			_newY = newY;
		}
	}
}