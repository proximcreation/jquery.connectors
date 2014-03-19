(function($) {
	$.fn.connect = function(bunch2, style, type, pRatio, offset1, offset2) {
		var bodyCssPos = $("body").css('position');
		if(bodyCssPos == 'static'){
			$("body").css('position','relative');
		}
		var bunch1 = this;
		var equals = (bunch1.equals(bunch2))?true:false;
		bunch1.each(function(i){
			var o1 = $(this);
			bunch2.each(function(j){
				$(this).connectTo(o1, style, type, pRatio, true, offset1, offset2);
			});
			if(equals){
				bunch1 = bunch1.not(o1);
				bunch2 = bunch1;
			}
		});
		return this;
	}
	/**
	 * This function connect 2 jQuery objects.
	 * By default objects are connected by their centers. You can add an offset to each anchor.
	 * @return the calling object
	 * @param o2 : jQuery Obj 
	 * @param offset1 = {x:float, y:float} : an offset from the center of the calling object
	 * @param offset2 = {x:float, y:float} : an offset from the center of the param object
	 */
	$.fn.connectTo = function(o2, style, type, pRatio, bodyPrepared, offset1, offset2) {
		// Variable and parameters check
		var o1 = this;
		if(!o1.equals(o2)){
			
			var navig = browser();
			
			// == Creation of the connector object ==
			var conClass = 'con_'+($('.connector').size() + 1*1);
			
			$("body").append('<div class="connector ' + conClass + '"></div>');
			var connector = $("." + conClass);
			
			if(!offset1){
				var offset1 = {x:0 , y:0};
			} else {
				offset1.x = (offset1.x)?offset1.x:0;
				offset1.y = (offset1.y)?offset1.y:0;
			}
			if(!offset2){
				var offset2 = {x:0 , y:0};
			} else {
				offset2.x = (offset2.x)?offset2.x:0;
				offset2.y = (offset2.y)?offset2.y:0;
			}
			
			if(!bodyPrepared){
				// Body preparation (must not be static)
				var bodyCssPos = $("body").css('position');
				if(bodyCssPos == 'static'){
					$("body").css('position','relative');
				}
			}
			var O1 = {
					h : o1.realHeight(),
					w : o1.realWidth(),
					x : o1.findPos().x * 1 + o1.realWidth() / 2 + offset1.x * 1,
					y : o1.findPos().y * 1 + o1.realHeight() / 2 + offset1.y * 1
			};
			var O2 = {
					h : o2.realHeight(),
					w : o2.realWidth(),
					x : o2.findPos().x * 1 + o2.realWidth() / 2 + offset2.x * 1,
					y : o2.findPos().y * 1 + o2.realHeight() / 2 + offset2.y * 1
			};
			var O1O2 = dist(O1, O2);
			

			if(type=='direct'){
				// == Connector’s Style ==
				for(v in style){
					connector.css(v, style[v]);
				}
				connector.css({
					width : O1O2.d + "px",
					position:'absolute'
				});
				
				// == Connector’s real dimensions
				var cH = connector.realHeight();// real height of the connector
				var cW = connector.realWidth();// real width of the connector
				
				// == Connector’s rotation
				if(browser()[0]=="MSIE" && browser()[1]<9){ // FOR IE < 9 (TODO test)
					var lCY = O1.y - cH/2;
					var lCX = O1.x;
					connector.css("zoom", "1");
					rotateIE(connector, O1O2.ad);
				}
				else { // FOR ALL OTHER
					var lCY = (O1.y * 1 + O2.y * 1) / 2 - cH/2;
					var lCX = (O1.x + O2.x - cW)/2;
					connector.css({
						"transform"			: "rotate(" + O1O2.ad + "deg)",
						"-moz-transform"	: "rotate(" + O1O2.ad + "deg)",
						"-webkit-transform"	: "rotate(" + O1O2.ad + "deg)",
						"-o-transform"		: "rotate(" + O1O2.ad + "deg)",
						"-ms-transform"		: "rotate(" + O1O2.ad + "deg)"
					});
				}
				
				// == Connector’s position
				connector.css({
					top : lCY + "px",
					left : lCX + "px",
				});
			} else if(type=="indirect"){
				// == Connector’s Style ==
				connector.append('<div class="scon1"></div>');
				connector.append('<div class="scon2"></div>');
				scons = connector.find($('.scon1, .scon2'));
				scon1 = connector.find($('.scon1'));
				scon2 = connector.find($('.scon2'));
				for(v in style){
					scons.css(v, style[v]);
				}
				var cW = Math.abs(O1O2.dx)*1 - connector.wPlus()*1 + scon2.wPlus()/2;
				var cH = Math.abs(O1O2.dy)*1 - connector.hPlus()*1 + scon2.hPlus()/2;
				var cX = Math.min(O1.x, O2.x)  - scon2.wPlus()/4;
				var cY = Math.min(O1.y,O2.y)  - scon2.hPlus()/4;
				connector.css({
					width : cW + "px",
					height : cH + "px",
					position:'absolute',
					top: cY,
					left: cX
				});
				if(((O1.y >= O2.y)&&(O1.x >= O2.x)) || ((O1.y < O2.y)&&(O1.x < O2.x))){
					scon1.css({
						top:0,
						left:0,
						'border-bottom': 'none',
						'border-left': 'none',
						'border-bottom-left-radius':0,
						'border-bottom-right-radius':0,
						'border-top-left-radius':0
					});
					scon2.css({
						bottom:0,
						right:0,
						'border-top': 'none',
						'border-right': 'none',
						'border-top-left-radius':0,
						'border-top-right-radius':0,
						'border-bottom-right-radius':0
					});
				}else{
					scon1.css({
						bottom:0,
						left:0,
						'border-top': 'none',
						'border-left': 'none',
						'border-top-left-radius':0,
						'border-top-right-radius':0,
						'border-bottom-left-radius':0
					});
					scon2.css({
						top:0,
						right:0,
						'border-bottom': 'none',
						'border-right': 'none',
						'border-bottom-left-radius':0,
						'border-bottom-right-radius':0,
						'border-top-right-radius':0
					});
				}
				var ratio = (pRatio!=undefined)?pRatio:0.5;
				scon1.css({
					position:'absolute',
					width: cW*ratio - scon1.wPlus()/2 + 'px',
					height: cH*ratio - scon1.hPlus()/2 + 'px',
				});
				scon2.css({
					position:'absolute',
					width: cW*(1-ratio) - scon2.wPlus()/2 + 'px',
					height: cH*(1-ratio) - scon2.hPlus()/2 + 'px',
				});
			}
		}
		return this;
	};
	
	// ====
	// STUFF FUNCTIONS
	$.fn.realWidth = function() {
		return this.width()*1 + this.wPlus()*1;
	};
	$.fn.realHeight = function() {
		return this.height()*1 + this.hPlus()*1;
	};
	$.fn.wPlus = function() {
		var p = this.padding(), b = this.border();
		return p['left']*1 + p['right']*1 + b['left']*1 + b['right']*1;
	};
	$.fn.hPlus = function() {
		var p = this.padding(), b = this.border();
		return p['top']*1 + p['bottom']*1 + b['top']*1 + b['bottom']*1;
	};
	
	/**
	 * This function returns the real position of the element on the page
	 * @return {x, y}
	 */
	$.fn.findPos = function() {
		obj = this.get(0);
		var curleft = obj.offsetLeft || 0;
		var curtop = obj.offsetTop || 0;
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft || 0;
			curtop += obj.offsetTop || 0;
		}
		return {
			x : curleft,
			y : curtop
		};
	};
	$.fn.padding = function(p) {
		if(!p){
			return {
				'top'	:	parseFloat(this.css('padding-top')),
				'bottom':	parseFloat(this.css('padding-bottom')),
				'left'	:	parseFloat(this.css('padding-left')),
				'right'	:	parseFloat(this.css('padding-right'))
			};
		}
		else{
			this.css({
				'padding-top':p['top'],
				'padding-right':p['right'],
				'padding-bottom':p['bottom'],
				'padding-left':p['left']
			});
			return this;
		}
	};
	$.fn.border = function(p) {
		if(!p){
			return {
				'top'	:	parseFloat(this.css('border-top-width')),
				'bottom':	parseFloat(this.css('border-bottom-width')),
				'left'	:	parseFloat(this.css('border-left-width')),
				'right'	:	parseFloat(this.css('border-right-width'))
			};
		}
		else{
			this.css({
				'border-top-width':p['top'],
				'border-right-width':p['right'],
				'border-bottom-width':p['bottom'],
				'border-left-width':p['left']
			});
			return this;
		}
	};
	// source : http://stackoverflow.com/questions/3176962/jquery-object-equality
	$.fn.equals = function(compareTo) {
	  if (!compareTo || this.length != compareTo.length) {
	    return false;
	  }
	  for (var i = 0; i < this.length; ++i) {
	    if (this[i] !== compareTo[i]) {
	      return false;
	    }
	  }
	  return true;
	};
})(jQuery);

