import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { differenceInDays } from 'date-fns'

import SearchBar from 'components/SearchBar'

export default function LiveSearch (props) {
  const [search, setSearch] = useState({
    term: '',
    results: [],
    loading: false
  })

  const [error, setError] = useState(false)
  const prev = useRef('')

  function showError () {
    setSearch({
      term: '',
      results: [],
      loading: false
    })

    setError(true)
  }

  useEffect(() => {
    if (prev.current === '' && search.term === '') return

    setSearch(prev => ({
      ...prev,
      loading: true
    }))

    prev.current = search.term

    axios
      .get(
        `https://itunes.apple.com/search?term=${search.term}&country=CA&media=music&entity=album&attribute=artistTerm`
      )
      .then(response => {
        response.data.results.sort((a, b) => {
          return differenceInDays(
            new Date(b.releaseDate),
            new Date(a.releaseDate)
          )
        })

        setSearch({
          ...search,
          results: response.data.results,
          loading: false
        })
      })
      .catch(error => {
        showError()
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.term])
  return (
    <React.Fragment>
      <header className='logo'>
        <h1>Music Search</h1>
      </header>
      <main>
        <SearchBar
          loading={search.loading}
          onSearch={term => {
            console.log('set search')
            setSearch({ ...search, term })
          }}
        />
      </main>
    </React.Fragment>
  )
}
