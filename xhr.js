$(function(){
  $('#do').on('click', function(){
    $('#console').text('Loading...');
    var dest = 'https://userstream.twitter.com/1.1/user.json'; // StreamingAPI
    var req = new XMLHttpRequest({mozSystem: true});
    var authorization = ''; // OAuth header
    req.open('GET', dest, true);
    req.setRequestHeader('Authorization', authorization);
    req.onreadystatechange = function(e){
      if(req.readyState === 3){
        var data = req.responseText;
        var lines = data.split("\r\n");
        var json = JSON.parse(lines[lines.length-2]);

        var dom = $('<p></p>').text(json.user.screen_name + ': ' + json.text);
        $('#console').prepend(dom);
      }else if(req.readyState === 4){
        if(req.status === 200){
          $('#console').text('success: '+req.responseText);
        }else{
          $('#console').text('error');
        }
      }
    };
    req.send(null);
  });
});
