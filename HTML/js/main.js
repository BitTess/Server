jQuery(function($){

//------------------------------------------------------------------------
//			Determine viewport width matching with media queries
//------------------------------------------------------------------------
  function viewport() {
    var e = window,
        a = 'inner';

        if (!('innerWidth' in window)) {
          a = 'client';
          e = document.documentElement || document.body;
        }
        return {
          width: e[a + 'Width'],
          height: e[a + 'Height']
        };
  }

//------------------------------------------------------------------------
//			preloader
//------------------------------------------------------------------------
  $(window).on("load",function(e){
    $("#page-loader").fadeOut();
  });


//------------------------------------------------------------------------
//			sticky MENU WHEN SCROLL
//------------------------------------------------------------------------
  $(window).bind('scroll resize load', function() {
    var vpWidth = viewport().width; // This should match media queries
      if(vpWidth > 767) {
        if ($(this).scrollTop() > 400) {
          $("#main-nav").addClass("sticky-show");
          changeLogo('/logo.png', '/logo-color.png');
        } else {
          $("#main-nav").removeClass("sticky-show");
          changeLogo('/logo-color.png', '/logo.png');
        }
      }
      else {
	     changeLogo('/logo.png', '/logo-color.png');
     }
  });


//------------------------------------------------------------------------
//			replace logo white into black or vice versa
//------------------------------------------------------------------------

function changeLogo(a, b) {
  var target = $("#main-nav").find('.navbar-brand').find('img').attr('src');
  var newTarg = target.replace(a, b);
  $("#main-nav").find('.navbar-brand').find('img').attr("src", newTarg);
}

//------------------------------------------------------------------------
//			vertical align
//------------------------------------------------------------------------
  function alignVertical() {
    var vpWidth = viewport().width; // This should match media queries
    $(".align-vertical").each(function() {
      var a=$(this),b=a.height(),c=a.parent().height(),d=c/2-b/2;
      if(vpWidth > 767) {
        a.css("padding-top",d);
      }
      else {
	    a.css("padding-top", '20px');
	    a.css("padding-bottom", '20px');
      }
    });
  }


//------------------------------------------------------------------------
//			align bottom
//------------------------------------------------------------------------
  function alignBottom() {
    $(".align-bottom").each(function() {
      var a=$(this),b=a.height(),c=a.parent().height(),d=c-b-32;
      a.css("padding-top",d);
    });
  }

//------------------------------------------------------------------------
//			Features - Anchor link scroll
//------------------------------------------------------------------------
function scrollToAnchor(aid){
    var aTag = $("a[name='"+ aid +"']");
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}
$("#more-features").click(function() {
   scrollToAnchor('introduction-go1');
});

//------------------------------------------------------------------------
//			Apply function
//------------------------------------------------------------------------

  alignVertical();
  alignBottom();

  $( window ).resize(function() {
    alignVertical();
    alignBottom();
  });

  // Live chat 
  // window.$zopim || (function (d, s) {
    // var z = $zopim = function (c) {
      // z._.push(c)
    // }, $ = z.s =
            // d.createElement(s), e = d.getElementsByTagName(s)[0];
    // z.set = function (o) {
      // z.set.
              // _.push(o)
    // };
    // z._ = [];
    // z.set._ = [];
    // $.async = !0;
    // $.setAttribute("charset", "utf-8");
    // $.src = "//v2.zopim.com/?2bLHY7PilHwLPhhuKX7vOSmqo39lkdTg";
    // z.t = +new Date;
    // $.
            // type = "text/javascript";
    // e.parentNode.insertBefore($, e)
  // })(document, "script");
//   
  // $zopim(function () {
    // $zopim.livechat.theme.setColor('#428bca');
  // });
  $(".zopim-chat").click(function() {
    console.log ($("div.zopim").html); 
    $zopim.livechat.window.toggle() ; 
  });

//------------------------------------------------------------------------
//			contact submission
//------------------------------------------------------------------------
  $("#contact-form").submit(function()
    {
        var email = $("#email").val(); // get email field value
        var user_name = $("#name").val(); // get name field value
        var msg = $("#msg").val(); // get message field value
        var phone = $("#phone").val(); // get name field value
        var company = $("#company").val(); // get message field value

        var text = "Name: "+user_name+"\n"+"Email: "+email+"\n"+"Phone: "+phone+"\n"+"Company: "+company+"\n"+"Message: "+msg;


        $.ajax(
        {
            type: "POST",
            url: "https://mandrillapp.com/api/1.0/messages/send.json",
            data: {
                'key': 'OGkM0a6-ROqot0i_VazG3w',
                'message': {
                    'from_email': 'support@go1.com.au',
                    'from_name': 'go1',
                    'headers': {
                        'Reply-To': email
                    },
                    'subject': 'New website enquiry',
                    'text': text,
                    'to': [
                    {
                        'email': 'sales@go1.com.au',
                        'name': 'sales@go1.com.au',
                        'type': 'to'
                    },
                    {
                        'email': 'support@go1.com.au',
                        'name': 'support@go1.com.au',
                        'type': 'to'
                    },
                    {
                        'email': 'chood@go1.com.au',
                        'name': 'chood@go1.com.au',
                        'type': 'to'
                    }]
                }
            }
        })
        .done(function(response) {
            alert('Your message has been sent. Thank you!'); // show success message
            $("#name").val(''); // reset field after successful submission
            $("#email").val(''); // reset field after successful submission
            $("#msg").val(''); // reset field after successful submission
            $("#phone").val(''); // reset field after successful submission
            $("#company").val(''); // reset field after successful submission
        })
        .fail(function(response) {
            alert('Error sending message.');
        });
        return false; // prevent page refresh
  });
	
	
	$(document).ready(function() {
		$(".video").click(function() { 
			$.fancybox({ 
				'padding' : 0, 
				'autoScale' : false, 
				'transitionIn' : 'none', 
				'transitionOut' : 'none', 
				'title' : this.title, 
				'width' : 640, 
				'height' : 360, 
				'href' : this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'), 
				'type' : 'swf', 
				'swf' : { 
					'wmode' : 'transparent', 
					'allowfullscreen' : 'true' 
					} 
				}); 
			return false; 
		});
	});

//------------------------------------------------------------------------
//			Book now submission
//------------------------------------------------------------------------
  $("#book-now").submit(function()
    {
        var email = $("#book-email").val(); // get email field value
        var text = "Email: "+email;
        $.ajax(
        {
            type: "POST",
            url: "https://mandrillapp.com/api/1.0/messages/send.json",
            data: {
                'key': 'OGkM0a6-ROqot0i_VazG3w',
                'message': {
                    'from_email': 'support@go1.com.au',
                    'from_name': 'go1',
                    'headers': {
                        'Reply-To': email
                    },
                    'subject': 'New website enquiry',
                    'text': text,
                    'to': [
                    {
                        'email': 'sales@go1.com.au',
                        'name': 'sales@go1.com.au',
                        'type': 'to'
                    },
                    {
                        'email': 'support@go1.com.au',
                        'name': 'support@go1.com.au',
                        'type': 'to'
                    },
                    {
                        'email': 'chood@go1.com.au',
                        'name': 'chood@go1.com.au',
                        'type': 'to'
                    }]
                }
            }
        })
        .done(function(response) {
            alert('Your message has been sent. Thank you!'); // show success message
            $("#book-email").val(''); // reset field after successful submission
        })
        .fail(function(response) {
            alert('Error sending message.');
        });
        return false; // prevent page refresh
  });

}); // end function

/**
 * get query
 */
function getParameterByName (name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}