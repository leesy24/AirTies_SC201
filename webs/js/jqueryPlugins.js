(function($){ $.fn.simpletooltip = function(){
	return this.each(function() {
		var text = $(this).attr("title");
		$(this).attr("title", "");
		if(text != undefined) {
			$(this).hover(function(e){
				var tipX = e.pageX + 12;
				var tipY = e.pageY + 12;
				$(this).attr("title", "");
				$("body").append("<div id='simpleTooltip' style='position: absolute; z-index: 100; display: none;'>" + text + "</div>");
				$("#simpleTooltip").css("left", tipX).css("top", tipY).fadeIn("medium");
}, function(){
				$("#simpleTooltip").remove();
				$(this).attr("title", text);
});
			$(this).mousemove(function(e){
				var tipX = e.pageX + 12;
				var tipY = e.pageY + 12;
				$("#simpleTooltip").css("left", tipX).css("top", tipY).fadeIn("medium");
});
}
});
}})(jQuery);


(function($){ $.fn.tooltip = function(){
	return this.each(function() {
		var text = $(this).attr("tooltip");
		var bindObjID = $(this).attr("bindObj");
		
		var directionX = 12;
		var directionY = parseInt($(this).attr("positionFactor") | 12);

		if(text != undefined || bindObjID != undefined) {
			
			$(this).hover(function(e){
				var tipX = e.pageX + directionX;
				var tipY = e.pageY + directionY;
				$(".tooltip").remove();

				$("body").append("<div id='simpleTooltip" + $(this).attr("id") + "' class='tooltip' style='position: absolute; z-index: 100; display: none;'><span id='simpleTooltipText'>" + (text != undefined ? $(this).attr("tooltip") : "") + (bindObjID != undefined ? "("+ getObjectValue(bindObjID) +")" : "") + "</span></div>");
				$("#simpleTooltip" + $(this).attr("id")).css("left", tipX).css("top", tipY).fadeIn("fast");
			}, function(){
				$("#simpleTooltip" + $(this).attr("id")).remove();
			});
			$(this).mousemove(function(e){
				var tipX = e.pageX + directionX;
				var tipY = e.pageY + directionY;
				$("#simpleTooltip" + $(this).attr("id")).css("left", tipX).css("top", tipY).fadeIn("fast");
			});
			$(this).click(function(e){
				$("#simpleTooltipText").text((text != undefined ? $(this).attr("tooltip") : "") + (bindObjID != undefined ? "("+ getObjectValue(bindObjID) +")" : ""));
			});
		}
	});
}})(jQuery);


(function($){ $.fn.objectType = function(){
	
	if(!$(this)[0])
	{
		return "";
	}
	else if(!$(this)[0].tagName)
	{
		return "";	
	}
	
	if($(this)[0].tagName.toLowerCase() == "input") return $(this).attr("type");
	else return $(this)[0].tagName.toLowerCase();
}})(jQuery);

jQuery.expr[':'].hiddenByParent = function(a) { 
   return jQuery(a).is(':hidden') && jQuery(a).css('display') != 'none'; 
};

function getObjectValue(id)
{
	var val = "";
		
	if($("#"+id).objectType() == "span")
	{
		val = $("#" + id).text();
	}
	else
	{
		val = "";//doldurulur
	}
	
	return val;
}




