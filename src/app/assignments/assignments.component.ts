import { AfterViewInit, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Sort, MatSortModule } from '@angular/material/sort';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})

export class AssignmentsComponent implements OnInit {
  ajoutActive = false;
  assignments: Assignment[] = [];
  afficherProjetsRendus=true;
  afficherProjetsNonRendus=true;
  // pour la pagination
  page: number = 1;
  limit: number = 10;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private assignmentService: AssignmentsService) {}

  ngOnInit(): void {
    this.getAssignments();
  }

  ngAfterViewInit() {
    //https://stackoverflow.com/a/47594193
    this.paginator._intl.firstPageLabel="Première page";
    this.paginator._intl.lastPageLabel="Dernière page";
    this.paginator._intl.nextPageLabel="Page suivante";
    this.paginator._intl.previousPageLabel="Page précedente";
    this.paginator._intl.itemsPerPageLabel="Nombre d'assignments par page :";
    //-----------------------------------
    this.paginator.lastPage = () => {
      this.dernierePage();
      this.paginator.pageIndex=this.page-1;
    };
    this.paginator.firstPage = () => {
      this.premierePage();
      this.paginator.pageIndex=this.page-1;
    };
    this.paginator.nextPage = () => {
      this.pageSuivante();
      this.paginator.pageIndex=this.page-1;
    };
    this.paginator.previousPage = () => {
      this.pagePrecedente();
      this.paginator.pageIndex=this.page-1;
    };
   }

   onChangePaginator(e:any) {
    if(this.paginator.pageSize!=this.limit) {
      this.limit=this.paginator.pageSize;
      this.changeLimit();
    }
   }


  getAssignments() {
    this.assignmentService.getAssignmentsPagine(this.page, this.limit).subscribe((data) => {
      // le tableau des assignments est maintenant ici....
      this.assignments = data.docs;
      this.assignments.forEach(assignemnt => {
        assignemnt.dateDeRendu = new Date(assignemnt.dateDeRendu);
      });
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
    });
  }

  getColor(a: any) {
    return a.rendu ? 'green' : 'red';
  }

  // pagination
  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }

  pagePrecedente() {
      this.page = this.prevPage;
      this.getAssignments();
  }

  pageSuivante() {
      this.page = this.nextPage;
      this.getAssignments();
  }

  changeLimit() {
    this.getAssignments();
  }
  
  displayedColumns: string[] = ['dateDeRendu', 'nom', 'rendu', 'nav'];
  //dataSource = new MatTableDataSource(this.assignments);
  //dataSource = this.assignments.slice();
  //dataSource = this.assignments;

  //@ViewChild(MatSort) sort!: MatSort;

  /*ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    //this.assignments.sort = this.sort;
  }*/
  sortData(sort: Sort) {
    const data = this.assignments.slice();
    if (!sort.active || sort.direction === '') {
      this.assignments = data;
      return;
    }

    this.assignments = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'dateDeRendu':
          return compare(a.dateDeRendu.getTime(), b.dateDeRendu.getTime(), isAsc);
        case 'nom':
          return compare(a.nom, b.nom, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
  //code inspire d'ici : https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  /*sort( a: Assignment, b: Assignment ) {
    if ( a.dateDeRendu < b.dateDeRendu ){
      return -1;
    }
    if ( a.dateDeRendu > b.dateDeRendu ){
      return 1;
    }
    return 0;
  }*/