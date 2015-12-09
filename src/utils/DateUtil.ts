interface TimeObject {
	total: number;
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

class DateUtil {

	static getSeasonDateString(seasonid: number): string {
		
		switch (seasonid) {
			case 1: // summer
				var d = new Date();
				var leapyear = DateUtil.leapYear(d.getFullYear());
				return "1st December to " + (leapyear ? "28" : "29") + "th February";
			case 2: // autumn
				return "1st March to 31st May";
			case 3: // winter
				return "1st June to 31th August";
			case 4: // spring
				return "1st September to 30th November";
		}

		return "";
	}

	// days is an array of weekdays: 0 is Sunday, ..., 6 is Saturday
	static countDaysBetween(start: any, end: any, days: number[] = [0, 1, 2, 3, 4, 5, 6]): number {
		var d0;
		var d1;

		if (!(start instanceof Date)) {
			d0 = new Date(start);
		} else {
			d0 = start;
		}
		if (!(end instanceof Date)) {
			d1 = new Date(start);
		} else {
			d1 = end;
		}

		var ndays;
		ndays = Math.round((d1.getTime() - d0.getTime()) / (24 * 3600 * 1000));
		
		var sum = function(a, b) {

			return a + Math.floor((ndays + (d0.getDay() + 6 - b) % 7) / 7);
		};
		return days.reduce(sum, 0);
	}

	// pretty much the same as above except that
	static getDaysRemaining(start: string, end: string, days: number[] = [1, 2, 3, 4, 5]): number {

		var d0 = new Date(start);
		var d1 = new Date(end);
		
		var ndays;

		if (d0.getHours() < 12) {
			ndays = Math.round((d1.getTime() - d0.getTime()) / (24 * 3600 * 1000));
		} else {
			ndays = 1 + Math.round((d1.getTime() - d0.getTime()) / (24 * 3600 * 1000));
		}
		
		var sum = function(a, b) {

			return a + Math.floor((ndays + (d0.getDay() + 6 - b) % 7) / 7);
		};
		return days.reduce(sum, 0);
	}

	static leapYear(year: number): boolean {
		return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
	}

	static getTimeRemaining(endtime: string): TimeObject {

		var t = new Date(endtime).getTime() - new Date().getTime();

		return {
			'total': t,
			'days': Math.floor(t / (1000 * 60 * 60 * 24)),
			'hours': Math.floor((t / (1000 * 60 * 60)) % 24),
			'minutes': Math.floor((t / 1000 / 60) % 60),
			'seconds': Math.floor((t / 1000) % 60)
		};
	}
	
}