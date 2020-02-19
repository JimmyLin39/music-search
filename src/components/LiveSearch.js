import React, { useState, useEffect, useRef } from 'react'
import SearchBar from 'components/SearchBar'

export default function LiveSearch (props) {
  const [search, setSearch] = useState({
    term: '',
    results: [],
    loading: false
  })

  const [error, setError] = useState(false)
  const prev = useRef('')
  console.log('prev', prev)

  useEffect(() => {
    if (prev.current === '' && search.term === '') return

    setSearch(prev => ({
      ...prev,
      loading: true
    }))
    prev.current = search.term
    console.log('search', search)
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
