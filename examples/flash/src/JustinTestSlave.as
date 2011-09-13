package
{
	import flash.events.Event;
	import flash.events.ProgressEvent;

	[SWF(frameRate="60", width="800", height="600")]
	public class JustinTestSlave extends JustinTestMaster
	{
		public function JustinTestSlave()
		{
			super();
		}
		
		override protected function setupInteractionEvents(event:Event):void {
			justin.addEventListener(ProgressEvent.SOCKET_DATA, socketDataHandler);
		}
		
		private function socketDataHandler(event:ProgressEvent):void {
			while (justin.bytesAvailable) {
				draggable.x = justin.readFloat();
				draggable.y = justin.readFloat();
			}
		}
	}
}