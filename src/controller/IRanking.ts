interface IRanking {
	sort(arr: any[], key: string, key2: string): any[];
	rank(objects: any[], rankOn: string, rankOnSecond: string): any[];
}