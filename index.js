/*事件*/
document.getElementById('start').addEventListener('click', function(){
	getImg(function(image){
		var size1m = 1*1024*1024;//1M
		var size2m = 2*1024*1024;//2M
		var can=imgToCanvas(image),
		  imgshow=document.getElementById("imgShow");
		var filesize=document.getElementById('inputimg').files[0].size;
		if(filesize>size2m){
			imgshow.setAttribute('src',canvasToImg(can,0.75));
		}else if(filesize>=size1m && filesize<=size2m){
			imgshow.setAttribute('src',canvasToImg(can,0.99));
		}else{
			alert("文件小于1m，不压缩！");
		}
	});
});
// 把image 转换为 canvas对象 
function imgToCanvas(image) { 	
  var canvas = document.createElement("canvas"); 
  canvas.width = image.width; 
  canvas.height = image.height;  
  canvas.getContext("2d").drawImage(image, 0, 0);  
  return canvas; 
} 
//canvas转换为image
function canvasToImg(canvas,encoderset) {
	var array=["image/webp","image/jpeg","image/png"],
	  type=document.getElementById('myselect').value-1;
  var src = canvas.toDataURL(array[type],encoderset);
  return src;
}
//获取图片信息
function getImg(fn){
	var imgFile = new FileReader();
	try{
		imgFile.onload = function(e) {
			var image = new Image();
			image.src= e.target.result; //base64数据 
			image.onload=function(){
				fn(image);
			}
		}
		imgFile.readAsDataURL(document.getElementById('inputimg').files[0]);
	}catch(e){
		console.log("请上传图片！"+e);
	}
}