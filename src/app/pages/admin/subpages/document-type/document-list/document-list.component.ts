import swal from 'sweetalert2';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {DocumentTypeControllerService} from 'src/app/core/api/services';
import {DocumentType} from './../../../../../core/api/models/document-type';

@Component({
    selector: 'app-document-list',
    templateUrl: './document-list.component.html',
    styleUrls: ['./document-list.component.sass'],
})
export class DocumentListComponent implements OnInit {
    constructor(private service: DocumentTypeControllerService) {}

    listDocumentType: DocumentType[] = [];
    dataSource: any = null;
    displayedColumns: string[] = ['id', 'doctype', 'Actions'];
    ocultado = 'd-none';
    showSpinner = true;
    filterFunction: any;
    docTypes: DocumentType[] = [];
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    ngOnInit(): void {}
    ngAfterViewInit(): void {
        this.loadDocumentTypes();
    }
    //methods
    loadDocumentTypes(): void {
        setTimeout(() => {
            this.service.getAllUsingGET2().subscribe((documentType) => {
                this.listDocumentType = documentType;
                this.docTypes = this.listDocumentType;
                this.chargingTableList();
                this.ocultado = documentType.length == 0 ? 'd-none' : '';
                this.showSpinner = false;
            });
        }, 300);
    }
    chargingTableList(): void {
        this.dataSource = new MatTableDataSource<DocumentType>(
            this.listDocumentType
        );
        this.dataSource.paginator = this.paginator;
    }

    delete(DocumentType: DocumentType): void {
        swal
            .fire({
                title: '¿Esta seguro de borrarlo?',
                text: 'Este borrado es irrevertible!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, quiero borrarlo!',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    this.service
                        .deleteUsingDELETE2(DocumentType.idDocumentType || 0)
                        .subscribe((e) => {
                            this.listDocumentType = this.listDocumentType.filter(
                                (cat) => cat.idDocumentType !== DocumentType.idDocumentType
                            );
                            swal.fire(
                                'Borrado!',
                                `El DocumentType ${DocumentType.doctype} ha sido borrado`,
                                'success'
                            );
                            this.chargingTableList();
                        });
                }
            });
    }

    filterByType(type: string) {
        this.showSpinner = true;
        if (type == "Todos") {
            this.loadDocumentTypes();
            this.chargingTableList();
        }
        this.service.getAllUsingGET2().subscribe((d) => {
            this.listDocumentType = d.filter((e) => e.doctype == type);
            this.chargingTableList();

            this.ocultado = d.length == 0 ? 'd-none' : '';
            this.showSpinner = false;
        });
    }
}
