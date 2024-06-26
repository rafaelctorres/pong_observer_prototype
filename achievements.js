//achievements
class Achievements extends Observer {

	 onNotify(ev) {
		switch(ev) {
			case EVENTS.BALL_TOUCHED_BOTTOM:
				console.log("Achievements:Ball Touched Wall");
				break;
			case EVENTS.BALL_TOUCHED_PADDLE:
				console.log("Achievements:Ball Touched Paddle");
				break;
			default:
				break;
			
		}
	}
}