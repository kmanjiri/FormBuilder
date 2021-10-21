import FormField from "./formField.js";

class Button extends FormField {
    constructor(config, form) {
        super(config);
        this.parseConfig();
    }

    parseConfig() {
        if(this.config.events) this.setEvents(this.config.events, this.config.attributes.type);
        this.addLabel();
    }

    setEvents(events, type) {
        for(let key in events) {
            if(type == 'submit') {
                this.formAction = true;
                this.el.addEventListener(key, events[key]);
            } else {
                this.el.addEventListener(key, events[key]);
            }
        }
    }

    enable() {
        this.el.disabled = false;
    }

    disable() {
        this.el.disabled = true;
    }

    addLabel() {
        this.el.innerText = this.config.label;
    }
}

export default Button;