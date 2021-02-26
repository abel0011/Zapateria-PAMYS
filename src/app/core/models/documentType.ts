import {DocumentType} from '../api/models/document-type';

export class documentTypeClass implements DocumentType {
    constructor(

        public idDocumentType?: number,
        public doctype?: string,
    ) {}
}
