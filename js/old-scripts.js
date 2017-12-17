
$(document).ready(function() {

  // isLoaded state to DOM
  setTimeout(function() { $('body').addClass('isLoaded'); }, 1000);
  setTimeout(function() { $('.header__averages').removeClass('isVisible'); }, 3000);

  $.getJSON('request_spaces', function(r) {
    
    $('#result').html('');

    // $("#result").html(r.length + ' results');

    $.each(r, function(i) {

      $item = r[i];

      // console.log($item);

      $html  = '<div class="item col-md-4 col-sm-6 col-xs-12"><a href="' + $item['slug'] + '" class="card u-mb2">';
      $html += '<div class="card__image u-mr2" style="background-image: url(\'' + $item['image']['medium'] + '\');"></div>';
      $html += '<h4>' + $item['name'] + '</h4>';
      $html += '<p class="u-block u-lineheight2 u-mr2">';
      $.each($item['workspace'], function(j) {
        $html += '<small>';
        $html += $item['workspace'][j]['ws_type'];
        if (j < $item['workspace'].length - 1) {
          $html += ', ';
        }
        $html += '</small>';
      });
      $html += '</p>';
      $html += '</a></div>';

      $html += buildDialogHtml($item);

      $("#result").append($html);

    });

    // $('.item a').click(function(e) {
    //   e.preventDefault();
    //   $id = $(this).attr('href');
    //   toggleDialog($id);
    //   tryPushState($id);

    //   $thisDialog = $('dialog#' + $id);
    //   $thisDialog.addClass('isBusy');
    //   $.getJSON('request_sharedesk_venue', { ws_id: $id }, function(r) {

    //     if(r['website'].length > 0) {

    //       var prefix = 'http://';
    //       $website = r['website'];
    //       if ($website.substr(0, prefix.length) !== prefix) {
    //         $website = prefix + $website;
    //       }
    //       $thisDialog.find('.dialog__action-website').attr('href', $website);
    //     } else {
    //       $thisDialog.find('.dialog__action-website').hide();
    //     }
    //     if(URL in r && r['URL'].length > 0) {
    //       $thisDialog.find('.dialog__action-book').attr('href', r['URL']);
    //     } else {
    //       $thisDialog.find('.dialog__action-book').hide();
    //     }
    //     $thisDialog.find('.dialog__actions').addClass('isVisible');
    //     $thisDialog.removeClass('isBusy');
    //   });
    // });


  });

});

function buildDialogHtml($item) {
  $html = '';

  // Dialog
  $html += '<dialog id="' + $item['slug'] + '">';
  $html += '<div class="dialog__indicator"><i class="ti ti-reload ti-isSpinning c-light"></i></div>';
  $html += '<div class="row">';
  $html += '<div class="col-xs-12 col-sm-4 bg-imagecover" style="min-height: 200px; background-image: url(\'' + $item['image']['medium'] + '\');"></div>';
  $html += '<div class="col-xs-12 col-sm-8 u-pa4">';

  // Title & Descr
  $html += '<h2 class="u-mb0">' + $item['name'] + '</h2>';
  $html += '<p class="c-greyblue u-lineheight4">' + $item['type'] + '</p>';
  $html += '<p class="u-lineheight3"><i class="u-block u-mb2">' + $item['tags'] + '</i></p>';

  // Address Link
  $html += '<a href="http://maps.google.com/?q=' + $item['address'] + '" style="vertical-align: top;" target="_blank">';
  $html += '<i class="ti ti-map-alt ti-2x u-mr1"></i> ' + $item['address'] + '<i class="ti ti-arrow-top-right ti-15x u-ml1 c-greyblue u-opacity50"></i>';
  $html += '</a>';

  // Workspaces
  $html += '<div class="u-clearfix u-mv2">';
  $.each($item['workspace'], function(j) {
    $html += '<div class="u-floatleft u-pv1 u-ph2 u-aligncenter u-maxwidth20">';
    $html += '<img src="images/type_' +  $item['workspace'][j]['ws_type_id'] + '.svg" alt="" class="u-opacity70 u-width6" />';
    $html += '<h4 class="u-ma0 u-lineheight2">' + $item['workspace'][j]['ws_type'] + '</h4>';
    $html += '<p class="u-ma0 u-lineheight3">';
    if($item['workspace'][j]['price_day'] > 0) {
      $html += '<small><b>' + $item['workspace'][j]['price_day'] + '</b>₺ per day</small>';
    } else { $html += '–'; }
    $html += '</p>';
    $html += '<p class="u-ma0 u-lineheight3">';
    if($item['workspace'][j]['price_month'] > 0) {
      $html += '<small><b>' + $item['workspace'][j]['price_month'] + '</b>₺ per month</small>';
    } else { $html += '–'; }
    $html += '</p>';
    $html += '</div>';
  });
  $html += '</div>';

  // Website & Book a space Links
  $html += '<div class="dialog__actions ';
  if ($item['website'] || $item['book_url']) { $html += 'isVisible'; }
  $html += ' u-mt1">';
  $website = ($item['website']) ? $item['website'] : '';
  $html += '<a href="' + $website + '" class="u-mr6 dialog__action-website" style="vertical-align: top;" target="_blank">';
  $html += '<i class="ti ti-world ti-2x u-mr1"></i> Visit website <i class="ti ti-arrow-top-right ti-15x u-ml1 c-greyblue u-opacity50"></i>';
  $html += '</a>';
  $book_url = ($item['book_url']) ? $item['book_url'] : '';
  $html += '<a href="' + $book_url + '" style="vertical-align: top;" target="_blank" class="dialog__action-book">';
  $html += '<i class="ti ti-shopping-cart ti-2x u-mr1"></i> Book a space <i class="ti ti-arrow-top-right ti-15x u-ml1 c-greyblue u-opacity50"></i>';
  $html += '</a>';
  $html += '</div>';


  $html += '</div>';
  $html += '</div>';
  $html += '</dialog>';

  return $html;
}

function toggleDialog(obj) {
  if(obj == 'close') {
    $('dialog, .dialog').removeClass('isVisible');
    $('.dialog-mask').removeClass('isVisible');
    history.go(-1);
  } else if($('dialog' + obj)) {
    $('dialog, .dialog').removeClass('isVisible');
    $('.dialog-mask').addClass('isVisible');
    $('dialog' + obj).addClass('isVisible');
  }
}

function tryPushState(slug) {
  if(history.pushState) {
    history.pushState(null, null, slug);
  }
  else {
    location.hash = slug;
  }
}


