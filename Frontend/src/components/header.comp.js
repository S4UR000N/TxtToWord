class HeaderComponent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
        <style>
            .container {
                margin: 20px 20px 50px;
                font-family: Verdana;
                text-align: center;
                color: #61c0bf;
            }
        </style>
        <div class='container'> 
            <h1>TXT CONVERTER</h1>
        </div>
        `;
    }
}

customElements.define('header-component', HeaderComponent);