function PixtuPrediction(api_key) {
  this.api_key = api_key;
}

PixtuPrediction.prototype = (function(){

  var Browser = {
      nameAndVersion() {
          // http://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser
          var ua= navigator.userAgent, tem,
          M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
          if (/trident/i.test(M[1])) {
          tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
          return 'IE '+(tem[1] || '');
          }
          if (M[1]=== 'Chrome') {
          tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
          if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
          }
          M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
          if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
          return M.join(' ');
      },

      isMobile() {
          return 'ontouchstart' in document;
      },

      userAgent() {
          return window.navigator.userAgent;
      }
  }
  // currentKey = this.config.api_key;
  function getData (key) {
      
      var data = {
              id: key,
              dl:window.location.href, // document location
              rl:document.referrer, // referrer location
              ts:this.timestamp, // timestamp when event was triggered
              de:document.characterSet, // document encoding
              sr:window.screen.width + 'x' + window.screen.height, // screen resolution
              vp:window.innerWidth + 'x' + window.innerHeight, // viewport size
              cd:window.screen.colorDepth, // color depth
              dt:document.title, // document title
              bn:Browser.nameAndVersion(), // browser name and version number
              md:Browser.isMobile(), // is a mobile device?
              ua:Browser.userAgent(), // user agent
              tz:(new Date()).getTimezoneOffset(), // timezone
              path: window.location.pathname,
              url: window.location.protocol + '//' + window.location.hostname + window.location.pathname,
              hostname: window.location.hostname,
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              width: window.innerWidth
              }
      return data
  }

  async function getPrediction () {
      
      var bodyData = await getData(this.api_key)
      const response = await fetch('https://pixtu-api.herokuapp.com/prediction', {
          method: 'POST',
          body: JSON.stringify(bodyData),
          mode: 'cors',
          headers: {
              "Content-Type": "application/json",
              "Accept": 'application/json',
          },
      });
      const result = await response.json();
      return result
  }


return {
  getPrediction: getPrediction
};

})();

function closePixtu() {
document.getElementById("pixtu-modal").style.display = "none";               
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == document.getElementById("pixtu-modal")) {
      document.getElementById("pixtu-modal").style.display = "none";
  }
}
      
var fired = false;
var pixtuTestGroup =  getCookie('pointng')
if (!pixtuTestGroup) {
createTestGroup()
firePopup()
}
mixpanel.track("pointNG Main Page View", {
"test_group": pixtuTestGroup
})
function createTestGroup() {
  
  var timeToAdd = 1000 * 60 * 60 * 24 * 7 * 4 * 6;
  var date = new Date();
  var expiryTime = parseInt(date.getTime()) + timeToAdd;
  date.setTime(expiryTime);
  var utcTime = date.toUTCString();
  var checkNum = Math.floor(Math.random() * 3)
  if (checkNum == 0) {
      pixtuTestGroup = 'A'     
      document.cookie = "pointng=A; expires=" + utcTime + ";"
  }  else if (checkNum == 1) {
      pixtuTestGroup  = 'B'
      document.cookie = "pointng=B; expires=" + utcTime + ";"
  } else {
      pixtuTestGroup  = 'C' 
      document.cookie = "pointng=C; expires=" + utcTime + ";"     
  }      

}   

var execPopup = function(time) {
setTimeout(function() { showPopup(); }, time*1000);
}

function getCookie(cname) {
var name = cname + "=";
var decodedCookie = decodeURIComponent(document.cookie);
var ca = decodedCookie.split(';');
for(var i = 0; i <ca.length; i++) {
  var c = ca[i];
  while (c.charAt(0) == ' ') {
    c = c.substring(1);
  }
  if (c.indexOf(name) == 0) {
    return c.substring(name.length, c.length);
  }
}
return null;
}

var showPopup = function() {
          
          if (!fired) {
            mixpanel.track("Pixtu popup showed", {
              "test_group": pixtuTestGroup
            })
            fired = true;
                        
            document.getElementById("pixtu-modal").style.display = "block";
          }
                
}
       
