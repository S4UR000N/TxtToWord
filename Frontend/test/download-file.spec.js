import { expect } from "chai";
import { DownloadFileComponent, downloadFileComponentDefinition } from "../src/components/download-file.comp";

describe('Upload File', () => {
    it('True equals true', () => {
        expect(true).to.equal(true);
    });
});

describe('DownloadFileComponent', () => {
    let element;
  
    beforeEach(() => {
        element = document.createElement('download-component');
        element.fileId = 'asd';
        document.body.appendChild(element);
    });
  
    afterEach(() => {
        document.body.removeChild(element);
    });
  
    it('renders correctly', () => {
        expect(element.isConnected).to.be.true;
    });

    it('search button enables correctly', () => {
        let searchInput = element.shadowRoot.getElementById('searchInput');
        let searchBtn = element.shadowRoot.getElementById('searchBtn');

        searchInput.value = generateString(24);
        searchInput.dispatchEvent(new Event('input'));
        expect(searchBtn.disabled).to.equal(true);
    });

    it('search button disables correctly', () => {
        let searchInput = element.shadowRoot.getElementById('searchInput');
        let searchBtn = element.shadowRoot.getElementById('searchBtn');

        searchInput.value = generateString(23);
        searchInput.dispatchEvent(new Event('input'));
        expect(searchBtn.disabled).to.be.true;
    });
});

function generateString(length) {
    return "a" * length;
}