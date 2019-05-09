
const Trigger = () => {
    const triggers = document.querySelectorAll('[data-trigger-target]');
    
    [...triggers].forEach((trigger, target) => new TriggerItem(trigger));

    const wpNavs = document.querySelectorAll('.page_item_has_children')
    const wpNavsTragets = document.querySelectorAll('.page_item_has_children .children');
    const wpNavsTitleLinks = document.querySelectorAll('.page_item_has_children>a');

    [...wpNavs].forEach((item, i) => {
        new TriggerItem(item, wpNavsTragets[i])
        wpNavsTitleLinks[i].addEventListener('click', e => e.preventDefault())
    })
}  

class TriggerItem {
    constructor(element, target) {
        this.element = element;
        this.event = element.dataset.triggerEvent || 'click';

        this.target = element.dataset.triggerTarget;
        this.targetElements = document.querySelectorAll(`[data-trigger-self="${this.target}"]`) || target;

        if (!this.target) this.targetElements = [element];

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