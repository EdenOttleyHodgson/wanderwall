/**
 * Module containing some useful data classes, useful for easy type checking.
 * @module data_classes
 * /

//TODO: Add type checking to all of these.
/** Class representing a stop.*/
export class Stop {
	constructor(stopID, geoLocation, name, start, end) {
		// typeCheckString(stopID);
		// typeCheckClass(geoLocation, Geolocation);
		this.stop_id = stopID;
		this.geolocation = geoLocation;
		this.name = name;
		this.time = { start, end };
	}
	static fromObject(tourObj) {
		return new Stop(
			tourObj.stop_id,
			tourObj.geolocation,
			tourObj.name,
			tourObj.time.start,
			tourObj.time.end,
		);
	}
}

export class TourMetadata {
	constructor(name, description, start, end) {
		// typeCheckString(name);
		// typeCheckString(description);
		this.name = name;
		this.description = description;
		this.start = start;
		this.end = end;
	}
	static fromObject(tourObj) {
		return new TourMetadata(
			tourObj.name,
			tourObj.description,
			tourObj.start,
			tourObj.end,
		);
	}
}

export class Geolocation {
	constructor(latLng) {
		// typeCheckClass(latLng, LatLng);
		// typeCheckNumber(heading);
		this.location = { latLng };
	}
}
export class LatLng {
	constructor(lat, lng) {
		// typeCheckNumber(lat);
		// typeCheckNumber(lng);
		this.latitude = lat;
		this.longitude = lng;
	}
}

export class Suggestion {
	constructor(name, description, geolocation) {
		this.name = name;
		this.description = description;
		this.geolocation = geolocation;
	}
	static fromObject(suggestionObj) {
		return new Suggestion(
			suggestionObj.name,
			suggestionObj.description,
			suggestionObj.geolocation,
		);
	}
}

function typeCheckClass(param, type) {
	if (!(param instanceof type)) {
		throw new TypeError(`${param} is not an instance of ${type}`);
	}
}
function typeCheckNumber(param) {
	if (typeof param === "number") {
		throw new TypeError(`${param} is not an instance of number`);
	}
}

function typeCheckString(param) {
	if (typeof param === "string") {
		throw new TypeError(`${param} is not an instance of string`);
	}
}

export function timeToString(time) {
	let hours;
	let minutes;
	if (time.hours < 10) {
		hours = `0${time.hours}`;
	} else {
		hours = `${time.hours}`;
	}
	if (time.minutes < 10) {
		minutes = `0${time.minutes}`;
	} else {
		minutes = `${time.minutes}`;
	}
	return `${hours}:${minutes}`;
}

export function timeToDate(time) {
	const rep = `1979-01-01T${timeToString(time)}:00`;
	return Date.parse(rep);
}
