To launch the project follow below steps
    1. download repo in your local
    2. run `npm install`
    3. run `npm run start`
    4 access UI on `http://127.0.0.1:8080/`


About FormBuilder
    create Form control details in given format
    
    1. form control
        control = {
            type: 'valid html element tag name used inside form like input/textarea/button',
            label: 'Label of the form field',
            attributes: {
                'here add all valid attribute names': 'values '
                name: 'firstName',
                placeholder: 'Enter Name...',
                value: 'Manjiri',
                type: 'text'
            },
            validators: {
                'validator attribute' : {related configurations in below format},
                minlength: {value: 4, errorMessage: 'Min Length required is 4'},
                maxlength: {value: 15, errorMessage: 'Max Length required is 15'},
                required: {value: true, errorMessage: 'Field is required'},
                customValidator: {value: 'function reference that returns validator function that shoiuld be execited in context of event', errorMessage: 'Related error message'}

            },
            events: {
                'eventName': 'function references that should be executed when this event is fired',
                'click': onClick
            },
            styles: [all the class names as comma separated strings]
        };


    2. group for form controls - radio buttons
        const gender = {
            type: 'input',
            groupLabel: 'Gender',
            group: 'group',
            name: 'gender',
            attributes: {
                // here again all the valid attributes for tag that you want to add
                // or tags that html does not add by default
                name: 'gender',
                value: '',
                type: 'radio'
            },
            groupValues: [
                // here pass all the group elements configs for radio buttons
                {value:'female', label: 'Female', name: 'gender'},
                {value:'male', label: 'Male', name: 'gender'},
                {value:'doNotDisclose', label: 'Do Not Disclose', name: 'gender'}
            ],
        };

    3. Create  FormBuilder Config Object and add all the control in the formFields array in the order in which you want to see them on UI
        const config = {
            containerId: 'form-container',
            formName: 'Employee-form',
            formFields : [
                fname,
                lname,
                age,
                below18,
                birthdate,
                gender,
                aboutYou,
                submitButton
            ]
        }
    4. import FormBuilder and pass this config object to contrusctor function and check on the UI.

What it does

    1. generates form based on provided configuration objects
    2. You can pass custom classes to override existing styles using styles array 
    3. you can listen to events happening on the control outside the library
    4. access form state using formData key on formBuilder Object
    5. access all the controls using formBuilderObj.controls
    6. access form validtion or control validation states from outer components
    7. unique id generation for every form control
    8. manipulate states of form control from outside using setter getter function for value and it will trigger change event which will keep the formdata updated with values changed from outisde
    9. custom validators supported 
    10. Use error message box as info box like this - form.controls.rating.useInfoBox(true); 



What can be improved

    1. lot :P
    2. CSS: responsiveness, multiple controls on same line/decide the place/alignment of controls on UI, scoping css using shadow dom or dynamic id addition
    3. functionality : 
    
        1. Control public/private apis of FormBuilderObj
        2. adding more checks of native validators (I ahve added only few checks)
        3. dynamically hide/show controls based on user inputs
        4. Use interfaces/typescript 

