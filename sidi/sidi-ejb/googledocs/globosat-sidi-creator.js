(function() {

	_props = null;
	sidi = function() {
	}
	$ = sidi;

	sidi._folder = '0B_-JF96R0IENTEVLZFplQXYxRms';
	sidi._password = 'ee11cbb19052e40b07aac0ca060c23ee';

	sidi.touchSheet = function(name, ss) {
		if (!ss) {
			ss = $.me();
		}
		var sheet = ss.getSheetByName(name);
		if (!sheet) {
			sheet = ss.insertSheet(name)
		}
		return sheet;
	}

	sidi.folder = function(ss) {
		var folder = DocsList.getFolderById(sidi._folder);
		if (ss) {
			var file = DocsList.getFileById(ss.getId());
			file.addToFolder(folder);
		}
		return folder;
	}

	sidi.copySpreadsheet = function(src, name) {
		if (typeof (src) == 'string') {
			src = SpreadsheetApp.openById(src);
		}
		var dst = src.copy(name);
		$.folder(dst);
		dst.setAnonymousAccess(true, true);
		return dst;
	}

	sidi.createSpreadsheet = function(arg) {
		if (!arg.skel) {
			throw 'skel is required';
		}
		if (!arg.name) {
			throw 'name is required';
		}
		var ss = $.copySpreadsheet(arg.skel, arg.name);
		for ( var sheetName in arg.sheets) {
			var matrix = arg.sheets[sheetName];
			var sheet = $.touchSheet(sheetName, ss);
			sheet.getDataRange().clear();
			if (matrix && matrix.length > 0 && matrix[0] && matrix[0].length) {
				sheet.getRange(1, 1, matrix.length, matrix[0].length)
						.setValues(matrix);
			}
		}
		return ss.getId();
	}

	sidi.assertTrue = function(arg) {
		if (!arg) {
			throw 'expected true: ' + arg;
		}
	}

	sidi.props = function(name) {
		var props = SpreadsheetApp.getActive().getSheetByName("props");
		var matrix = props.getDataRange().getValues();
		_props = {};
		for ( var i = 0; i < matrix.length; i++) {
			var row = matrix[i];
			_props[row[0]] = row[1];
		}
		return _props[name];
	};

	sidi.checkAccess = function(req) {
		var password = req.parameter.password;
		if (password != sidi._password) {
			throw 'invalid password';
		}
	}

})();

function testCreate() {
	var id = $.createSpreadsheet({
		"skel" : "0AuC4UtAEcGiGdDBJd1pBdGliaFJVUURwaUF6YU1EUmc",
		"name" : "test-create",
		"sheets" : {
			"s1" : [ [ "s1v1", 2, false, "2011-12-30" ],
					[ "s2v2", 3, true, "2011-12-30" ] ],
			"s2" : [ [ "bbb", 4.5 ], [ "ccc", 7.8 ] ]
		}
	});

	$.assertTrue(id);
}

doGet = function() {
	return doPost.apply(this, arguments);
}

doPost = function(req) {
	$.checkAccess(req);
	var arg = Utilities.jsonParse(req.parameter.arg);
	var id = $.createSpreadsheet(arg);
	var app = UiApp.createApplication();
	app.setTitle("Globosat Sidi Service");
	app.add(app.createLabel('__id__' + id + '__id__'));
	return app;
}

function test() {
	Browser.msgBox("x: " + typeof (6.3))
}