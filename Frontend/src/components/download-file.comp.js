class DownloadFileComponent extends HTMLElement {
    constructor() {
        fileId = '';
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
                cursor: pointer;
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
                width: calc(100% - 80px);
                margin: 50px;
            }
            .buttonsContainer {
                float: right;
            }
            .hidden {
                display: none;
            }

            #searchBtn:disabled {
                background-color: #e3e3e3;
                border: 2px solid #bbded6;
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
            <form id="searchForm" class="search-container">
                <label>Search file by ID</label>
                <div class="search">
                    <input type="text" id="searchInput" />
                    <button type="button" id="searchBtn" disabled>Search</button>
                </div>
            </form>
            <div id="dwn-container" class="dwn-container hidden">
                <span id="fileName">the file name.docx</span>
                <div class="buttonsContainer">
                    <a id="dwnLink" download><button type="button" id="dwn">Download</button></a>
                    <button type="button" id="del">Delete</button>
                </div>
            </div>
        </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot.getElementById('searchInput').addEventListener('input', (e) => this.handleSearchInput(e));
        this.shadowRoot.getElementById('searchForm').addEventListener('keypress', (e) => (e.code == 'Enter') && this.handleSearch(e));
        this.shadowRoot.getElementById('searchBtn').addEventListener('click', (e) => this.handleSearch(e));
        this.shadowRoot.getElementById('del').addEventListener('click', (e) => this.handleDelete(e));
    }

    handleSearchInput(e) {
        let searchInput = this.shadowRoot.getElementById('searchInput');
        let searchBtn = this.shadowRoot.getElementById('searchBtn');
        if (searchInput.value.length == 24) {
            searchBtn.removeAttribute('disabled');
        }
        else {
            searchBtn.setAttribute('disabled', true);
        }
    }
    
    handleSearch(e = false) {
        if (e) {
            e.preventDefault();
        }
        if (!this.fileId || this.fileId != this.shadowRoot.getElementById('searchInput').value) {
           fetch('http://localhost:3000/api/search/' + this.shadowRoot.getElementById('searchInput').value)
            .then(res => {
                if (res.ok) {
                    res.json().then(fileModel => {
                        this.fileId = fileModel._id;

                        this.shadowRoot.getElementById('fileName').innerText = fileModel.name;
                        this.shadowRoot.getElementById('dwnLink').setAttribute('href', `http://localhost:3000/api/download/${this.fileId}`)
                        let dwnContainer = this.shadowRoot.getElementById('dwn-container');
                        dwnContainer.classList.contains('hidden') && dwnContainer.classList.toggle('hidden');
                    });
                }
                else if (res.status == 404) {
                    alert('File not found.');
                }
                else {
                    alert('Search failed. Please try again.');
                }
            })
            .catch(_ => {
                alert('Search failed. Please try again.');
            }); 
        }
        else {
            this.shadowRoot.getElementById('searchBtn').setAttribute('disabled', true);
        }
        
    }

    handleDelete(e) {
        fetch('http://localhost:3000/api/delete/' + this.fileId, {method: 'DELETE'})
        .then(res => {
            if (res.ok) {
                this.shadowRoot.getElementById('dwn-container').classList.toggle('hidden');
                alert('Delete Successful.');
            }
            else {
                alert('Delete failed. Please try again.')
            }
        })
        .catch(_ => {
            alert('Delete failed. Please try again.');
        });
    }
}

customElements.define('download-component', DownloadFileComponent);