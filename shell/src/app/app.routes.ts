import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { loadRemoteStyles } from '../helper/load-styles';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: async () => {
      console.log('running init');

      try {
        await loadRemoteStyles('http://localhost:4201/remote.css');

        const remoteUrl =
          localStorage.getItem('remote-url') ?? 'http://localhost:4201/remoteEntry.json';

        const m = await loadRemoteModule({
          remoteName: 'products',
          exposedModule: './ProductList',
          remoteEntry: remoteUrl,
        });

        return m.ProductList;
      } catch (error) {
        console.log('Error loading MFE: ', error);
      }
    },
  },
];
