class DownloadFileComponent extends HTMLElement {
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
                margin: 100px;
                border: 2px solid #ccc;
                border-radius: 4px;
                background-color: #f9f9f9;
                font-family: 'Pacifico', cursive;
            }
            .container {
                display: flex;
                flex-direction: row;
            }
            .content-center {
                justify-content: center;
            }
            .m-2 {
                margin: 8px;
            }
            .ms-0 {
                margin-left: 0px;
            }
        </style>
        <div class="container content-center">
            <form>
                <label>Search files by ID</label>
                <div class="container m-2 ms-0">
                    <input type="text" />
                    <button type="button" id="searchBtn">Search</button>
                </div>
                <div class="container">
                    <button type="button" id="downloadBtn">Download</button>
                    <button type="button" id="cancelBtn">Cancel</button>
                </div>
            </form>
        </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot.getElementById('searchBtn').addEventListener('click', (e) => this.handleSearch(e));
        this.shadowRoot.getElementById('downloadBtn').addEventListener('click', (e) => this.handleDownload(e));
        this.shadowRoot.getElementById('cancelBtn').addEventListener('click', (e) => this.handleCancel(e));
    }

    handleSearch(e) {
        console.log("Handle: Search");
        console.log(e);
    }

    handleDownload(e) {
        console.log("Handle: Download");
        console.log(e);
    }

    handleCancel(e) {
        console.log("Handle: Cancel");
        console.log(e);
    }
}

customElements.define('download-component', DownloadFileComponent);