import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../src/auth/context/AuthContext';
import { PublicRoute } from '../../src/router/PublicRoute';
import { MemoryRouter, Route, Routes } from 'react-router-dom';


describe('Pruebas en <PublicRoute />', () => { 
    
    test('Debe mostrar el children si no esta autenticado', () => { 

        const contextValue = {
            logged: false,
        }
        
        render(
            <AuthContext.Provider value={ contextValue }>
                <PublicRoute>
                    <h1>Ruta pública</h1>
                </PublicRoute>
            </AuthContext.Provider>
        )

        expect( screen.getByText('Ruta pública')).toBeTruthy();

     })


     test('Debe de navegar si esta autenticado', () => { 
        
        const contextValue = {
            logged: true,
            user: {
                name: 'Pepe',
                id: 'ABCD'
            }
        }
        
        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path='/login' element={
                            <PublicRoute>
                                <h1>Ruta pública</h1>
                            </PublicRoute>
                        } />
                        <Route path='/marvel' element={ <h1>Ruta marvel</h1> } />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect( screen.getByText('Ruta marvel') ).toBeTruthy();

      })
 })