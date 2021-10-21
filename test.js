import FormBuilder from './src/FormBuilder/main.js';


// defining all the external functions

const onSubmit = (event) => {
    event && event.preventDefault();
    console.log('onSubmit : ', form);
    alert('Form Data' + JSON.stringify(form.formData));
    form.reset();
}

const onKeyup = (e) => {
    console.log('we can fire input autocomplete api calls from here');
}

const updateSliderVal = (event) => {
    // const val = event.target.value;
    form.controls.rating.errorBox.innerText = ` Your selection - ${form.controls.rating.value}`;
    form.controls.rating.useInfoBox(true);
}
const ageChange = (e) => {
    console.log('setting form control values from outside based on other inputs');
    if(parseInt(form.controls.age.value) < 18) {
        form.controls.below18.value = true;
    } else {
        form.controls.below18.value = false;
    }
}
const nameConstraints = (e) => {
    return function () {
        if(this.el.value.toLowerCase().startsWith('m')) {
            return true;
        }
        return false;
    }
}

// defining the controls
const fname = {
    type: 'input',
    label: 'First Name',
    attributes: {
        name: 'firstName',
        placeholder: 'Enter Name...',
        value: '',
        type: 'text'
    },
    validators: {
        minlength: {value: 4, errorMessage: 'Min Length required is 4'},
        maxlength: {value: 15, errorMessage: 'Max Length required is 15'},
        required: {value: true, errorMessage: 'Field is required'},
        customValidator: {value: nameConstraints, errorMessage: 'Name should Start with M/m'}
    }
};
const lname = {
    type: 'input',
    label: 'Last Name',
    attributes: {
        name: 'lastName',
        placeholder: 'Last Name.. with custom style...',
        value: 'Manjiri',
    },
    events: {
        'keyup': onKeyup
    },
    styles : ['outerStyle']
};
const age = {
    type: 'input',
    label: 'Age',
    attributes: {
        name: 'age',
        placeholder: 'Enter Age...',
        value: '',
        type: 'number'
    },
    validators: {
        required: {value: true, errorMessage: 'Field is required'}
    },
    events: {
        change: ageChange
    }
};

const birthdate = {
    type: 'input',
    label: 'Birth Date',
    attributes: {
        name: 'birthdate',
        placeholder: 'Select Your Birthday...',
        value: '',
        type: 'date'
    }
};

const submitButton = {
    type: 'button',
    label: 'submit Form',
    attributes: {
        type: 'submit',
        disabled: true
    },
    events: {
        'click': onSubmit
    },
}

const aboutYou = {
    type: 'textarea',
    label: 'Write Few Words About Yourself',
    attributes: {
        name: 'aboutYou',
        placeholder: 'About You...',
        value: '',
        type: 'text',
        rows: "6",
        cols: "30"
    },
    validators: {
        minlength: {value: 20, errorMessage: 'Write few more words..!'},
        required: {value: true, errorMessage: 'Field is required'}
    },
    events: {
        'keyup': onKeyup
    },
};

const gender = {
    type: 'input',
    groupLabel: 'Gender',
    group: 'group',
    name: 'gender',
    attributes: {
        name: 'gender',
        value: '',
        type: 'radio'
    },
    groupValues: [
        {value:'female', label: 'Female', name: 'gender'},
        {value:'male', label: 'Male', name: 'gender'},
        {value:'doNotDisclose', label: 'Do Not Disclose', name: 'gender'}
    ],
};

const updatePassword = {
    type: 'input',
    label: 'Update Your Password',
    attributes: {
        name: 'updatePassword',
        value: 'SomePassword@!#$',
        type: 'password'
    },
    validators: {
        required: {value: true, errorMessage: 'Field is required'}
    },
    styles : ['password-field']
};

const below18 = {
    type: 'input',
    label: 'you are below 18',
    attributes: {
        name: 'below18',
        value: '',
        type: 'radio'
    },
    validators: {
        disabled: {value: 'disabled', errorMessage: 'Readonly Field'},
    },
    styles : ['custom-form-field']
};

const rating = {
    type: 'input',
    label: 'Rate your experience (0 to 10)',
    attributes: {
        name: 'rating',
        value: '5',
        type: 'range',
        min: 0,
        max: 10
    },
    events: {
        'change': updateSliderVal
    },
    styles : ['password-field']
};

// Building config Object
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
        updatePassword,
        rating,
        aboutYou,
        submitButton
    ],
}

let form = new FormBuilder(config);
console.log('Form is ready');

