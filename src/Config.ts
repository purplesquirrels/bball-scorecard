class Config {

	static API_PATH: string = "php/api.php";
	static GET_PATH: string = "php/get.php";
	static PUT_PATH: string = "php/update.php";
	static CURL_PATH: string = "php/curl.php";
	static AUTH_PATH: string = "php/auth.php";
	static MAIL_PATH: string = "php/mail.php";
	static SERVER_KEY: string = "";

	static RANKING: string = "standard"; 

	static MSG_FINISHGAME: string = "Are you sure you want to finish the current game?\n\nFinishing the game will mark the game as completed and you will no longer be able to live update.";
	static MSG_CANCELGAME: string = "Are you sure you want to cancel the current game?\n\nCancelling the game will delete any data that has been saved for this game.";
}