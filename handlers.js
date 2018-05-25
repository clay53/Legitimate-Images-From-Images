var targetImg = undefined;
var targetImgExists = false;

var sourceImgs = [];
var sourceImgsG = []
var sourceImgsExist = false;

var pixelPerfect = false;

var subSize = 10;

var drew = false;
var drawing = false;
var drawProgW = 0;
var drawProgH = 0;

function handleSettingsChange() {
	console.log("Changing settings...");
	let newSubSize = parseInt(document.getElementById("subSize").value);
	console.log("newSubSize = " + newSubSize);
	if (newSubSize < 0 || isNaN(newSubSize)) {
		console.log("newSubSize is not valid... Aborting settings change");
		return;
	}
	let newPixelPerfect = document.getElementById("pixelPerfect").checked;
	console.log("newPixelPerfect = " + newPixelPerfect);

	targetImg = undefined;
	targetImgExists = false;
	
	sourceImgs = [];
	sourceImgsG = []
	sourceImgsExist = false;
	
	pixelPerfect = newPixelPerfect;
	
	subSize = newSubSize;
	
	drew = false;
	drawing = false;
	drawProgW = 0;
	drawProgH = 0;
}

function handleTargetImageChange() {
	for (var i = 0 ; i < document.getElementById("targetImage").files.length; i++) {
		var f = document.getElementById("targetImage").files[i];
		var fNSplit = f.name.split('.');
		console.log("fNSplit: " + fNSplit);
		var extension = fNSplit[fNSplit.length-1].toLowerCase();
		console.log("Extension: " + extension)
		if (
			extension === "jpg" ||
			extension === "jpeg" ||
			extension === "svg" ||
			extension === "png" ||
			extension === "webp"
		) {
			console.log(f.name);
			console.log(f.size);
			var reader = new FileReader();
			reader.readAsDataURL(f);
			reader.onload = () => {
				console.log(reader.result);
				targetImg = loadImage(reader.result);
				targetImgExists = true;
				drawing = false;
				drew = false;
			}
		} else {
			document.getElementById("return").value = "Invalid image type";
		}
	}
}

function handleSourceImagesChange(eId = "sourceImages") {
	if (document.getElementById(eId).files.length > 1) {
		print (document.getElementById(eId).files);
	}
	var results = [];
	for (var i = 0 ; i < document.getElementById(eId).files.length; i++) {
		var f = document.getElementById(eId).files[i];
		var fNSplit = f.name.split('.');
		console.log("fNSplit: " + fNSplit);
		var extension = fNSplit[fNSplit.length-1].toLowerCase();
		console.log("Extension: " + extension)
		if (
			extension === "jpg" ||
			extension === "jpeg" ||
			extension === "svg" ||
			extension === "png" ||
			extension === "webp"
		) {
			console.log(f.name);
			console.log(f.size);
			var reader = new FileReader();
			reader.readAsDataURL(f);
			reader.onload = function (e) {
				var result = loadImage(e.target.result);
				
				sourceImgs.push({
					image: result,
					cropped: false
				});
				sourceImgsExist = sourceImgs.length > 0 ? true : false;
			}
		} else {
			document.getElementById("return").value = "Invalid image type";
		}
	}
}