async function firePopup() {
        if (pixtuTestGroup == 'A') {
           var pixtu_prediction = new PixtuPrediction('fb8cc2cd-187d-4835-a397-3cb83798d2pp')
   
            pixtu_prediction.getPrediction().then().then(value => {    
                  console.log("Pixtu.io prediction:")
               console.log(value)     

                  document.getElementById("pixtu-title").innerHTML = "Join our BETA:";
                  document.getElementById("pixtu-description").innerHTML = "Sign up to get an access to the pointNG BETA."
                  document.getElementById("pixtu-html").innerHTML = `
          <div class="field">
            <form id="submit-email-2" name="form" novalidate="" action="https://dev.us7.list-manage.com/subscribe/post?u=71500ff84b0a3743f7dd57cbd&amp;id=df43edeefa" method="POST" onsubmit="return confSubmit();">
              <label class="label" style="color: #fff; opacity: 0.8;">Email</label>
              <div class="control" style="margin-bottom: 20px">
                    <input type="email" name="EMAIL" class="input" pattern="/^[a-zA-Z0-9+-_]+(\.[_a-zA-Z0-9+]+)*@[a-zA-Z0-9+-_]+(\.[a-zA-Z0-9+-_]+)*(\.[a-zA-Z]+)$/" placeholder="your@email.com" aria-required="true" required="required">
              </div>
                    <button type="submit" class="button is-primary"><span>SUBMIT</span></button>

            </form>
          </div>`
              execPopup(15)
            })

         } else if (pixtuTestGroup == 'B') {

          var pixtu_prediction = new PixtuPrediction('fb8cc2cd-187d-4835-a397-3cb83798d2pp')
   
            pixtu_prediction.getPrediction().then().then(value => {    
              console.log("Pixtu.io prediction:")
               console.log(value)     

               document.getElementById("pixtu-title").innerHTML = "Join our BETA:";
               document.getElementById("pixtu-description").innerHTML = "Sign up to get an access to the pointNG BETA."
                  document.getElementById("pixtu-html").innerHTML = `
          <div class="field">
            <form id="submit-email-2" name="form" novalidate="" action="https://dev.us7.list-manage.com/subscribe/post?u=71500ff84b0a3743f7dd57cbd&amp;id=df43edeefa" method="POST" onsubmit="return confSubmit();">
              <label class="label" style="color: #fff; opacity: 0.8;">Email</label>
              <div class="control" style="margin-bottom: 20px">
                    <input type="email" name="EMAIL" class="input" pattern="/^[a-zA-Z0-9+-_]+(\.[_a-zA-Z0-9+]+)*@[a-zA-Z0-9+-_]+(\.[a-zA-Z0-9+-_]+)*(\.[a-zA-Z]+)$/" placeholder="your@email.com" aria-required="true" required="required">
              </div>
                    <button type="submit" class="button is-primary"><span>SUBMIT</span></button>

            </form>
          </div>`
                  execPopup(value.timeInSeconds)
                
              })

         } else {

            // var pixtu_prediction = new PixtuPrediction('fb8cc2cd-187d-4835-a397-3cb83798d2pp')

            //   pixtu_prediction.getPrediction().then().then(value => {   
            //     console.log("Pixtu.io prediction:")
            //           console.log(value)  
            //       if (value.subscribes > value.leaves) { 


            //             document.getElementById("pixtu-title").innerHTML = "Stay in the loop:";
            //               document.getElementById("pixtu-description").innerHTML = "Subscribe to our newsletter and be one of the first to hear about pointNG updates and news."
            //               document.getElementById("pixtu-html").innerHTML = `
            //             <div class="field">
            //               <form id="submit-email-2" name="form" novalidate="" action="https://dev.us7.list-manage.com/subscribe/post?u=71500ff84b0a3743f7dd57cbd&amp;id=df43edeefa" method="POST" onsubmit="return confSubmit();">
            //                 <label class="label" style="color: #fff; opacity: 0.8;">Email</label>
            //                 <div class="control" style="margin-bottom: 20px">
            //                       <input type="email" name="EMAIL" class="input" pattern="/^[a-zA-Z0-9+-_]+(\.[_a-zA-Z0-9+]+)*@[a-zA-Z0-9+-_]+(\.[a-zA-Z0-9+-_]+)*(\.[a-zA-Z]+)$/" placeholder="your@email.com" aria-required="true" required="required">
            //                 </div>
            //                       <button type="submit" class="button is-primary"><span>SUBMIT</span></button>

            //               </form>
            //             </div>`
            //               execPopup(value.timeInSeconds)
            //       }
            //     })

            }
    }


  const pointng = new PointNG({ 
      api_key: "beta",
      level: 'city',
      privacyPolicyLink: "https://beta.pointng.io/privacy",
      widgetPosition: 'right'
  }); 
  pointng.openWidget(pointng.start()).then(value => {        
    document.getElementById("locateMeWithPointNG").addEventListener("click", listenForPrediction)
  })

  function listenForPrediction() {
    
    var updateContent = function() {
      // $("#loader").addClass('is-active-loader');
      if (pointng.predictionData.ready == true) {
        mixpanel.track("Widget location prediction");
        // $("#loader").removeClass('is-active-loader');
        clearInterval(checkForUserLocation);
        $("#modal").addClass('is-active');
        if (pointng.predictionData.continent) $("#continent").html('Continent: ' + pointng.predictionData.continent)
        if (pointng.predictionData.sub_continent) $("#sub_continent").html('Sub continent: ' + pointng.predictionData.sub_continent)
        if (pointng.predictionData.country) $("#country").html('Country: ' + pointng.predictionData.country)
        if (pointng.predictionData.iso2) $("#iso2").html('ISO2: ' + pointng.predictionData.iso2)
        if (pointng.predictionData.capital) $("#capital").html('Capital: ' + pointng.predictionData.capital)
        if (pointng.predictionData.currency) $("#currency").html('Currency: ' + pointng.predictionData.currency)
        if (pointng.predictionData.phone_code) $("#phone_code").html('Phone prefix: ' + pointng.predictionData.phone_code)
        if (pointng.predictionData.state) $("#state").html('State: ' + pointng.predictionData.state)
        if (pointng.predictionData.city) $("#city").html('City: ' + pointng.predictionData.city)

        if (pointng.predictionData.continent) $(".continent").html('')
        if (pointng.predictionData.sub_continent) $(".sub_continent").html('')
        if (pointng.predictionData.country) $(".country").html('')
        if (pointng.predictionData.iso2) $(".iso2").html('')
        if (pointng.predictionData.capital) $(".capital").html('')
        if (pointng.predictionData.currency) $(".currency").html('')
        if (pointng.predictionData.phone_code) $(".phone_code").html('')
        if (pointng.predictionData.state) $(".state").html('')
        if (pointng.predictionData.city) $(".city").html('')

        if (pointng.predictionData.continent) $(".continent").html('continent: ' + pointng.predictionData.continent + ',')
        if (pointng.predictionData.sub_continent) $(".sub_continent").html('sub_continent: ' + pointng.predictionData.sub_continent + ',')
        if (pointng.predictionData.country) $(".country").html('country: ' + pointng.predictionData.country + ',')
        if (pointng.predictionData.iso2) $(".iso2").html('iso2: ' + pointng.predictionData.iso2 + ',')
        if (pointng.predictionData.capital) $(".capital").html('capital: ' + pointng.predictionData.capital + ',')
        if (pointng.predictionData.currency) $(".currency").html('currency: ' + pointng.predictionData.currency + ',')
        if (pointng.predictionData.phone_code) $(".phone_code").html('phone_code: ' + pointng.predictionData.phone_code + ',')
        if (pointng.predictionData.state) $(".state").html('state: ' + pointng.predictionData.state + ',')
        if (pointng.predictionData.city) $(".city").html('city: ' + pointng.predictionData.city)
        console.log(pointng.predictionData)
        $( "#close" ).click(function() {
            $("#modal").removeClass('is-active');
        });
      }
    }
    var checkForUserLocation = setInterval(updateContent, 100)
  }


