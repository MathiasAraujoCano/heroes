import { fireEvent, render, screen } from '@testing-library/react';
import { SearchPage } from '../../../src/heroes/pages/SearchPage';
import { MemoryRouter, useNavigate } from 'react-router-dom';


const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}))


describe('Pruebas en <SearchPage />', () => { 

    beforeEach(() => jest.clearAllMocks());
    
    test('Debe mostrarse correctamente con valores por defecto', () => { 

        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        expect( container ).toMatchSnapshot();

     })


     test('Debe mostrar a batman y al input con el valor del querystring', () => { 

        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        expect( input.value ).toBe('batman');

        const img = screen.getByRole('img');
        expect( img.src ).toContain('/assets/heroes/dc-batman.jpg');
     })     


     test('Debe mostrar un error si no se encuentra un heroe', () => { 
        
        // render(
        //     <MemoryRouter initialEntries={['/search?q=batman']}>
        //         <SearchPage />
        //     </MemoryRouter>
        // );

        // const alert = screen.getByLabelText('alert-danger');
        // expect( alert.style.display ).toBe('')

      })


      test('Debe llamar el navigate a la pantalla nueva', () => { 
        
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        fireEvent.change( input, { target: { name: 'searchText', value: 'superman'}});

        const form = screen.getByLabelText('form');
        fireEvent.submit( form );

        expect( mockedUseNavigate ).toHaveBeenCalledWith("?q=superman");
       })
 })