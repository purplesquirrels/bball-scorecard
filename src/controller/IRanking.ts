interface IRanking {
	sort(arr: any[], key:string): any[];
	rank(objects: any[], rankOn:string): any[];
}