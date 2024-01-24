import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CoinTable from "./Components/coinTable";
import SearchField from "./Components/SearchField";
import About from "./Components/About";
import Contact from "./Components/Contact";
import NavBar from './Components/NavBar';
// import BarChart from './Components/BarChart';


// This mocks the axios library **IMPORTANT** ignores Axios calls thats been causing issues
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  // Add other methods you're using like `delete`, `put`, etc.
}));

// This tests to see if the CoinTable component is rendered
test("CoinTable renders without crashing", async () => {
  render(<CoinTable />);
  const dialogElement = await screen.findByText(/Open Dialog/i);
  expect(dialogElement).toBeInTheDocument();
});

// This tests to see if the open dialog button is rendered
test('CoinTable renders "Open Dialog" button', () => {
  render(<CoinTable />);
  const openDialogButton = screen.getByText(/Open Dialog/i);
  expect(openDialogButton).toBeInTheDocument();
});

// This finds out if the grid is rendered
test("CoinTable renders DataGrid", () => {
  render(<CoinTable />);
  const dataGridElement = screen.getByRole("grid");
  expect(dataGridElement).toBeInTheDocument();
});

// This finds out if the columnheader is showing name:
test('CoinTable renders "Name" column header', () => {
  render(<CoinTable />);
  const columnHeader = screen.getByRole("columnheader", { name: /Name/i });
  expect(columnHeader).toBeInTheDocument();
});

// Testing for SearchField component
test("SearchField updates search value correctly", () => {
  // Set up initial state
  const initialSearch = "initial";
  const setSearch = jest.fn();

  const { getByLabelText } = render(
    <SearchField search={initialSearch} setSearch={setSearch} />,
  );
  const searchInput = getByLabelText("Search field");
  expect(searchInput.value).toBe(initialSearch);

  // Simulate a user typing into the search field
  const newSearchValue = "updated";
  fireEvent.change(searchInput, { target: { value: newSearchValue } });

  expect(setSearch).toHaveBeenCalledWith(newSearchValue);
});

// Testing for About component
test("About component renders correctly", () => {
  render(<About />);
  const mainTitle = screen.getByText(/Crypto Tracker App/i);
  expect(mainTitle).toBeInTheDocument();

  expect(screen.getByText(/Description/i)).toBeInTheDocument();
  expect(screen.getByText(/Installation/i)).toBeInTheDocument();
  expect(screen.getByText(/Usage/i)).toBeInTheDocument();
  expect(screen.getByText(/Contributors/i)).toBeInTheDocument();
});

describe('Testing Navbar components', () => {
  test('Renders title "CRYPTO TRACKER"', () => {
  render(<NavBar />);
  const titleElement = screen.getByText(/CRYPTO TRACKER/i);
  expect(titleElement).toBeInTheDocument();
  });

  test('Renders SearchField component', () => {
    const search = 'exampleSearch';
    const setSearch = jest.fn();
    render(<NavBar search={search} setSearch={setSearch} />);
  });

  test('Renders Dark/Light mode button and triggers handleThemeChange', () => {
    const darkMode = false;
    const handleThemeChange = jest.fn();
    render(<NavBar darkMode={darkMode} handleThemeChange={handleThemeChange} />);
    // Used getByLabelText to find the IconButton
    const brightness7IconButton = screen.getByLabelText(/Toggle Dark Mode/);
    fireEvent.click(brightness7IconButton);
    expect(handleThemeChange).toHaveBeenCalled();
  });
});


//axios problem
// describe('Testing for BarChart Components', () => {
//   test('Renders tittle Top Ten Currency Values', () => {
//     render(<BarChart />);
//     const titleElement = screen.getByText('Top Ten Cryptocurrency Values');
//     expect(titleElement).toBeInTheDocument();
//   })
// })





