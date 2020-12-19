import { Injectable } from '@angular/core';
import { InMemoryDbService } from '../../node_modules/angular-in-memory-web-api';
import { User } from './user';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 1, firstName: 'Arjun', lastName: 'kizhikkayil', country: 'India', district: 'Kozhikode', state: 'Kerala' },
      { id: 2, firstName: 'Sreekesh', lastName: 'D', country: 'India', district: 'Kozhikode', state: 'Kerala' },
      { id: 3, firstName: 'Nithun', lastName: 'e', country: 'India', district: 'Kozhikode', state: 'Kerala' },
      { id: 4, firstName: 'Alan', lastName: 'p', country: 'India', district: 'Kozhikode', state: 'Kerala' },
      { id: 5, firstName: 'Aswin', lastName: 's', country: 'India', district: 'Kozhikode', state: 'Kerala' },
      { id: 6, firstName: 'Jaison', lastName: 'z', country: 'India', district: 'Kozhikode', state: 'Kerala' },
      { id: 7, firstName: 'Nitin', lastName: 'V', country: 'India', district: 'Kozhikode', state: 'Kerala' },
      { id: 8, firstName: 'Ajnas', lastName: 'k', country: 'India', district: 'Kozhikode', state: 'Kerala' },
      { id: 9, firstName: 'Nikhil', lastName: 'T', country: 'India', district: 'Kozhikode', state: 'Kerala' },
      { id: 10, firstName: 'Sijo', lastName: 'J', country: 'India', district: 'Kozhikode', state: 'Kerala' },
      { id: 11, firstName: 'Manpreet', lastName: 'k', country: 'India', district: 'Kozhikode', state: 'Kerala' }
    ];
    const projects = [
      { id: 1, name: 'Project 1', userId: "AK", manager: "MH", client: 'client 1' },
      { id: 2, name: 'Project 2', userId: "SD", manager: "PS", client: 'client 2' },
      { id: 3, name: 'Project 3', userId: "NE", manager: "AS", client: 'client 3' },
      { id: 4, name: 'Project 4', userId: "AP", manager: "RK", client: 'client 4' },
      { id: 5, name: 'Project 5', userId: "AS", manager: "SD", client: 'client 5' },
      { id: 6, name: 'Project 6', userId: "JZ", manager: "SM", client: 'client 6' },
      { id: 7, name: 'Project 7', userId: "NV", manager: "DE", client: 'client 7' },
      { id: 8, name: 'Project 8', userId: "NT", manager: "MM", client: 'client 8' },
      { id: 9, name: 'Project 9', userId: "SJ", manager: "DM", client: 'client 9' },
      { id: 10, name: 'Project 10', userId: "MK", manager: "AM", client: 'client 10' }
      
    ];
    return {users, projects};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  
  genId<T extends User | Project>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 1;
  }

}
