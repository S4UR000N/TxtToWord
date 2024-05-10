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
                display: block;
                background: #61c0bf;
                color: white;
                border: 2px solid #4fa8a7;
                border-radius: 4px;
                margin-top: 44px;
                padding: 4px;
                font: inherit;
                cursor: pointer;
                outline: inherit;
            }

            #fileInput:disabled {
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
                .btn {
                    display: inline-block;
                    margin-top: 15px;
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
            .hidden {
                display: none;
            }
        </style>
        <div id="dropZone" class='container'> 
            <p>Drag and drop your .txt file</p>
            <label class='btn' for="fileInput">Upload a file</label>
            <input type="file" id="fileInput" accept="text/plain" class="hidden" />
        </div>
        `;
    }

    connectedCallback() {
        window.addEventListener('dragover', (e) => e.preventDefault());
        window.addEventListener('drop', (e) => e.preventDefault());
        this.shadowRoot.host.addEventListener('dragover', (e) => this.handleDragover(e));
        this.shadowRoot.host.addEventListener('drop', (e) => this.handleDrop(e));
        this.shadowRoot.getElementById('fileInput').addEventListener('change', (e) => this.handleUpload(e.target.files[0]))
    }

    handleDragover(e) {
        e.preventDefault();
    }
    
    handleDrop(e) {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            if (files.length > 1) {
                alert('Please select only one text file');
            }
            else {
                this.handleUpload(files[0]);
            }
        }
    }

    handleUpload(file) {
        if (file.type !== 'text/plain') {
            alert('The file must be text/plain');
        }
        else if (file.size > 5242880) {
            alert('The file must be 5MB or less');
        }
        else {
            const formData = new FormData();
            formData.append('file', file);
            fetch('http://localhost:3000/api/upload', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json().then(data => {
                console.log(data);
                let downloadComponent = document.querySelector('download-component');
                downloadComponent.shadowRoot.getElementById('searchInput').value = data.fileId;
                downloadComponent.handleSearch();

                alert(`${data.message}`);
            }))
            .catch(_ => {
                alert('Upload failed. Please try again.');
            });
        }
    }
}

customElements.define('upload-component', UploadFileComponent);