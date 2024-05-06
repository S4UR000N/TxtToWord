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
                display: flex;
                padding: 20px;
                border: 2px solid #bbded6;
                border-radius: 4px;
                background-color: #f9f9f9;
                font-family: 'Pacifico', cursive;
            }

            #searchBtn {
                background: #61c0bf;
                color: white;
                border: 2px solid #4fa8a7;
                border-radius: 4px;
                font: inherit;
                cursor: pointer;
                outline: inherit;
            }
            #del {
                background: #cc444b;
                border: 3px solid #cc444b;
            }
            #dwn {
                background: #31c48d;
                border: 3px solid #31c48d;
                
            }
            #dwn, #del {
                color: white;
                outline: none;
                font: inherit;
                border-radius: 3px;
            }

            input {
                border: 1px solid #4fa8a7;
                outline: none;
                height: 20px;
            }
            label {
                font-size: 20px;
            }
            .container {
                width: 100%;
            }
            .search-container {
                width: calc(100% - 100px);
                padding: 10px;
                margin: auto 50px;
            }
            .dwn-container {
                float: right;
                margin: 50px;
            }
           
            @media (max-width: 525px) {
                :host {
                    height: 200px;
                    width: 350px;
                    margin: 80px auto 10px;
                }
            }
            @media (min-width:526px) {
                .search-container {
                    overflow-x: hidden;
                }
                :host {
                    margin: 35px 100px;
                }
            }
           
            @media (max-width: 757px) {
                #searchBtn {
                    width: calc(100% - 10px);
                }
                input {
                    width: calc(100% - 15px);
                    margin-top: 10px;
                }
                .search-container {
                    text-align: center;
                }
            }
            @media (min-width: 757px) {
                .search {
                    float: right;
                }
            }
    </style>

    <div class="container">
        <form class="search-container">
            <label>Search file by ID</label>
            <div class="search">
                <input type="text" />
                <button type="button" id="searchBtn">Search</button>
            </div>
        </form>
        <div class="dwn-container">
            <button type="button" id="dwn">Download</button>
            <button type="button" id="del">Cancel</button>
        </div>
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