/**
 * 
 * @param A = {x:float, y:float} 
 * @param B = {x:float, y:float}
 * @returns {distance, distance on X axis, distance on Y axis, angle in deg, angle in rad}
 */
function dist(A, B) {
	var ABx = A.x - B.x;
	var ABy = A.y - B.y;
	var AB = Math.sqrt(Math.pow(ABx, 2) * 1 + Math.pow(ABy, 2) * 1);
	var a = Math.atan(ABy / ABx);
	return {
		d : AB,
		dx : ABx,
		dy : ABy,
		ad : 180 * a / Math.PI,
		ar : a
	};
}
/**
 * rotate the object in IE<9
 * @param pObj
 * @param pAngleDeg
 * @returns null
 */
function rotateIE(pObj, pAngleDeg) {
	var lDeg2radians = Math.PI * 2 / 360;
	var lRad = pAngleDeg * lDeg2radians;
	lCostheta = Math.cos(lRad);
	lSintheta = Math.sin(lRad);

	pObj.css("filter", "progid:DXImageTransform.Microsoft.Matrix("
			+ "sizingMethod='auto expand'," + "M11=" + lCostheta + "," + "M12="
			+ -lSintheta + "," + "M21=" + lSintheta + "," + "M22=" + lCostheta
			+ ")");
	pObj.css("-ms-filter", "progid:DXImageTransform.Microsoft.Matrix(" + "M11="
			+ lCostheta + "," + "M12=" + -lSintheta + "," + "M21=" + lSintheta
			+ "," + "M22=" + lCostheta + "," + "sizingMethod='auto expand'"
			+ ")");
}

/**
 * 
 * @returns [browser name:String, browser version:float]
 */
function browser() {
	var N = navigator.appName, ua = navigator.userAgent, tem;
	var M = ua
	.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
	if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null)
		M[2] = tem[1];
	M = M ? [ M[1], M[2] ] : [ N, navigator.appVersion, '-?' ];
	return M;
}
