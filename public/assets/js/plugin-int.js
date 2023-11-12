(function ($) {
    "use strict";

    /* --------------------------------------------------------
        1. Progress circle
    -------------------------------------------------------- */
    $(".progress-bar-1").loading();
    $('input').on('click', function () {
        $(".progress-bar-1").loading();
    });

    /* --------------------------------------------------------
        2. Login
    -------------------------------------------------------- */
    $('.input100').each(function () {
        $(this).on('blur', function () {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
            } else {
                $(this).removeClass('has-val');
            }
        })
    })
    var input = $('.validate-input .input100');
    $('.validate-form').on('submit', function () {
        var check = true;
        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }
        return check;
    });
    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        } else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
    }


    /* --------------------------------------------------------
        3. seleect option hide and block
    -------------------------------------------------------- */


    $('#payement-mode').change(function () {
        var select = $(this).find(':selected').val();
        $(".hide").hide();
        $('#' + select).show();

    }).change();

    /* --------------------------------------------------------
        3. profile pic uploader
    -------------------------------------------------------- */
    // https://codepen.io/chiraggoyal777/pen/xxEowxq


    $(document).on("change", ".uploadProfileInput", function () {
        var triggerInput = this;
        var currentImg = $(this).closest(".pic-holder").find(".pic").attr("src");
        var holder = $(this).closest(".pic-holder");
        var wrapper = $(this).closest(".profile-pic-wrapper");
        $(wrapper).find('[role="alert"]').remove();
        triggerInput.blur();
        var files = !!this.files ? this.files : [];
        if (!files.length || !window.FileReader) {
          return;
        }
        if (/^image/.test(files[0].type)) {
          // only image file
          var reader = new FileReader(); // instance of the FileReader
          reader.readAsDataURL(files[0]); // read the local file
      
          reader.onloadend = function () {
            $(holder).addClass("uploadInProgress");
            $(holder).find(".pic").attr("src", this.result);
            $(holder).append(
              '<div class="upload-loader"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></div>'
            );
      
            // Dummy timeout; call API or AJAX below
            setTimeout(() => {
              $(holder).removeClass("uploadInProgress");
              $(holder).find(".upload-loader").remove();
              // If upload successful
              if (Math.random() < 0.9) {
                $(wrapper).append(
                  '<div class="snackbar show" role="alert"><i class="fa fa-check-circle text-success"></i> Profile image updated successfully</div>'
                );
      
                // Clear input after upload
                $(triggerInput).val("");
      
                setTimeout(() => {
                  $(wrapper).find('[role="alert"]').remove();
                }, 3000);
              } else {
                $(holder).find(".pic").attr("src", currentImg);
                $(wrapper).append(
                  '<div class="snackbar show" role="alert"><i class="fa fa-times-circle text-danger"></i> There is an error while uploading! Please try again later.</div>'
                );
      
                // Clear input after upload
                $(triggerInput).val("");
                setTimeout(() => {
                  $(wrapper).find('[role="alert"]').remove();
                }, 3000);
              }
            }, 1500);
          };
        } else {
          $(wrapper).append(
            '<div class="alert alert-danger d-inline-block p-2 small" role="alert">Please choose the valid image.</div>'
          );
          setTimeout(() => {
            $(wrapper).find('role="alert"').remove();
          }, 3000);
        }
      });
      


      
  /* --------------------------------------------------------
        4. telephone code
    -------------------------------------------------------- */
  

})(jQuery);