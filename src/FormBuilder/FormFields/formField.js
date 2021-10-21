class FormField {

    constructor(config) {
        this.config = config;
        this.tagName = config.type;
        this.type = config.group ? config.group : config.type;
        this.name = config.attributes.name;
        // javascript element node reference - el
        this.el = document.createElement(this.tagName);
        this.touched = false;
        this.parse();
    }

    get value() {
        if(this.el.type.toLowerCase() == 'radio') {
            return this.el.checked;
        }
        return this.el.value;
    }

    set value(val) {
        if(val != undefined) {
            console.log(val);
            if(this.el.type.toLowerCase() == 'radio') {
                if(val == true) this.el.checked = true;
                else this.el.checked = false;
            } else {
                this.el.value = val;
            }
            const e = new Event("change");
            this.el.dispatchEvent(e);
        }
    }

    parse() {
        this.setId();
        this.setLabel();
        this.addErrorBlock();
        this.addLocalEvents();

        if(this.config.attributes) this.setAttributes(this.config.attributes);
        if(this.config.validators) this.setValidators(this.config.validators);
        if(this.config.styles) this.setStyles(this.config.styles);
    }

    addLocalEvents() {
        this.onTouchFn = () => this.onTouch();
        this.el.addEventListener('click', this.onTouchFn);
    }
    
    onTouch() {
        this.touched = true;
        this.el.removeEventListener('click', this.onTouchFn);
    }

    setAttributes(attributes) {
        for(let key in attributes) {
            this.el.setAttribute(key, attributes[key]);
        }
    }

    setStyles(styles) {
        for(let className of styles) {
            this.el.classList.add(className);
        }
    }

    setValidators(validators) {
        for(let key in validators) {
            if(key === 'customValidator') {
                // validators[key].apply(this);
            } else {
                this.el.setAttribute(key, validators[key].value || '');
            }
        }
    }

    setId() {
        this.el.setAttribute('id', `${this.config.type}-${FormField.counter++}`);
    }

    setLabel() {
        if(!this.config.label) return;
        this.label = document.createElement("label");
        this.label.setAttribute("for",this.el.id);
        this.label.innerText = this.config.label + (this.config.validators?.required ? ' *': '');
    }

    addErrorBlock() {
        this.errorBox = document.createElement('div');
        this.errorBox.classList.add('error-message');
    }
}


FormField.counter = 0;

export default FormField;
