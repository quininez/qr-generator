'use strict';

class LoginController {
  constructor(Auth, $state) {
    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$state = $state;
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
          // Logged in, redirect to qr code generator
          this.$state.go('qrcode');
        })
        .catch(err => {
          this.errors.other = err.message;
        });
    }
  }
}

angular.module('qrGenApp')
  .controller('LoginController', LoginController);
