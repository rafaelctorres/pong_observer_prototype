class UI extends Observer {

	draw() {
		//colorText(points, 400,200,'red');
	}
	
	move(deltaTime) {
		
	}
	
	onNotify(ev) {
		switch(ev) {
			case EVENTS.BALL_TOUCHED_RIGHT:
				playerScore +=1;
				break;
			case EVENTS.BALL_TOUCHED_LEFT:
				computerScore +=1
				break;
			default:
				break;
			
		}
		
	}
}