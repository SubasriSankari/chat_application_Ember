import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import {set } from '@ember/object';
import $ from 'jquery';


export default class IndexPageController extends Controller {
    @service('session') userSession;
    @service('username') userName;
    @service store;

    isEmailValid = false;
    isPassValid = false;

    @action
    checkIsThisCorrectCredentials() {

        self = this;

        if ($('#emailValidation').html() != null && $('#passwordValidation').html() != null) {
            var email = $('#email').val();
            var pass = $('#pass').val();
            $.ajax({
                type: 'POST',
                data: { email: email, pass: pass },
                url: "http://localhost:8081/ChatApplication/PasswordValidationPage",
                success: function(result) {
                    if (result.status == "true") {
                        self.userSession.setSession(result.session);
                        self.userName.setName(email);
                        self.transitionToRoute('choose-chat-room');
                    } else {
                        $('#wrong-username-or-password').html("Error! Invalid Email or Password").css({ 'color': 'red' });
                    }
                },
            });
        } else {}
    };

    @action
    checkEmailValidation() {
        var email = $('#email').val();
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        this.isEmailValid = email.match(regex);
        if (!this.isEmailValid) {
            $('#emailValidation').html("Enter valid email").css({ 'color': 'red' });
        } else {
            $('#emailValidation').html("");
        }
    };

    @action
    checkPasswordValidation() {
        var password = $('#pass').val();
        var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        this.isPassValid = password.match(regex);
        if (!this.isPassValid) {
            $('#passwordValidation').html("password must contains [6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter]").css({ "color": "red" });
        } else {
            $('#passwordValidation').html("");
        }
    }
}