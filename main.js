(function(){
	/*
$('.btn').click(function(){
    getImages(this.id);
    
    $('.share').find('button').each(function(){
    	console.log($(this));

    	$(this).attr("class", "btn btn-block btn-lg btn-default");
    });
    document.getElementById(this.id).className = "btn btn-block btn-lg btn-primary";
});
*/

var choose = $('.btn-lg');

choose.on('mousedown', function(e){
	getImages(this.id);
    
    $('.share').find('button').each(function(){
    	$(this).attr("class", "btn btn-block btn-lg btn-default");
    });
    $(this).attr("class", "btn btn-block btn-lg btn-primary");
	console.log(e.target.id);
});

getImages("NounenRena");

var addButton = $('#addButton');

addButton.on('click', function(e){
	console.log(e.target.id);
	var b = '<li><span style="display: none;"><button class="btn btn-block btn-lg btn-default"></button></span><input type="text" value="url" placeholder="Inactive" class="form-control"></li>';
	var c = $('.share').find('ul');
  var a = $(b).appendTo(c).addClass('is-editing');
  c.find('input').focus();

});

var mainUl = $('.share');

mainUl.on('keyup', 'input', function(e){
  var input = $(this);
  var li = input.parents('li');
  if(e.which === 13){
    $(li).find('span').find('button').text(input.val());
    $(li).find('span').attr("style", "");
    $(li).find('input').remove();
    $(li).find('span').find('button').attr("id", input.val()).bind("click", function(e){
    	getImages(this.id);
    
    $('.share').find('button').each(function(){
    	$(this).attr("class", "btn btn-block btn-lg btn-default");
    });
    $(this).attr("class", "btn btn-block btn-lg btn-primary");
	console.log(e.target.id);
    });
    //choose = $('.btn-lg');
  }
});

function getImages(a){
	var carouselIndicators = $('.carousel-indicators');
	var carouselInner = $('.carousel-inner');
	$(carouselIndicators).find('li').each(function(){
	$(this).remove();
});
$(carouselInner).find('div').each(function(){
	$(this).remove();
});
var loading = '<img src="loading.gif">';
$(loading).appendTo('#loading');
var addr = "/items/"+ a;
$.ajax({url: addr, type:"POST", data: a, dataType: "json" , success: function (atr){
$('#loading').find('img').remove();
$('.jtitle').text(atr.data[0].from.name);

var indicatorFirst = '<li data-target="#carousel-example-generic" data-slide-to="';
var indicatorRest = '"  class="active"></li>';
var newIndicator2 = indicatorFirst + "0" + indicatorRest;


var inner = '<div class="item active"><img src="';
var url = atr.data[0].images[2].source;
var innerRest = '" class="img-rounded"><div class="carousel-caption">'+  atr.data[0].name +'</div></div>';
var newInner2 = inner + url + innerRest;



//console.log(newInner2);
//console.log(newIndicator2);
$(newInner2).appendTo(carouselInner);
$(newIndicator2).appendTo(carouselIndicators);


indicatorRest = '" ></li>';
inner = '<div class="item"><img src="';
for (var i = 1; i < atr.data.length; i++) {
	var innerRest = '" class="img-rounded"><div class="carousel-caption">'+  atr.data[i].name +'</div></div>';
	var newInner3 = inner + atr.data[i].images[2].source + innerRest;
	var newIndicator3 = indicatorFirst + i.toString() + indicatorRest;
	$(newInner3).appendTo(carouselInner);
	$(newIndicator3).appendTo(carouselIndicators);
}
var fanPageUrl = "http://www.facebook.com/" + a
$('.small').find('a').attr("href", fanPageUrl);
}});
}



}());