(function () {
  'use strict';


  function animalizator () {
    var animal,
        kindAnimal,
        el1,
        el2,
        el3,
        animalchoice,
        minHeight,
        maxHeight,
        minWeight,
        maxWeight,
        photoSrc,
        flagAnimal = false;
    $('.js-choice').click(function (e) {
      $('.js-choice').each(function (i, elem) {
        if (elem.dataset.choice === e.target.dataset.choice) {
          if ($('.js-choice').hasClass("active")) {
            $('.js-choice').removeClass('active');
          }

          $(elem).toggleClass('active');
          animal = elem.dataset.choice;
        }

        $.getJSON("animal.json", function (data) {
          $.each(data.animal, function (key, val) {
            if (val.name == animal) {
              animalchoice = val;
            }
          });
        });
      });
    }); //first choice

    $('.js-choice-btn').click(function (e) {
      if ($('.js-choice').hasClass("active")) {
        e.preventDefault();
        minHeight = animalchoice.height.split("-")[0], maxHeight = animalchoice.height.split("-")[1], minWeight = animalchoice.weight.split("-")[0], maxWeight = animalchoice.weight.split("-")[1];
        el1 = $("input[name='height']");
        el2 = $("input[name='weight']");
        el3 = $("input[name='name']");
        el1.after("<span class=\"text-info for-login\">\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043E\u0442 ".concat(minHeight, " \u0434\u043E ").concat(maxHeight, "</span>"));
        el2.after("<span class=\"text-info for-login\">\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043E\u0442 ".concat(minWeight, " \u0434\u043E ").concat(maxWeight, "</span>"));
        el3.after('<span class="text-info for-login">Введите имя, от 3 до 15 символов</span>'); //display the picture with the selected image

        $('.js-card__icon').each(function (i, elem) {
          if (elem.dataset.choice === animal) {
            $(elem).addClass('active');
          }
        });
        $('.js-option').fadeOut();
        setTimeout(function () {
          $('.js-animal').fadeIn();
        }, 500);
      } else {
        return;
      }
    }); //read parameters

    $('.js-read-parameters').click(function (e) {
      validateForm();

      if (flagAnimal) {
        e.preventDefault();
        var heightAnimal = $("input[name='height']").val();
        var weightAnimal = $("input[name='weight']").val();
        var nameAnimal = $("input[name='name']").val();
        $(".js-animal-height").html(heightAnimal);
        $(".js-animal-weight").html(weightAnimal);
        $(".js-animal-kind").html(kindAnimal);
        $('.js-photo-name ').html(nameAnimal);
        $('.js-card-info').fadeIn();
      }
    });

    function validateForm() {
      $(".text-error").remove(); // Проверка логина

      $(".text-info").remove();
      checkWeight();
      var el1check = el1.val() >= +minHeight && el1.val() <= +maxHeight;
      var el2check = el2.val() >= +minWeight && el2.val() <= +maxWeight;
      var pattern = /^([А-Я]{1}[а-яё]{2,15}|[A-Z]{1}[a-z]{2,15})$/;

      if (!el1check) {
        el1.after("<span class=\"text-error for-login\">\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043E\u0442 ".concat(minHeight, " \u0434\u043E ").concat(maxHeight, "</span>"));
      } else if (!el2check && el1.val() == "") {
        checkWeight();
        el2.after("<span class=\"text-error for-login\">\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043E\u0442 ".concat(minWeight, " \u0434\u043E ").concat(maxWeight, "</span>"));
      } else if (!el2check) {
        checkWeight();
        el2.after("<span class=\"text-error for-login\">\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043E\u0442 ".concat(minWeight, " \u0434\u043E ").concat(maxWeight, ",<br> \u0435\u0441\u043B\u0438 \u0432\u0430\u0441 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0443\u0435\u0442 \u0434\u0440\u0443\u0433\u043E\u0439 \u0432\u0435\u0441, \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u0435 \u0440\u043E\u0441\u0442</span>"));
      } else if (!pattern.test(el3.val()) || el3.val().length < 3 || el3.val().length > 15) {
        el3.after('<span class="text-error for-login">Введите имя, от 3 до 15 символов, содержит только буквы, первая заглавная</span>');
      } else {
        flagAnimal = true;
      }

      function checkWeight() {
        $.each(animalchoice.pet, function (index, value) {
          var el_1check = el1.val() >= value.height.split("-")[0] && el1.val() <= value.height.split("-")[1];

          if (el_1check) {
            minWeight = +value.weight.split("-")[0];
            maxWeight = +value.weight.split("-")[1];
            kindAnimal = value.kind;
          }
        });
      }

      $('.js-card-btn').click(function (e) {
        e.preventDefault();
        $('.js-photo-img').each(function (i, elem) {
          if (kindAnimal == elem.dataset.photo) {
            if ($('.js-photo-img').hasClass("active")) {
              $('.js-photo-img').removeClass('active');
            }

            $(elem).toggleClass('active');
            photoSrc = $(elem).attr('src');
            $(".js-photo-btn").attr("href", photoSrc)
          }
        });
        $('.js-animal').fadeOut();
        setTimeout(function () {
          $('.js-photo').fadeIn();
        }, 500);
      });
    }
    $('.js-popup-open').click(function () {
      setTimeout(function () {
        $('.popup-fade').fadeIn("fast");
      }, 100);
      return false;
    });
    $('.js-popup-close').click(function () {
      $('.popup-fade').fadeOut();
      return false;
    });
    $(document).keydown(function (e) {
      if (e.keyCode === 27) {
        e.stopPropagation();
        $('.popup-fade').fadeOut();
      }
    });
    $('.popup-fade').click(function (e) {
      $(this).fadeOut();
    });
    $('.js-home').click(function (e) {
      e.preventDefault();
      $('.js-home-close').fadeOut();
      $('.js-card__icon').removeClass('active');
      $(".text-error").remove();
      $(".text-info").remove();
      $('input').val('');
      flagAnimal = false;
      if ($('.js-choice').hasClass("active")) {
        $('.js-choice').removeClass("active");
      }
      setTimeout(function () {
        $('.js-option').fadeIn();
      }, 500);
    });
  }


    animalizator();
  

  

}());
