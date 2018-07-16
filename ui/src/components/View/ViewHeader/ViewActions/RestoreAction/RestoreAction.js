import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../../../../store/actions'
import UndoIcon from '@material-ui/icons/Undo'
import Button from '@material-ui/core/Button'
import color
  from '../../../../../../node_modules/@material-ui/core/colors/yellow'

class RestoreAction extends Component {
  handleRestoreClick = e => {
    e.stopPropagation()
    this.props.selected.deleted && this.props.selected.type === 'file'
      ? this.props.updateFile(this.props.selected.id, {
        id: this.props.selected.id,
        location: this.props.selected.location,
        name: this.props.selected.name,
        deleted: false,
        fileSize: this.props.selected.fileSize,
        contentType: this.props.selected.contentType
      })
      : this.props.updateFolder(this.props.selected.id, {
        id: this.props.selected.id,
        location: this.props.selected.name,
        name: this.props.selected.name,
        deleted: false
      })
  }

  render () {
    return (
      <div className='RestoreActionContainer'>
        {this.props.selected.name && this.props.selected.deleted
          ? <Button
            size='small'
            variant='text'
            aria-label='restore'
            className='button Color'
            onClick={this.handleRestoreClick}
            >
            <UndoIcon className='UndoActionIcon' style={{ color: 'grey' }} />
          </Button>
          : ''}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateFile: (id, data) => dispatch(actionCreators.updateFileAsync(id, data)),
  updateFolder: (id, data) =>
    dispatch(actionCreators.updateFolderAsync(id, data))
})

const mapStateToProps = state => ({
  selected: state.selected
})

export default connect(mapStateToProps, mapDispatchToProps)(RestoreAction)
