function generate_date_list(monthNames, qntYears, selectYear, selectMonth, selectDay, currentYear, yearOffset, yearCountMode) {

  for (var y = 0; y < qntYears; y++) {
    var date = new Date(currentYear);
    var yearElem = document.createElement("option");
    yearElem.value = currentYear
    yearElem.textContent = currentYear;
    selectYear.append(yearElem);
    if (yearCountMode == "asc")
      currentYear++;
    else
      currentYear--;
  }


  for (var m = 0; m < 12; m++) {
    var monthNum = new Date(2018, m).getMonth()
    var month = monthNames[monthNum];
    var monthElem = document.createElement("option");
    monthElem.value = monthNum;
    monthElem.textContent = month;
    selectMonth.append(monthElem);
  }

  var d = new Date();
  var month = d.getMonth();
  var year = d.getFullYear() + yearOffset;
  var day = d.getDate();

  selectYear.val(year);
  selectYear.on("change", function () {
    var year = selectYear.val();
    var month = parseInt(selectMonth.val()) + 1;
    selectDay.empty();
    console.log(month);
    var days = new Date(year, month, 0).getDate(); //get the last day, so the number of days in that month
    for (var d = 1; d <= days; d++) {
      var dayElem = document.createElement("option");
      dayElem.value = d;
      dayElem.textContent = d;
      selectDay.append(dayElem);
    }

  });
  selectMonth.val(month);
  selectMonth.on("change", function () {
    var year = selectYear.val();
    var month = parseInt(selectMonth.val()) + 1;
    selectDay.empty();
    console.log(month);
    var days = new Date(year, month, 0).getDate(); //get the last day, so the number of days in that month
    for (var d = 1; d <= days; d++) {
      var dayElem = document.createElement("option");
      dayElem.value = d;
      dayElem.textContent = d;
      selectDay.append(dayElem);
    }

  });

  AdjustDays();
  selectDay.val(day);
}


function AdjustDays() {
  var year = selectYear.val();
  var month = parseInt(selectMonth.val()) + 1;
  selectDay.empty();
  console.log(month);
  var days = new Date(year, month, 0).getDate(); //get the last day, so the number of days in that month
  for (var d = 1; d <= days; d++) {
    var dayElem = document.createElement("option");
    dayElem.value = d;
    dayElem.textContent = d;
    selectDay.append(dayElem);
  }
}


