import { MemoryRouter, Route, Routes } from "react-router-dom"
import { AuthContext } from "../../src/auth/context/AuthContext"
import { screen, render } from '@testing-library/react';
import { PrivateRoute } from "../../src/router/PrivateRoute";


describe('Pruebas en <PrivateRoute />', () => { 
    
    test('Debe mostrar el children si esta autenticado', () => { 

        Storage.prototype.setItem = jest.fn();
        
        const contextValue = {
            logged: true,
            user: {
                name: 'Pepe',
                id: 'ABCD'
            }
        }
        
        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect( screen.getByText('Ruta privada') ).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/search?q=batman');

     })
 })