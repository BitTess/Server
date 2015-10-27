// global variables
var donationAmt = 1900;
var descriptionAmt = '1 widgets';

var handler = StripeCheckout.configure({
  // pk_test_s9dJH7JI5nEJ6mM9bF4bFSCW | pk_live_zuMQbEsl7Qkpv6hHpySq2SbN
  key: 'pk_live_zuMQbEsl7Qkpv6hHpySq2SbN',
  image: 'https://s3.amazonaws.com/stripe-uploads/acct_1043oq4uUzLCjW5Imerchant-icon-1433899991512-GO1-circle.png',
  token: function(token, args) {
    var data = {
      'amount' : donationAmt,
      'currency' : 'USD',
      'source' : token.id,
      'description': descriptionAmt
    };

    var request = $.ajax({
      url: 'http://stripe-sv.phuongb.go1.com.vn/index.php',
      dataType: 'jsonp',
      data: data
    });

    // send mail
    var industry = $("#what-industry-are-you-in").val();
    var size_organ = $("#what-is-the-size-of-your-organisation").val();
    var your_website = $("#your-website").val();
    var learning_portal = $("#what-are-you-looking-to-achieve-with-your-learning-portal").val();
    var country = $("#country").val();
    var msg = '<div class"submit-value">Submitted values are: </div><br /><div class"industry">What industry are you in?: ' + industry + '</div><div class"size_organ">What is the size of your organisation?: ' + size_organ + '</div><div class"your_website">Your website: ' + your_website + '</div><div class"learning_portal">What are you looking to achieve with your learning portal? : ' + learning_portal + '</div><div class"what_type_course">What types of courses would be relevant to your organisation?: ' + window.what_type_course + '</div><div class"walk_through">Would you like a call from our team to walk through your needs?: ' + country + '</div>';
    $.ajax(
      {
        type: "POST",
        url: "https://mandrillapp.com/api/1.0/messages/send.json",
        data: {
          'key': 'OGkM0a6-ROqot0i_VazG3w',
          'message': {
            'from_email': 'noreply@go1.com.au',
            'from_name': 'GO1',
            'subject': 'Form submission from: Thanks! We\'ll be in touch shortly',
            'html': msg,
            //'bcc_address': 'nguyen.tran@go1.com.au',
            'to': [{'email':'phuongbui@go1.com.au'}]
          }
        }
      })
    .done(function(response) {
      $('.launch-form').replaceWith('<div class="launch-form container thankyou"><p>Thanks! Your GO1 portal logins will be across shortly. It can take a few hours to activate but if you have any questions please email <a href="mailto:support@go1.com">support@go1.com</a>.</p><p><a href="/">Return to the homepage</a></p></div>');
    })
    .fail(function(response) {
      alert('Error sending email.');
    });
  }
});


/**
 * Count Price allow amount
 */
jQuery.setValueToPayment = function setValueToPayment() {
  var amount = getParameterByName('user_plan');
  if (amount != '') {
    if (amount >= 100) {
      donationAmt = 450 * 100;
      descriptionAmt = '100 user plan, 30 day trial';
    }
    else if (amount >= 50) {
      donationAmt = 250 * 100;
      descriptionAmt = '50 user plan, 30 day trial';
    }
    else if (amount >= 25) {
      donationAmt = 150 * 100;
      descriptionAmt = '25 user plan, 30 day trial';
    }
    else if (amount >= 15) {
      donationAmt = 90 * 100;
      descriptionAmt = '15 user plan, 30 day trial';
    }
    else if (amount >= 10) {
      donationAmt = 0;
    }
  }
  else {
    donationAmt = '';
  }
  return donationAmt;
};
