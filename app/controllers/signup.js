import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import { action } from '@ember/object';
import { set } from '@ember/object';
import $ from 'jquery';

export default class SignupController extends Controller {

    isEmailValid= false;
    isPassValid= false;

    @action
    accessToSignUp(){
        self = this;
        
        if($('#emailValidation').html() != null && $('#passwordValidation').html() != null)
        {
            var email = $('#email').val();
            var pass = $('#pass').val();

            $.ajax({
                type:'POST',
                data: {email: email, pass: pass},
                url: "http://localhost:8081/ChatApplication/SignUpAccess",
                success: function(result)
                {
                    if(result.status == "declined"){
                        $('#wrong-username-or-password').html("Error! Invalid Email or Password").css({'color':'red'});
                    }
                    else{
                        self.transitionToRoute('index-page');
                    }
                },
            });
        }
        else
        {    }
    }

    @action
    checkConfirmPassword(){
        var password1 = $('#pass').val();
        var confirm_assword = $('#confirm_pass').val();
        if(password1.localeCompare(confirm_assword))
        {
            $('#confirmPassword').html("Mismatch Password..").css({'color':'red'});
        }
        else
        {
            $('#confirmPassword').html("");
        }
    }

    @action
    checkEmailValidation(){
        var email = $('#email').val();
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
        this.isEmailValid = email.match(regex);
        if(!this.isEmailValid){
            $('#emailValidation').html("Enter valid email").css({'color':'red'});
        }
        else{
            $('#emailValidation').html("");
        }
    };

    @action
    checkPasswordValidation(){
        var password = $('#pass').val();
        var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        this.isPassValid = password.match(regex);
        if(!this.isPassValid){
            $('#passwordValidation').html("password must contains [6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter]").css({"color":"red"});            
        }
        else{
            $('#passwordValidation').html("");
        }
    }
}
