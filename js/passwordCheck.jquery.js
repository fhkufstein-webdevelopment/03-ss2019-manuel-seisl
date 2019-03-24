function PasswordChecker(wrapperId, passwordInputFieldId, passwordSubmitButtonId) {

    //following are attributes which could be seen as "constants"
    this.successClass = "success";
    this.warningClass = "warning";
    this.errorClass = "error";

    this.minLength = 8; //this is what we defined and what we need to consider in our length check

    //this attributes are set with our constructor
    this.wrapperField = $(wrapperId); // anders als in JS version, $ legt ein jQuery Objekt fest
    this.passwordField = $(passwordInputFieldId); // anders als in JS version
    this.passwordSubmitButton = $(passwordSubmitButtonId); // anders als in JS version


    var that = this; //a trick because this is a keyword and means different things in a new context! Especially when you work with events or if you call functions outside your class "this" won't mean you!

    //now for the events which should fire:
    //if we leave the password field (focus is lost) - JavaScript Method "onblur" for an input field in our case the field this.passwordField
    //if we enter the password field (focus is set) - JavaScript Method "onfocus" for an input field - again in our case the field this.passwordField
    //if we are in the password field an enter text - JavaScript Method "onkeyup" or "onkeup" - again in our case the field this.passwordField
    //if we try to click the submit button - JavaScript Method "onclick" - in our case this.passwordSubmitButton

    this.passwordField.blur(function() { // anders als in JS version
        //the keyword "this" is always referring to its context.
        //onblur is an event which happens in "passwordField" -> so the keyword "this" would refer to the passwordField NOT to our class
        //therefore we previously saved "this" in a variable called "that"
        that.check();
    });

    this.passwordField.keyup(function() { // anders als in JS version
        that.check();
    });

    this.passwordField.focus(function() { // anders als in JS version
        that.check();
    });

    this.passwordSubmitButton.click(function() { // anders als in JS version
        that.check();
    });



    this.check = function() {
        //we can only check if every field which with given Id exists
        //one of them would be null if one Id wouldn't exist therefore following statement would fail
        if(this.wrapperField && this.passwordField && this.passwordSubmitButton) {
            var longEnough = this.checkForLength();
            var hasSpecialChars = this.checkForSpecialCharacters();

            //if it is long enough and has a special character - everything is fine
            if(longEnough && hasSpecialChars) {
                this.wrapperField.removeClass(this.warningClass + ' ' + this.errorClass).addClass(this.successClass); // anders als in JS version
                this.passwordSubmitButton.attr('disabled', false); // anders als in JS version, in jQuery gibt es vordefinierte Methoden wie z.B. attr, removeClass, addClass, etc.
            } else if(!hasSpecialChars && longEnough) { //if it is long enough but it has no special character set class warning
                this.wrapperField.removeClass(this.successClass + ' ' + this.errorClass).addClass(this.warningClass); // anders als in JS version
                this.passwordSubmitButton.attr('disabled', true); // anders als in JS version
            } else { //if it is not long enough set class error
                this.wrapperField.removeClass(this.warningClass + ' ' + this.successClass).addClass(this.errorClass); // anders als in JS version
                this.passwordSubmitButton.attr('disabled', true); // anders als in JS version
            }


        } else {
            //obviously a field is null (we weren't able to find it)
            console.error("A Id given to PasswordChecker doesn't exist!");

            //one could improve this by telling the Developer which Id(s) are null...
        }
    };

    //TODO 2 start
    /*
    This method should return true if the length of passwordField value is greater or equal to this.minLength
     */
    this.checkForLength = function() {
        //@todo
        //have a look at javascript string methods and properties
        if (this.passwordField.val().length >= this.minLength){
            return true;
        } else {
            return false; //this needs to be replaced!
        };
    };

    /*
    This method returns true if no special Character "!§$_.:,;" is found in this.password - otherwise false
     */
    this.checkForSpecialCharacters = function() {
        //@todo
        //have a look at javascript string methods and properties
        //you could probably "match" it somehow
        var regex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";

        if (this.passwordField.val().match(regex)){
            return true;
        } else {
            return false; //this needs to be replaced!
        };
    };
    //TODO 2 end
}