var tryThis = function() {
  $("#tryThis").addClass('is-loading');
  mixpanel.track("Try pointNG button click");
  pointngLocate()
}

var tryThis2 = function() {
  $("#updateData").addClass('is-loading');
  mixpanel.track("Update with my data button click");
  pointngUpdateData()
}

var pointngLocate = function() {
  pointng.getLocation().then(function(prediction) {
                console.log("Predicted country: " + prediction.country)
                mixpanel.track("pointNG prediction ready");
                console.log(pointng.predictionData)
                $("#tryThis").removeClass('is-loading');
                $("#modal").addClass('is-active');
                if (prediction.continent) $("#continent").html('Continent: ' + prediction.continent)
                if (prediction.sub_continent) $("#sub_continent").html('Sub continent: ' + prediction.sub_continent)
                if (prediction.country) $("#country").html('Country: ' + prediction.country)
                if (prediction.iso2) $("#iso2").html('ISO2: ' + prediction.iso2)
                if (prediction.capital) $("#capital").html('Capital: ' + prediction.capital)
                if (prediction.currency) $("#currency").html('Currency: ' + prediction.currency)
                if (prediction.phone_code) $("#phone_code").html('Phone prefix: ' + prediction.phone_code)
                if (prediction.state) $("#state").html('State: ' + prediction.state)
                if (prediction.city) $("#city").html('City: ' + prediction.city)

                if (pointng.predictionData.continent) $(".continent").html('')
                if (pointng.predictionData.sub_continent) $(".sub_continent").html('')
                if (pointng.predictionData.country) $(".country").html('')
                if (pointng.predictionData.iso2) $(".iso2").html('')
                if (pointng.predictionData.capital) $(".capital").html('')
                if (pointng.predictionData.currency) $(".currency").html('')
                if (pointng.predictionData.phone_code) $(".phone_code").html('')
                if (pointng.predictionData.state) $(".state").html('')
                if (pointng.predictionData.city) $(".city").html('')
 
                if (pointng.predictionData.continent) $(".continent").html('continent: ' + pointng.predictionData.continent + ',')
                if (pointng.predictionData.sub_continent) $(".sub_continent").html('sub_continent: ' + pointng.predictionData.sub_continent + ',')
                if (pointng.predictionData.country) $(".country").html('country: ' + pointng.predictionData.country + ',')
                if (pointng.predictionData.iso2) $(".iso2").html('iso2: ' + pointng.predictionData.iso2 + ',')
                if (pointng.predictionData.capital) $(".capital").html('capital: ' + pointng.predictionData.capital + ',')
                if (pointng.predictionData.currency) $(".currency").html('currency: ' + pointng.predictionData.currency + ',')
                if (pointng.predictionData.phone_code) $(".phone_code").html('phone_code: ' + pointng.predictionData.phone_code + ',')
                if (pointng.predictionData.state) $(".state").html('state: ' + pointng.predictionData.state + ',')
                if (pointng.predictionData.city) $(".city").html('city: ' + pointng.predictionData.city)

                $( "#close" ).click(function() {
                  $("#modal").removeClass('is-active');
                });

  })
}

