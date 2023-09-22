import { render, screen  } from '@testing-library/react';
import { AuthContext } from '../../src/auth/context/AuthContext';
import { AppRouter } from '../../src/router/AppRouter';
import { MemoryRouter } from 'react-router-dom';


describe('Pruebas en <AppRouter />', () => { 
    
    test('Debe de mostrar el login si no esta autenticado', () => { 
        
        const contextValue = {
            logged: false,
        }

        render(
            <AuthContext.Provider value={ contextValue } >
                <MemoryRouter initialEntries={['/marvel']}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect( screen.getAllByText('Login').length ).toBe(2);

     })


     test('Debe mostrar el componente marvel si se esta autenticado', () => { 
        
        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Pepito'
            }
        }

        render(
            <AuthContext.Provider value={ contextValue } >
                <MemoryRouter initialEntries={['/login']}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect( screen.getAllByText('Marvel').length ).toBeGreaterThanOrEqual(1);

      })
 })