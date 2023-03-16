import { render, screen } from '@testing-library/react'
import App from 'next/app'

describe('App', () => {
  it('should render correctly App', () => {
    render(<App />)
    expect(
      screen.getByText(/Welcome/)
    ).toBeInTheDocument()
  })
})