var pointngUpdateData = function() {
  pointng.getLocation().then(function(prediction) {
                console.log("Predicted country: " + prediction.country)
                console.log(pointng.predictionData)
                mixpanel.track("pointNG prediction ready");
                $("#updateData").removeClass('is-loading');
 
                if (pointng.predictionData.continent) $(".continent").html('continent: ' + pointng.predictionData.continent)
                if (pointng.predictionData.sub_continent) $(".sub_continent").html('sub_continent: ' + pointng.predictionData.sub_continent)
                if (pointng.predictionData.country) $(".country").html('country: ' + pointng.predictionData.country)
                if (pointng.predictionData.iso2) $(".iso2").html('iso2: ' + pointng.predictionData.iso2)
                if (pointng.predictionData.capital) $(".capital").html('capital: ' + pointng.predictionData.capital)
                if (pointng.predictionData.currency) $(".currency").html('currency: ' + pointng.predictionData.currency)
                if (pointng.predictionData.phone_code) $(".phone_code").html('phone_code: ' + pointng.predictionData.phone_code)
                if (pointng.predictionData.state) $(".state").html('state: ' + pointng.predictionData.state)
                if (pointng.predictionData.city) $(".city").html('city: ' + pointng.predictionData.city)

                if (pointng.predictionData.continent) $(".continent").html('')
                if (pointng.predictionData.sub_continent) $(".sub_continent").html('')
                if (pointng.predictionData.country) $(".country").html('')
                if (pointng.predictionData.iso2) $(".iso2").html('')
                if (pointng.predictionData.capital) $(".capital").html('')
                if (pointng.predictionData.currency) $(".currency").html('')
                if (pointng.predictionData.phone_code) $(".phone_code").html('')
                if (pointng.predictionData.state) $(".state").html('')
                if (pointng.predictionData.city) $(".city").html('')
 
                if (pointng.predictionData.continent) $(".continent").html('continent: ' + pointng.predictionData.continent + ',')
                if (pointng.predictionData.sub_continent) $(".sub_continent").html('sub_continent: ' + pointng.predictionData.sub_continent + ',')
                if (pointng.predictionData.country) $(".country").html('country: ' + pointng.predictionData.country + ',')
                if (pointng.predictionData.iso2) $(".iso2").html('iso2: ' + pointng.predictionData.iso2 + ',')
                if (pointng.predictionData.capital) $(".capital").html('capital: ' + pointng.predictionData.capital + ',')
                if (pointng.predictionData.currency) $(".currency").html('currency: ' + pointng.predictionData.currency + ',')
                if (pointng.predictionData.phone_code) $(".phone_code").html('phone_code: ' + pointng.predictionData.phone_code + ',')
                if (pointng.predictionData.state) $(".state").html('state: ' + pointng.predictionData.state + ',')
                if (pointng.predictionData.city) $(".city").html('city: ' + pointng.predictionData.city)



  })
}



