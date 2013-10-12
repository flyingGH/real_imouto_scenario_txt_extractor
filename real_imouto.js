
var main_info = "《實妹相伴的大泉君》（リアル妹がいる大泉くんのばあい）中文剧本\n汉化：妹乃萌汉化组";

var files = require("./files.json");
var characters = {
	com: {title: "共通线.txt", info: "共通线"},
	mai: {title: "麻衣.txt", info: "大泉 麻衣（大泉 麻衣（おおいずみ まい），聲優：氷川めぐみ）线"},
	mik: {title: "美紀.txt", info: "妹尾 美紀（妹尾 美紀（せのお みき），聲優：日向苺）"},
	sio: {title: "栞.txt", info: "大泉 栞（大泉 栞（おおいずみ しおり），聲優：遠野そよぎ）"},
};

var fs = require("fs");
var path = require("path");
var parse_file = require("./parse.js").parse_file;

function main() {

	var inputdir = ".";
	if( process.argv.length >= 3 || process.argv[2] ) {
		inputdir = process.argv[2];
	}

	var outputdir = inputdir;
	if( process.argv.length >=4 )
		outputdir = process.argv[3];

	for(var c in characters) {

		console.log("Generate " + characters[c].title);

		var content = "";
		content += main_info + "\n\n" + characters[c].info + "\n\n";

		for(var i = 0; i < files[c].length; i++) {
			var parsed = parse_file( path.join(inputdir, files[c][i]) ); 
			if( parsed === false ) {
				console.log("Error, exit, not completed.");
				process.exit(1);
			}
			content += files[c][i] + "\n";
			content += parsed;
			content += "\n";
		}
		fs.writeFileSync(path.join(outputdir, characters[c].title), content); //default write string as UTF-8
	}
}

if(require.main === module) {
	main();
}
