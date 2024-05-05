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
            .button {
                background: #61c0bf;
                color: white;
                border: 2px solid #4fa8a7;
                border-radius: 4px;
                padding: 4px;
                font: inherit;
                cursor: pointer;
                outline: inherit;
            }
            @media (min-width:481px){
            :host {
                display: block;
                padding: 10px;
                border: 2px dashed #bbded6;
                border-radius: 4px;
                background-color: #f9f9f9;
                font-family: 'Pacifico', cursive;
                margin: 100px;
            }
            .container {
                border-radius: 8px;
                border: 2px solid #61c0bf;
                text-align: center;
                margin: 80px auto 30px;
                position: center;
                background: #e3e3e3; 
                padding: 20px;
                height: 100px;
                width: 120px;
                color:  #61c0bf;
            }
        }
        @media (max-width:481px) {
            .container {
                border-radius: 8px;
                border: 2px solid #61c0bf;
                text-align: center;
                margin: 80px auto 30px;
                position: center;
                background: #e3e3e3; 
                padding: 20px;
                height: 100px;
                width: 350px;
                color:  #61c0bf;
            }
        }
        </style>
        <div class='container'> 
            <p>Drag and drop your .txt file</p>
            <button class='button'>Upload a file</button>
        </div>
        `;
    }
}

customElements.define('upload-component', UploadFileComponent);