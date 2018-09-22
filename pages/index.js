/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ToDoIndex from '../views/ToDoIndex'

const styles = theme => ({
  root: {
    width: '100%',
  }
})

class Index extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <ToDoIndex />
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Index)
