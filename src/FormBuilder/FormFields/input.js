import FormField from "./formField.js";

export const defaultEventhandlerForValidity = {
    'text' : ['click', 'change', 'keyup'],
    'number' : ['change','click'],
    'date' : ['change'],
    'checkbox' : ['change'],
    'radio' : ['change']
}
class Input extends FormField {
    
    constructor(config) {
        super(config);
        this.parseConfig();
        this.id = `${config.type}-${Input.counter++}`;
    }

    parseConfig() {
        this.setEvents(this.config.events);
        this.checkValidity();
    }

    setEvents(events) {
        console.log(events);
        if(this.config.events) {
            for(let key in events) {
                this.el.addEventListener(key, events[key]);
            }
        }
        const eventsToAdd = defaultEventhandlerForValidity[this.config.attributes.type] || ['change'];
        for(const eve of eventsToAdd ) {
            this.el.addEventListener(eve, () => this.checkValidity());
        }
    }

    useInfoBox(val=false) {
        if(val) {
            this.errorBox.classList.remove('error-message');
            this.errorBox.classList.add('info-message');
        } else {
            this.errorBox.classList.add('error-message');
            this.errorBox.classList.remove('info-message');
        }
    }

    checkValidity() {
        // console.log('checking validity of ', this.name, this.el.validity );
        if(!this.touched) return;

        if(this.errorBox.classList.contains('error-message')) {
            this.errorBox.innerHTML = '';
        }

        let msg = '';
        if(this.el.validity.tooLong) {
            msg += (this.config.validators?.maxlength?.errorMessage || '');
            msg += (msg.length ?'<br>': '');
        }
        if(this.el.validity.tooShort || (this.touched && (this.el.validity.valueMissing || !this.el.value.length))) {
            msg += (this.config.validators?.minlength?.errorMessage || '')
            msg += (msg.length ?'<br>': '');
        }
        if(this.touched && this.el.validity.valueMissing && this.el.hasAttribute('required')) {
            msg += (this.config.validators?.required?.errorMessage || '');
            msg += (msg.length ?'<br>': '');
        }
        if(!this.el.validity.valueMissing && this.el.validity.customError) {
            msg += (this.config.validators?.customValidator?.errorMessage || '');
            msg += (msg.length ?'<br>': '');
        }

        if(msg) {
            this.errorBox.innerHTML = msg || '';
        }

        this.config.validateFormFn(msg.length === 0);

    }
}

export default Input;
