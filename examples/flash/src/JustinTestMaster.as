package
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.net.Socket;
	import flash.system.Security;
	
	import ru.ridev.justin.test.Config;
	import ru.ridev.justin.test.DraggableObject;
	import ru.ridev.justin.test.DraggableObjectEvent;
	
	[SWF(frameRate="60", width="800", height="600")]
	public class JustinTestMaster extends Sprite
	{
		protected var draggable:DraggableObject;
		protected var justin:Socket;
		
		public function JustinTestMaster()
		{
			Security.loadPolicyFile('http://localhost:843/');
			this.addEventListener(Event.ADDED_TO_STAGE, init);
		}
		
		private function init (event:Event):void {
			draggable = new DraggableObject();
			this.addChild(draggable);
			
			draggable.x = this.width / 2;
			draggable.y = this.height / 2;
			
			justin = new Socket(Config.JUSTIN_SERVER, Config.JUSTIN_PORT);
			justin.addEventListener(Event.CONNECT, setupInteractionEvents); 
		}
		
		protected function setupInteractionEvents(event:Event):void {
			draggable.addEventListener(DraggableObjectEvent.DRAGGED, draggedHandler);
		}
		
		private function draggedHandler(event:DraggableObjectEvent):void {
			justin.writeFloat(event.newX);
			justin.writeFloat(event.newY);
			justin.flush();
		}
	}
}