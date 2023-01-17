import {Route} from '@angular/router';
import { StudentsListComponent } from './students-list/students-list.component';
import { ManageStudentComponent } from './manage-student/manage-student.component';

export const studentsRoutes: Route[] = [
	{
		path: 'lista',
		component: StudentsListComponent,
	},
	{
		path: 'crear',
		component: ManageStudentComponent,
	},
	{
		path: 'editar/:id',
		component: ManageStudentComponent,
	},
    {
		path: '',
		// redirectTo: 'lista',
        pathMatch: 'full', // <-- this is the important part
        redirectTo: 'lista',
	},
];
