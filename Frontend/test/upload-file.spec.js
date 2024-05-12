import { expect } from "chai";
import { UploadFileComponent, uploadFileComponentDefinition } from "../src/components/upload-file.comp";


describe('Upload File', () => {
    it('True equals true', () => {
        expect(true).to.equal(true);
    });
});

describe('UploadFileComponent', () => {
    let element;
  
    beforeEach(() => {
        element = document.createElement('upload-component');
        document.body.appendChild(element);
    });
  
    afterEach(() => {
        document.body.removeChild(element);
    });
  
    it('renders correctly', () => {
        expect(element.isConnected).to.be.true;
    });

    it('contains elements', () => {

        expect(element.shadowRoot.children.length > 0);
    });

    it('contains file input element', () => {
        const fileInputElement = element.shadowRoot.getElementById('fileInput');
        expect(fileInputElement.isConnected).to.be.true;
    });
});