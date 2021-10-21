
const cssModule = await import('./main.css', {
    assert: { type: 'css' }
});

import Input from './FormFields/input.js';
import Button from './FormFields/button.js';
import RadioGroup from './FormFields/radioGroup.js';
import deepClone from './helper/deepClone.js';

class FormBuilder {
    // #configCopy = null; // private vars

    constructor(config) {
        this.config = config;
        this.configCopy = deepClone(config);
        document.adoptedStyleSheets = [cssModule.default];
        this.initializeVars();
        this.parseConfig();
    }

    initializeVars() {
        this.formSubmitButton = null;
        this.valid = false;
        this.formData = {};
        this.controls = {};
        this.form = null;
    }

    parseConfig() {
        const elArr = [];
        for(let c of this.config.formFields) {
            c.validateFormFn = () => this.validateForm();

            let searchFor = c.type+'-'+c.attributes?.type;
            if(c.group === 'group') {
                searchFor += '-'+c.group;
            }
            switch(searchFor) {
                case 'input-text':
                case 'input-number':
                case 'input-email':
                case 'input-color':
                case 'input-date':
                case 'input-checkbox':
                case 'input-radio':
                case 'input':
                    const inpEl = new Input(c);
                    if(inpEl) {
                        elArr.push(inpEl.label);
                        elArr.push(inpEl.el);
                        elArr.push(inpEl.errorBox);

                        this.controls[inpEl.name] = inpEl;
                    }
                    break;
                case 'textarea-text':
                case 'textarea':
                    const txtEl = new Input(c);
                    if(txtEl) {
                        elArr.push(txtEl.label);
                        elArr.push(txtEl.el);
                        elArr.push(txtEl.errorBox);

                        this.controls[txtEl.name] = txtEl;

                    }
                    break;
                case 'input-radio-group':
                    const inpRadioGrpEl = new RadioGroup(c);

                    if(inpRadioGrpEl.groupLabel) {
                        elArr.push(inpRadioGrpEl.groupLabel);
                        this.controls[inpRadioGrpEl.name] = inpRadioGrpEl.elGroup;
                    }
                    break;
                case 'button-button':
                case 'button':
                    const btnEl = new Button(c);
                    if(btnEl) {
                        elArr.push(btnEl.el);
                    }
                    break;
                case 'button-submit':
                    const btnSubmitEl = new Button(c);
                    if(btnSubmitEl.formAction) {
                        this.formSubmitButton = btnSubmitEl;
                    }
                    if(btnSubmitEl) {
                        elArr.push(btnSubmitEl.el);
                    }
                    break;
                default:
                    break;
            }
        }

        this.addToDom(elArr);
    }

    createFormEl() {
        const form = document.createElement('form');
        form.classList.add('form');
        form.addEventListener('submit', () => this.validateForm());
        return form;
    }

    addToDom(elArr) {
        const form = this.createFormEl();
        for(let el of elArr) {
            form.append(el);
        }
        this.form = form;
        this.formContainer = document.getElementById(this.config.containerId);
        this.formContainer.appendChild(this.form);
        this.validateForm();
    }

    validateForm(anyError=true) {
        let status = anyError;
        let changed = false;
        for(let child of this.form.children) {
            if(child.validity) {
                changed = true;
                status = status && child.validity.valid;
            } else if(child.classList.contains('group-label')) {
                for(let ch of child.children) {
                    if(ch.validity) {
                        changed = true;
                        status = status && ch.validity.valid;
                    } 
                }
            }
        }

        if(changed) {
            this.valid = status;
        }
        console.log('is form valid : ',this.valid);
        this.updateFormData();
        if(this.valid) this.enableSubmitButton();
        else this.disableSubmitButton();
    }

    updateFormData() {
        console.log('updating form states ');
        for( let key in this.controls) {
            const control = this.controls[key];
            if(control.type && ['input', 'textarea'].includes(control.type)) {
                this.formData[control.name] = control.value;
            } else if(control instanceof Array) {
                for(let el of control) {
                    if(el.el.checked) {
                        this.formData[el.name] = el.el.value;
                    }
                }
            }
        }

    }

    enableSubmitButton() {
        this.formSubmitButton?.enable();
    }

    disableSubmitButton() {
        this.formSubmitButton?.disable();
    }

    reset () {
        this.config = deepClone(this.configCopy);
        this.form.remove();
        this.initializeVars();
        this.parseConfig();
    }
}
export default FormBuilder;