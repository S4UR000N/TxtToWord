class UploadFileComponent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
        <style>
            @font-face {
                font-family: 'Pacifico';
                src: url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
            }
            :host {
                display: block;
                padding: 20px;
                border: 2px solid #ccc;
                border-radius: 4px;
                background-color: #f9f9f9;
                font-family: 'Pacifico', cursive;
            }
        </style>
        <p>This is <slot></slot>!</p>
        `;
    }
}

customElements.define('upload-component', UploadFileComponent);