(function ($) {
  "use strict";

  $.validate();


  $('.tooltipster').tooltipster({
    animation: 'fade',
    delay: 200,
    theme: 'tooltipster-light',
    contentAsHTML: true,
    minWidth: 250,
    maxWidth: 350,
    trackOrigin: true,
    trackTooltip: true,
    side: 'right'
  });

  $('.option-title').tooltipster({
    animation: 'fade',
    delay: 200,
    theme: 'tooltipster-light',
    contentAsHTML: true,
    minWidth: 250,
    maxWidth: 350,
    trackOrigin: true,
    trackTooltip: true,
    side: 'top'
  });

  $('.help-sign').tooltipster({
    animation: 'fade',
    delay: 200,
    theme: 'tooltipster-light',
    contentAsHTML: true,
    minWidth: 250,
    maxWidth: 350,
    trackOrigin: true,
    trackTooltip: true,
    side: 'top'
  });


  function add_hidden_Class(element, index, form) {
    $("." + element[index]).addClass("hidden");

    $('#' + form + ' *').filter(':input[type="radio"]').each(function () { //To reset the radio button while show/hide them
      if ($(this).attr("default-checked") == 1) {
        $(this).prop("checked", true);
      }
    });
  }

  function remove_hidden_Class(element, index, form) {
    $("." + element[index]).removeClass("hidden");
  }

  var user_data_arrary = new Array();

  $('input[type="radio"]').click(function () {
    var user_data = $(this).attr("user-data");
    var user_data_action = $(this).attr("user-data-action");
    if (user_data != undefined) {
      if (user_data_action == "hide") {

        var form = $(this).closest('form').attr("id");

        user_data_arrary = user_data.split(" ");
        var index = 0;
        while (index < user_data_arrary.length) {
          add_hidden_Class(user_data_arrary, index, form);
          index++;
        }
      } else
      if (user_data_action == "show") {
        user_data_arrary = user_data.split(" ");
        var index = 0;
        while (index < user_data_arrary.length) {
          remove_hidden_Class(user_data_arrary, index, form);
          index++;
        }
      }

    }
  });

  $('select').each(function () {
    $(this).select2({
      theme: 'bootstrap4',
      width: 'style',
      placeholder: $(this).attr('placeholder'),
      allowClear: Boolean($(this).data('allow-clear')),
    });
  });

  // Show/Hide login box
  $('.login .btn').click(function () {
    $('.login_box_container').fadeToggle('slow');
    $('.login .btn').addClass('active-login-btn');
  });


  $(document).mouseup(function (e) {
    var container = $(".login_box_container");

    if (!container.is(e.target)
      && container.has(e.target).length === 0) {
      container.hide();
      $('.login .btn').removeClass('active-login-btn');
    }
  });


  $(window).on('resize', function () {

    // Resize header based on the screen height
    if ($(window).width() > 992) {
      var height = $(window).height();
      var remainingHeightsForIcons = Math.floor((height - $(".intro-info").outerHeight() - ($(".swap-on-hover").height() * 2)) / 7);
      $(".swap-on-hover").css("margin-top", remainingHeightsForIcons);
      var margin_top = parseInt(height - ($(".cityscape-bkg-animated").height() * 2));
      var sky_bkg_animated_offset = $("#header").height() + Math.floor(height * 0.1);
      $("#intro").height(height - sky_bkg_animated_offset);
      $(".cityscape-bkg-animated").css("margin-top", margin_top - sky_bkg_animated_offset);
      $(".sky-bkg-animated").css("margin-top", sky_bkg_animated_offset);
    } else {
      var header_content = $(".header-content").height();
      var header_height = $("#header").outerHeight();
      var cityscape_height = $(".cityscape-bkg-animated").height();
      $("#intro").height(Math.floor(header_content + cityscape_height));
      $(".cityscape-bkg-animated").css("margin-top", Math.floor(header_content - cityscape_height));
      $(".sky-bkg-animated").css("margin-top", header_height);
    }

    // add /remove owl carousel for insurance options

    if ($(window).width() < 1200) {
      $('.extended-options').removeClass("collapse");
      $('.entity-options').addClass("owl-carousel");
      $('.entity-options').owlCarousel({
        items: 3,
        responsiveClass: true,
        responsive: {
          0: {
            items: 2,
          },
          480: {
            items: 3,
          },
          568: {
            items: 4,
          }
        }
      })
    } else {
      $('.entity-options').removeClass("owl-carousel");
      $('.entity-options').owlCarousel('destroy');
      $('.extended-options').addClass("collapse");
    }

  });


  $(window).scroll(function () {

    // Back to top button
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }

    // Header scroll class
    if ($(this).scrollTop() > 50) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }

    if ($(window).scrollTop() > 50) {
      $('#header').addClass('header-scrolled');
    }


    // control the insurance filter sidebar view

    if ($(window).width() >= 992) {
      if (document.getElementById("filter-col")) {
        if (document.getElementById("filter-col"))
          var filterCol = document.getElementById("filter-col");
        var footerSection = document.getElementById("footer");
        var sticky = filterCol.offsetTop;
        var footerOffsetTop = footerSection.offsetTop;
        var calc = window.pageYOffset + parseInt($("#footer").height());
        //console.log("pageYOffset="+calc);
        //console.log("footerOffsetTop="+footerOffsetTop);
        if (window.pageYOffset + parseInt($("#footer").height() - parseInt($("#header").outerHeight())) >= footerOffsetTop) {
          $(".entities-container").removeClass("col-xl-9 col-lg-9 offset-3").addClass("col-xl-12 col-lg-12");
          $("#filter-col").removeClass("col-xl-3 col-lg-3").addClass("col-xl-12 col-lg-12 footer-fixed");
          $("#filter-col").css("width", $(".entities-container").outerWidth());
          $("#filter-col").css("top", parseInt($("#header").outerHeight()));

        } else {
          $(".entities-container").removeClass("col-xl-12 col-lg-12").addClass("col-xl-9 col-lg-9 offset-3");
          $("#filter-col").removeClass("col-xl-12 col-lg-12 footer-fixed").addClass("col-xl-3 col-lg-3");

          if (window.pageYOffset > sticky) {
            $("#filter-col").addClass('filter-col-sticky');
            $("#filter-col").css("width", parseInt($("#quotes_insurance_result .row-content").width()) / 4);
            $("#filter-col").css("top", parseInt($("#header").outerHeight()));
            $(".entities-container").addClass("offset-3");
          } else {
            $("#filter-col").removeClass('filter-col-sticky');
            $("#filter-col").css("width", "auto");
            $("#filter-col").css("top", 0);
            $(".entities-container").removeClass("offset-3");
          }
        }
      }
    }
  });


  $(window).on('load', function () {

    $("#apply_coupon").on("click", function (e) {
      e.preventDefault();
      $('#discount_coupon').validate();
    });

    $('#terms_and_condition_agree').click(function () {
      if ($(this).is(":checked")) {
        $("#proceed-to-payment").prop("disabled", false);
      } else
        $("#proceed-to-payment").prop("disabled", true);
    });

    $('.back-to-top').click(function () {
      $('html, body').animate({
        scrollTop: 0
      }, 1500, 'easeInOutExpo');
      return false;
    });

    // initiate header height based on the screen height
    if ($(window).width() > 992) {
      var height = $(window).height();
      var remainingHeightsForIcons = Math.floor((height - $(".intro-info").outerHeight() - ($(".swap-on-hover").height() * 2)) / 7);
      $(".swap-on-hover").css("margin-top", remainingHeightsForIcons);
      var margin_top = parseInt(height - ($(".cityscape-bkg-animated").height() * 2));
      var sky_bkg_animated_offset = $("#header").height() + Math.floor(height * 0.1);
      $("#intro").height(height - sky_bkg_animated_offset);
      $(".cityscape-bkg-animated").css("margin-top", margin_top - sky_bkg_animated_offset);
      $(".sky-bkg-animated").css("margin-top", sky_bkg_animated_offset);
    } else {
      var header_content = $(".header-content").height();
      var header_height = $("#header").outerHeight();
      var cityscape_height = $(".cityscape-bkg-animated").height();
      $("#intro").height(Math.floor(header_content + cityscape_height));
      $(".cityscape-bkg-animated").css("margin-top", Math.floor(header_content - cityscape_height));
      $(".sky-bkg-animated").css("margin-top", header_height);
    }


    // add /remove owl carousel for insurance options
    if ($(window).width() < 1200) {
      console.log("window widthsssss=" + $(window).width());
      $('.extended-options').removeClass("collapse");
      $('.entity-options').addClass("owl-carousel");
      $('.entity-options').owlCarousel({
        items: 3,
        responsiveClass: true,
        responsive: {
          0: {
            items: 2,
          },
          480: {
            items: 3,
          },
          568: {
            items: 4,
          }

        }
      })
    } else {
      $('.entity-options').removeClass("owl-carousel");
      $('.entity-options').owlCarousel('destroy');
      $('.extended-options').addClass("collapse");
    }

    // Preloader (if the #preloader div exists)
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }

    $(".twitter-carousel").owlCarousel({
      autoplay: true,
      dots: true,
      loop: true,
      items: 1
    });

    $(".blog-1-carousel").owlCarousel({
      autoplay: true,
      dots: false,
      loop: true,
      items: 1,
      nav: true,
      navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"]
    });

    $(".blog-2-carousel").owlCarousel({
      autoplay: true,
      dots: true,
      loop: true,
      autoplayTimeout: 7000,
      items: 1
    });

    new WOW().init();


    //comparison page, total insurance options/company  

    $(".add-to-value").on("click", function () {
      var user_data = $(this).attr("user-data");
      var chkbox_value = parseFloat($(this).val().replace(',', '.'));
      var btn_value = parseFloat($("#" + user_data).attr("data-value").replace(',', '.'));
      $("#" + user_data + " span.buy-now-btn-price").html((btn_value + chkbox_value).toFixed(3));
      $("#" + user_data).attr("data-value", (btn_value + chkbox_value).toFixed(3));
      $(this).val(-1 * chkbox_value);
      $("#" + user_data + " p").toggleClass("pulsate");
    });

    //checkout total summary
    $('.add-to-checkout-select').on("change", function () {
      var select_id = $(this).attr("id");
      var user_data = $(this).attr("user-data");
      var alias_hidden = $(this).attr("alias-hidden");
      var select_value = parseFloat($(this).val());
      var alias_hidden_value = $("#" + alias_hidden).val();

      if (isNaN(select_value))
        select_value = 0;

      if (alias_hidden_value == "")
        alias_hidden_value = 0;

      var btn_value = parseFloat($("." + user_data).attr("data-value").replace(',', ''));
      var final_amount = formatNumber(btn_value - alias_hidden_value + select_value);
      $("." + user_data + " span.checkout-amount-price-value").html(final_amount);
      $("." + user_data).attr("data-value", final_amount);
      $("#" + alias_hidden).val(select_value);
    });

    $('.add-to-checkout').on("click", function () {
      var user_data = $(this).attr("user-data");
      var chkbox_value = parseFloat($(this).val());
      var btn_value = parseFloat($("." + user_data).attr("data-value").replace(',', ''));
      var final_amount = formatNumber(btn_value + chkbox_value);
      $("." + user_data + " span.checkout-amount-price-value").html(final_amount);
      $("." + user_data).attr("data-value", final_amount);
      $(this).val(-1 * chkbox_value);
    });

  });

  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

})(jQuery);
