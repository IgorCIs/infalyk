export default class {
    constructor () {
        this.callers = document.querySelectorAll('[data-popup-target]');
        this.popups = new Array();

        if ( this.callers.length ) {
            this.init();
        }
    }

    init () {
        const { callers, popups } = this;
        const popupOverlay = new Overlay(document.querySelector(callers[0].dataset.popupTarget).parentNode);

        [...callers].forEach(caller => {
            //find elements
            const target = caller.dataset.popupTarget;
            let popup = document.querySelector(target);

            if ( popup ) {
                popup = new Popup(popup, popupOverlay, popups)
                //add popup to list
                popups.push(popup);

                //open handler on caller
                caller.addEventListener( 'click', () => {
                    event.preventDefault();
                    popup.open();
                })

                //close handler
                popupOverlay.overlay.addEventListener('click', () => popup.close())

                //close on espace
                document.addEventListener('keydown', e => { if (e.keyCode === 27) popup.close() })

                //close on x
                const closeButtons = document.querySelectorAll('[data-popup-close="all"]');

                closeButtons.forEach(button => 
                    button.addEventListener('click', () => popup.closeAllPopups())
                )
            } else {
                console.error(`not find popup ${caller.dataset.popupTarget} in popup-caller`, caller);
            }
        })
    }
}

class Overlay {
    constructor (caller) {
        this.overlay = document.createElement('div');
        this.overlay.className = 'popup-overlay';
        caller.appendChild(this.overlay);
    }

    close () {
        const { overlay } = this;

        overlay.classList.remove('popup-overlay--open');

        setTimeout(() => overlay.style.display = 'none', 500)

    }

    open () {
        const { overlay } = this;

        overlay.style.display = 'block';

        setTimeout(() => overlay.classList.add('popup-overlay--open'), 0)
    }

}

class Popup {
    constructor ( element, overlay, popups ) {
        this.element = element;
        this.overlay = overlay;
        this.popups = popups;
    }

    open () {
        const { element, overlay } = this;

        this.closeAllPopups(this);
        document.body.classList.add('popup-opened-body')
        
        element.style.display = 'block';
        
        setTimeout(() => element.classList.add('popup--open'), 0)

        overlay.open();
    }
    
    close (closeOverlay = true) {
        const { element, overlay } = this;
        
        element.classList.remove('popup--open');
        document.body.classList.remove('popup-opened-body')

        setTimeout(() => element.style.display = 'none', 500)

        if (closeOverlay) overlay.close();
    }

    closeAllPopups (exeptPopup) {
        const { popups } = this;

        //closing of all popups expept choosed
        [...popups].forEach(popup => {
            if (exeptPopup) {
                if (popup.element !== exeptPopup.element) popup.close(false)
            } else {
                popup.close()
            }
        })
    }

}