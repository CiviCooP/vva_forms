(function ($, Drupal) {
  Drupal.behaviors.checkJS = {
    attach: function (context, settings) {
      $('body').removeClass('no-js');
    }
  };

  Drupal.behaviors.floatLabels = {
    attach: function (context, settings) {
      $('.form-text').on('focus blur', function (e) {
        $(this).parents('.js-form-item').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
      }).trigger('blur');
      $('.form-email').on('focus blur', function (e) {
        $(this).parents('.js-form-item').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
      }).trigger('blur');
    }
  };

})(jQuery, Drupal);
