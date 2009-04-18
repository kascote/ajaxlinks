/**
 * Ajaxlinks
 *
 * Convert conventional links to ajaxs ones.
 *
 * use example:
 *    $('#container').ajaxlinks()                          // all the anchors under #container will be converted
 *    $('#container').ajaxlinks({anchor:'css filter'})     // all the anchors under #container and with that css filter
 *    $('#container').ajaxlinks({spinner:'#spinner')       // element to show/hide when start/stop the ajax call
 *    $('#container').ajaxlinks({authToken:'asdfasdf')     // Rails feature... send a token to mitigate XSS
 *
 * And for the same price a ajaxlinks for will-paginate
 * example:
 *    $('#container).wpaginate                             // unobstructive javascript links
 *
 *
 * by nelson fernandez (c) 2009 - MIT Licence -  nelson@netflux.com.ar
 *
 **/

(function($) {
  var o;
  $.fn.ajaxlinks = function(param) {
    o = $.extend( {
      spinner: null,
      authToken: null,
      anchor: 'a'
    }, param || {});

    return this.each(function() {
      $(this).find(o.anchor).click(linkHandler);

      function linkHandler(e) {
        var href = $(e.target).attr('href');
        var ajaxData = { async: true, 
                         beforeSend: function(request){ toggleSpinner(); }, 
                         complete: function(request){ toggleSpinner() },
                         dataType: 'script',
                         url: href 
                       }
        if (o.authToken)
          $.extend( ajaxData, {data:'authenticity_token=' + encodeURIComponent(o.authToken)} );
        $.ajax(ajaxData);
        return false;
      };

      function toggleSpinner() {
        if (o.spinner)
          $(o.spinner).toggle();
      }
    });
  };

  $.fn.wpaginate = function(param) {
    $(this).ajaxlinks($.extend( param, {anchor:'div.pagination a'}));
  }

})(jQuery);
