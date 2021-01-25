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
        side: 'top',
        distance: 20
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

        if (!container.is(e.target) &&
            container.has(e.target).length === 0) {
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
            var margin_top = parseInt(height - ($(".cityscape-bkg-animated").height() * 2.1));
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

        // control the insurance filter sidebar view

        if ($(window).width() >= 992) {
            if (document.getElementById("filter_col")) {
                var filterCol = document.getElementById("filter_col");
                var sticky = filterCol.offsetTop;
                if (window.pageYOffset > sticky) {
                    $("#filter_col").addClass('filter-col-sticky');
                    $("#filter_col").css("width", parseInt($("#quotes_insurance_result .row-content").width()) / 4);
                    $("#filter_col").css("top", parseInt($("#header").outerHeight()));
                    $(".entities-container").addClass("offset-3");
                } else {
                    $("#filter_col").removeClass('filter-col-sticky');
                    $("#filter_col").css("width", "auto");
                    $("#filter_col").css("top", 0);
                    $(".entities-container").removeClass("offset-3");
                }
            }
        } else {
            $("#filter_col").removeClass('filter-col-sticky');
            $("#filter_col").css("width", "auto");
            $("#filter_col").css("top", 0);
            $(".entities-container").removeClass("offset-3");
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

        // control the insurance filter sidebar view

        /*if ($(window).width() >= 992) {
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
        }*/

        if ($(window).width() >= 992) {
            if (document.getElementById("filter_col")) {
                var filterCol = document.getElementById("filter_col");
                var sticky = filterCol.offsetTop;
                if (window.pageYOffset > sticky) {
                    $("#filter_col").addClass('filter-col-sticky');
                    $("#filter_col").css("width", parseInt($("#quotes_insurance_result .row-content").width()) / 4);
                    $("#filter_col").css("top", parseInt($("#header").outerHeight()));
                    $(".entities-container").addClass("offset-3");
                } else {
                    $("#filter_col").removeClass('filter-col-sticky');
                    $("#filter_col").css("width", "auto");
                    $("#filter_col").css("top", 0);
                    $(".entities-container").removeClass("offset-3");
                }
            }
        }
    });

    $(window).on('load', function () {

        function formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }

        function dob_html_code(count) {
            var html_code = '<div class="instant_dob form-group mt-4 mb-4 clearfix">';

            if (count == 1)
                html_code += '<label>What is the date of birth?</label>';

            html_code += '<div class="input-group mb-2"><div class="input-group-prepend"><div class="input-group-text">Person ' + count + '</div></div><input type="date" class="form-control" name="dob_' + count + '" id="dob_' + count + '" min="1945-01-01" max="' + today + '" placeholder="Date of Birth" data-validation="required" data-validation-error-msg="Please enter the date of birth"></div></div>';
            return html_code;
        }

        function addDays(date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result.toISOString().split('T')[0]; // return the format yyyy-mm-dd
        }

        function addYears(date, years) {
            var result = new Date(date);
            result.setFullYear(result.getFullYear() + years);
            return result.toISOString().split('T')[0]; // return the format yyyy-mm-dd
        }

        function todayDate() {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            return yyyy + '-' + mm + '-' + dd;
        }

        var today = todayDate();

        if ($(window).scrollTop() > 50) {
            $('#header').addClass('header-scrolled');
        }
        $("#apply_coupon").on("click", function (e) {
            e.preventDefault();
            $('#discount_coupon').validate();
        });


        $('.agree_checkbox').click(function () {
            var pass = 1;
            $('.agree_checkbox').each(function (i, obj) {
                if (!$(this).is(":checked")) {
                    pass = 0;
                }
            });

            if (pass == 1) {
                $("#proceed_to_payment").prop("disabled", false);
            } else
                $("#proceed_to_payment").prop("disabled", true);
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
            var margin_top = parseInt(height - ($(".cityscape-bkg-animated").height() * 2.1));
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
        $(".life-results-benefits-carousel").owlCarousel({
            autoplay: true,
            dots: false,
            loop: true,
            autoplaySpeed: 2000,
            autoplayTimeout: 7000,
            items: 1,
            nav: true,
            navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"]
        });
        new WOW().init();
        //comparison page, total insurance options/company  
        $(".add-to-value").on("click", function () {
            var user_data = $(this).attr("user-data");
            var chkbox_value = parseFloat($(this).val().replace(',', ''));
            var options_total_amount = parseFloat($("#options_total_amount_" + user_data).val().replace(',', ''));

            var final_amount = formatNumber(options_total_amount + chkbox_value);
            $("#buy_now_btn_" + user_data + " span.buy-now-btn-price").html(final_amount);
            $("#options_total_amount_" + user_data).val(final_amount);

            $(this).val(-1 * chkbox_value);
            $("#buy_now_btn_" + user_data + " p").toggleClass("pulsate");
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
        // comparison results modal window
        $('#summary_popup').modal({
            keyboard: false
        });
        // comparison results filter process
        var filterArray = new Array();
        $('.filter-col').on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $(this).toggleClass("active");
        });
        var filters = $('.filter'),
            boxes = $('.entity-container');
        filters.on('click', function (e) {
            e.preventDefault();
            var $this = $(this);

            //filters.removeClass('active');
            //$this.addClass('active');

            var filterColor = $this.attr('data-filter');
            //alert(filterColor);

            if (filterColor == 'all') {
                boxes.removeClass('is-animated')
                    .fadeOut().promise().done(function () {
                        boxes.addClass('is-animated').fadeIn();
                    });
            } else {
                boxes.removeClass('is-animated')
                    .fadeOut().promise().done(function () {
                        boxes.filter('[data-category *= "' + filterColor + '"]')
                            .addClass('is-animated').fadeIn();
                    });
            }

        });
        $("#home_insurance_category_id").on("change", function () {
            switch ($(this).val()) {
                case "1": {
                    $("#home_content_id").prop("disabled", false);
                    $("#home_personal_belonging_id").prop("disabled", false);
                    $("#building_value").prop("disabled", true);
                    break;
                }
                case "2": {
                    $("#home_content_id").prop("disabled", false);
                    $("#home_personal_belonging_id").prop("disabled", false);
                    $("#building_value").prop("disabled", false);
                    break;
                }
                case "3": {
                    $("#home_content_id").prop("disabled", true);
                    $("#home_personal_belonging_id").prop("disabled", true);
                    $("#building_value").prop("disabled", false);
                    break;
                }
            }
        });

        if ($('#medical-results-table').length) {
            $('#medical-results-table').DataTable({
                columnDefs: [{
                    targets: 'no-sort',
                    "orderable": false,
        }],
                "order": [
          [1, "asc"]
        ],
                "searching": false,
                "paging": false,
                "bInfo": false

            });
            $('.dataTables_length').addClass('bs-select');
        }


        if ($('#property-results-table').length) {
            $('#property-results-table').DataTable({
                columnDefs: [{
                    targets: 'no-sort',
                    "orderable": false,
        }],
                "order": [
          [1, "asc"]
        ],
                "searching": false,
                "paging": false,
                "bInfo": false

            });
            $('.dataTables_length').addClass('bs-select');
        }
        //property details page checkout
        $(".add-to-property-final-price").on("click", function () {
            var user_data = $(this).attr("user-data");
            var data_used = $(this).attr("data-used");
            var chkbox_value = parseFloat($(this).val().replace(',', ''));
            if (data_used == "1") {
                chkbox_value = -1 * chkbox_value;
                $(this).attr("data-used", "0");
            } else
                $(this).attr("data-used", "1");
            var options_total_amount = parseFloat($("." + user_data).attr("data-value").replace(',', ''));
            var final_amount = formatNumber(options_total_amount + chkbox_value);
            $("." + user_data + " span").html(final_amount);
            $("." + user_data).attr("data-value", final_amount);
            $("#property_final_price").val(final_amount);
        });

        // generate DOB fields
        $("#number_of_people").on("change", function () {
            $(".instant_dob").remove();
            var number_of_people = $("#number_of_people").val();
            if (number_of_people != "") {
                var html_data = "";
                while (number_of_people >= 1) {
                    html_data = dob_html_code(number_of_people);
                    $(".number_of_people_div").after(html_data);
                    number_of_people--;
                }
            }

        });

        $("#dob").attr("max", today);
        $("#dob").attr("min", addYears(today, -70));
        $("#leave_start_date").attr("min", today);
        $("#return_date").attr("min", addDays(today, 1));

        $("#leave_start_date").on("change", function () {
            $("#return_date").attr("min", addDays($("#leave_start_date").val(), 1));
        });
        $("#submit_traveler_checkout_data_form").click(function () {
            var checkout_form = $("#travel_checkout_form");
            checkout_form.validate();

            if (checkout_form.isValid() == true) {
                var current_fieldset = $('#traveler_information');
                var next_fieldset = $('#policy_holder_information');
                $(this).attr("type", "submit");
                $(this).prop("value", "Checkout");
                next_fieldset.show();
                current_fieldset.hide();
            }
        });
        $("#medical_application_type_list").on("change", function () {
            if ($(this).val() != "")
                $(".medical-application-type-btn").attr("href", "medical-form-" + $(this).val() + ".html");
        });

        if (document.getElementById("countries")) {
            $("#countries").html('<select id="main_country_list" class="form-control" data-validation="required"></select>');
            $("#main_country_list").countrySelector({
                listMode: 1,
                codeMode: "alpha2"
            });
            $("#main_country_list").select2({
                theme: 'bootstrap4'
            });
        }

        var i = 1;
        $("#add-new-person").on("click", function () {
            i++;


            let template = `	
<div class="person_container" id="person_${i}" user-data="${i}">			
<div class="row"><div class="col"><h3>Member <span>${i}</span>:</h3> <a href="javascript:void(0)" class="remove-person" user-data="${i}">Remove <i class="fa fa-times-circle"></i></a></div></div>
	
	<div class="form-group mt-4 mb-4 clearfix">
		<label>What&rsquo;s their relationship to you?</label>
		<select name="members[${i}][relationship]" id="relationship_${i}" class="form-control select2-member-${i}"  data-validation="required" data-validation-error-msg="Please select the relationship with your member">
		<option value="">- Relationship -</option>
		<option value="1">Child</option>
		<option value="2">Spouse</option>
		<option value="4">Parent</option>
		</select>
	</div>

	<div class="form-group mt-4 mb-4 clearfix">
		<label>Please select member&rsquo;s date of birth?</label>
		<input type="date" class="form-control dob-member" name="members[${i}][dob]" id="dob_${i}" placeholder="YYYY-MM-DD" data-validation="required" data-validation-error-msg="Please enter your member date of birth">
	</div>

	<div class="form-group mt-4 mb-4 clearfix">
		<label>What&rsquo;s their gender?</label><br>
		<select name="members[${i}][gender]" id="gender_${i}" class="form-control select2-member-${i}" data-validation="required" data-validation-error-msg="Please select your member gender">
		<option value="">---</option>
		<option value="1">Male</option>
		<option value="2">Female (Married)</option>
		<option value="3">Female (Single)</option>
		</select>
	</div>
	
	<div class="form-group mt-4 mb-4 clearfix">
		<label>What&rsquo;s their nationality?</label><br>
		<select name="members[${i}][nationality]" id="nationality_${i}" class="form-control select2-member-${i} nationalities" data-validation="required"></select>
	</div>
	
	
	 <div class="form-group mt-4 mb-4 clearfix">Is their salary more than AED 4,000 per month?
	  <div class="button-wrap">
		<input class="hidden radio-label no_val" type="radio" name="members[${i}][salary_over_4k]" id="salary_over_4k_no_${i}" value="no" checked="checked"/>
		<label class="button-label salary_over_4k_no_${i}" for="salary_over_4k_no_${i}">
		<p>No</p>
		</label>
		<input class="hidden radio-label yes_val" type="radio" name="members[${i}][salary_over_4k]" id="salary_over_4k_yes_${i}" value="yes"/>
		<label class="button-label salary_over_4k_yes_${i}" for="salary_over_4k_yes_${i}">
		<p>Yes</p>
		</label>
	  </div>
	</div>
			
			
			
	
	</div>`;


            $("#people-container").append(template);
            $(".select2-member-" + i).select2({
                theme: 'bootstrap4'
            });
            $("#dob_" + i).attr("max", today);
            $("#nationality_" + i).countrySelector({
                listMode: 1,
                codeMode: "alpha2"
            });
        });


        $("#dob_1").attr("max", today);

        if (document.getElementById("nationality_1")) {
            $("#nationality_1").countrySelector({
                listMode: 1,
                codeMode: "alpha2"
            });
        }


        $(document).on("click", "div.person_container .remove-person", function () {
            var next_member_data_array = new Array();
            var array_index = 0;
            var person_id = $(this).attr("user-data");
            var next_person_id = parseInt(person_id) + 1;
            $("#person_" + person_id).remove();

            while (next_person_id <= i) {
                $("div.person_container#person_" + next_person_id + " h3 span").html(person_id);

                $("div.person_container #relationship_" + next_person_id).attr("name", "members[" + person_id + "][relationship]");
                $("div.person_container #relationship_" + next_person_id).attr("id", "relationship_" + person_id);

                $("div.person_container #dob_" + next_person_id).attr("name", "members[" + person_id + "][dob]");
                $("div.person_container #dob_" + next_person_id).attr("id", "dob_" + person_id);

                $("div.person_container #gender_" + next_person_id).attr("name", "members[" + person_id + "][gender]");
                $("div.person_container #gender_" + next_person_id).attr("id", "gender_" + person_id);

                $("div.person_container #nationality_" + next_person_id).attr("name", "members[" + person_id + "][nationality]");
                $("div.person_container #nationality_" + next_person_id).attr("id", "nationality_" + person_id);

                $("div.person_container #salary_over_4k_no_" + next_person_id).attr("name", "members[" + person_id + "][salary_over_4k]");
                $("div.person_container #salary_over_4k_no_" + next_person_id).attr("id", "salary_over_4k_no_" + person_id);

                $("div.person_container #salary_over_4k_yes_" + next_person_id).attr("name", "members[" + person_id + "][salary_over_4k]");
                $("div.person_container #salary_over_4k_yes_" + next_person_id).attr("id", "salary_over_4k_yes_" + person_id);

                $("div.person_container label.salary_over_4k_yes_" + next_person_id).attr("for", "salary_over_4k_yes_" + person_id);
                $("div.person_container label.salary_over_4k_yes_" + next_person_id).addClass("salary_over_4k_yes_" + person_id);
                $("div.person_container label.salary_over_4k_yes_" + next_person_id).removeClass("salary_over_4k_yes_" + next_person_id);

                $("div.person_container label.salary_over_4k_no_" + next_person_id).attr("for", "salary_over_4k_no_" + person_id);
                $("div.person_container label.salary_over_4k_no_" + next_person_id).addClass("salary_over_4k_no_" + person_id);
                $("div.person_container label.salary_over_4k_no_" + next_person_id).removeClass("salary_over_4k_no_" + next_person_id);

                $("div.person_container#person_" + next_person_id + " .remove-person").attr("user-data", person_id);
                $("div.person_container#person_" + next_person_id).attr("user-data", person_id);
                $("div.person_container#person_" + next_person_id).attr("id", "person_" + person_id);

                person_id++;
                next_person_id = parseInt(person_id) + 1;

            }
            i--;

            $('.person_container').each(function (i, obj) {

                var person_div_id = $(this).attr("user-data");

            });
        });

    });

})(jQuery);
