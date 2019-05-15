
const Trigger = () => { 
    [...document.querySelectorAll('[data-trigger-target]')]
        .forEach((trigger, target) => new TriggerItem(trigger));
}  

export class TriggerItem {
    constructor(element, target) {
        this.element = element;
        this.event = element.dataset.triggerEvent || 'click';

        this.target = element.dataset.triggerTarget;
        this.targetElements = document.querySelectorAll(`[data-trigger-self="${this.target}"]`) || target || [element];

        this.triggerTargets();
    }

    triggerTargets() {
        const { targetElements, event, element } = this;

        try {
            element.addEventListener(event, () => {
                [...targetElements].forEach(el => {
                    const actClass = el.dataset.triggerClass || 'active';
                    [...actClass.split(' ')].forEach(cl => 
                        el.classList.toggle(cl)
                    )
                })
            })
        } catch (e) {
            console.error("Wrong event at" + element);
        }
    }
}

export default Trigger