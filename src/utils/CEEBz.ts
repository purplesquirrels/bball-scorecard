
/* Conditional Expression Evaluator by Ben Foster 

	Evaluates a simple conditional expression such as: "10 > 5 && 4 < 2"  ==> false, or "10 > 5 || 4 < 2"  ==> true
	
	Takes an abstract syntax tree (AST) and a context, evaluates and returns true or false.

	Supports variables in expressions which can be provided by a context object.

	Eg : "myVar === 10"  :

	    CEEBz.parse("myVar === 10", {myVar: 10})  ==> true

	Requires JSEP to generate AST from string: http://jsep.from.so/

*/

interface Window {
	jsep(str: string): {};
}

class CEEBz {

	private static _dictionary = {
		"logic": {
			"&&"	: (a, b) => a && b,
			"||"	: (a, b) => a || b
		},
		"binaryExp": {
			"=="	: (a, b) => a == b,
			"!="	: (a, b) => a != b,
			">"		: (a, b) => a > b,
			"<"		: (a, b) => a < b,
			">="	: (a, b) => a >= b,
			"<="	: (a, b) => a <= b,
			"==="	: (a, b) => a === b,
			"!=="	: (a, b) => a !== b,
			"+"		: (a, b) => a + b,
			"-"		: (a, b) => a - b,
			"*"		: (a, b) => a * b,
			"/"		: (a, b) => a / b,
			"%"		: (a, b) => a % b,
			"**"	: (a, b) => Math.pow(a, b) // ES2016 fallback
		},
		"unaryExp": {
			"!"		: (a, pre?) => !a,
			"!!"	: (a, pre?) => !!a,
			"+"		: (a, pre?) => +a,
			"++"	: (a, pre = true) => pre ? ++a : a++,
			"-"		: (a, pre?) => -a,
			"--"	: (a, pre = true) => pre ? --a : a--
		}
	}

	private static _context:{};

	private static _parse(str:string, context?:{}) {

		this._context = context;

		var p = window.jsep(str);

		return this.evaluate(p);
	}

	private static evaluate(obj:any) {

		switch (obj.type) {
			case "LogicalExpression":
				return 	this._dictionary["logic"][obj.operator] &&
						this._dictionary["logic"][obj.operator](this.evaluate(obj.left),
						this.evaluate(obj.right));
			case "BinaryExpression":
				return 	this._dictionary["binaryExp"][obj.operator] &&
						this._dictionary["binaryExp"][obj.operator](this.evaluate(obj.left),
																	this.evaluate(obj.right));
			case "UnaryExpression":
				return 	this._dictionary["unaryExp"][obj.operator] &&
						this._dictionary["unaryExp"][obj.operator](this.getExpressionValue(obj.argument), obj.prefix);
			case "Identifier":
			case "Literal":
				return this.getExpressionValue(obj);
			default: return false;
		}
	}

	private static getExpressionValue(value:any):any {

		switch (value.type) {
			case "Identifier":
				return this._context[value.name];
			case "Literal":
				return value.value;
			default: return 0;
		}
	}

	public static parse(expression:string, context?:{}):boolean {

		return this._parse(expression, context);

	}
}