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
            p {
                font-size: 20px;
            }
            .btn {
                background: #61c0bf;
                color: white;
                border: 2px solid #4fa8a7;
                border-radius: 4px;
                margin-top: 24px;
                padding: 4px;
                font: inherit;
                cursor: pointer;
                outline: inherit;
            }

            #uploadBtn:disabled {
                background-color: #e3e3e3;
                border: 2px solid #bbded6;
            }
            
            @media (max-width:525px) {
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
            @media (min-width:526px){
                :host {
                    display: block;
                    padding: 10px;
                    border: 2px dashed #bbded6;
                    border-radius: 4px;
                    background-color: #f9f9f9;
                    font-family: 'Pacifico', cursive;
                    margin: auto 100px;
                }   
                .container {
                    border-radius: 8px;
                    border: 2px solid #61c0bf;
                    text-align: center;
                    margin: 80px auto 100px;
                    position: center;
                    background: #e3e3e3; 
                    padding: 20px;
                    height: 100px;
                    width: 140px;
                    color:  #61c0bf;
                }
            }
        </style>
        <div id="dropZone" class='container'> 
            <p>Drag and drop your .txt file</p>
            <button id="uploadBtn" class='btn' disabled>Upload a file</button>
        </div>
        `;
    }

    
    connectedCallback() {
        window.addEventListener("dragover", (e) => e.preventDefault());
        window.addEventListener("drop", (e) => e.preventDefault());
        this.shadowRoot.getElementById('dropZone').addEventListener('dragover', (e) => this.handleDragover(e));
        this.shadowRoot.getElementById('dropZone').addEventListener('drop', (e) => this.handleDrop(e));
    }

    handleDragover(e) {
        e.preventDefault();
        let dropZone = this.shadowRoot.getElementById('dropZone');
    }
    
    handleDrop(e) {
        e.preventDefault();
        this.shadowRoot.getElementById('uploadBtn').removeAttribute('disabled');

        console.log("File(s) dropped");

        if (e.dataTransfer.items) {
            [...e.dataTransfer.items].forEach((item, i) => {
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    console.log(`… file[${i}].name = ${file.name}`);
                }
            });
        }
        else {
            [...e.dataTransfer.files].forEach((file, i) => {
                console.log(`… file[${i}].name = ${file.name}`);
            });
        }
    }


}


customElements.define('upload-component', UploadFileComponent);