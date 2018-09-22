import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import DeleteIcon from '@material-ui/icons/Delete'
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  secondText: {
    flex: '0 1 auto',
    paddingLeft: '15px' 
  }
})

const CheckboxListSecondary = props => {
  const { classes, items } = props
  return (
    <Grid container spacing={16}>
      <Grid item xs={12} md={12}>
        <div>
          <List dense={true}>
            {items.map((item, index) => (
              <ListItem
                key={index}
                button
                className={classes.listItem}
                onClick={e => props.checkItem(e, item)}
              >
                <Checkbox checked={item.checked} disableRipple />
                <ListItemText primary={item.item} />
                {item.tags.length === 1 ? (
                  <ListItemText
                    className={classes.secondText}
                    secondary='Tag: '
                  />
                ) : item.tags.length > 1 ?(
                  <ListItemText
                    className={classes.secondText}
                    secondary='Tags: '
                  />
                ) : <span></span>}
                {item.tags.map((tag, index) => (
                  <ListItemText key={index}
                    className={classes.secondText}
                    secondary={tag}
                  />
                ))}
                <ListItemSecondaryAction>
                  <IconButton>
                    <DeleteIcon
                      className={classes.icon}
                      onClick={e => props.deleteItem(e, item)}
                      id='delete'
                    />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
      </Grid>
    </Grid>
  )
}

CheckboxListSecondary.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CheckboxListSecondary)
