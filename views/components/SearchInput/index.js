import React from 'react'
import { connect } from 'react-redux'

import {
  searchUser,
  saveSearchKey,
  clearSearch
} from '../../modules/panel'
import Input from '../Input'

@connect(
  state => ({

  }),
  dispatch => ({
    searchUser: q => dispatch(searchUser(q)),
    saveSearchKey: q => dispatch(saveSearchKey(q)),
    clearSearch: () => dispatch(clearSearch())
  })
)
class SearchInput extends React.Component {
  state = { value: '' }
  // 1s timeout for delay searching
  defer = null
  handleChange = ({ target: { value } }) => {
    if (this.defer) {
      clearTimeout(this.defer)
    }
    this.setState({ value })
    if (value && value.length > 2) {
      this.defer = setTimeout(() => {
        this.props.saveSearchKey(value.toLowerCase())
        this.props.searchUser(value)
      }, 500)
    } else {
      this.props.clearSearch()
    }
  }
  render() {
    return (
      <Input {...this.props}
             value={this.state.value}
             onChange={this.handleChange} />
    )
  }
}

export default SearchInput
