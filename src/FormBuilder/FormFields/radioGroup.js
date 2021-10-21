import Input from "./input.js";

class RadioGroup {
    
    constructor(config) {
        this.config = config;
        this.elGroup = [];
        this.name = config.name
        this.parseConfig();
    }

    parseConfig() {
        this.setGroupLabel();
        if (this.groupLabel) this.elGroup = [];
        const groupValues = this.config.groupValues;
        for(let val of groupValues) {
            //modifying group configs to input configs
            const config = {...this.config, attributes: {...this.config.attributes, ...val, type: 'radio'}};
            delete config.groupValues;
            delete config.groupLabel;
            delete config.group;
            config.label = val.label;
            const inpEl = new Input(config);
            if(inpEl) {
                this.elGroup.push(inpEl);
                this.groupLabel.appendChild(inpEl.label);
                this.groupLabel.appendChild(inpEl.el);
            }
        }
    }

    setGroupLabel() {
        if(!this.config.groupLabel) return;
        this.groupLabel = document.createElement("label");
        this.groupLabel.classList.add('group-label');
        this.groupLabel.innerHTML = (this.config.groupLabel || '') + '<br>';
    }
}

export default RadioGroup;