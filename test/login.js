var btnPrs = 0

    $('#pwBtn').on('click', function(){
    if(btnPrs % 2 == 0) {
      btnPrs++;
      $('#pwBtn').removeClass('eyes-slash')
      $('#pwBtn').addClass('eyes')
      $('#pw').attr('type', 'text');
    } else {
      btnPrs++;
      $('#pwBtn').addClass('eyes-slash')
      $('#pwBtn').removeClass('eyes')
      $('#pw').attr('type', 'password');
    }
  })