window.addEventListener('load', (event) => {

mixpanel.track_forms("#submit-email-3","Email subscription submit", {
    "test_group": pixtuTestGroup
  });

//Navbar events
mixpanel.track_links("#nav-why","Navbar Why link clicked");
mixpanel.track_links("#nav-examples","Navbar Examples Link clicked");
mixpanel.track_links("#nav-documentation","Navbar Documentation link clicked");
mixpanel.track_links("#nav-contact","Navbar Contact lnk clicked");
mixpanel.track_links("#nav-signup","Navbar Signup link clicked");
document.getElementById("nav-signup").addEventListener("click", function() {
  pixtu("event", "signup")
});
mixpanel.track_links("#nav-login","Navbar Login link clicked");
// mixpanel.track_links("#close","Location prediction result popup Close button clicked");

//Main Hero module events
mixpanel.track_links("#get-started","Get started main module button clicked");
mixpanel.track_links("#view-docs","View docs main module button clicked");

mixpanel.track_links("#developer-friendly","Developer friendly USP clicked");
mixpanel.track_links("#one-stop-shop","One stop shop USP clicked");
mixpanel.track_links("#privacy-by-design","Privacy by design USP clicked");
mixpanel.track_links("#empower-the-user","Empower the user USP clicked");

mixpanel.track_links("#get-started-for-free","Get started for free button clicked");
document.getElementById("get-started-for-free").addEventListener("click", function() {
      pixtu("event", "signup")
});
mixpanel.track_links("#documentation","Documentation button clicked");

mixpanel.track_links("#discord","Discord button clicked");

//Why section events
mixpanel.track_links("#details","Read more details link clicked");
mixpanel.track_links("#documentation","Documentation link clicked");
mixpanel.track_links("#read-about-widget","Read more about the widget link clicked");

//Use case examples
mixpanel.track_links("#secure-weather","Secure weather link clicked");
mixpanel.track_links("#content-personalization-example","Content personalization example link clicked");
mixpanel.track_links("#html-starter-example","HTML starter example link clicked");
mixpanel.track_links("#form-prefill-example","Form prefill example link clicked");
mixpanel.track_links("#vuejs-starter-example","VueJS starter example link clicked");

//Footer
mixpanel.track_links("#footer-documentation","Footer Documentation link clicked");
mixpanel.track_links("#footer-terms","Footer Terms link clicked");
mixpanel.track_links("#footer-privacy","Footer Privacy link clicked");
mixpanel.track_links("#twitter-ihmissuti","Footer ihmissuti-twitter link clicked");
mixpanel.track_links("#twitter-aleksi","Footer aleksi-twitter link clicked");
mixpanel.track_links("#twitter-jere","Footer jere-twitter link clicked");
mixpanel.track_links("#footer-twitter","Footer Twitter link clicked");
mixpanel.track_links("#footer-linkedin","Footer LinkedIn link clicked");
mixpanel.track_links("#footer-github","Footer Github link clicked");
mixpanel.track_links("#footer-grew","Footer Grew link clicked");

//Pixtu.io popup link
if(document.getElementById("pixtu-href")){

  mixpanel.track_links("#pixtu_href","Pixtu.io popup link clicked", {
    "test_group": pixtuTestGroup
  });

}

})

function confSubmit() {

  pixtu("event", "subscription")
  mixpanel.track("Email subscription Pixtu popup submit", {
    "test_group": pixtuTestGroup
  });

  setTimeout(function() { console.log("subscribe") }, 2*1000);
  document.forms[event.target.id].submit();
  return false;
}

function confSubscription() {

pixtu("event", "subscription")
mixpanel.track("Email subscription submit", {
  "test_group": pixtuTestGroup
});
setTimeout(function() { console.log("subscribe") }, 2*1000);
document.forms[event.target.id].submit();
return false;
}

function trackGetStarted() {
  mixpanel.track("Get started pixtu button clicked", {
    "test_group": pixtuTestGroup
  });
  pixtu("event", "signup")

}
