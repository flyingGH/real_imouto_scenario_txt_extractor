
var fs = require("fs");
var path = require("path");

function parse_file(file) {
	try {
		var data = fs.readFileSync(file, "utf16le");
	} catch(e) {
		console.log("file read error", file, e);
		return false;
	}	

	var result = "";
	var lines = data.split("\n");

	for(var i = 0; i < lines.length; i++) {
		var line = lines[i].trim();
		if(line.length == 0)
			continue;
		if(line[0] == ';' || line[0] == '@' || (line[0] == '[' && line[line.length - 1] == ']')) {
			continue;
		}
		//else
		result += line + "\n";	

	}

	//console.log(result);
	return result;
}

function main() {
	if( process.argv.length < 3 || ! process.argv[2] ) {
		console.log("Usage: node parse.js <FILE> [OUTPUT_DIR]");
		process.exit(1);
	}
	var filename = process.argv[2];

	var outputdir = ".";
	if( process.argv.length >= 4 ) {
		outputdir = process.argv[3];
	}	
	
	var content = parse_file(filename);
	if( content !== false )
		fs.writeFileSync(path.join(outputdir, path.basename(filename) + ".txt"), content); 
}

exports.parse_file = parse_file;

if( require.main === module ) {
	main();
}


