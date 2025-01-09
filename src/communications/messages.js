export default {
	ERROR: 0, //0 is used as ERROR cause its falsy
	UPDATE: 1, //Should be used as a signal to update the state for the client from the backend.
	JOIN_TOUR: 2,
	LEAVE_TOUR: 3,
	CHAT_MSG: 4,
	TOUR_DELETED: 5,
	GET_BACKEND_URL: 6,
};
