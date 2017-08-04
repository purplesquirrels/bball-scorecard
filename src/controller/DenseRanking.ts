class DenseRanking implements IRanking {

	constructor() {

	}

	sort(arr: any[], key: string, key2: string): any[] {
		arr.sort((a, b) => {
			if (a[key] < b[key])
				return 1;
			if (a[key] > b[key])
				return -1;
			return 0;
		});
		return arr;
	}

	/// 1223
	rank(objects: any[], rankOn: string = "score", rankOnSecond: string = "average"): any[] {

		objects = this.sort(objects, rankOn);

		var currentRank = 1;

		for (var i = 0; i < objects.length; ++i) {

			var score = objects[i][rankOn];
			var lastRank = currentRank;

			if (i > 0) {
				if (score === objects[i - 1][rankOn]) {
					currentRank = lastRank;
				} else {
					currentRank += 1;
				}
			}

			objects[i].rank = currentRank;

			if (i > 0) {
				if (currentRank <= 3) {
					objects[i].multiplier = 1;
				} else if (currentRank >= 4 && currentRank <= 6) {
					objects[i].multiplier = 2;
				} else if (currentRank >= 7 && currentRank <= 9) {
					objects[i].multiplier = 3;
				} else {
					objects[i].multiplier = 4;
				}
			} else {
				objects[i].multiplier = 1;
			}

		}

		return objects;

	}
}