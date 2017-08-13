'use strict';


angular.
module('registrationView').
component('registrationView', {
    templateUrl: 'registration-view/registration-view.template.html',
    controller: [function registrationViewControler() {

        var self = this;
        //default stance
        self.name={};
        self.email={};
        self.pwd={};
        self.cpwd={};
        self.name.validResult=true;
        self.email.validResult=true;
        self.pwd.validResult=true;
        self.cpwd.validResult=true;


        //validation wen hit register
        self.sendData = function(){
            //regexp for fields
            var nameReg=/^[A-Za-z0-9]{6,16}$/i
                ,pwdReg=/^[A-Za-z0-9]{6,16}$/i
                ,emailReg=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            //validation name field
            if(!nameReg.test(self.name.text)){
                self.name.feedback='Use only English letters and numbers, length must be 6-16';
                self.name.validResult=false;
            } else {
                self.name.feedback='';
                self.name.validResult=true;
            };


            //validation password field
            if(self.pwd.text.length<6||!pwdReg.test(self.pwd.text)){
                self.pwd.feedback='Use only English letters and numbers, length must be 6-16';
                self.pwd.validResult=false;
            } else {
                self.pwd.feedback='';
                self.pwd.validResult=true;
            };
            //email field validation
            if(!emailReg.test(self.email.text)){
                self.email.feedback='Wrong e-mail adress';
                self.email.validResult=false;
            } else {
                self.email.feedback='';
                self.email.validResult=true;
            };

            //validation confirm password=password field
            if (self.pwd.text!=self.cpwd.text){
                self.cpwd.feedback='Password does not match';
                self.cpwd.validResult=false;
            } else {
                self.cpwd.feedback='';
                self.cpwd.validResult=true;
            }
        };

    }]
});
