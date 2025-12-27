import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { loadRemoteStyles } from '../helper/load-styles';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: async () => {
      try {
        await loadRemoteStyles('http://localhost:4201/remote.css');

        const m = await loadRemoteModule({
          remoteName: 'products',
          exposedModule: './ProductList',
        });

        return m.ProductList;
      } catch (error) {
        console.log('Error loading MFE: ', error);
      }
    },
  },
];
